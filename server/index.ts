import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import cron from "node-cron";
import { generateMultipleBlogPosts } from "./openai";
import { storage } from "./storage";

const app = express();

// Remove X-Powered-By header for security and performance
app.disable('x-powered-by');

// Enable gzip/brotli compression for all responses (HIGH PRIORITY - before all middleware)
// This reduces HTML payload by 25-40% and saves 60-90ms transfer time
app.use(compression({
  filter: (req: Request, res: Response) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
  level: 6, // Balance between compression ratio and CPU
  threshold: 1024, // Only compress responses larger than 1KB
}));

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    // Add caching headers for production static files
    app.use((req, res, next) => {
      // Only apply to static files (not API routes)
      if (req.path.startsWith('/api/')) {
        return next();
      }

      // Set cache headers based on file type
      if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)$/)) {
        // Hashed assets - cache for 1 year (immutable)
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        res.setHeader('ETag', `W/"${Date.now()}"`);
      } else if (req.path.endsWith('.html') || req.path === '/' || req.path === '/de' || req.path === '/en') {
        // HTML files - must revalidate (don't cache aggressively)
        res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
      }
      
      // Security headers for all static content
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader('X-XSS-Protection', '1; mode=block');
      
      next();
    });

    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
    // Daily blog auto-generation cron job
    // Runs every day at 22:00 UTC = 00:00 Vienna time (CEST, UTC+2)
    // Generates 3 DE + 2 EN posts with DALL-E 3 images (5 total per day)
    // Each post includes internal links to service pages
    cron.schedule('0 22 * * *', async () => {
      if (!process.env.OPENAI_API_KEY) {
        log('[Cron] Skipping blog generation – OPENAI_API_KEY not set');
        return;
      }
      log('[Cron] Starting nightly blog post generation (3 DE + 2 EN with images + internal links)...');
      try {
        // Generate 3 German posts
        const dePosts = await generateMultipleBlogPosts(3, 'de', undefined, true);
        for (const post of dePosts) {
          await storage.createBlogPost(post);
          log(`[Cron] Saved DE post: "${post.title}" (image: ${post.imageUrl ?? 'none'})`);
        }

        // Small pause between language batches
        await new Promise((r) => setTimeout(r, 2000));

        // Generate 2 English posts
        const enPosts = await generateMultipleBlogPosts(2, 'en', undefined, true);
        for (const post of enPosts) {
          await storage.createBlogPost(post);
          log(`[Cron] Saved EN post: "${post.title}" (image: ${post.imageUrl ?? 'none'})`);
        }

        log(`[Cron] Done: ${dePosts.length} DE + ${enPosts.length} EN posts generated`);
      } catch (err) {
        log(`[Cron] Blog generation failed: ${err}`);
      }
    });
    log('[Cron] Nightly blog generation scheduled at 22:00 UTC = 00:00 Vienna time (3 DE + 2 EN with DALL-E images + internal links)');
  });
})();
