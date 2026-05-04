import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactEmail, type ContactFormData } from "./email";
import { z } from "zod";
import { contactFormSchema, blogGenerateSchema } from "@shared/schema";
import { submitUrlToIndexNow, submitUrlsToIndexNow, submitSitemapToIndexNow, logIndexNowResponse } from "./indexnow";
import { generateMultipleBlogPosts, generateShopProductImage } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // WWW redirect - redirect www.transraum.com to transraum.com (SEO best practice)
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
      if (!url.startsWith('https://transraum.com')) {
        return res.status(422).json({ 
          success: false, 
          message: "URL must belong to transraum.com domain" 
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
      const invalidUrls = urls.filter(url => !url.startsWith('https://transraum.com'));
      if (invalidUrls.length > 0) {
        return res.status(422).json({ 
          success: false, 
          message: `${invalidUrls.length} URL(s) do not belong to transraum.com domain` 
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

  // Simple admin key guard for AI generation endpoints
  const requireAdminKey = (req: any, res: any, next: any) => {
    const adminKey = process.env.ADMIN_SECRET;
    const providedKey = req.headers['x-admin-key'] || req.body?.adminKey;
    if (adminKey && providedKey !== adminKey) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    next();
  };

  // POST /api/blog/generate - trigger AI generation (requires OPENAI_API_KEY)
  app.post("/api/blog/generate", requireAdminKey, async (req, res) => {
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
  app.post("/api/blog/generate-async", requireAdminKey, async (req, res) => {
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
  app.post("/api/shop/generate-images-async", requireAdminKey, async (req, res) => {
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
    const BASE = 'https://transraum.com';
    const now = new Date().toISOString().split('T')[0];

    interface SitemapEntry {
      loc: string;
      priority: string;
      changefreq: string;
      altDe?: string;
      altEn?: string;
    }

    // Helper: build <xhtml:link> hreflang tags
    const hreflangTags = (entry: SitemapEntry): string => {
      if (!entry.altDe && !entry.altEn) return '';
      const de = entry.altDe || entry.loc;
      const en = entry.altEn;
      const lines: string[] = [];
      lines.push(`    <xhtml:link rel="alternate" hreflang="de" href="${de}"/>`);
      if (en) lines.push(`    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>`);
      lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${de}"/>`);
      return '\n' + lines.join('\n');
    };

    // Vienna district slugs (23 districts)
    const districtSlugs = [
      '1010-wien-innere-stadt', '1020-wien-leopoldstadt', '1030-wien-landstrasse',
      '1040-wien-wieden', '1050-wien-margareten', '1060-wien-mariahilf',
      '1070-wien-neubau', '1080-wien-josefstadt', '1090-wien-alsergrund',
      '1100-wien-favoriten', '1110-wien-simmering', '1120-wien-meidling',
      '1130-wien-hietzing', '1140-wien-penzing', '1150-wien-rudolfsheim-fuenfhaus',
      '1160-wien-ottakring', '1170-wien-hernals', '1180-wien-waehring',
      '1190-wien-doebling', '1200-wien-brigittenau', '1210-wien-floridsdorf',
      '1220-wien-donaustadt', '1230-wien-liesing',
    ];

    // Austrian state slugs (9 Bundesländer)
    const stateSlugs = [
      'wien', 'niederoesterreich', 'oberoesterreich', 'salzburg',
      'tirol', 'vorarlberg', 'kaernten', 'steiermark', 'burgenland',
    ];

    // City-state relationships
    const cityStatePairs: { state: string; city: string }[] = [
      { state: 'niederoesterreich', city: 'st-poelten' },
      { state: 'niederoesterreich', city: 'wiener-neustadt' },
      { state: 'niederoesterreich', city: 'baden' },
      { state: 'niederoesterreich', city: 'klosterneuburg' },
      { state: 'niederoesterreich', city: 'moedling' },
      { state: 'niederoesterreich', city: 'krems' },
      { state: 'niederoesterreich', city: 'amstetten' },
      { state: 'niederoesterreich', city: 'traiskirchen' },
      { state: 'burgenland', city: 'eisenstadt' },
      { state: 'burgenland', city: 'rust' },
      { state: 'burgenland', city: 'neusiedl-am-see' },
      { state: 'burgenland', city: 'oberwart' },
      { state: 'oberoesterreich', city: 'linz' },
      { state: 'oberoesterreich', city: 'wels' },
      { state: 'oberoesterreich', city: 'steyr' },
      { state: 'oberoesterreich', city: 'leonding' },
      { state: 'salzburg', city: 'salzburg' },
      { state: 'salzburg', city: 'hallein' },
      { state: 'salzburg', city: 'saalfelden' },
      { state: 'tirol', city: 'innsbruck' },
      { state: 'tirol', city: 'kufstein' },
      { state: 'tirol', city: 'woergl' },
      { state: 'vorarlberg', city: 'bregenz' },
      { state: 'vorarlberg', city: 'dornbirn' },
      { state: 'vorarlberg', city: 'feldkirch' },
      { state: 'kaernten', city: 'klagenfurt' },
      { state: 'kaernten', city: 'villach' },
      { state: 'kaernten', city: 'wolfsberg' },
      { state: 'steiermark', city: 'graz' },
      { state: 'steiermark', city: 'leoben' },
      { state: 'steiermark', city: 'kapfenberg' },
    ];

    const staticUrls: SitemapEntry[] = [
      // Homepage + language roots
      { loc: `${BASE}/`, priority: '1.0', changefreq: 'weekly', altDe: `${BASE}/de`, altEn: `${BASE}/en` },
      { loc: `${BASE}/de`, priority: '1.0', changefreq: 'weekly', altDe: `${BASE}/de`, altEn: `${BASE}/en` },
      { loc: `${BASE}/en`, priority: '0.9', changefreq: 'weekly', altDe: `${BASE}/de`, altEn: `${BASE}/en` },
      // DE Service pages (with EN alternates)
      { loc: `${BASE}/de/leistungen/wohnungsraeumung`, priority: '0.9', changefreq: 'monthly', altDe: `${BASE}/de/leistungen/wohnungsraeumung`, altEn: `${BASE}/en/services/apartment-clearing` },
      { loc: `${BASE}/de/leistungen/hausraeumung`, priority: '0.9', changefreq: 'monthly', altDe: `${BASE}/de/leistungen/hausraeumung`, altEn: `${BASE}/en/services/house-clearing` },
      { loc: `${BASE}/de/leistungen/transportservice`, priority: '0.9', changefreq: 'monthly', altDe: `${BASE}/de/leistungen/transportservice`, altEn: `${BASE}/en/services/transport-service` },
      { loc: `${BASE}/de/leistungen/kellerraeumung`, priority: '0.9', changefreq: 'monthly', altDe: `${BASE}/de/leistungen/kellerraeumung`, altEn: `${BASE}/en/services/basement-clearing` },
      { loc: `${BASE}/de/leistungen/entr%C3%BCmpeln`, priority: '0.9', changefreq: 'monthly', altDe: `${BASE}/de/leistungen/entr%C3%BCmpeln`, altEn: `${BASE}/en/services/decluttering` },
      { loc: `${BASE}/de/leistungen/verlassenschaft-ankauf`, priority: '0.9', changefreq: 'monthly', altDe: `${BASE}/de/leistungen/verlassenschaft-ankauf`, altEn: `${BASE}/en/services/estate-clearance` },
      { loc: `${BASE}/de/leistungen/haushaltsaufloesung`, priority: '0.9', changefreq: 'monthly', altDe: `${BASE}/de/leistungen/haushaltsaufloesung`, altEn: `${BASE}/en/services/household-clearance` },
      { loc: `${BASE}/de/leistungen/umzug`, priority: '0.9', changefreq: 'monthly', altDe: `${BASE}/de/leistungen/umzug`, altEn: `${BASE}/en/services/moving` },
      { loc: `${BASE}/de/leistungen/bueroraeumung`, priority: '0.8', changefreq: 'monthly', altDe: `${BASE}/de/leistungen/bueroraeumung`, altEn: `${BASE}/en/services/office-clearing` },
      { loc: `${BASE}/de/leistungen/sperrgut`, priority: '0.8', changefreq: 'monthly', altDe: `${BASE}/de/leistungen/sperrgut`, altEn: `${BASE}/en/services/bulky-waste` },
      { loc: `${BASE}/de/leistungen/dachbodenraeumung`, priority: '0.8', changefreq: 'monthly', altDe: `${BASE}/de/leistungen/dachbodenraeumung`, altEn: `${BASE}/en/services/attic-clearing` },
      { loc: `${BASE}/de/leistungen/garageraeumung`, priority: '0.8', changefreq: 'monthly', altDe: `${BASE}/de/leistungen/garageraeumung`, altEn: `${BASE}/en/services/garage-clearing` },
      // EN Service pages
      { loc: `${BASE}/en/services/apartment-clearing`, priority: '0.8', changefreq: 'monthly', altDe: `${BASE}/de/leistungen/wohnungsraeumung`, altEn: `${BASE}/en/services/apartment-clearing` },
      { loc: `${BASE}/en/services/house-clearing`, priority: '0.8', changefreq: 'monthly', altDe: `${BASE}/de/leistungen/hausraeumung`, altEn: `${BASE}/en/services/house-clearing` },
      { loc: `${BASE}/en/services/transport-service`, priority: '0.8', changefreq: 'monthly', altDe: `${BASE}/de/leistungen/transportservice`, altEn: `${BASE}/en/services/transport-service` },
      { loc: `${BASE}/en/services/basement-clearing`, priority: '0.8', changefreq: 'monthly', altDe: `${BASE}/de/leistungen/kellerraeumung`, altEn: `${BASE}/en/services/basement-clearing` },
      { loc: `${BASE}/en/services/decluttering`, priority: '0.8', changefreq: 'monthly', altDe: `${BASE}/de/leistungen/entr%C3%BCmpeln`, altEn: `${BASE}/en/services/decluttering` },
      { loc: `${BASE}/en/services/estate-clearance`, priority: '0.8', changefreq: 'monthly', altDe: `${BASE}/de/leistungen/verlassenschaft-ankauf`, altEn: `${BASE}/en/services/estate-clearance` },
      { loc: `${BASE}/en/services/household-clearance`, priority: '0.8', changefreq: 'monthly', altDe: `${BASE}/de/leistungen/haushaltsaufloesung`, altEn: `${BASE}/en/services/household-clearance` },
      { loc: `${BASE}/en/services/moving`, priority: '0.8', changefreq: 'monthly', altDe: `${BASE}/de/leistungen/umzug`, altEn: `${BASE}/en/services/moving` },
      { loc: `${BASE}/en/services/office-clearing`, priority: '0.7', changefreq: 'monthly', altDe: `${BASE}/de/leistungen/bueroraeumung`, altEn: `${BASE}/en/services/office-clearing` },
      { loc: `${BASE}/en/services/bulky-waste`, priority: '0.7', changefreq: 'monthly', altDe: `${BASE}/de/leistungen/sperrgut`, altEn: `${BASE}/en/services/bulky-waste` },
      { loc: `${BASE}/en/services/attic-clearing`, priority: '0.7', changefreq: 'monthly', altDe: `${BASE}/de/leistungen/dachbodenraeumung`, altEn: `${BASE}/en/services/attic-clearing` },
      { loc: `${BASE}/en/services/garage-clearing`, priority: '0.7', changefreq: 'monthly', altDe: `${BASE}/de/leistungen/garageraeumung`, altEn: `${BASE}/en/services/garage-clearing` },
      // Services overview
      { loc: `${BASE}/de/leistungen`, priority: '0.9', changefreq: 'monthly', altDe: `${BASE}/de/leistungen`, altEn: `${BASE}/en/services` },
      { loc: `${BASE}/en/services`, priority: '0.8', changefreq: 'monthly', altDe: `${BASE}/de/leistungen`, altEn: `${BASE}/en/services` },
      // Contact + Info pages
      { loc: `${BASE}/de/kontakt`, priority: '0.8', changefreq: 'monthly', altDe: `${BASE}/de/kontakt`, altEn: `${BASE}/en/contact` },
      { loc: `${BASE}/en/contact`, priority: '0.7', changefreq: 'monthly', altDe: `${BASE}/de/kontakt`, altEn: `${BASE}/en/contact` },
      // FAQ
      { loc: `${BASE}/de/faq`, priority: '0.7', changefreq: 'monthly', altDe: `${BASE}/de/faq`, altEn: `${BASE}/en/faq` },
      { loc: `${BASE}/en/faq`, priority: '0.7', changefreq: 'monthly', altDe: `${BASE}/de/faq`, altEn: `${BASE}/en/faq` },
      // Legal pages
      { loc: `${BASE}/de/datenschutz`, priority: '0.5', changefreq: 'yearly', altDe: `${BASE}/de/datenschutz`, altEn: `${BASE}/en/privacy-policy` },
      { loc: `${BASE}/en/privacy-policy`, priority: '0.5', changefreq: 'yearly', altDe: `${BASE}/de/datenschutz`, altEn: `${BASE}/en/privacy-policy` },
      { loc: `${BASE}/de/impressum`, priority: '0.5', changefreq: 'yearly', altDe: `${BASE}/de/impressum`, altEn: `${BASE}/en/imprint` },
      { loc: `${BASE}/en/imprint`, priority: '0.5', changefreq: 'yearly', altDe: `${BASE}/de/impressum`, altEn: `${BASE}/en/imprint` },
      { loc: `${BASE}/de/agb`, priority: '0.5', changefreq: 'yearly', altDe: `${BASE}/de/agb`, altEn: `${BASE}/en/terms` },
      { loc: `${BASE}/en/terms`, priority: '0.5', changefreq: 'yearly', altDe: `${BASE}/de/agb`, altEn: `${BASE}/en/terms` },
      // Blog index
      { loc: `${BASE}/de/blog`, priority: '0.9', changefreq: 'daily', altDe: `${BASE}/de/blog`, altEn: `${BASE}/en/blog` },
      { loc: `${BASE}/en/blog`, priority: '0.8', changefreq: 'daily', altDe: `${BASE}/de/blog`, altEn: `${BASE}/en/blog` },
      // Shop / Pakete
      { loc: `${BASE}/de/pakete`, priority: '0.95', changefreq: 'weekly', altDe: `${BASE}/de/pakete`, altEn: `${BASE}/en/packages` },
      { loc: `${BASE}/en/packages`, priority: '0.9', changefreq: 'weekly', altDe: `${BASE}/de/pakete`, altEn: `${BASE}/en/packages` },
      { loc: `${BASE}/de/pakete/transport-paket-s`, priority: '0.9', changefreq: 'weekly', altDe: `${BASE}/de/pakete/transport-paket-s`, altEn: `${BASE}/en/packages/transport-package-s` },
      { loc: `${BASE}/de/pakete/transport-paket-m`, priority: '0.9', changefreq: 'weekly', altDe: `${BASE}/de/pakete/transport-paket-m`, altEn: `${BASE}/en/packages/transport-package-m` },
      { loc: `${BASE}/de/pakete/transport-paket-l`, priority: '0.9', changefreq: 'weekly', altDe: `${BASE}/de/pakete/transport-paket-l`, altEn: `${BASE}/en/packages/transport-package-l` },
      { loc: `${BASE}/de/pakete/raeumung-paket-s`, priority: '0.9', changefreq: 'weekly', altDe: `${BASE}/de/pakete/raeumung-paket-s`, altEn: `${BASE}/en/packages/clearance-package-s` },
      { loc: `${BASE}/de/pakete/raeumung-paket-m`, priority: '0.9', changefreq: 'weekly', altDe: `${BASE}/de/pakete/raeumung-paket-m`, altEn: `${BASE}/en/packages/clearance-package-m` },
      { loc: `${BASE}/de/pakete/raeumung-paket-l`, priority: '0.9', changefreq: 'weekly', altDe: `${BASE}/de/pakete/raeumung-paket-l`, altEn: `${BASE}/en/packages/clearance-package-l` },
      { loc: `${BASE}/en/packages/transport-package-s`, priority: '0.85', changefreq: 'weekly', altDe: `${BASE}/de/pakete/transport-paket-s`, altEn: `${BASE}/en/packages/transport-package-s` },
      { loc: `${BASE}/en/packages/transport-package-m`, priority: '0.85', changefreq: 'weekly', altDe: `${BASE}/de/pakete/transport-paket-m`, altEn: `${BASE}/en/packages/transport-package-m` },
      { loc: `${BASE}/en/packages/transport-package-l`, priority: '0.85', changefreq: 'weekly', altDe: `${BASE}/de/pakete/transport-paket-l`, altEn: `${BASE}/en/packages/transport-package-l` },
      { loc: `${BASE}/en/packages/clearance-package-s`, priority: '0.85', changefreq: 'weekly', altDe: `${BASE}/de/pakete/raeumung-paket-s`, altEn: `${BASE}/en/packages/clearance-package-s` },
      { loc: `${BASE}/en/packages/clearance-package-m`, priority: '0.85', changefreq: 'weekly', altDe: `${BASE}/de/pakete/raeumung-paket-m`, altEn: `${BASE}/en/packages/clearance-package-m` },
      { loc: `${BASE}/en/packages/clearance-package-l`, priority: '0.85', changefreq: 'weekly', altDe: `${BASE}/de/pakete/raeumung-paket-l`, altEn: `${BASE}/en/packages/clearance-package-l` },
      // Districts overview (DE + EN)
      { loc: `${BASE}/de/bezirke`, priority: '0.85', changefreq: 'monthly', altDe: `${BASE}/de/bezirke`, altEn: `${BASE}/en/districts` },
      { loc: `${BASE}/en/districts`, priority: '0.8', changefreq: 'monthly', altDe: `${BASE}/de/bezirke`, altEn: `${BASE}/en/districts` },
      // Bundeslaender overview (DE + EN)
      { loc: `${BASE}/de/bundeslaender`, priority: '0.85', changefreq: 'monthly', altDe: `${BASE}/de/bundeslaender`, altEn: `${BASE}/en/federal-states` },
      { loc: `${BASE}/en/federal-states`, priority: '0.8', changefreq: 'monthly', altDe: `${BASE}/de/bundeslaender`, altEn: `${BASE}/en/federal-states` },
    ];

    // Vienna district pages (23 districts) — DE + EN
    const districtUrls: SitemapEntry[] = districtSlugs.flatMap((slug) => ([
      {
        loc: `${BASE}/de/bezirke/${slug}`,
        priority: '0.75',
        changefreq: 'monthly',
        altDe: `${BASE}/de/bezirke/${slug}`,
        altEn: `${BASE}/en/districts/${slug}`,
      },
      {
        loc: `${BASE}/en/districts/${slug}`,
        priority: '0.7',
        changefreq: 'monthly',
        altDe: `${BASE}/de/bezirke/${slug}`,
        altEn: `${BASE}/en/districts/${slug}`,
      },
    ]));

    // Austrian state pages (9 states) — DE + EN
    const stateUrls: SitemapEntry[] = stateSlugs.flatMap((slug) => ([
      {
        loc: `${BASE}/de/bundeslaender/${slug}`,
        priority: '0.75',
        changefreq: 'monthly',
        altDe: `${BASE}/de/bundeslaender/${slug}`,
        altEn: `${BASE}/en/federal-states/${slug}`,
      },
      {
        loc: `${BASE}/en/federal-states/${slug}`,
        priority: '0.7',
        changefreq: 'monthly',
        altDe: `${BASE}/de/bundeslaender/${slug}`,
        altEn: `${BASE}/en/federal-states/${slug}`,
      },
    ]));

    // Austrian city pages under states — DE + EN
    const cityUrls: SitemapEntry[] = cityStatePairs.flatMap(({ state, city }) => ([
      {
        loc: `${BASE}/de/bundeslaender/${state}/${city}`,
        priority: '0.7',
        changefreq: 'monthly',
        altDe: `${BASE}/de/bundeslaender/${state}/${city}`,
        altEn: `${BASE}/en/federal-states/${state}/${city}`,
      },
      {
        loc: `${BASE}/en/federal-states/${state}/${city}`,
        priority: '0.65',
        changefreq: 'monthly',
        altDe: `${BASE}/de/bundeslaender/${state}/${city}`,
        altEn: `${BASE}/en/federal-states/${state}/${city}`,
      },
    ]));

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

    const blogEntries: SitemapEntry[] = [
      ...blogUrlsDe.map((loc) => ({ loc, priority: '0.8', changefreq: 'monthly', altDe: loc })),
      ...blogUrlsEn.map((loc) => ({ loc, priority: '0.7', changefreq: 'monthly', altEn: loc })),
    ];

    const allUrls = [...staticUrls, ...districtUrls, ...stateUrls, ...cityUrls, ...blogEntries];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allUrls.map((entry) => `  <url>
    <loc>${entry.loc}</loc>${hreflangTags(entry)}
    <lastmod>${now}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(xml);
  });

  const httpServer = createServer(app);

  return httpServer;
}
