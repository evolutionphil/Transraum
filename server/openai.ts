import OpenAI from 'openai';
import { type InsertBlogPost } from '@shared/schema';

const BLOG_TOPICS_DE = [
  'Transportservice Wien – Preise und Anbietervergleich',
  'Möbeltransport Wien innerhalb von 24 Stunden',
  'Räumung nach Todesfall: Einfühlsam und professionell',
  'Wien Umzug: Halteverbotszone beantragen – So geht es',
  'Altbauwohnungen in Wien räumen – Besonderheiten und Kosten',
  'Sperrmüll Wien: MA48 vs. privater Dienst im Vergleich',
  'Verlassenschaft Österreich: Ablauf des Erbschaftsverfahrens',
  'Kellerräumung Wien: Was tun mit alten Möbeln?',
  'Gold und Schmuck aus Nachlass bewerten lassen',
  'Büroauflösung Wien: DSGVO und IT-Entsorgung',
  'Dachbodenräumung Wien: Versteckte Schätze und ihr Wert',
  'Wien 1. Bezirk Innere Stadt: Transport und Parken',
  'Wohnungsräumung Wien Preisvergleich 2025',
  'Antike Teppiche aus Wien: Wert und Ankauf',
  'Umzugskartons Wien: Kaufen oder kostenlos bekommen?',
  'Entrümpelung bei Messie-Wohnungen Wien',
  'Container mieten Wien – Preise und Anbieter',
  'Garageräumung Wien: Tipps für Oldtimer und Werkzeug',
  'Transport von Kunstwerken in Wien',
  'Nachhaltiges Entrümpeln in Wien: Was wird gespendet?',
];

const BLOG_TOPICS_EN = [
  'Transport Service Vienna: Costs and Provider Comparison',
  'Furniture Transport Vienna: What to Expect',
  'Apartment Clearance Vienna: Step-by-Step Guide',
  'Moving to Vienna: Everything You Need to Know',
  'Estate Clearance in Austria: Legal Requirements',
  'Vienna Districts Guide: Transport Challenges',
  'Antiques in Vienna: How to Get the Best Price',
  'Office Relocation Vienna: Professional and Fast',
  'Bulky Waste Vienna: How to Dispose Properly',
  'Vienna Moving Checklist: The Complete Guide',
];

function getRandomTopic(language: 'de' | 'en', usedTitles: string[]): string {
  const topics = language === 'de' ? BLOG_TOPICS_DE : BLOG_TOPICS_EN;
  const available = topics.filter((t) => !usedTitles.includes(t));
  if (available.length === 0) return topics[Math.floor(Math.random() * topics.length)];
  return available[Math.floor(Math.random() * available.length)];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[äöüÄÖÜ]/g, (c) => ({ ä: 'ae', ö: 'oe', ü: 'ue', Ä: 'Ae', Ö: 'Oe', Ü: 'Ue' }[c] || c))
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.replace(/<[^>]+>/g, '').split(/\s+/).length;
  return Math.max(3, Math.ceil(wordCount / wordsPerMinute));
}

const CATEGORIES_DE = ['Transport', 'Räumung', 'Umzug', 'Entrümpelung', 'Ankauf', 'Sperrmüll', 'Gewerbe', 'Tipps'];
const CATEGORIES_EN = ['Transport', 'Clearance', 'Moving', 'Antiques', 'Tips', 'Commercial'];

export async function generateBlogPost(
  language: 'de' | 'en' = 'de',
  topicHint?: string,
  usedTitles: string[] = [],
): Promise<InsertBlogPost | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.warn('[OpenAI] OPENAI_API_KEY not set – skipping generation');
    return null;
  }

  const openai = new OpenAI({ apiKey });
  const topic = topicHint || getRandomTopic(language, usedTitles);
  const categories = language === 'de' ? CATEGORIES_DE : CATEGORIES_EN;
  const category = categories[Math.floor(Math.random() * categories.length)];
  const today = new Date().toISOString();

  const systemPrompt = language === 'de'
    ? `Du bist ein professioneller SEO-Texter für das österreichische Unternehmen Transraum (Räumung, Transport und Ankauf in Wien und Österreich). 
Schreibe hochwertige, SEO-optimierte Blogartikel auf Deutsch über Transport, Räumung, Umzug und verwandte Themen in Wien/Österreich.
Regeln:
- Verwende NIEMALS das Wort "Entsorgung" – stattdessen "Verwertung", "Räumung", "Abholung" oder "Abtransport"
- Schreibe in einfacher, verständlicher Sprache (kein Fachjargon)
- Zielgruppe: Wiener Privatpersonen und Unternehmen
- Telefonnummer für CTAs: +43 660 6926375
- Firmenname: Transraum`
    : `You are a professional SEO copywriter for Transraum, an Austrian company providing clearance, transport and buying services in Vienna, Austria.
Write high-quality, SEO-optimized blog articles in English about transport, clearance, moving and related topics in Vienna/Austria.
Rules:
- Never use the word "disposal" – use "recycling", "collection", "processing" instead
- Write in simple, clear language
- Target audience: Vienna residents and businesses
- Phone for CTAs: +43 660 6926375
- Company name: Transraum`;

  const userPrompt = language === 'de'
    ? `Schreibe einen detaillierten SEO-Blogartikel über: "${topic}"

Der Artikel muss enthalten:
1. Einen SEO-optimierten Titel (H1)
2. Eine Meta-Description (max 160 Zeichen)
3. Mindestens 800 Wörter Fließtext mit H2- und H3-Überschriften
4. Praktische Tipps und Preisangaben (Wien-spezifisch)
5. Eine FAQ-Sektion mit 3-4 häufigen Fragen
6. Einen Call-to-Action am Ende

Formatiere den Artikel als JSON mit folgenden Feldern:
{
  "title": "Vollständiger Artikel-Titel",
  "metaTitle": "SEO Meta-Titel (max 60 Zeichen)",
  "metaDescription": "Meta-Description (max 160 Zeichen)",
  "excerpt": "Kurze Zusammenfassung (2-3 Sätze)",
  "content": "Vollständiger HTML-Inhalt mit h2, h3, p, ul, ol, strong Tags",
  "category": "${category}",
  "tags": ["tag1", "tag2", "tag3", "tag4"]
}`
    : `Write a detailed SEO blog article about: "${topic}"

The article must include:
1. An SEO-optimized title (H1)
2. A meta description (max 160 characters)
3. At least 800 words with H2 and H3 headings
4. Practical tips and price information (Vienna-specific)
5. A FAQ section with 3-4 common questions
6. A call-to-action at the end

Format as JSON with these fields:
{
  "title": "Full Article Title",
  "metaTitle": "SEO Meta Title (max 60 chars)",
  "metaDescription": "Meta Description (max 160 chars)",
  "excerpt": "Short summary (2-3 sentences)",
  "content": "Full HTML content with h2, h3, p, ul, ol, strong tags",
  "category": "${category}",
  "tags": ["tag1", "tag2", "tag3", "tag4"]
}`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const raw = response.choices[0]?.message?.content;
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    const slug = slugify(parsed.title || topic);

    const post: InsertBlogPost = {
      slug: `${slug}-${Date.now()}`,
      language,
      title: parsed.title || topic,
      metaTitle: parsed.metaTitle || parsed.title || topic,
      metaDescription: parsed.metaDescription || '',
      excerpt: parsed.excerpt || '',
      content: parsed.content || '',
      category: parsed.category || category,
      tags: Array.isArray(parsed.tags) ? parsed.tags : [],
      author: 'Transraum KI-Redaktion',
      publishedAt: today,
      updatedAt: today,
      readingTime: estimateReadingTime(parsed.content || ''),
      featured: false,
    };

    return post;
  } catch (err) {
    console.error('[OpenAI] Blog generation failed:', err);
    return null;
  }
}

export async function generateMultipleBlogPosts(
  count: number = 5,
  language: 'de' | 'en' = 'de',
  topicHint?: string,
): Promise<InsertBlogPost[]> {
  const results: InsertBlogPost[] = [];
  const usedTitles: string[] = [];

  for (let i = 0; i < count; i++) {
    const post = await generateBlogPost(language, topicHint, usedTitles);
    if (post) {
      results.push(post);
      usedTitles.push(post.title);
    }
    // Small delay between requests to avoid rate limits
    if (i < count - 1) await new Promise((r) => setTimeout(r, 1000));
  }

  return results;
}
