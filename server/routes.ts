import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactEmail, type ContactFormData } from "./email";
import { z } from "zod";
import { contactFormSchema, blogGenerateSchema } from "@shared/schema";
import { submitUrlToIndexNow, submitUrlsToIndexNow, submitSitemapToIndexNow, logIndexNowResponse } from "./indexnow";
import { generateMultipleBlogPosts, generateShopProductImage } from "./openai";

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

      // Pass existing titles to avoid duplicates
      const existingPosts = await storage.getAllBlogPosts(language);
      const usedTitles = existingPosts.map(p => p.title);

      console.log(`[Blog] Generating ${count} posts in ${language} with images... (${usedTitles.length} existing)`);
      const generated = await generateMultipleBlogPosts(count, language, topic, true, usedTitles);

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

  // POST /api/blog/generate-async - fire and forget (returns immediately)
  app.post("/api/blog/generate-async", async (req, res) => {
    try {
      const { language, count, topic } = blogGenerateSchema.parse(req.body);

      if (!process.env.OPENAI_API_KEY) {
        return res.status(503).json({ success: false, message: 'OPENAI_API_KEY not configured.' });
      }

      // Return immediately
      res.json({ success: true, message: `Background generation of ${count} ${language} posts started.` });

      // Generate in background (non-blocking)
      setImmediate(async () => {
        try {
          const existingPosts = await storage.getAllBlogPosts(language);
          const usedTitles = existingPosts.map(p => p.title);
          console.log(`[Blog-Async] Generating ${count} posts in ${language}... (${usedTitles.length} existing)`);
          const generated = await generateMultipleBlogPosts(count, language, topic, true, usedTitles);
          for (const post of generated) {
            await storage.createBlogPost(post);
          }
          console.log(`[Blog-Async] Done: saved ${generated.length} ${language} posts`);
        } catch (e) {
          console.error('[Blog-Async] Error:', e);
        }
      });
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ success: false, errors: err.errors });
      console.error('[Blog] Async generate error:', err);
      res.status(500).json({ success: false, message: 'Failed to start generation' });
    }
  });

  // =====================
  // SHOP IMAGE GENERATION
  // =====================
  app.post("/api/shop/generate-images-async", async (req, res) => {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({ success: false, message: 'OPENAI_API_KEY not configured.' });
    }
    res.json({ success: true, message: 'Shop image generation started in background.' });

    setImmediate(async () => {
      const products = [
        { filename: 'transport-paket-s.png', prompt: 'Professional Austrian moving service, compact white cargo van being loaded with furniture boxes on a Vienna street, two workers in yellow uniforms, clean modern look, bright daylight' },
        { filename: 'transport-paket-m.png', prompt: 'Professional Austrian moving company, large white moving truck being loaded with furniture and boxes on a Vienna residential street, two workers in yellow safety vests carefully carrying sofa, sunny day' },
        { filename: 'transport-paket-l.png', prompt: 'Large professional Austrian moving operation, big white moving truck fully loaded parked in front of Vienna historic building, three workers in matching uniforms efficiently moving large furniture' },
        { filename: 'raeumung-paket-s.png', prompt: 'Professional Austrian apartment clearance service, two workers in yellow uniforms clearing a small compact studio apartment in Vienna, removing furniture and boxes, clean and organized work' },
        { filename: 'raeumung-paket-m.png', prompt: 'Professional Austrian apartment clearance team, three workers in yellow vests clearing a medium-sized 2-bedroom apartment in Vienna, systematically removing furniture and household items, efficient teamwork' },
        { filename: 'raeumung-paket-l.png', prompt: 'Large-scale professional Austrian house clearance, four workers in yellow uniforms clearing a large family home in Vienna, multiple rooms being emptied simultaneously, big truck outside, organized and efficient' },
      ];

      for (const p of products) {
        await generateShopProductImage(p.prompt, p.filename);
        await new Promise(r => setTimeout(r, 2000));
      }
      console.log('[Shop] All product images generated.');
    });
  });

  // =====================
  // DYNAMIC SITEMAP.XML  (overrides static file — always up-to-date with blog posts)
  // =====================
  app.get('/sitemap.xml', async (req, res) => {
    const BASE = 'https://transraum.at';
    const now = new Date().toISOString().split('T')[0];

    const staticUrls = [
      // Homepage + language roots
      { loc: `${BASE}/`, priority: '1.0', changefreq: 'weekly' },
      { loc: `${BASE}/de`, priority: '1.0', changefreq: 'weekly' },
      { loc: `${BASE}/en`, priority: '0.9', changefreq: 'weekly' },
      // DE Service pages
      { loc: `${BASE}/de/leistungen/wohnungsraeumung`, priority: '0.9', changefreq: 'monthly' },
      { loc: `${BASE}/de/leistungen/hausraeumung`, priority: '0.9', changefreq: 'monthly' },
      { loc: `${BASE}/de/leistungen/transportservice`, priority: '0.9', changefreq: 'monthly' },
      { loc: `${BASE}/de/leistungen/kellerraeumung`, priority: '0.9', changefreq: 'monthly' },
      { loc: `${BASE}/de/leistungen/entrümpeln`, priority: '0.9', changefreq: 'monthly' },
      { loc: `${BASE}/de/leistungen/verlassenschaft-ankauf`, priority: '0.9', changefreq: 'monthly' },
      { loc: `${BASE}/de/leistungen/haushaltsaufloesung`, priority: '0.9', changefreq: 'monthly' },
      { loc: `${BASE}/de/leistungen/umzug`, priority: '0.9', changefreq: 'monthly' },
      { loc: `${BASE}/de/leistungen/bueroraeumung`, priority: '0.8', changefreq: 'monthly' },
      { loc: `${BASE}/de/leistungen/sperrgut`, priority: '0.8', changefreq: 'monthly' },
      { loc: `${BASE}/de/leistungen/dachbodenraeumung`, priority: '0.8', changefreq: 'monthly' },
      { loc: `${BASE}/de/leistungen/garageraeumung`, priority: '0.8', changefreq: 'monthly' },
      // EN Service pages
      { loc: `${BASE}/en/services/apartment-clearing`, priority: '0.8', changefreq: 'monthly' },
      { loc: `${BASE}/en/services/house-clearing`, priority: '0.8', changefreq: 'monthly' },
      { loc: `${BASE}/en/services/transport-service`, priority: '0.8', changefreq: 'monthly' },
      { loc: `${BASE}/en/services/basement-clearing`, priority: '0.8', changefreq: 'monthly' },
      { loc: `${BASE}/en/services/estate-clearance`, priority: '0.8', changefreq: 'monthly' },
      { loc: `${BASE}/en/services/moving`, priority: '0.8', changefreq: 'monthly' },
      // Contact + Info pages
      { loc: `${BASE}/de/kontakt`, priority: '0.8', changefreq: 'monthly' },
      { loc: `${BASE}/en/contact`, priority: '0.7', changefreq: 'monthly' },
      { loc: `${BASE}/de/ueber-uns`, priority: '0.7', changefreq: 'monthly' },
      { loc: `${BASE}/de/faq`, priority: '0.7', changefreq: 'monthly' },
      { loc: `${BASE}/de/datenschutz`, priority: '0.5', changefreq: 'yearly' },
      { loc: `${BASE}/de/impressum`, priority: '0.5', changefreq: 'yearly' },
      { loc: `${BASE}/de/agb`, priority: '0.5', changefreq: 'yearly' },
      // Blog index
      { loc: `${BASE}/de/blog`, priority: '0.9', changefreq: 'daily' },
      { loc: `${BASE}/en/blog`, priority: '0.8', changefreq: 'daily' },
      // Shop / Pakete
      { loc: `${BASE}/de/pakete`, priority: '0.95', changefreq: 'weekly' },
      { loc: `${BASE}/en/packages`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${BASE}/de/pakete/transport-paket-s`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${BASE}/de/pakete/transport-paket-m`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${BASE}/de/pakete/transport-paket-l`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${BASE}/de/pakete/raeumung-paket-s`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${BASE}/de/pakete/raeumung-paket-m`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${BASE}/de/pakete/raeumung-paket-l`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${BASE}/en/packages/transport-package-s`, priority: '0.85', changefreq: 'weekly' },
      { loc: `${BASE}/en/packages/transport-package-m`, priority: '0.85', changefreq: 'weekly' },
      { loc: `${BASE}/en/packages/transport-package-l`, priority: '0.85', changefreq: 'weekly' },
      { loc: `${BASE}/en/packages/clearance-package-s`, priority: '0.85', changefreq: 'weekly' },
      { loc: `${BASE}/en/packages/clearance-package-m`, priority: '0.85', changefreq: 'weekly' },
      { loc: `${BASE}/en/packages/clearance-package-l`, priority: '0.85', changefreq: 'weekly' },
    ];

    // Fetch all blog posts from storage
    let blogUrlsDe: string[] = [];
    let blogUrlsEn: string[] = [];
    try {
      const [dePosts, enPosts] = await Promise.all([
        storage.getAllBlogPosts('de'),
        storage.getAllBlogPosts('en'),
      ]);
      blogUrlsDe = dePosts.map((p) => `${BASE}/de/blog/${p.slug}`);
      blogUrlsEn = enPosts.map((p) => `${BASE}/en/blog/${p.slug}`);
    } catch (_) {}

    const blogEntries = [
      ...blogUrlsDe.map((loc) => ({ loc, priority: '0.8', changefreq: 'monthly' })),
      ...blogUrlsEn.map((loc) => ({ loc, priority: '0.7', changefreq: 'monthly' })),
    ];

    const allUrls = [...staticUrls, ...blogEntries];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allUrls.map(({ loc, priority, changefreq }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(xml);
  });

  const httpServer = createServer(app);

  return httpServer;
}
