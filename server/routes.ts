import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactEmail, type ContactFormData } from "./email";
import { z } from "zod";
import { contactFormSchema, blogGenerateSchema } from "@shared/schema";
import { submitUrlToIndexNow, submitUrlsToIndexNow, submitSitemapToIndexNow, logIndexNowResponse } from "./indexnow";
import { generateMultipleBlogPosts } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // WWW redirect - redirect www.flaechenfrei.at to flaechenfrei.at (SEO best practice)
  app.use((req, res, next) => {
    const host = req.headers.host || '';
    if (host.startsWith('www.')) {
      const newHost = host.replace('www.', '');
      const protocol = req.headers['x-forwarded-proto'] || 'https';
      return res.redirect(301, `${protocol}://${newHost}${req.originalUrl}`);
    }
    next();
  });

  app.get("/", (req, res) => {
    const acceptLanguage = req.headers['accept-language'] || '';
    // Default to German (de), only use English if German is not present
    // Priority: de > en > default to de
    const preferredLang = acceptLanguage.toLowerCase().includes('de') ? 'de' : 
                          acceptLanguage.toLowerCase().includes('en') ? 'en' : 'de';
    res.redirect(302, `/${preferredLang}`);
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      
      await sendContactEmail(validatedData as ContactFormData);
      
      res.json({ 
        success: true, 
        message: "Ihre Anfrage wurde erfolgreich gesendet!" 
      });
    } catch (error) {
      console.error("Error sending contact email:", error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Ungültige Formulardaten",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Beim Senden Ihrer Anfrage ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut." 
        });
      }
    }
  });

  // IndexNow API endpoints
  
  // Submit single URL to IndexNow
  app.post("/api/indexnow/submit-url", async (req, res) => {
    try {
      const { url } = req.body;
      
      if (!url || typeof url !== 'string') {
        return res.status(400).json({ 
          success: false, 
          message: "URL is required and must be a string" 
        });
      }

      // Validate URL belongs to this domain
      if (!url.startsWith('https://flaechenfrei.at')) {
        return res.status(422).json({ 
          success: false, 
          message: "URL must belong to flaechenfrei.at domain" 
        });
      }

      const result = await submitUrlToIndexNow(url);
      logIndexNowResponse(result, url);
      
      // Use result.status if valid, otherwise default to 500 for errors
      const httpStatus = result.success ? result.status : (result.status || 500);
      res.status(httpStatus).json(result);
    } catch (error) {
      console.error("IndexNow single URL submission error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Submit multiple URLs to IndexNow
  app.post("/api/indexnow/submit-urls", async (req, res) => {
    try {
      const { urls } = req.body;
      
      if (!Array.isArray(urls) || urls.length === 0) {
        return res.status(400).json({ 
          success: false, 
          message: "URLs must be a non-empty array" 
        });
      }

      // Validate all URLs belong to this domain
      const invalidUrls = urls.filter(url => !url.startsWith('https://flaechenfrei.at'));
      if (invalidUrls.length > 0) {
        return res.status(422).json({ 
          success: false, 
          message: `${invalidUrls.length} URL(s) do not belong to flaechenfrei.at domain` 
        });
      }

      const result = await submitUrlsToIndexNow(urls);
      logIndexNowResponse(result, `${urls.length} URLs`);
      
      // Use result.status if valid, otherwise default to 500 for errors
      const httpStatus = result.success ? result.status : (result.status || 500);
      res.status(httpStatus).json(result);
    } catch (error) {
      console.error("IndexNow batch submission error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Submit entire sitemap to IndexNow (priority pages)
  app.post("/api/indexnow/submit-sitemap", async (req, res) => {
    try {
      const result = await submitSitemapToIndexNow();
      logIndexNowResponse(result, "Sitemap submission");
      
      // Use result.status if valid, otherwise default to 500 for errors
      const httpStatus = result.success ? result.status : (result.status || 500);
      res.status(httpStatus).json(result);
    } catch (error) {
      console.error("IndexNow sitemap submission error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // =====================
  // BLOG API ENDPOINTS
  // =====================

  // GET /api/blog - list all posts (with optional language filter)
  app.get("/api/blog", async (req, res) => {
    try {
      const language = (req.query.language as 'de' | 'en') || 'de';
      const category = req.query.category as string | undefined;
      const featured = req.query.featured === 'true';

      let posts;
      if (featured) {
        posts = await storage.getFeaturedBlogPosts(language);
      } else if (category) {
        posts = await storage.getBlogPostsByCategory(category, language);
      } else {
        posts = await storage.getAllBlogPosts(language);
      }

      res.json({ success: true, posts, total: posts.length });
    } catch (err) {
      console.error('[Blog] Error fetching posts:', err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });

  // GET /api/blog/:slug - get single post
  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const language = (req.query.language as 'de' | 'en') || 'de';
      const post = await storage.getBlogPostBySlug(slug, language);
      if (!post) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }
      res.json({ success: true, post });
    } catch (err) {
      console.error('[Blog] Error fetching post:', err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });

  // POST /api/blog/generate - trigger AI generation (requires OPENAI_API_KEY)
  app.post("/api/blog/generate", async (req, res) => {
    try {
      const { language, count, topic } = blogGenerateSchema.parse(req.body);

      if (!process.env.OPENAI_API_KEY) {
        return res.status(503).json({
          success: false,
          message: 'OPENAI_API_KEY not configured. Please add it to environment variables.',
        });
      }

      console.log(`[Blog] Generating ${count} posts in ${language}...`);
      const generated = await generateMultipleBlogPosts(count, language, topic);

      const saved = [];
      for (const post of generated) {
        const saved_post = await storage.createBlogPost(post);
        saved.push(saved_post);
      }

      res.json({
        success: true,
        message: `Generated and saved ${saved.length} blog posts`,
        posts: saved,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ success: false, errors: err.errors });
      }
      console.error('[Blog] Generation error:', err);
      res.status(500).json({ success: false, message: 'Generation failed' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
