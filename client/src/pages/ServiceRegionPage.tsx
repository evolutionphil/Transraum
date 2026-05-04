import { useEffect, useState } from 'react';
import { useRoute, useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import Breadcrumbs from '@/components/Breadcrumbs';
import { updateMetaTags, addMultipleJsonLd, getWebPageSchema, getBreadcrumbSchema } from '@/lib/seo';
import { getAlternateUrls } from '@/lib/urlMapping';
import { generateServiceLocationContent, getServiceLocationPath, type RegionType } from '@/lib/serviceLocationContent';
import { servicesData, ServiceId } from '@/data/services';
import { getDistrictBySlug } from '@/data/districts';
import { states } from '@/data/states';
import { getCityBySlug } from '@/data/cities';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Phone, MapPin, Star, Clock } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CONTACT_INFO } from '@/lib/constants';

export default function ServiceRegionPage() {
  const { language } = useLanguage();
  const [location] = useLocation();
  const [matchBase, paramsBase] = useRoute(
    language === 'de' 
      ? '/leistungen/:serviceSlug/:regionType/:regionSlug'
      : '/en/services/:serviceSlug/:regionType/:regionSlug'
  );
  const [matchDe2, paramsDe2] = useRoute('/de/leistungen/:serviceSlug/:regionType/:regionSlug');
  const params = matchBase ? paramsBase : (language === 'de' && matchDe2 ? paramsDe2 : null);

  const [content, setContent] = useState<ReturnType<typeof generateServiceLocationContent>>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params) {
      setLoading(false);
      return;
    }

    const { serviceSlug, regionType, regionSlug } = params as { 
      serviceSlug: string; 
      regionType: string; 
      regionSlug: string;
    };

    // Map region type from URL to internal type
    const regionTypeMap: Record<string, RegionType> = {
      'bezirk': 'bezirk',
      'district': 'bezirk',
      'bundesland': 'bundesland',
      'federal-state': 'bundesland',
      'stadt': 'stadt',
      'city': 'stadt',
    };

    const mappedRegionType = regionTypeMap[regionType];
    if (!mappedRegionType) {
      setLoading(false);
      return;
    }

    // Find service by slug
    const service = servicesData.find(s => 
      s.slugs.de === serviceSlug || s.slugs.en === serviceSlug
    );

    if (!service) {
      setLoading(false);
      return;
    }

    // Generate content
    const generatedContent = generateServiceLocationContent(
      service.id,
      mappedRegionType,
      regionSlug
    );

    setContent(generatedContent);
    setLoading(false);

    if (!generatedContent) return;

    const locContent = language === 'de' ? generatedContent.de : generatedContent.en;
    const serviceContent = service.content[language];

    // Get region name from structured data instead of parsing headline
    let regionName = '';
    if (mappedRegionType === 'bezirk') {
      const district = getDistrictBySlug(regionSlug);
      regionName = district ? (language === 'de' ? district.name : (district.nameEn || district.name)) : '';
    } else if (mappedRegionType === 'bundesland') {
      const state = states.find(s => s.slug === regionSlug);
      regionName = state ? (language === 'de' ? state.name : state.nameEn) : '';
    } else if (mappedRegionType === 'stadt') {
      const citySlugParts = regionSlug.split('/');
      if (citySlugParts.length === 2) {
        const city = getCityBySlug(citySlugParts[0], citySlugParts[1]);
        regionName = city ? (language === 'de' ? city.name : (city.nameEn || city.name)) : '';
      }
    }

    // Fallback: if region name is still empty, try to extract from locContent if available
    if (!regionName && 'regionName' in locContent && typeof locContent.regionName === 'string') {
      regionName = locContent.regionName;
    }
    
    // Last resort: parse from headline (but only if it contains " in ")
    if (!regionName && locContent.headline.includes(' in ')) {
      regionName = locContent.headline.split(' in ')[1] || '';
    }
    
    // Ultimate fallback to prevent empty name
    if (!regionName) {
      regionName = language === 'de' ? 'Österreich' : 'Austria';
    }

    // Update meta tags
    const title = `${locContent.headline} | Transraum`;
    const description = locContent.subheadline;

    const alternateUrls = getAlternateUrls(location);

    updateMetaTags({
      title,
      description,
      url: location,
      language,
      alternateUrls,
    });

    // Add JSON-LD schemas
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `https://transraum.com${location}#service`,
      name: locContent.headline,
      description: locContent.intro,
      serviceType: serviceContent.name,
      provider: {
        '@type': 'MovingCompany',
        '@id': 'https://transraum.com/#organization',
        name: 'Transraum',
      },
      areaServed: {
        '@type': 'Place',
        name: regionName,
      },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        priceCurrency: 'EUR',
      },
    };

    const webPageSchema = getWebPageSchema(language, {
      type: 'WebPage',
      name: locContent.headline,
      description: locContent.subheadline,
      url: location,
    });

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: locContent.faq.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };

    const breadcrumb = getBreadcrumbSchema([
      { name: language === 'de' ? 'Startseite' : 'Home', url: language === 'de' ? '/de' : '/en' },
      { name: language === 'de' ? 'Leistungen' : 'Services', url: language === 'de' ? '/de/leistungen' : '/en/services' },
      { name: locContent.headline, url: location },
    ]);

    addMultipleJsonLd([serviceSchema, webPageSchema, faqSchema, breadcrumb], `service-${mappedRegionType}-${regionSlug}-schemas`);
  }, [language, location, params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-muted rounded w-3/4"></div>
            <div className="h-6 bg-muted rounded w-full"></div>
            <div className="h-6 bg-muted rounded w-5/6"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!content || !params) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-4">Seite nicht gefunden</h1>
          <p className="text-muted-foreground">Die angeforderte Seite konnte nicht gefunden werden.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const locContent = language === 'de' ? content.de : content.en;
  const service = servicesData.find(s => s.id === content.serviceId);
  if (!service) return null;

  const serviceContent = service.content[language];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Breadcrumbs */}
        <div className="bg-muted/30 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs
              items={[
                { name: language === 'de' ? 'Startseite' : 'Home', url: language === 'de' ? '/' : '/en' },
                { name: language === 'de' ? 'Leistungen' : 'Services', url: language === 'de' ? '/leistungen' : '/en/services' },
                { name: serviceContent.name, url: `${language === 'de' ? '/leistungen' : '/en/services'}/${service.slugs[language]}` },
                { name: locContent.headline.split(' in ')[1] || '', url: '' },
              ]}
            />
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-service-region-title">
                {locContent.headline}
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-8" data-testid="text-service-region-subtitle">
                {locContent.subheadline}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={`tel:${CONTACT_INFO.phoneLink}`}>
                  <Button size="lg" variant="secondary" data-testid="button-call-now">
                    <Phone className="w-5 h-5 mr-2" />
                    {CONTACT_INFO.phone}
                  </Button>
                </a>
                <a href={`tel:${CONTACT_INFO.phoneLink}`}>
                  <Button size="lg" variant="outline" className="bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/30" data-testid="button-email">
                    <Phone className="w-5 h-5 mr-2" />
                    {language === 'de' ? 'Anfrage senden' : 'Send Inquiry'}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {locContent.stats && (
          <section className="py-8 border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-3 gap-8">
                {locContent.stats.map((stat, index) => (
                  <div key={index} className="text-center" data-testid={`stat-${index}`}>
                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Introduction */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <p className="text-lg leading-relaxed text-foreground/90" data-testid="text-intro">
                {locContent.intro}
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8" data-testid="text-benefits-title">
              {language === 'de' ? 'Ihre Vorteile' : 'Your Benefits'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {locContent.benefits.map((benefit, index) => (
                <Card key={index} data-testid={`benefit-card-${index}`}>
                  <CardContent className="flex items-start gap-3 pt-6">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p>{benefit}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Location Highlights */}
        {(locContent.landmarks.length > 0 || locContent.neighborhoods.length > 0) && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-8">
                {locContent.landmarks.length > 0 && (
                  <Card data-testid="card-landmarks">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        {language === 'de' ? 'Bekannte Orte' : 'Known Locations'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {locContent.landmarks.map((landmark, index) => (
                          <Badge key={index} variant="secondary" data-testid={`landmark-${index}`}>
                            {landmark}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
                {locContent.neighborhoods.length > 0 && (
                  <Card data-testid="card-neighborhoods">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-primary" />
                        {language === 'de' ? 'Stadtteile' : 'Districts'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {locContent.neighborhoods.map((neighborhood, index) => (
                          <Badge key={index} variant="secondary" data-testid={`neighborhood-${index}`}>
                            {neighborhood}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8" data-testid="text-faq-title">
              {language === 'de' ? 'Häufig gestellte Fragen' : 'Frequently Asked Questions'}
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {locContent.faq.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border rounded-md px-6 bg-card"
                  data-testid={`faq-item-${index}`}
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4" data-testid={`faq-question-${index}`}>
                    <span className="font-semibold">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4" data-testid={`faq-answer-${index}`}>
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA */}
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
