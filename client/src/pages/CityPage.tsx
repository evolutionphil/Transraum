import { useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Phone, MapPin, CheckCircle, Star, Building2, MapPinned } from 'lucide-react';
import { getCityBySlug } from '@/data/cities';
import { updateMetaTags, getFAQSchema, addMultipleJsonLd, getBreadcrumbSchema, getWebPageSchema } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import NotFound from './not-found';
import cityImage from '@assets/generated_images/House_clearance_service_e0229004.png';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedBundeslaenderPath, getAlternateUrls } from '@/lib/urlMapping';
import { CONTACT_INFO } from '@/lib/constants';

export default function CityPage() {
  const { t, language } = useLanguage();
  const [location] = useLocation();
  const [matchDe, paramsDe] = useRoute('/bundeslaender/:bundesland/:city');
  const [matchDe2, paramsDe2] = useRoute('/de/bundeslaender/:bundesland/:city');
  const [matchEn, paramsEn] = useRoute('/en/federal-states/:bundesland/:city');
  const match = matchDe || matchDe2 || matchEn;
  const params = matchDe ? paramsDe : matchDe2 ? paramsDe2 : paramsEn;
  const bundeslaenderPath = getLocalizedBundeslaenderPath(language);
  const city = params?.bundesland && params?.city 
    ? getCityBySlug(params.bundesland, params.city) 
    : null;

  const cityName = language === 'en' && city?.nameEn ? city.nameEn : city?.name || '';
  const cityBundesland = language === 'en' && city?.bundeslandEn ? city.bundeslandEn : city?.bundesland || '';
  const cityDescription = language === 'en' && city?.descriptionEn ? city.descriptionEn : city?.description || '';
  const cityMetaDescription = language === 'en' && city?.metaDescriptionEn ? city.metaDescriptionEn : city?.metaDescription || '';
  const cityServices = language === 'en' && city?.servicesEn ? city.servicesEn : city?.services || [];
  const cityBenefits = language === 'en' && city?.benefitsEn ? city.benefitsEn : city?.benefits || [];
  const cityCoverage = language === 'en' && city?.coverageEn ? city.coverageEn : city?.coverage || '';
  const cityFaq = language === 'en' && city?.faqEn ? city.faqEn : city?.faq || [];

  useEffect(() => {
    if (city) {
      const title = `${t.cityPage.pageTitleTemplate} ${cityName} ${cityBundesland} ${t.cityPage.pageTitleSuffix}`;
      const alternateUrls = getAlternateUrls(location);

      updateMetaTags({
        title,
        description: cityMetaDescription,
        url: location,
        type: 'website',
        language,
        alternateUrls,
      });

      const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: `${t.cityPage.schemaCompanyName} ${cityName}`,
        image: cityImage,
        '@id': location,
        url: `${window.location.origin}${location}`,
        telephone: CONTACT_INFO.phone,
        address: {
          '@type': 'PostalAddress',
          addressLocality: cityName,
          postalCode: city.postalCode,
          addressRegion: cityBundesland,
          addressCountry: 'AT',
        },
        areaServed: {
          '@type': 'City',
          name: cityName,
          containedIn: {
            '@type': 'State',
            name: cityBundesland,
          },
        },
        priceRange: '€€',
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
        description: cityDescription,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: t.cityPage.schemaCatalogName,
          itemListElement: cityServices.map((service) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service,
              serviceType: t.cityPage.schemaServiceType,
            },
          })),
        },
      };

      const breadcrumbSchema = getBreadcrumbSchema([
        { name: t.common.states, url: bundeslaenderPath },
        { name: cityBundesland, url: getLocalizedBundeslaenderPath(language, city.bundeslandSlug) },
        { name: cityName, url: getLocalizedBundeslaenderPath(language, city.bundeslandSlug, city.slug) },
      ]);

      const webPageSchema = getWebPageSchema(language, {
        type: 'WebPage',
        name: cityName,
        description: cityMetaDescription,
        url: location,
      });

      const schemas: Record<string, unknown>[] = [localBusinessSchema, webPageSchema, breadcrumbSchema];
      
      if (cityFaq && cityFaq.length > 0) {
        schemas.push(getFAQSchema(cityFaq));
      }
      
      addMultipleJsonLd(schemas, `city-${city.slug}-schemas`);
    }
  }, [city, cityName, cityBundesland, cityDescription, cityMetaDescription, cityServices, cityFaq, language, location, t, bundeslaenderPath]);

  if (!match || !city) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs 
            items={[
              { name: t.common.states, url: bundeslaenderPath },
              { name: cityBundesland, url: getLocalizedBundeslaenderPath(language, city.bundeslandSlug) },
              { name: cityName, url: getLocalizedBundeslaenderPath(language, city.bundeslandSlug, city.slug) }
            ]} 
          />
        </div>

        <section className="relative bg-primary text-primary-foreground py-16 md:py-24">
          <div className="absolute inset-0 opacity-20">
            <img src={cityImage} alt={city.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-block bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-medium mb-4">
                {city.postalCode} {cityName}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-city-title">
                {t.cityPage.clearingIn} {cityName}, {cityBundesland}
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-6" data-testid="text-city-subtitle">
                {cityDescription}
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={`tel:${CONTACT_INFO.phoneLink}`}>
                  <Button size="lg" className="bg-secondary hover:bg-secondary text-secondary-foreground" data-testid="button-call">
                    <Phone className="mr-2 w-5 h-5" />
                    {t.common.callNow}
                  </Button>
                </a>
                <a href="#kontakt">
                  <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm" data-testid="button-consultation">
                    {t.common.freeConsultation}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-12">
                <div>
                  <h2 className="text-3xl font-bold mb-6">
                    {t.cityPage.professionalClearing} {cityName}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {t.cityPage.description1} {cityName}, {cityBundesland}. 
                    {t.cityPage.description2} {cityName} {t.cityPage.description3}
                  </p>
                  <p className="text-lg text-muted-foreground">
                    {t.cityPage.description4}
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-primary" />
                    {t.cityPage.ourServicesIn} {cityName}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {cityServices.map((service, i) => (
                      <Card key={i} className="hover-elevate" data-testid={`service-item-${i}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span className="font-medium">{service}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {cityBenefits.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Star className="w-6 h-6 text-primary" />
                      {t.cityPage.benefitsTitle} {cityName}
                    </h3>
                    <div className="space-y-3">
                      {cityBenefits.map((benefit, i) => (
                        <Card key={i} className="hover-elevate" data-testid={`benefit-item-${i}`}>
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {cityCoverage && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPinned className="w-5 h-5 text-primary" />
                        <CardTitle>{t.cityPage.coverageTitle}</CardTitle>
                      </div>
                      <CardDescription>
                        {t.cityPage.coverageSubtitle} {cityName} {t.cityPage.coverageActive}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{cityCoverage}</p>
                    </CardContent>
                  </Card>
                )}

                {cityFaq && cityFaq.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6">
                      {t.cityPage.faqTitle} {cityName}
                    </h3>
                    <Accordion type="single" collapsible className="w-full">
                      {cityFaq.map((faqItem, i) => (
                        <AccordionItem key={i} value={`item-${i}`}>
                          <AccordionTrigger className="text-left" data-testid={`faq-question-${i}`}>
                            {faqItem.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground" data-testid={`faq-answer-${i}`}>
                            {faqItem.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle>{t.cityPage.quickContact}</CardTitle>
                    <CardDescription>{t.cityPage.requestInspection}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <a 
                      href={`tel:${CONTACT_INFO.phoneLink}`}
                      className="flex items-center gap-3 p-3 hover-elevate active-elevate-2 rounded-md border"
                      data-testid="link-phone"
                    >
                      <Phone className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <div className="font-medium">{t.cityPage.contactPhone}</div>
                        <div className="text-sm text-muted-foreground">{CONTACT_INFO.phone}</div>
                      </div>
                    </a>
                    
                    <a 
                      href={`tel:${CONTACT_INFO.phoneLink}`}
                      className="flex items-center gap-3 p-3 hover-elevate active-elevate-2 rounded-md border"
                      data-testid="link-email"
                    >
                      <Phone className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <div className="font-medium">{t.cityPage.contactEmail}</div>
                        <div className="text-sm text-muted-foreground">{CONTACT_INFO.phone}</div>
                      </div>
                    </a>

                    <div className="flex items-start gap-3 p-3 rounded-md border bg-muted/50">
                      <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">{t.cityPage.contactAddress}</div>
                        <div className="text-sm text-muted-foreground">
                          Herndlgasse 7/17<br />
                          1100 Wien
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span>{t.cityPage.benefit1}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span>{t.cityPage.benefit2}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span>{t.cityPage.benefit3}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span>{t.cityPage.benefit4}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/50" id="kontakt">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              {t.cityPage.bookFreeInspection}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t.cityPage.ctaText} {cityName} {t.cityPage.ctaTextAnd} {cityBundesland} {t.cityPage.ctaTextActive}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`tel:${CONTACT_INFO.phoneLink}`}>
                <Button size="lg" data-testid="button-cta-call">
                  <Phone className="mr-2 w-5 h-5" />
                  {CONTACT_INFO.phone}
                </Button>
              </a>
              <a href={`tel:${CONTACT_INFO.phoneLink}`}>
                <Button size="lg" variant="outline" data-testid="button-cta-email">
                  <Phone className="mr-2 w-5 h-5" />
                  {t.cityPage.ctaEmailButton}
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
