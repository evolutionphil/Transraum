import { useQuery } from '@tanstack/react-query';
import { Link, useLocation, useRoute } from 'wouter';
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, Clock, Tag, ChevronRight, Phone, ArrowLeft, Share2, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { BlogPost as BlogPostType } from '@shared/schema';
import { CONTACT_INFO } from '@/lib/constants';
import NotFound from './not-found';

const SERVICES_DE = [
  { label: 'Wohnungsräumung Wien', slug: 'wohnungsraeumung' },
  { label: 'Hausräumung Wien', slug: 'hausraeumung' },
  { label: 'Transportservice Wien', slug: 'transportservice' },
  { label: 'Kellerräumung Wien', slug: 'kellerraeumung' },
  { label: 'Verlassenschaft & Ankauf', slug: 'verlassenschaft-ankauf' },
];

const SERVICES_EN = [
  { label: 'Apartment Clearing Vienna', slug: 'apartment-clearing' },
  { label: 'House Clearing Vienna', slug: 'house-clearing' },
  { label: 'Transport Service Vienna', slug: 'transport-service' },
];

const TRANSLATIONS = {
  de: {
    back: 'Zurück zum Blog',
    by: 'von',
    minRead: 'Min. Lesezeit',
    share: 'Teilen',
    relatedPosts: 'Weitere Artikel',
    ctaTitle: 'Sofort Hilfe benötigt?',
    ctaText: 'Unser Team steht Ihnen für eine kostenlose Beratung zur Verfügung.',
    ctaButton: 'Jetzt anrufen',
    tags: 'Schlagwörter',
    notFound: 'Artikel nicht gefunden',
    notFoundText: 'Dieser Artikel existiert nicht oder wurde verschoben.',
    loading: 'Artikel wird geladen...',
    ourServices: 'Unsere Leistungen',
  },
  en: {
    back: 'Back to Blog',
    by: 'by',
    minRead: 'min read',
    share: 'Share',
    relatedPosts: 'More Articles',
    ctaTitle: 'Need immediate help?',
    ctaText: 'Our team is available for a free consultation.',
    ctaButton: 'Call Now',
    tags: 'Tags',
    notFound: 'Article not found',
    notFoundText: 'This article does not exist or has been moved.',
    loading: 'Loading article...',
    ourServices: 'Our Services',
  },
};

function ArticleSchema({ post, lang }: { post: BlogPostType; lang: string }) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    author: {
      '@type': 'Organization',
      name: 'Transraum',
      url: 'https://transraum.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Transraum',
      logo: {
        '@type': 'ImageObject',
        url: 'https://transraum.com/logo.png',
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://transraum.com/${lang}/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
    inLanguage: lang === 'de' ? 'de-AT' : 'en',
  };

  if (post.imageUrl) {
    schema.image = {
      '@type': 'ImageObject',
      url: post.imageUrl.startsWith('http') ? post.imageUrl : `https://transraum.com${post.imageUrl}`,
      width: 1792,
      height: 1024,
    };
  }

  useEffect(() => {
    const existing = document.querySelectorAll('script[data-blog-schema]');
    existing.forEach((el) => el.remove());
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-blog-schema', 'true');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, [post.slug]);

  return null;
}

function FAQSchema({ post }: { post: BlogPostType }) {
  const faqItems: Array<{ question: string; answer: string }> = [];
  try {
    const faqSectionMatch = post.content.match(/<h2[^>]*>[^<]*([Ff][Aa][Qq]|[Ff]ragen|[Ff]requently)[^<]*<\/h2>([\s\S]*?)(?=<h2|$)/i);
    if (faqSectionMatch) {
      const faqSection = faqSectionMatch[2];
      const qaRegex = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
      let m;
      while ((m = qaRegex.exec(faqSection)) !== null && faqItems.length < 5) {
        const question = m[1].replace(/<[^>]+>/g, '').trim();
        const answer = m[2].replace(/<[^>]+>/g, '').trim();
        if (question && answer) faqItems.push({ question, answer });
      }
    }
  } catch (_) {}

  if (faqItems.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  useEffect(() => {
    const existing = document.querySelectorAll('script[data-blog-faq]');
    existing.forEach((el) => el.remove());
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-blog-faq', 'true');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, [post.slug]);

  return null;
}

function BreadcrumbSchema({ post, lang }: { post: BlogPostType; lang: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: lang === 'de' ? 'Startseite' : 'Home', item: `https://transraum.com/${lang}` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `https://transraum.com/${lang}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://transraum.com/${lang}/blog/${post.slug}` },
    ],
  };

  useEffect(() => {
    const existing = document.querySelectorAll('script[data-blog-breadcrumb]');
    existing.forEach((el) => el.remove());
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-blog-breadcrumb', 'true');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, [post.slug]);

  return null;
}

export default function BlogPost() {
  const [location] = useLocation();
  const lang = location.startsWith('/en') ? 'en' : 'de';
  const t = TRANSLATIONS[lang];

  // Match slug from URL
  const [matchDe, paramsDe] = useRoute('/de/blog/:slug');
  const [matchEn, paramsEn] = useRoute('/en/blog/:slug');
  const [matchBase] = useRoute('/blog/:slug');
  const slug = paramsDe?.slug ?? paramsEn?.slug ?? (matchBase ? location.split('/blog/')[1] : undefined);

  const { data, isLoading, isError } = useQuery<{ success: boolean; post: BlogPostType }>({
    queryKey: ['/api/blog', slug, lang],
    queryFn: async () => {
      const res = await fetch(`/api/blog/${slug}?language=${lang}`);
      return res.json();
    },
    enabled: !!slug,
  });

  const { data: relatedData } = useQuery<{ success: boolean; posts: BlogPostType[] }>({
    queryKey: ['/api/blog', 'related', lang, data?.post?.category],
    queryFn: async () => {
      const res = await fetch(`/api/blog?language=${lang}&category=${data?.post?.category}`);
      return res.json();
    },
    enabled: !!data?.post?.category,
  });

  const post = data?.post;
  const relatedPosts = (relatedData?.posts ?? []).filter((p) => p.slug !== slug).slice(0, 3);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center text-muted-foreground" data-testid="text-loading">{t.loading}</div>
        </main>
        <Footer />
      </>
    );
  }

  if (isError || !post) {
    return <NotFound />;
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    lang === 'de' ? 'de-AT' : 'en-GB',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  const blogListUrl = lang === 'de' ? '/de/blog' : '/en/blog';

  return (
    <>
      <title>{post.metaTitle}</title>
      <meta name="description" content={post.metaDescription} />
      <link rel="canonical" href={`https://transraum.com/${lang}/blog/${post.slug}`} />
      <link rel="alternate" hrefLang="de" href={`https://transraum.com/de/blog/${post.slug}`} />
      <link rel="alternate" hrefLang="en" href={`https://transraum.com/en/blog/${post.slug}`} />
      <link rel="alternate" hrefLang="x-default" href={`https://transraum.com/de/blog/${post.slug}`} />
      <meta property="og:title" content={post.metaTitle} />
      <meta property="og:description" content={post.metaDescription} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`https://transraum.com/${lang}/blog/${post.slug}`} />
      <meta property="og:site_name" content="Transraum" />
      {post.imageUrl && (
        <meta property="og:image" content={post.imageUrl.startsWith('http') ? post.imageUrl : `https://transraum.com${post.imageUrl}`} />
      )}
      <meta property="article:published_time" content={post.publishedAt} />
      <meta property="article:modified_time" content={post.updatedAt} />
      <meta property="article:section" content={post.category} />
      <meta property="article:tag" content={post.tags.join(', ')} />
      <meta name="robots" content="index, follow" />

      <ArticleSchema post={post} lang={lang} />
      <BreadcrumbSchema post={post} lang={lang} />
      <FAQSchema post={post} />

      <Header />

      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b py-3">
          <div className="container mx-auto px-4 max-w-4xl">
            <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Link href={`/${lang}`} className="hover:text-foreground transition-colors" data-testid="link-breadcrumb-home">
                {lang === 'de' ? 'Startseite' : 'Home'}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href={blogListUrl} className="hover:text-foreground transition-colors" data-testid="link-breadcrumb-blog">
                Blog
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground font-medium truncate max-w-xs" data-testid="text-breadcrumb-post">{post.title}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-4xl py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Article */}
            <article className="lg:col-span-2" data-testid="article-content">
              {/* Back button */}
              <Link href={blogListUrl} data-testid="link-back-to-blog">
                <Button variant="ghost" size="sm" className="mb-6 -ml-2">
                  <ArrowLeft className="w-4 h-4 mr-1.5" />
                  {t.back}
                </Button>
              </Link>

              {/* Category & metadata */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="secondary" data-testid="badge-category">{post.category}</Badge>
                {post.featured && (
                  <Badge variant="default" data-testid="badge-featured">
                    {lang === 'de' ? 'Empfohlen' : 'Featured'}
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4" data-testid="heading-post-title">
                {post.title}
              </h1>

              {/* Metadata row */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b">
                <span className="flex items-center gap-1.5" data-testid="text-post-date">
                  <Calendar className="w-4 h-4" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1.5" data-testid="text-post-reading-time">
                  <Clock className="w-4 h-4" />
                  {post.readingTime} {t.minRead}
                </span>
                <span data-testid="text-post-author">
                  {t.by} {post.author}
                </span>
                <button
                  onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
                  className="flex items-center gap-1.5 hover:text-foreground transition-colors ml-auto"
                  data-testid="button-share"
                >
                  <Share2 className="w-4 h-4" />
                  {t.share}
                </button>
              </div>

              {/* Hero Image */}
              {post.imageUrl && (
                <div className="mb-8 rounded-md overflow-hidden" data-testid="div-hero-image">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-auto max-h-80 object-cover"
                    loading="eager"
                    width={1792}
                    height={1024}
                    data-testid="img-hero"
                  />
                </div>
              )}

              {/* Article Content */}
              <div
                className="prose prose-neutral dark:prose-invert max-w-none
                  prose-headings:font-bold prose-headings:text-foreground
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                  prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                  prose-li:mb-2 prose-li:leading-relaxed
                  prose-strong:text-foreground
                  prose-table:border-collapse prose-td:border prose-td:border-border prose-td:p-2 prose-th:border prose-th:border-border prose-th:p-2 prose-th:bg-muted"
                dangerouslySetInnerHTML={{ __html: post.content }}
                data-testid="div-article-content"
              />

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-10 pt-8 border-t">
                  <div className="flex flex-wrap items-center gap-2" data-testid="list-tags">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground mr-1">{t.tags}:</span>
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" data-testid={`tag-${tag}`}>{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6" data-testid="aside-sidebar">
              {/* CTA Card */}
              <div className="bg-primary/10 border border-primary/20 rounded-md p-6 sticky top-24" data-testid="card-sidebar-cta">
                <h3 className="font-bold text-foreground mb-2" data-testid="text-sidebar-cta-title">{t.ctaTitle}</h3>
                <p className="text-sm text-muted-foreground mb-4" data-testid="text-sidebar-cta-body">{t.ctaText}</p>
                <a href={`tel:${CONTACT_INFO.phoneLink}`} className="block" data-testid="link-sidebar-phone">
                  <Button className="w-full" data-testid="button-sidebar-call">
                    <Phone className="w-4 h-4 mr-2" />
                    {t.ctaButton}
                  </Button>
                </a>
                <p className="text-center text-sm text-muted-foreground mt-3 font-medium" data-testid="text-sidebar-phone">
                  {CONTACT_INFO.phone}
                </p>
              </div>

              {/* Our Services Links */}
              <div className="bg-card border rounded-md p-6" data-testid="card-services-links">
                <h3 className="font-bold text-foreground mb-4" data-testid="heading-services">{t.ourServices}</h3>
                <ul className="space-y-2">
                  {(lang === 'de' ? SERVICES_DE : SERVICES_EN).map((svc) => (
                    <li key={svc.slug}>
                      <Link
                        href={lang === 'de' ? `/de/leistungen/${svc.slug}` : `/en/services/${svc.slug}`}
                        className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary transition-colors group py-1"
                        data-testid={`link-service-${svc.slug}`}
                      >
                        <span>{svc.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-card border rounded-md p-6" data-testid="card-related-posts">
                  <h3 className="font-bold text-foreground mb-4" data-testid="heading-related">{t.relatedPosts}</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((related) => (
                      <Link key={related.id} href={`/${lang}/blog/${related.slug}`} data-testid={`link-related-${related.id}`}>
                        <div className="group cursor-pointer">
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug mb-1">
                            {related.title}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {related.readingTime} min
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
