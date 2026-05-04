import { useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Phone, MapPin, CheckCircle, Star, Landmark, MapPinned } from 'lucide-react';
import { getDistrictBySlug } from '@/data/districts';
import { updateMetaTags, addJsonLd, getFAQSchema, addMultipleJsonLd, getWebPageSchema } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import viennaImage from '@assets/generated_images/Vienna_landmark_Stephansdom_a1284b43.png';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedDistrictsPath, getAlternateUrls } from '@/lib/urlMapping';
import { CONTACT_INFO } from '@/lib/constants';

export default function DistrictPage() {
  const { t, language } = useLanguage();
  const [location] = useLocation();
  const [matchDe, paramsDe] = useRoute('/bezirke/:slug');
  const [matchDe2, paramsDe2] = useRoute('/de/bezirke/:slug');
  const [matchEn, paramsEn] = useRoute('/en/districts/:slug');
  const match = matchDe || matchDe2 || matchEn;
  const params = matchDe ? paramsDe : matchDe2 ? paramsDe2 : paramsEn;
  const districtsPath = getLocalizedDistrictsPath(language);
  const district = params?.slug ? getDistrictBySlug(params.slug) : null;

  const districtName = language === 'de' ? district?.name : (district?.nameEn || district?.name);
  const districtDescription = language === 'de' ? district?.description : (district?.descriptionEn || district?.description);
  const districtMetaDescription = language === 'de' ? district?.metaDescription : (district?.metaDescriptionEn || district?.metaDescription);
  const districtLandmarks = language === 'de' ? district?.landmarks : (district?.landmarksEn || district?.landmarks);
  const districtNeighborhoods = language === 'de' ? district?.neighborhoods : (district?.neighborhoodsEn || district?.neighborhoods);
  const districtCharacteristics = language === 'de' ? district?.characteristics : (district?.characteristicsEn || district?.characteristics);
  const districtServiceAreas = language === 'de' ? district?.serviceAreas : (district?.serviceAreasEn || district?.serviceAreas);
  const districtPopularServices = language === 'de' ? district?.popularServices : (district?.popularServicesEn || district?.popularServices);
  const districtWhyChooseUs = language === 'de' ? district?.whyChooseUs : (district?.whyChooseUsEn || district?.whyChooseUs);
  const districtFaq = language === 'de' ? district?.faq : (district?.faqEn || district?.faq);

  useEffect(() => {
    if (district) {
      const title = language === 'de'
        ? `Räumung ${district.postalCode} Wien ${districtName} - Transraum | Professionell & Schnell`
        : `Clearing ${district.postalCode} Vienna ${districtName} - Transraum | Professional & Fast`;
      const alternateUrls = getAlternateUrls(location);

      updateMetaTags({
        title,
        description: districtMetaDescription || '',
        url: location,
        type: 'website',
        language,
        alternateUrls,
      });

      const placeSchema = {
        '@context': 'https://schema.org',
        '@type': 'Place',
        '@id': `https://transraum.com${location}#place`,
        name: `${district.postalCode} ${districtName}`,
        description: districtDescription,
        address: {
          '@type': 'PostalAddress',
          addressLocality: language === 'de' ? 'Wien' : 'Vienna',
          postalCode: district.postalCode,
          addressCountry: 'AT',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 48.2082,
          longitude: 16.3738,
        },
        containedInPlace: {
          '@type': 'City',
          name: language === 'de' ? 'Wien' : 'Vienna',
        },
      };

      const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `https://transraum.com${location}#service`,
        name: language === 'de' 
          ? `Räumung in ${districtName}`
          : `Clearing in ${districtName}`,
        description: districtMetaDescription,
        provider: {
          '@type': 'MovingCompany',
          '@id': 'https://transraum.com/#organization',
          name: 'Transraum',
          telephone: CONTACT_INFO.phone,
        },
        areaServed: {
          '@type': 'Place',
          '@id': `https://transraum.com${location}#place`,
          name: `${district.postalCode} ${districtName}`,
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: language === 'de' ? 'Räumungsdienstleistungen' : 'Clearing Services',
          itemListElement: (districtPopularServices || []).map((service) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service,
              serviceType: language === 'de' ? 'Räumung' : 'Clearing',
            },
          })),
        },
      };

      const webPageSchema = getWebPageSchema(language, {
        type: 'WebPage',
        name: `${district.postalCode} ${districtName}`,
        description: districtMetaDescription || '',
        url: location,
      });

      const schemas: Record<string, unknown>[] = [placeSchema, serviceSchema, webPageSchema];
      
      if (districtFaq && districtFaq.length > 0) {
        schemas.push(getFAQSchema(districtFaq));
      }
      
      addMultipleJsonLd(schemas, `district-${district.slug}-schemas`);
    }
  }, [district, language, location, districtsPath, districtName, districtDescription, districtMetaDescription, districtPopularServices, districtFaq]);

  if (!match || !district) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs 
            items={[
              { name: t.common.districts, url: `${districtsPath}#districts` },
              { name: `${district.postalCode} ${districtName}`, url: getLocalizedDistrictsPath(language, district.slug) }
            ]} 
          />
        </div>
        <section className="relative bg-primary text-primary-foreground py-16 md:py-24">
          <div className="absolute inset-0 opacity-20">
            <img src={viennaImage} alt={language === 'de' ? 'Wien' : 'Vienna'} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-block bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-medium mb-4">
                {district.postalCode} {language === 'de' ? 'Wien' : 'Vienna'}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-district-title">
                {t.districtPage.clearingIn} {district.postalCode} {language === 'de' ? 'Wien' : 'Vienna'} {districtName}
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-6" data-testid="text-district-subtitle">
                {districtDescription}
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={`tel:${CONTACT_INFO.phoneLink}`}>
                  <Button size="lg" className="bg-secondary hover:bg-secondary text-secondary-foreground">
                    <Phone className="mr-2 w-5 h-5" />
                    {t.common.callNow}
                  </Button>
                </a>
                <a href="#kontakt">
                  <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm">
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
                    {t.districtPage.professionalClearing} {districtName}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {t.districtPage.description1} {district.postalCode} {language === 'de' ? 'Wien' : 'Vienna'} {districtName}. 
                    {t.districtPage.description2}
                  </p>
                  <p className="text-lg text-muted-foreground">
                    {t.districtPage.description3}
                  </p>
                </div>

                {districtLandmarks && districtLandmarks.length > 0 && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Landmark className="w-5 h-5 text-primary" />
                        <CardTitle>{t.districtPage.knownPlaces} {districtName}</CardTitle>
                      </div>
                      <CardDescription>
                        {t.districtPage.activeInDistrict}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {districtLandmarks.map((landmark, i) => (
                          <div key={i} className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm">
                            {landmark}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-primary" />
                    {t.districtPage.ourServicesIn} {districtName}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {districtPopularServices && districtPopularServices.map((service, i) => (
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

                {districtServiceAreas && districtServiceAreas.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <MapPinned className="w-6 h-6 text-primary" />
                      {t.districtPage.serviceAreas} {district.postalCode}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {t.districtPage.activeInAllParts} {district.postalCode}. {t.districtPage.district}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {districtServiceAreas.map((area, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-primary shrink-0" />
                          <span>{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {districtCharacteristics && districtCharacteristics.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">
                      {t.districtPage.characteristics} {districtName}
                    </h3>
                    <div className="space-y-3">
                      {districtCharacteristics.map((char, i) => (
                        <div key={i} className="flex gap-3">
                          <Star className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{char}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    {t.districtPage.whyUs} {districtName}?
                  </h3>
                  <div className="space-y-3">
                    {districtWhyChooseUs && districtWhyChooseUs.map((reason, i) => (
                      <div key={i} className="flex gap-3">
                        <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {districtNeighborhoods && districtNeighborhoods.length > 0 && (
                  <Card className="bg-accent/50">
                    <CardHeader>
                      <CardTitle>{t.districtPage.neighborhoods} {districtName}</CardTitle>
                      <CardDescription>
                        {t.districtPage.neighborhoodsSubtitle}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        {districtNeighborhoods.map((neighborhood, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            <span>{neighborhood}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {districtFaq && districtFaq.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold mb-6">
                      {t.districtPage.faqTitle} {districtName}
                    </h3>
                    <Accordion type="single" collapsible className="w-full">
                      {districtFaq.map((item, i) => (
                        <AccordionItem key={i} value={`item-${i}`}>
                          <AccordionTrigger className="text-left">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}

                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4">
                      {t.districtPage.freeInspectionIn} {districtName}
                    </h3>
                    <p className="mb-6 text-primary-foreground/90">
                      {t.districtPage.inspectionText}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a href={`tel:${CONTACT_INFO.phoneLink}`}>
                        <Button size="lg" className="bg-secondary hover:bg-secondary text-secondary-foreground w-full sm:w-auto">
                          <Phone className="mr-2 w-5 h-5" />
                          {CONTACT_INFO.phone}
                        </Button>
                      </a>
                      <a href={`tel:${CONTACT_INFO.phoneLink}`}>
                        <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm w-full sm:w-auto">
                          <Phone className="mr-2 w-5 h-5" />
                          WhatsApp
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="sticky top-20">
                  <CardHeader className="bg-primary text-primary-foreground">
                    <CardTitle>{t.districtPage.contactNow}</CardTitle>
                    <CardDescription className="text-primary-foreground/80">
                      {t.districtPage.freeConsultationFor} {districtName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t.common.phone}</div>
                        <a href={`tel:${CONTACT_INFO.phoneLink}`} className="font-medium hover:text-primary">
                          {CONTACT_INFO.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <div className="text-sm text-muted-foreground">WhatsApp</div>
                        <a href={`tel:${CONTACT_INFO.phoneLink}`} className="font-medium hover:text-primary break-all">
                          {CONTACT_INFO.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary shrink-0" />
                      <div>
                        <div className="text-sm text-muted-foreground">{t.common.district}</div>
                        <div className="font-medium">{district.postalCode} {language === 'de' ? 'Wien' : 'Vienna'} {districtName}</div>
                      </div>
                    </div>
                    <div className="pt-4 border-t space-y-2">
                      <a href={`tel:${CONTACT_INFO.phoneLink}`} className="block">
                        <Button className="w-full bg-secondary hover:bg-secondary text-secondary-foreground" data-testid="button-district-call">
                          <Phone className="mr-2 w-4 h-4" />
                          {t.common.callNow}
                        </Button>
                      </a>
                      <a href={`tel:${CONTACT_INFO.phoneLink}`} className="block">
                        <Button variant="outline" className="w-full" data-testid="button-district-email">
                          <Phone className="mr-2 w-4 h-4" />
                          WhatsApp
                        </Button>
                      </a>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="text-sm font-medium mb-3">{t.districtPage.ourBenefits}:</div>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{t.districtPage.available247}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{t.common.freeInspection}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{t.districtPage.fairPrices}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{t.districtPage.broomClean}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{t.districtPage.yearsExperience}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
