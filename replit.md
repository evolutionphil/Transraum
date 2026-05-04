# Transraum - Vienna Transport & Clearance Website

## Overview
Transraum (Golden Trend Armaturen GmbH) is a bilingual (German/English) marketing website for professional transport, clearance and removal services in Vienna, Austria. Domain: **transraum.com**. It aims to showcase various services across Vienna's districts, featuring service listings, district-specific information, customer testimonials, and contact details. The project's ambition is to be a modern single-page application with server-side rendering, targeting the local Vienna market.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework:** React 18 with TypeScript.
- **Build:** Vite for development and bundling.
- **Routing:** Wouter for client-side routing.
- **UI:** Shadcn UI (New York style) built on Radix UI, styled with Tailwind CSS (utility-first approach with custom design tokens).
- **State Management:** TanStack Query for server state, React Context API for i18n (language switching), local storage for preferences.
- **Styling:** Tailwind CSS, Google Fonts (Inter, Open Sans), responsive mobile-first design.

### Backend
- **Server:** Express.js with Node.js (ES modules) and TypeScript.
- **API:** RESTful API with JSON format.
- **Development:** Vite middleware for HMR, custom logging, Replit-specific plugins.

### Data Storage
- **Database:** PostgreSQL via Neon serverless driver.
- **ORM:** Drizzle ORM with Drizzle-Zod for type-safe operations and validation.
- **Pattern:** Repository pattern with `IStorage` interface, supporting in-memory and database storage.
- **Models:** Users table with UUIDs, shared schema definitions (`shared/schema.ts`).

### Internationalization (i18n)
- **Languages:** German (primary) and English.
- **Implementation:** URL-based language detection (`/de/*`, `/en/*`), server-side redirects, custom `LanguageContext` for translations.
- **SEO:** Canonical URLs, hreflang tags, language-specific meta tags, translated service slugs.

### Content Architecture
- **Service Data:** Multilingual service data (12 services), canonical `ServiceId` enum, language-specific slugs and content.
- **District Data:** Static data for Vienna's 23 districts, including landmarks and service areas, optimized for SEO.
- **Legal & Information Pages:** Four bilingual static pages (Datenschutz/Privacy Policy, Impressum/Imprint, AGB/Terms, FAQ) for compliance and customer information. These pages feature extensive static text directly within components and are SEO-optimized with proper meta and hreflang tags.

### Asset Management
- **Images:** Generated images stored locally, accessed via Vite alias `@assets`.
- **Static Assets:** Favicon and other files from the public directory.
- **Fonts:** Google Fonts loaded via CDN.

### SEO Implementation
- **Structured Data (JSON-LD):** Multi-schema management using `data-schema-group` attributes for Homepage (LocalBusiness + Organization), Service pages (Service + FAQ), District pages (LocalBusiness + FAQ), and Breadcrumbs.
- **Schema Factories:** Utility functions (`getLocalBusinessSchema`, `getOrganizationSchema`, `getFAQSchema`, `getBreadcrumbSchema`) for generating structured data.
- **SEO Components:** Breadcrumbs, TrustStats (statistics), TrustBadges (USPs) for enhanced visibility.

## External Dependencies

### Core Frameworks
- React 18
- Express.js
- Vite
- TypeScript

### Database & ORM
- @neondatabase/serverless (PostgreSQL driver)
- Drizzle ORM
- drizzle-kit
- connect-pg-simple (PostgreSQL session store)

### UI Component Libraries & Styling
- @radix-ui/* (for accessible components)
- Tailwind CSS
- class-variance-authority
- tailwind-merge, clsx
- lucide-react (icons)

### Form Handling & Validation
- react-hook-form
- @hookform/resolvers
- zod
- drizzle-zod

### Data Fetching & State
- @tanstack/react-query

### Routing
- wouter

### UI Utilities
- date-fns
- embla-carousel-react
- cmdk
- nanoid

### Development Tools
- tsx
- esbuild
- @vitejs/plugin-react
- @replit/ plugins
- autoprefixer, postcss

### Font Integration
- Google Fonts (Inter, Open Sans, DM Sans, Fira Code, Geist Mono, Architects Daughter)

## Deployment & Automation

### Railway.app Configuration (Production Ready)
- **Platform:** Railway.app with automatic SSL/HTTPS
- **Configuration:** `railway.json` with build/start commands
- **Storage:** In-memory storage (no database needed for production)
- **Build:** `npm run build` (Vite production build)
- **Start:** `npm start` (Express server serving static files)
- **Domain:** `flaechenfrei.at` (configured in Railway)

### IndexNow Integration (Automatic)
- **Protocol:** IndexNow for instant search engine notification
- **Key:** `436053f3c8c7406799a1cea417ed8a4a` (stored in `client/public/`)
- **Endpoints:** 
  - `/api/indexnow/submit-sitemap` - Submits all 120+ URLs
  - `/api/indexnow/submit-url` - Submits single URL
  - `/436053f3c8c7406799a1cea417ed8a4a.txt` - Key verification file
- **Search Engines:** Bing, Yandex, DuckDuckGo (automatic propagation)
- **robots.txt:** Updated with IndexNow reference

### GitHub Actions Workflows (Fully Automated)

#### 1. Deploy to IndexNow (Automatic on Push)
- **Trigger:** After Railway deployment completes
- **Flow:** 
  1. Waits 60s for Railway deployment
  2. Verifies website is live (5 retries)
  3. Submits 120+ URLs to IndexNow
  4. Verifies IndexNow key file accessibility
- **Success Criteria (Strict):** 
  - ✅ Green = URLs successfully submitted to search engines
  - ❌ Red = URLs NOT submitted (requires retry)
- **Status Tracking:** Environment variables track submission status
- **Error Types:**
  - `failed_temporary` - IndexNow API down (retry manually or wait for daily check)
  - `failed_config` - Configuration issue (fix required)

#### 2. Health Check & Auto-Submit (Daily)
- **Schedule:** Daily at 08:00 UTC
- **Flow:**
  1. Checks website availability
  2. On success: Triggers IndexNow submission workflow
- **Purpose:** Automatic retry mechanism for temporary IndexNow failures

### Branding & Design Updates
- **Logo:** Custom yellow banner logo (HSL 46,100%,50%) at 112px height
- **File:** `client/public/logo.png` (458KB PNG)
- **Header:** Responsive design with reduced padding
- **Hero:** Reduced mobile padding (py-8) to compensate for larger header
- **Colors:** Yellow primary (#F5C518), professional dark theme

### Recent Changes

#### Session: November 19, 2025 - Complete Terminology Cleanup
- **CRITICAL Business Requirement:** Remove all "Entsorgung" (disposal) terminology - company does NOT offer disposal services
- **Service Renamed:** SPERRMULLENTSORGUNG → SPERRMULLABHOLUNG (bulky waste disposal → bulky waste collection)
- **German Replacements:** "Entsorgung" → "Verwertung"/"Räumung"/"Abholung" (recycling/clearing/collection)
- **English Replacements:** "disposal"/"dispose" → "recycling"/"collection"/"processing"
- **URLs Updated:** 
  - DE: `/leistungen/sperrmullentsorgung` → `/leistungen/sperrmullabholung`
  - EN: `/services/bulky-waste-disposal` → `/services/bulky-waste-collection`
- **Files Changed:** 10+ files including services.ts, states.ts, districts.ts, AGB.tsx, FAQ.tsx, index.html, i18n.ts, SEOContent.tsx, sitemap.xml, indexnow.ts
- **Verification:** grep count = 0 for forbidden terms (excluding image filenames), E2E tests confirm all user-visible content cleaned
- **SEO Preserved:** 1175 words static content, 8 H2 tags, optimized meta tags all intact

#### Session: November 16, 2025 - Railway Deployment Fix
- **Critical Fix:** Added `nixpacks.toml` to fix Railway deployment failure (Node.js 20+ for `import.meta.dirname`)
- **IndexNow Workflow:** Strict success criteria, status reporting, error handling

#### Session: April 2026 - Blog System + SEO Improvements

**Blog System (Complete):**
- **`shared/schema.ts`:** Added `BlogPost` interface, `InsertBlogPost` type, `blogGenerateSchema`
- **`server/storage.ts`:** Added full blog CRUD methods to `IStorage` + `MemStorage`; pre-seeded 10 SEO-optimized articles
- **`server/openai.ts`:** New file — OpenAI GPT-4o-mini blog generation service; 20 topic pool; `generateBlogPost()` + `generateMultipleBlogPosts()`
- **`server/routes.ts`:** Added blog API endpoints: `GET /api/blog`, `GET /api/blog/:slug`, `POST /api/blog/generate`
- **`server/index.ts`:** Added node-cron daily job at 07:00 UTC — generates 5 German blog posts/day (requires `OPENAI_API_KEY`)
- **`client/src/pages/Blog.tsx`:** Blog list page at `/de/blog` — featured section, category filters, SEO meta, breadcrumbs
- **`client/src/pages/BlogPost.tsx`:** Blog detail page at `/de/blog/:slug` — Article + BreadcrumbList JSON-LD, sidebar CTA, related posts
- **`client/src/App.tsx`:** Added routes: `/de/blog`, `/de/blog/:slug`, `/en/blog`, `/en/blog/:slug`, `/blog`, `/blog/:slug`
- **`client/src/lib/i18n.ts`:** Added `nav.blog: 'Blog'` to both DE and EN
- **`client/src/components/Header.tsx`:** Blog link added to navItems

**10 Seed Blog Articles (German, SEO-optimized):**
1. Transportservice Wien: Preise, Ablauf & Tipps für 2025
2. Möbeltransport Wien: So klappt der Umzug sicher und günstig
3. Haushaltsauflösung Wien: Kosten, Ablauf und wichtige Tipps
4. Wohnungsräumung Wien: Schritt-für-Schritt-Anleitung 2025
5. Kellerräumung Wien: Kosten, Ablauf und die besten Tipps
6. Sperrmüll Wien: Abholung, Kosten und wichtige Regeln
7. Entrümpelung Wien: Preise, Checkliste & was Sie wissen sollten
8. Umzug Wien: Die ultimative Checkliste für einen stressfreien Umzug
9. Büroauflösung Wien: Professionell, schnell und diskret
10. Antike Möbel & Erbstücke in Wien verkaufen: Was sind sie wert?
11. Dachbodenräumung Wien: Kosten, Ablauf und häufige Herausforderungen

**SEO Improvements:**
- **`client/src/lib/seo.ts`:** Corrected address (Gewerbeparkstraße 21/23, 2231 Strasshof), removed email from all schemas, expanded opening hours (Mo-Fr 8-20, Sa-So 8-18), updated sameAs URLs, added `availableChannel`, improved `potentialAction`
- **Packages installed:** `openai`, `node-cron`, `@types/node-cron` (already had `@tailwindcss/typography`)

**To activate AI auto-generation:** Add `OPENAI_API_KEY` to environment secrets

#### Session: April 2026 - Design & UX Improvements

**Hero Image Fix:**
- Replaced "Vienna Pristine Clean" branded cleaning team image with proper transport/moving image (`Moving_service_Vienna_8eeb3795.png`) showing professional movers in Viennese architecture
- Replaced emoji trust indicators (🕒💼⚡💰) with Lucide icons (Clock, Briefcase, Zap, BadgeCheck) per design guidelines

**Blog Improvements:**
- **Category filters now functional** — clicking a category badge filters posts; clicking "Alle Artikel" resets filter
- **Pagination added** — 9 posts per page with Previous/Next + numbered page buttons
- **"Featured" badge fixed** — was showing English "Featured" on German pages; now shows "Empfohlen" when `lang === 'de'`
- **Service sidebar links added** to BlogPost — "Unsere Leistungen" block in sidebar with links to Wohnungsräumung, Hausräumung, Transportservice, Kellerräumung, Verlassenschaft

**SEO: Sitemap updated** — Added `/de/blog`, `/en/blog`, and all 11 seed blog post URLs to `sitemap.xml` with `changefreq: daily` for blog index

**Contact page: Google Maps embed** — Added "Unser Standort" section with iframe embed for Gewerbeparkstraße 21/23, 2231 Strasshof an der Nordbahn + "In Google Maps öffnen" button

**Footer improvements:**
- Added "Blog & Ratgeber" link with BookOpen icon to services section
- Added "Blog" link with icon to bottom copyright bar

#### Session: April 2026 - Brand Rename + Transport Service Page

- **Brand Rename:** "Flächen Frei" → "Transraum" across ALL files (constants.ts, seo.ts, i18n.ts, index.html, all pages, components, data files — 0 remaining occurrences)
- **Logo:** PNG logo replaced with CSS text-based "TRANSRAUM" yellow banner in Header.tsx — header height reduced from h-32 to h-16
- **Transport Service Page:** Added `ServiceId.TRANSPORTSERVICE` with full DE/EN content (name, shortDescription, description, metaDescription, benefits, process, pricing, FAQ) — URL: `/de/leistungen/transportservice`
- **Footer Fix:** Transport link now correctly points to `/de/leistungen/transportservice` (or `/en/services/transport-service`)
- **ServicePage Image Map:** TRANSPORTSERVICE mapped to movingTruckImage

#### Session: April 2026 - Contact Strategy & Company Identity Update
- **Phone Number:** +43 660 3957587 → +43 660 6926375 (120+ locations updated)
- **Company Identity:** Impressum — Golden Trend Armaturen GmbH / Flächen Frei, Gewerbeparkstraße 21/23, 2231 Strasshof an der Nordbahn, FN 61715m
- **Email Removal (Complete):** No email in CONTACT_INFO, no email buttons/CTAs, no email in JSON-LD schemas, no email in any page
- **Phone-First CTAs:** All email buttons replaced with Phone/WhatsApp across all pages
- **FloatingActions Global:** Moved to App.tsx — active on ALL pages, no per-page duplicates
- **Contact Page:** Rewritten with only Phone card + WhatsApp card — no form, no email
- **i18n Cleanup:** Removed megaradio/esimfo projects from both DE/EN translations
- **Footer Cleanup:** Removed megaradio/esimfo project links

### Key Business Rules
- NO "Entsorgung/disposal" terminology anywhere — use Entrümpelung/Räumung/Verwertung/Abholung
- Phone-first contact strategy — maximize Phone and WhatsApp CTAs
- CONTACT_INFO has NO email or emailLink fields — any reference will cause TypeScript error
- FloatingActions is GLOBAL in App.tsx — do NOT add it to individual pages

## Important Files

### Configuration
- `railway.json` - Railway deployment configuration
- `nixpacks.toml` - **CRITICAL:** Node.js 20+ specification (fixes import.meta.dirname error)
- `package.json` - Build scripts and dependencies
- `.github/workflows/deploy-indexnow.yml` - Automatic deployment workflow
- `.github/workflows/health-check.yml` - Daily monitoring
- `RAILWAY_DEPLOYMENT_GUIDE.md` - Deployment instructions
- `FINAL_DEPLOYMENT_CHECKLIST.md` - Complete deployment checklist

### IndexNow Files
- `server/indexnow.ts` - IndexNow implementation
- `server/routes.ts` - API routes including IndexNow endpoints
- `client/public/436053f3c8c7406799a1cea417ed8a4a.txt` - Key verification file
- `client/public/robots.txt` - Updated with IndexNow reference
- `client/public/sitemap.xml` - 120+ priority URLs

### Branding
- `client/public/logo.png` - Yellow banner logo (112px)
- `client/src/components/Header.tsx` - Header with responsive logo
- `client/src/components/Hero.tsx` - Hero section with optimized padding