import { useQuery } from '@tanstack/react-query';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, Clock, Tag, ArrowRight, BookOpen, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { BlogPost } from '@shared/schema';
import { CONTACT_INFO } from '@/lib/constants';

const TRANSLATIONS = {
  de: {
    title: 'Blog & Ratgeber',
    subtitle: 'Tipps, Infos und Wissenswertes rund um Transport, Räumung und Umzug in Wien',
    all: 'Alle Artikel',
    featured: 'Empfohlen',
    readMore: 'Weiterlesen',
    minRead: 'Min. Lesezeit',
    noPostsFound: 'Keine Artikel gefunden.',
    categories: {
      Transport: 'Transport',
      Räumung: 'Räumung',
      Umzug: 'Umzug',
      Entrümpelung: 'Entrümpelung',
      Ankauf: 'Ankauf',
      Sperrmüll: 'Sperrmüll',
      Gewerbe: 'Gewerbe',
      Tipps: 'Tipps',
    },
    ctaTitle: 'Kostenlose Beratung gewünscht?',
    ctaText: 'Rufen Sie uns an – wir helfen Ihnen sofort weiter!',
    ctaButton: 'Jetzt anrufen',
    metaTitle: 'Blog & Ratgeber – Transport und Räumung Wien | Transraum',
    metaDescription: 'Nützliche Tipps, Preisinfos und Ratgeber rund um Transport, Räumung und Umzug in Wien. Expertenwissen von Transraum.',
  },
  en: {
    title: 'Blog & Guide',
    subtitle: 'Tips, information and everything you need to know about transport, clearance and moving in Vienna',
    all: 'All Articles',
    featured: 'Featured',
    readMore: 'Read More',
    minRead: 'min read',
    noPostsFound: 'No articles found.',
    categories: {
      Transport: 'Transport',
      Clearance: 'Clearance',
      Moving: 'Moving',
      Antiques: 'Antiques',
      Tips: 'Tips',
      Commercial: 'Commercial',
    },
    ctaTitle: 'Want a free consultation?',
    ctaText: 'Call us now – we are happy to help!',
    ctaButton: 'Call Now',
    metaTitle: 'Blog & Guide – Transport and Clearance Vienna | Transraum',
    metaDescription: 'Useful tips, price info and guides about transport, clearance and moving in Vienna. Expert knowledge from Transraum.',
  },
};

function BlogCard({ post, lang }: { post: BlogPost; lang: 'de' | 'en' }) {
  const t = TRANSLATIONS[lang];
  const postUrl = lang === 'de' ? `/de/blog/${post.slug}` : `/en/blog/${post.slug}`;
  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    lang === 'de' ? 'de-AT' : 'en-GB',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <article
      className="bg-card rounded-md border flex flex-col hover-elevate transition-all"
      data-testid={`blog-card-${post.id}`}
    >
      <div className="p-6 flex flex-col flex-1 gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" data-testid={`badge-category-${post.id}`}>
            {post.category}
          </Badge>
          {post.featured && (
            <Badge variant="default" data-testid={`badge-featured-${post.id}`}>
              {t.featured}
            </Badge>
          )}
        </div>

        <Link href={postUrl}>
          <h2
            className="text-xl font-bold text-foreground leading-snug hover:text-primary cursor-pointer transition-colors"
            data-testid={`heading-post-${post.id}`}
          >
            {post.title}
          </h2>
        </Link>

        <p className="text-muted-foreground text-sm leading-relaxed flex-1" data-testid={`text-excerpt-${post.id}`}>
          {post.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5" data-testid={`text-date-${post.id}`}>
            <Calendar className="w-3.5 h-3.5" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1.5" data-testid={`text-reading-time-${post.id}`}>
            <Clock className="w-3.5 h-3.5" />
            {post.readingTime} {t.minRead}
          </span>
        </div>

        <Link href={postUrl}>
          <Button variant="outline" size="sm" className="w-full mt-2" data-testid={`link-read-more-${post.id}`}>
            {t.readMore}
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </Link>
      </div>
    </article>
  );
}

export default function Blog() {
  const [location] = useLocation();
  const { language } = useLanguage();
  const lang = location.startsWith('/en') ? 'en' : 'de';
  const t = TRANSLATIONS[lang];

  const { data, isLoading } = useQuery<{ success: boolean; posts: BlogPost[]; total: number }>({
    queryKey: ['/api/blog', lang],
    queryFn: async () => {
      const res = await fetch(`/api/blog?language=${lang}`);
      return res.json();
    },
  });

  const posts = data?.posts ?? [];
  const featuredPosts = posts.filter((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  const categories = Array.from(new Set(posts.map((p) => p.category)));

  return (
    <>
      {/* SEO Meta */}
      <title>{t.metaTitle}</title>
      <meta name="description" content={t.metaDescription} />
      <link rel="canonical" href={`https://flaechenfrei.at/${lang}/blog`} />
      <meta property="og:title" content={t.metaTitle} />
      <meta property="og:description" content={t.metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="robots" content="index, follow" />

      <Header />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-muted/40 border-b py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href={`/${lang}`} className="hover:text-foreground transition-colors" data-testid="link-breadcrumb-home">
                {lang === 'de' ? 'Startseite' : 'Home'}
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground font-medium" data-testid="text-breadcrumb-blog">Blog</span>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-7 h-7 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="heading-blog-title">
                {t.title}
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl" data-testid="text-blog-subtitle">
              {t.subtitle}
            </p>
          </div>
        </section>

        {/* Category filter chips */}
        {categories.length > 0 && (
          <section className="border-b bg-background sticky top-16 z-40">
            <div className="container mx-auto px-4 max-w-5xl py-3">
              <div className="flex flex-wrap gap-2" data-testid="list-category-filters">
                <Badge variant="default" className="cursor-pointer" data-testid="filter-all">{t.all}</Badge>
                {categories.map((cat) => (
                  <Badge key={cat} variant="outline" className="cursor-pointer hover-elevate" data-testid={`filter-${cat}`}>
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="container mx-auto px-4 max-w-5xl py-10 md:py-14">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-muted/40 rounded-md h-64 animate-pulse" data-testid={`skeleton-${i}`} />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <p className="text-center text-muted-foreground py-16" data-testid="text-no-posts">{t.noPostsFound}</p>
          ) : (
            <>
              {/* Featured posts */}
              {featuredPosts.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2" data-testid="heading-featured">
                    <Tag className="w-4 h-4 text-primary" />
                    {t.featured}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredPosts.map((post) => (
                      <BlogCard key={post.id} post={post} lang={lang} />
                    ))}
                  </div>
                </section>
              )}

              {/* All other posts */}
              {regularPosts.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold text-foreground mb-6" data-testid="heading-all-articles">
                    {t.all}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularPosts.map((post) => (
                      <BlogCard key={post.id} post={post} lang={lang} />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          {/* CTA Box */}
          <div className="mt-16 bg-primary/10 border border-primary/20 rounded-md p-8 text-center" data-testid="section-cta">
            <h3 className="text-xl font-bold text-foreground mb-2" data-testid="text-cta-title">{t.ctaTitle}</h3>
            <p className="text-muted-foreground mb-6" data-testid="text-cta-subtitle">{t.ctaText}</p>
            <a href={`tel:${CONTACT_INFO.phoneLink}`} data-testid="link-cta-phone">
              <Button size="lg" data-testid="button-cta-call">
                {t.ctaButton}: {CONTACT_INFO.phone}
              </Button>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
