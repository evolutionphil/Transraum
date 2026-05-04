import OpenAI from 'openai';
import { type InsertBlogPost } from '@shared/schema';
import fs from 'fs';
import path from 'path';

// ============================================================
// 100 AUSTRIAN LOCATION-SPECIFIC BLOG TOPICS
// Covering all 9 Bundesländer + major cities + Vienna districts
// ============================================================

export const BLOG_TOPICS_DE: string[] = [
  // Wien – Bezirke (alle 23)
  'Transportservice Wien 2025: Preise, Ablauf und Spartipps',
  'Möbeltransport Wien – Kosten, Anbieter und Vorbereitung',
  'Kellerräumung Wien: Was kostet sie wirklich? Preise 2025',
  'Wohnungsräumung Wien 1. Bezirk – Innere Stadt: Tipps & Kosten',
  'Hausräumung Wien 10. Bezirk Favoriten – Ablauf & Preise',
  'Transport Wien 22. Bezirk Donaustadt: Anbieter & Tipps',
  'Entrümpelung Wien 2. Bezirk Leopoldstadt – professionell',
  'Wohnungsräumung Wien 21. Bezirk Floridsdorf',
  'Transport Wien 13. Bezirk Hietzing – Möbel & Sperrgut',
  'Haushaltsauflösung Wien 3. Bezirk Landstraße',
  'Möbeltransport Wien 8. Bezirk Josefstadt',
  'Wohnungsräumung Wien 12. Bezirk Meidling: Kosten & Tipps',
  'Entrümpelung Wien 16. Bezirk Ottakring – günstig & schnell',
  'Transport Wien 4. Bezirk Wieden – Ablauf & Festpreis',
  'Dachbodenräumung Wien: Verborgene Schätze und Kosten 2025',
  'Altbauwohnung räumen Wien – Stiegenhäuser und enge Zugänge',
  'Garageräumung Wien – Oldtimer, Werkzeug und Sperrgut',
  'Sperrmüllabholung Wien – Privater Dienst vs. MA48',
  'Büroauflösung Wien – DSGVO-konform und schnell',
  'Firmenumzug Wien – Büroübersiedlung professionell planen',
  'Wien Umzug Halteverbotszone beantragen: Schritt für Schritt',
  'Antiquitäten Transport Wien – sicher und versichert',
  'Kleintransport Wien – sofort verfügbar ab 1 Gegenstand',
  'Nachlassräumung Wien – Wohnung nach Todesfall räumen',
  'Wohnungsräumung Wien 5. Bezirk Margareten – Tipps 2025',
  'Transport Wien 6. Bezirk Mariahilf – Möbel & Umzug',
  'Hausräumung Wien 7. Bezirk Neubau – Kosten & Ablauf',
  'Entrümpelung Wien 9. Bezirk Alsergrund – professionell',
  'Transport Wien 11. Bezirk Simmering – günstig & schnell',
  'Wohnungsräumung Wien 14. Bezirk Penzing: Preise 2025',
  'Hausräumung Wien 15. Bezirk Rudolfsheim – Ablauf & Kosten',
  'Transport Wien 17. Bezirk Hernals – Möbel & Sperrgut',
  'Entrümpelung Wien 18. Bezirk Währing – Anbieter & Tipps',
  'Wohnungsräumung Wien 19. Bezirk Döbling – Villen & Wohnungen',
  'Transport Wien 20. Bezirk Brigittenau – Kosten & Festpreis',
  'Hausräumung Wien 23. Bezirk Liesing – günstig & seriös',
  // Wien – Spezielle Themen
  'Nachlassankauf Wien – Möbel und Hausrat aufkaufen',
  'Wohnungsauflösung Wien bei Umzug ins Pflegeheim',
  'Kellerräumung Wien Gemeindebau – Ablauf & Kosten',
  'Dachbodenräumung Wien Altbau – Was darf man wegschmeißen?',
  'Möbeltransport Wien Innenhof – Spezielle Herausforderungen',
  'Haushaltsauflösung Wien nach Scheidung – diskret & schnell',
  'Sperrmüll Wien Bestellung online – Schritt für Schritt',
  'Transraum Wien Bewertungen – Erfahrungsberichte 2025',
  // Niederösterreich – ausführlich
  'Transportservice Niederösterreich – Alle Regionen & Preise',
  'Hausräumung Mödling und Umgebung: Kosten & Tipps',
  'Möbeltransport Klosterneuburg – professionell & günstig',
  'Kellerräumung Baden bei Wien – Ablauf & Preise 2025',
  'Wohnungsräumung Wiener Neustadt – Anbieter & Kosten',
  'Transport St. Pölten – Niederösterreich Landeshauptstadt',
  'Haushaltsauflösung Krems an der Donau – Ablauf & Tipps',
  'Entrümpelung Tulln und Bezirk: Was kostet die Räumung?',
  'Transport Stockerau – günstig und schnell',
  'Haushaltsauflösung Schwechat – Nähe Flughafen Wien',
  'Entrümpelung Korneuburg – Nördliches Niederösterreich',
  'Transport Mistelbach – Weinviertel Region',
  'Nachlassräumung Niederösterreich – Erbschaft & Abholung',
  'Umzug Wien nach Niederösterreich – Tipps & Festpreise',
  'Wohnungsräumung Amstetten – Mostviertel Niederösterreich',
  'Transport Hollabrunn – Weinviertel: günstig & zuverlässig',
  'Hausräumung Bruck an der Leitha – Kosten 2025',
  'Möbeltransport Gänserndorf – schnell & sicher',
  'Entrümpelung Lilienfeld – Mostviertel Niederösterreich',
  // Steiermark / Graz
  'Umzugsservice Graz – Steiermark professionell umziehen',
  'Haushaltsauflösung Graz – Kosten und Ablauf 2025',
  'Transport Graz – Möbel & Sperrgut in der Steiermark',
  'Kellerräumung Graz Innenstadt – günstig & seriös',
  'Wohnungsräumung Graz Umgebung – Anbieter & Kosten',
  'Transport Leoben – Steiermark: Möbel & Hausrat',
  'Hausräumung Kapfenberg – Mürz-Mur Region',
  'Entrümpelung Weiz und Umgebung – Oststeiermark',
  // Oberösterreich / Linz
  'Hausräumung Linz – Oberösterreich: Ablauf & Kosten',
  'Möbeltransport Wels und Umgebung – Oberösterreich',
  'Kellerräumung Steyr – Oberösterreich: Preise 2025',
  'Wohnungsräumung Vöcklabruck – Salzkammergut Region',
  'Transport Gmunden – Oberösterreich: Möbel & Hausrat',
  'Haushaltsauflösung Ried im Innkreis – Innviertel',
  // Salzburg
  'Wohnungsräumung Salzburg Stadt – Kosten & Anbieter',
  'Transport Salzburg – Möbel und Räumungsservice',
  'Hausräumung Hallein – Tennengau Salzburg: Tipps',
  'Möbeltransport Salzburg Umgebung – günstig & professionell',
  // Tirol / Innsbruck
  'Transport Innsbruck – Tirol: Umzug & Räumung',
  'Wohnungsräumung Innsbruck – Kosten & Anbieter 2025',
  'Hausräumung Kufstein – Tirol: professionell & günstig',
  'Transport Wörgl – Tiroler Unterland: Möbel & Sperrgut',
  // Kärnten
  'Haushaltsauflösung Klagenfurt – Kärnten professionell',
  'Kellerräumung Villach – günstig und zuverlässig',
  'Wohnungsräumung Spittal an der Drau – Kärnten',
  'Transport Wolfsberg – Lavanttal Kärnten: Räumung',
  // Vorarlberg / Burgenland
  'Transport Bregenz – Vorarlberg: Möbel & Entrümpelung',
  'Wohnungsräumung Eisenstadt – Burgenland: Tipps & Kosten',
  'Hausräumung Dornbirn – Vorarlberg: professionell',
  'Transport Oberwart – Südburgenland: Räumung & Umzug',
  // Branchenthemen
  'Haushaltsauflösung Kosten: Was kostet was in Österreich?',
  'Räumungsunternehmen Wien vergleichen – worauf achten?',
  'Festpreis oder Stundenpreis? Transport Wien im Vergleich',
  'Nachlassankauf Österreich – Möbel, Schmuck, Antiquitäten',
  'Verlassenschaft Abwicklung Wien – Transraum hilft',
  'Umzugskosten Wien 2025 – Komplette Preisübersicht',
  'Sperrmüll loswerden Wien – 5 günstige Möglichkeiten',
  'Möbel spenden Wien – Caritas, Vinzirast & Co.',
  'Entrümpelung Kosten Österreich 2025 – Preistabelle',
  'Haushaltsauflösung Checkliste – Schritt für Schritt',
];

export const BLOG_TOPICS_EN: string[] = [
  // Vienna – All 23 Districts
  'Transport Service Vienna 2025: Prices, Process & Tips',
  'Furniture Transport Vienna: Costs and What to Expect',
  'Basement Clearance Vienna: Real Costs Revealed 2025',
  'Apartment Clearance Vienna 1st District Innere Stadt',
  'House Clearance Vienna 10th District Favoriten',
  'Moving Service Vienna 22nd District Donaustadt',
  'Clearance Vienna 2nd District Leopoldstadt: Professional Guide',
  'Apartment Clearance Vienna 21st District Floridsdorf',
  'Transport Vienna 13th District Hietzing: Furniture & Bulky Items',
  'Estate Clearance Vienna 3rd District Landstrasse',
  'Moving Vienna 8th District Josefstadt',
  'Apartment Clearance Vienna 12th District Meidling',
  'Clearance Vienna 16th District Ottakring: Fast & Affordable',
  'Transport Vienna 4th District Wieden: Fixed Price Service',
  'Attic Clearance Vienna: Hidden Treasures & Costs 2025',
  'Clearing a Vienna Old Building Apartment: What to Know',
  'Garage Clearance Vienna: Classic Cars, Tools & Bulky Items',
  'Bulky Waste Vienna: Private Service vs. MA48 Comparison',
  'Office Clearance Vienna: GDPR-Compliant & Professional',
  'Corporate Relocation Vienna: Office Move Planning Guide',
  'Vienna Moving Permit Halteverbotszone: Step-by-Step Guide',
  'Antiques Transport Vienna: Safe & Insured Service',
  'Small Transport Vienna: Available Immediately from 1 Item',
  'Estate Clearance Vienna: Clearing an Apartment After Death',
  'Apartment Clearance Vienna 5th District Margareten',
  'Transport Vienna 6th District Mariahilf: Moving & Furniture',
  'House Clearance Vienna 7th District Neubau: Costs 2025',
  'Clearance Vienna 9th District Alsergrund: Professional',
  'Transport Vienna 11th District Simmering: Fast & Affordable',
  'Apartment Clearance Vienna 14th District Penzing',
  'House Clearance Vienna 15th District Rudolfsheim',
  'Transport Vienna 17th District Hernals: Furniture & Bulky Items',
  'Clearance Vienna 18th District Währing: Providers & Costs',
  'Apartment Clearance Vienna 19th District Döbling: Villas',
  'Transport Vienna 20th District Brigittenau: Fixed Price',
  'House Clearance Vienna 23rd District Liesing: Affordable',
  // Vienna – Special Topics
  'Estate Buyout Vienna: Buying Furniture and Household Goods',
  'Apartment Clearance Vienna Nursing Home Move: Guide 2025',
  'Basement Clearance Vienna Social Housing: Process & Costs',
  'Attic Clearance Vienna Old Building: What Can You Throw Away?',
  'Moving Vienna Courtyard Access: Special Challenges',
  'Apartment Clearance Vienna After Divorce: Discreet & Fast',
  'Bulky Waste Vienna Online Booking: Step-by-Step',
  'Transraum Vienna Reviews: Customer Experiences 2025',
  // Lower Austria
  'Transport Service Lower Austria: All Regions & Prices',
  'House Clearance Mödling and Surroundings: Costs & Tips',
  'Furniture Transport Klosterneuburg: Professional & Affordable',
  'Basement Clearance Baden bei Wien: Process & Costs 2025',
  'Apartment Clearance Wiener Neustadt: Providers & Costs',
  'Transport St Pölten Lower Austria Capital City',
  'Estate Clearance Krems an der Donau: Process & Tips',
  'Clearance Tulln District: What Does the Service Cost?',
  'Transport Stockerau: Fast & Affordable Service',
  'Estate Clearance Schwechat Near Vienna Airport',
  'Clearance Korneuburg Northern Lower Austria',
  'Transport Mistelbach Weinviertel Wine Region',
  'Estate Clearance Lower Austria: Inheritance & Collection',
  'Moving from Vienna to Lower Austria: Tips & Fixed Prices',
  'Apartment Clearance Amstetten Mostviertel',
  'Transport Hollabrunn Weinviertel: Affordable & Reliable',
  'House Clearance Bruck an der Leitha: Costs 2025',
  'Furniture Transport Gänserndorf: Fast & Safe',
  // Styria / Graz
  'Moving Service Graz Styria: Professional Relocation Guide',
  'Estate Clearance Graz: Costs and Process 2025',
  'Transport Graz: Furniture & Bulky Items in Styria',
  'Basement Clearance Graz City Centre: Affordable Service',
  'Apartment Clearance Graz Surroundings: Providers & Costs',
  'Transport Leoben Styria: Furniture & Household Items',
  'House Clearance Kapfenberg Mürz-Mur Region',
  'Clearance Weiz and Surroundings: East Styria',
  // Upper Austria / Linz
  'House Clearance Linz Upper Austria: Process & Costs',
  'Furniture Transport Wels and Surroundings Upper Austria',
  'Basement Clearance Steyr Upper Austria: Prices 2025',
  'Apartment Clearance Vöcklabruck Salzkammergut',
  'Transport Gmunden Upper Austria: Furniture & Household',
  'Estate Clearance Ried im Innkreis Innviertel',
  // Salzburg
  'Apartment Clearance Salzburg City: Costs & Providers',
  'Transport Salzburg: Furniture & Clearance Service',
  'House Clearance Hallein Tennengau Salzburg',
  'Furniture Transport Salzburg Surroundings: Affordable',
  // Tyrol / Innsbruck
  'Transport Innsbruck Tyrol: Moving & Clearance Service',
  'Apartment Clearance Innsbruck: Costs & Providers 2025',
  'House Clearance Kufstein Tyrol: Professional & Affordable',
  'Transport Wörgl Tyrolean Lowlands: Furniture & Bulky Items',
  // Carinthia
  'Estate Clearance Klagenfurt Carinthia: Professional Service',
  'Basement Clearance Villach: Fast & Reliable',
  'Apartment Clearance Spittal an der Drau Carinthia',
  'Transport Wolfsberg Lavanttal Carinthia: Clearance',
  // Vorarlberg / Burgenland
  'Transport Bregenz Vorarlberg: Furniture & Clearance',
  'Apartment Clearance Eisenstadt Burgenland: Tips & Costs',
  'House Clearance Dornbirn Vorarlberg: Professional',
  'Transport Oberwart South Burgenland: Moving & Clearance',
  // Industry Topics
  'Household Clearance Costs Austria: Complete Price Guide',
  'Comparing Clearance Companies Vienna: What to Look For',
  'Fixed Price vs Hourly Rate: Transport Vienna Compared',
  'Estate Buyout Austria: Furniture, Jewellery, Antiques',
  'Moving Costs Vienna 2025: Complete Price Overview',
  'Getting Rid of Bulky Waste Vienna: 5 Affordable Options',
  'Donating Furniture Vienna: Caritas, Vinzirast & More',
  'Clearance Costs Austria 2025: Price Table by Service',
  'Household Clearance Checklist: Step by Step Guide',
];

// ============================================================
// CATEGORY MAPPING (keyword-based)
// ============================================================
function detectCategory(title: string, language: 'de' | 'en'): string {
  const t = title.toLowerCase();
  if (language === 'de') {
    if (t.includes('transport') || t.includes('möbeltransport') || t.includes('kleintransport')) return 'Transport';
    if (t.includes('umzug') || t.includes('übersiedlung') || t.includes('firmenumzug')) return 'Umzug';
    if (t.includes('büroauflösung') || t.includes('firmen') || t.includes('gewerbe')) return 'Gewerbe';
    if (t.includes('keller') || t.includes('dachboden') || t.includes('garage') || t.includes('sperrmüll')) return 'Räumung';
    if (t.includes('ankauf') || t.includes('antiquitäten') || t.includes('nachlassankauf')) return 'Ankauf';
    if (t.includes('entrümpel')) return 'Entrümpelung';
    return 'Räumung';
  } else {
    if (t.includes('transport') || t.includes('furniture transport')) return 'Transport';
    if (t.includes('moving') || t.includes('relocation')) return 'Moving';
    if (t.includes('office') || t.includes('corporate') || t.includes('commercial')) return 'Commercial';
    if (t.includes('basement') || t.includes('garage') || t.includes('attic') || t.includes('bulky')) return 'Clearance';
    if (t.includes('antique') || t.includes('estate liquidation')) return 'Antiques';
    return 'Clearance';
  }
}

// ============================================================
// DALL-E IMAGE GENERATION PROMPT (topic-based)
// ============================================================
function buildImagePrompt(title: string, language: 'de' | 'en'): string {
  const t = title.toLowerCase();
  let scene = '';

  if (t.includes('keller') || t.includes('basement')) {
    scene = 'professional workers clearing a basement storage room in a Viennese apartment building, moving cardboard boxes and old furniture, organized and efficient, bright overhead lighting';
  } else if (t.includes('dachboden') || t.includes('attic')) {
    scene = 'workers clearing an attic space in a historic Austrian building, daylight coming through the skylight, boxes and old furniture being moved professionally';
  } else if (t.includes('büro') || t.includes('office') || t.includes('firmen') || t.includes('corporate')) {
    scene = 'professional movers in uniforms relocating office furniture and equipment in a modern Vienna office building, organized and efficient';
  } else if (t.includes('möbeltransport') || t.includes('furniture transport')) {
    scene = 'professional movers carefully wrapping and carrying furniture through a classic Viennese apartment staircase, yellow moving blankets, team of two workers';
  } else if (t.includes('garage')) {
    scene = 'workers organizing and clearing a garage, tools and boxes being sorted, clean and systematic approach, bright workshop lighting';
  } else if (t.includes('antiquitäten') || t.includes('antique')) {
    scene = 'professional handlers carefully transporting antique furniture wrapped in protective blankets, white gloves, historic Vienna building background';
  } else if (t.includes('umzug') || t.includes('moving') || t.includes('übersiedlung')) {
    scene = 'professional moving truck parked on a classic Vienna street with historic architecture, team loading furniture efficiently, sunny day';
  } else if (t.includes('graz') || t.includes('steiermark') || t.includes('styria')) {
    scene = 'professional transport service team with moving truck in front of Graz city architecture, Schlossberg hill in background, sunny day';
  } else if (t.includes('salzburg')) {
    scene = 'professional movers with white moving truck in Salzburg, fortress Hohensalzburg visible in background, clear alpine sky';
  } else if (t.includes('innsbruck') || t.includes('tirol') || t.includes('tyrol')) {
    scene = 'professional moving service in Innsbruck, Austrian Alps visible in background, team of movers loading furniture into truck';
  } else if (t.includes('linz') || t.includes('oberösterreich') || t.includes('upper austria')) {
    scene = 'professional transport team with truck in Linz, Danube river and modern architecture in background, organized move';
  } else if (t.includes('kleintr') || t.includes('small transport')) {
    scene = 'small professional transport van in Vienna street, one or two items being loaded carefully, sunny day, professional appearance';
  } else {
    // Default: Vienna clearance/transport
    scene = 'professional clearance and transport team in front of a classic Viennese Gründerzeit building, moving truck visible, workers in uniform, golden hour lighting, photorealistic';
  }

  return `${scene}. No text, no watermarks, no logos. Professional photography style, high quality, 16:9 composition, bright and clean.`;
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[äöüÄÖÜ]/g, (c) => ({ ä: 'ae', ö: 'oe', ü: 'ue', Ä: 'Ae', Ö: 'Oe', Ü: 'Ue' }[c] || c))
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .trim();
}

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.replace(/<[^>]+>/g, '').split(/\s+/).length;
  return Math.max(4, Math.ceil(wordCount / wordsPerMinute));
}

function getRandomTopic(language: 'de' | 'en', usedTitles: string[]): string {
  const topics = language === 'de' ? BLOG_TOPICS_DE : BLOG_TOPICS_EN;
  const available = topics.filter((t) => !usedTitles.includes(t));
  if (available.length === 0) {
    // All used — pick random
    return topics[Math.floor(Math.random() * topics.length)];
  }
  return available[Math.floor(Math.random() * available.length)];
}

function getBlogImagesDir(): string {
  const dir = path.resolve(process.cwd(), 'client', 'public', 'blog-images');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}

async function downloadImage(url: string, filePath: string): Promise<boolean> {
  try {
    const res = await fetch(url);
    if (!res.ok) return false;
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));
    return true;
  } catch {
    return false;
  }
}

// ============================================================
// IMAGE GENERATION (DALL-E 3)
// ============================================================
async function generateBlogImage(
  openai: OpenAI,
  slug: string,
  title: string,
  language: 'de' | 'en',
): Promise<string | undefined> {
  try {
    const imagePrompt = buildImagePrompt(title, language);
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: imagePrompt,
      n: 1,
      size: '1792x1024',
      quality: 'standard',
    });

    const tempUrl = response.data[0]?.url;
    if (!tempUrl) return undefined;

    const fileName = `${slug}.png`;
    const filePath = path.join(getBlogImagesDir(), fileName);
    const saved = await downloadImage(tempUrl, filePath);

    if (saved) {
      return `/blog-images/${fileName}`;
    }
    return undefined;
  } catch (err) {
    console.warn('[OpenAI] Image generation failed:', err instanceof Error ? err.message : err);
    return undefined;
  }
}

// ============================================================
// INTERNAL LINKS – used in prompts so GPT embeds real hrefs
// ============================================================
const INTERNAL_LINKS_DE = `
INTERNE LINKS – verwende diese echten URLs als HTML-Ankerlinks <a href="..."> im Artikel:
• Wohnungsräumung → <a href="/de/leistungen/wohnungsraeumung">Wohnungsräumung Wien</a>
• Hausräumung → <a href="/de/leistungen/hausraeumung">Hausräumung Wien</a>
• Transportservice → <a href="/de/leistungen/transportservice">Transportservice Wien</a>
• Kellerräumung → <a href="/de/leistungen/kellerraeumung">Kellerräumung Wien</a>
• Entrümpelung → <a href="/de/leistungen/entruempeln">Entrümpelung Wien</a>
• Verlassenschaft & Ankauf → <a href="/de/leistungen/verlassenschaft-ankauf">Verlassenschaft Ankauf</a>
• Haushaltsauflösung → <a href="/de/leistungen/haushaltsaufloesung">Haushaltsauflösung Wien</a>
• Umzug → <a href="/de/leistungen/umzug">Umzug Wien</a>
• Büroräumung → <a href="/de/leistungen/bueroraeumung">Büroräumung Wien</a>
• Sperrgut → <a href="/de/leistungen/sperrgut">Sperrgut Abholung Wien</a>
• Blog → <a href="/de/blog">Transraum Blog</a>
• Kontakt → <a href="/de/kontakt">Kontakt Transraum</a>

REGEL: Baue mindestens 4 dieser internen Links natürlich in den Fließtext ein (nicht alle auf einmal am Ende!). Jeder Link muss kontextbezogen stehen.`;

const INTERNAL_LINKS_EN = `
INTERNAL LINKS – use these real URLs as HTML anchor links <a href="..."> inside the article:
• Apartment Clearing → <a href="/en/services/apartment-clearing">Apartment Clearing Vienna</a>
• House Clearing → <a href="/en/services/house-clearing">House Clearing Vienna</a>
• Transport Service → <a href="/en/services/transport-service">Transport Service Vienna</a>
• Basement Clearing → <a href="/en/services/basement-clearing">Basement Clearing Vienna</a>
• Decluttering → <a href="/en/services/decluttering">Decluttering Vienna</a>
• Estate Clearance → <a href="/en/services/estate-clearance">Estate Clearance Vienna</a>
• Household Clearance → <a href="/en/services/household-clearance">Household Clearance Vienna</a>
• Moving → <a href="/en/services/moving">Moving Vienna</a>
• Office Clearing → <a href="/en/services/office-clearing">Office Clearing Vienna</a>
• Bulky Waste → <a href="/en/services/bulky-waste">Bulky Waste Collection Vienna</a>
• Blog → <a href="/en/blog">Transraum Blog</a>
• Contact → <a href="/en/contact">Contact Transraum</a>

RULE: Embed at least 4 of these internal links naturally within the body text (not all at the end!). Each link must appear in context.`;

// ============================================================
// MASTER BLOG GENERATION PROMPTS (Elite SEO Quality)
// ============================================================
function buildSystemPrompt(language: 'de' | 'en'): string {
  if (language === 'de') {
    return `Du bist ein österreichischer SEO-Experte und Texter für Transraum – ein professionelles Unternehmen für Transport, Räumung, Haushaltsauflösung und Ankauf in Wien und ganz Österreich (Golden Trend Armaturen GmbH, Gewerbeparkstraße 21/23, 2231 Strasshof an der Nordbahn).

ABSOLUT VERBOTENE WÖRTER: "Entsorgung", "entsorgen" → Stattdessen: "Verwertung", "Abtransport", "Abholung", "Räumung"

DEINE AUFGABE:
- Erstelle einen SEO-optimierten Artikel mit MINDESTENS 1200 Wörtern
- Lokale Keywords natürlich einbauen (Stadtname, Bezirk, Region)
- Konkrete Preisangaben in Euro (Wien-/Österreich-spezifisch)
- Vertrauenssignale einbauen: 26+ Jahre Erfahrung, kostenlose Besichtigung, Festpreisgarantie
- Handlungsaufforderung: Telefon +43 660 6926375 oder WhatsApp

CONTENT-STRUKTUR (verpflichtend):
1. Starke Einleitung mit Hauptkeyword im ersten Satz
2. Mindestens 4 H2-Abschnitte
3. H3-Unterabschnitte wo sinnvoll
4. Preistabelle oder Preisliste
5. Schritt-für-Schritt Ablauf
6. FAQ-Sektion mit 4-5 Fragen (wichtig für Featured Snippets!)
7. CTA am Ende

SEO-REGELN:
- Hauptkeyword im Titel, ersten 100 Wörtern, und 2-3x im Text
- LSI-Keywords: Wien, Österreich, professionell, günstig, kostenlos, Angebot, Termin
- Mindestens 4 interne Links aus der unten stehenden Liste natürlich einbauen
- Keine Keyword-Stuffing

${INTERNAL_LINKS_DE}`;
  } else {
    return `You are an Austrian SEO expert and copywriter for Transraum – a professional transport, clearance, estate liquidation and buying service in Vienna and throughout Austria (Golden Trend Armaturen GmbH, Gewerbeparkstraße 21/23, 2231 Strasshof an der Nordbahn).

FORBIDDEN WORDS: "disposal", "disposing" → Use instead: "collection", "clearance", "recycling", "processing"

YOUR TASK:
- Create an SEO-optimized article with AT LEAST 1200 words
- Naturally integrate local keywords (city name, district, region)
- Include specific prices in Euro (Vienna/Austria-specific)
- Build trust signals: 26+ years experience, free consultation, fixed price guarantee
- Call-to-action: Phone +43 660 6926375 or WhatsApp

CONTENT STRUCTURE (mandatory):
1. Strong introduction with main keyword in the first sentence
2. At least 4 H2 sections
3. H3 subsections where appropriate
4. Price table or price list
5. Step-by-step process
6. FAQ section with 4-5 questions (important for Featured Snippets!)
7. CTA at the end

SEO RULES:
- Main keyword in title, first 100 words, and 2-3 times in text
- LSI Keywords: Vienna, Austria, professional, affordable, free, quote, appointment
- Embed at least 4 internal links from the list below naturally in the text
- No keyword stuffing

${INTERNAL_LINKS_EN}`;
  }
}

function buildUserPrompt(topic: string, language: 'de' | 'en', category: string): string {
  const today = new Date().toLocaleDateString(language === 'de' ? 'de-AT' : 'en-GB', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  if (language === 'de') {
    return `Schreibe einen langen, detaillierten SEO-Blogartikel über: "${topic}"
Kategorie: ${category} | Datum: ${today}

PFLICHTINHALT – schreibe JEDEN dieser Abschnitte vollständig aus (mind. 150 Wörter pro Abschnitt):
1. Einleitung (Warum ist das Thema wichtig, wen betrifft es?)
2. Aktuelle Preise & Kosten 2025 (konkrete Euro-Beträge, Tabelle!)
3. Ablauf Schritt für Schritt (mind. 5 Schritte)
4. Was beeinflusst den Preis? (mind. 4 Faktoren mit je eigenem <h3>)
5. Tipps zum Sparen / Worauf achten? (mind. 5 Tipps)
6. Transraum Vorteile (26 Jahre Erfahrung, Festpreis, kostenlose Besichtigung)
7. Häufige Fragen – FAQ (genau 4 Fragen mit ausführlichen Antworten)
8. Fazit & CTA (Telefon +43 660 6926375)

INTERNE LINKS PFLICHT: Baue mindestens 4 der folgenden <a href="...">-Links natürlich in den Fließtext ein:
- <a href="/de/leistungen/wohnungsraeumung">Wohnungsräumung Wien</a>
- <a href="/de/leistungen/hausraeumung">Hausräumung Wien</a>
- <a href="/de/leistungen/transportservice">Transportservice Wien</a>
- <a href="/de/leistungen/kellerraeumung">Kellerräumung Wien</a>
- <a href="/de/leistungen/entruempeln">Entrümpelung Wien</a>
- <a href="/de/leistungen/verlassenschaft-ankauf">Verlassenschaft Ankauf</a>
- <a href="/de/leistungen/haushaltsaufloesung">Haushaltsauflösung Wien</a>
- <a href="/de/leistungen/umzug">Umzug Wien</a>
- <a href="/de/leistungen/bueroraeumung">Büroräumung Wien</a>
- <a href="/de/leistungen/sperrgut">Sperrgut Abholung Wien</a>

GESAMT: mindestens 900 Wörter im "content" Feld!

JSON-Format (NUR JSON, kein Text davor/danach):
{
  "title": "SEO-Titel (55-65 Zeichen, Hauptkeyword vorne)",
  "metaTitle": "Google-Titel (max. 60 Zeichen) | Transraum",
  "metaDescription": "150-160 Zeichen mit Keyword + Preis + CTA, z.B. 'ab X€'",
  "excerpt": "Neugierig machender Einstieg (2 Sätze, max. 180 Zeichen)",
  "content": "<h2>...</h2><p>... mindestens 900 Wörter HTML mit internen <a href>-Links ...</p><h2>Häufige Fragen</h2><h3>Frage 1?</h3><p>Antwort 1</p>...",
  "tags": ["Keyword Wien", "Keyword Österreich", "Preis", "Kosten", "Anbieter"]
}`;
  } else {
    return `Write a long, detailed SEO blog article about: "${topic}"
Category: ${category} | Date: ${today}

MANDATORY SECTIONS – write each section fully (min. 150 words each):
1. Introduction (Why is this important? Who needs it?)
2. Current Prices & Costs 2025 (concrete Euro amounts, table!)
3. Step-by-Step Process (at least 5 steps)
4. What Affects the Price? (at least 4 factors with individual <h3> headings)
5. Money-Saving Tips / What to Watch Out For (at least 5 tips)
6. Why Choose Transraum (26 years experience, fixed price, free consultation)
7. Frequently Asked Questions – FAQ (exactly 4 questions with detailed answers)
8. Conclusion & CTA (phone +43 660 6926375)

INTERNAL LINKS REQUIRED: Embed at least 4 of these <a href="..."> links naturally in the body text:
- <a href="/en/services/apartment-clearing">Apartment Clearing Vienna</a>
- <a href="/en/services/house-clearing">House Clearing Vienna</a>
- <a href="/en/services/transport-service">Transport Service Vienna</a>
- <a href="/en/services/basement-clearing">Basement Clearing Vienna</a>
- <a href="/en/services/decluttering">Decluttering Vienna</a>
- <a href="/en/services/estate-clearance">Estate Clearance Vienna</a>
- <a href="/en/services/household-clearance">Household Clearance Vienna</a>
- <a href="/en/services/moving">Moving Vienna</a>
- <a href="/en/services/office-clearing">Office Clearing Vienna</a>
- <a href="/en/services/bulky-waste">Bulky Waste Collection Vienna</a>

TOTAL: at least 900 words in the "content" field!

JSON format (ONLY JSON, no text before/after):
{
  "title": "SEO title (55-65 chars, main keyword first)",
  "metaTitle": "Google title (max. 60 chars) | Transraum",
  "metaDescription": "150-160 chars with keyword + price + CTA, e.g. 'from €X'",
  "excerpt": "Curiosity-inducing intro (2 sentences, max. 180 chars)",
  "content": "<h2>...</h2><p>... at least 900 words of HTML with internal <a href> links ...</p><h2>Frequently Asked Questions</h2><h3>Question 1?</h3><p>Answer 1</p>...",
  "tags": ["Keyword Vienna", "Keyword Austria", "Price", "Costs", "Provider"]
}`;
  }
}

// ============================================================
// MAIN GENERATION FUNCTION
// ============================================================
export async function generateBlogPost(
  language: 'de' | 'en' = 'de',
  topicHint?: string,
  usedTitles: string[] = [],
  generateImage: boolean = true,
): Promise<InsertBlogPost | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.warn('[OpenAI] OPENAI_API_KEY not set – skipping generation');
    return null;
  }

  const openai = new OpenAI({ apiKey });
  const topic = topicHint || getRandomTopic(language, usedTitles);
  const category = detectCategory(topic, language);
  const today = new Date().toISOString();

  const systemPrompt = buildSystemPrompt(language);
  const userPrompt = buildUserPrompt(topic, language, category);

  try {
    console.log(`[OpenAI] Generating post: "${topic}" (${language})`);

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 6000,
      response_format: { type: 'json_object' },
    });

    const raw = response.choices[0]?.message?.content;
    if (!raw) return null;

    let parsed: any;
    try {
      parsed = JSON.parse(raw);
    } catch {
      console.error('[OpenAI] JSON parse failed:', raw.slice(0, 200));
      return null;
    }

    const title = parsed.title || topic;
    const baseSlug = slugify(title);
    const slug = `${baseSlug}-${Date.now()}`;

    // Build the post first (without image)
    const post: InsertBlogPost = {
      slug,
      language,
      title,
      metaTitle: parsed.metaTitle || `${title} | Transraum`,
      metaDescription: parsed.metaDescription || '',
      excerpt: parsed.excerpt || '',
      content: parsed.content || '',
      category,
      tags: Array.isArray(parsed.tags) ? parsed.tags.slice(0, 6) : [],
      author: language === 'de' ? 'Transraum Redaktion' : 'Transraum Editorial Team',
      publishedAt: today,
      updatedAt: today,
      readingTime: estimateReadingTime(parsed.content || ''),
      featured: false,
      imageUrl: undefined,
    };

    // Generate image (DALL-E 3)
    if (generateImage) {
      const imageUrl = await generateBlogImage(openai, slug, title, language);
      if (imageUrl) {
        post.imageUrl = imageUrl;
        console.log(`[OpenAI] Image saved: ${imageUrl}`);
      }
    }

    return post;
  } catch (err) {
    console.error('[OpenAI] Blog generation failed:', err instanceof Error ? err.message : err);
    return null;
  }
}

// ============================================================
// SHOP PRODUCT IMAGE GENERATION
// ============================================================
export async function generateShopProductImage(
  prompt: string,
  filename: string,
): Promise<string | null> {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    console.log(`[Shop] Generating image for: ${filename}`);
    const imageResponse = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `${prompt}. High quality commercial photography style, professional, clean background, photorealistic.`,
      n: 1,
      size: '1792x1024',
      quality: 'hd',
      response_format: 'b64_json',
    });

    const b64 = imageResponse.data[0]?.b64_json;
    if (!b64) return null;

    const imageBuffer = Buffer.from(b64, 'base64');
    const dir = path.join(process.cwd(), 'client', 'public', 'shop-images');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const filePath = path.join(dir, filename);
    fs.writeFileSync(filePath, imageBuffer);
    const publicUrl = `/shop-images/${filename}`;
    console.log(`[Shop] Image saved: ${publicUrl}`);
    return publicUrl;
  } catch (err) {
    console.error(`[Shop] Image generation failed for ${filename}:`, err);
    return null;
  }
}

// ============================================================
// BATCH GENERATION
// ============================================================
export async function generateMultipleBlogPosts(
  count: number = 5,
  language: 'de' | 'en' = 'de',
  topicHint?: string,
  generateImages: boolean = true,
  existingTitles: string[] = [],
): Promise<InsertBlogPost[]> {
  const results: InsertBlogPost[] = [];
  const usedTitles: string[] = [...existingTitles];

  for (let i = 0; i < count; i++) {
    console.log(`[OpenAI] Generating post ${i + 1}/${count} (${language})...`);
    const post = await generateBlogPost(language, topicHint, usedTitles, generateImages);
    if (post) {
      results.push(post);
      usedTitles.push(post.title);
      console.log(`[OpenAI] Post ${i + 1} done: "${post.title}"`);
    }
    // Delay to avoid rate limits
    if (i < count - 1) await new Promise((r) => setTimeout(r, 1500));
  }

  return results;
}
