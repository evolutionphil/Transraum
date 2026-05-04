import { useEffect } from 'react';
import { useRoute, Link, useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Phone, CheckCircle, ArrowRight, Euro, Truck } from 'lucide-react';
import { getServiceBySlug, getServiceById, ServiceId, getLocalizedServicePath } from '@/data/services';
import { updateMetaTags, addJsonLd, getFAQSchema, addMultipleJsonLd, getWebPageSchema } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/contexts/LanguageContext';
import { getAlternateUrls } from '@/lib/urlMapping';
import { CONTACT_INFO } from '@/lib/constants';
import apartmentImage from '@assets/generated_images/Apartment_clearance_Vienna_fd741ce0.png';
import estateImage from '@assets/generated_images/Estate_clearance_service_46b9585f.png';
import basementImage from '@assets/generated_images/Basement_clearance_759c9b49.png';
import atticImage from '@assets/generated_images/Attic_clearance_Vienna_cd35a753.png';
import officeImage from '@assets/generated_images/Office_clearance_service_21e87799.png';
import messieImage from '@assets/generated_images/Hoarding_clearance_support_81793b23.png';
import bulkyWasteImage from '@assets/generated_images/Bulky_waste_disposal_Vienna_e9c6cea4.png';
import movingImage from '@assets/generated_images/Moving_service_Vienna_8eeb3795.png';
import garageImage from '@assets/generated_images/Garage_clearance_service_435382d9.png';
import officeDissolutionImage from '@assets/generated_images/Office_dissolution_service_d98c3ee9.png';
import probateImage from '@assets/generated_images/Probate_estate_clearance_1eadd49e.png';
import containerImage from '@assets/generated_images/Container_rental_service_f4846763.png';
import heirloomImage from '@assets/stock_images/antique_heirloom_jew_da60341a.jpg';
import goldImage from '@assets/stock_images/gold_jewelry_coins_b_a9ecdc2e.jpg';
import carpetImage from '@assets/stock_images/antique_persian_orie_54731bea.jpg';
import paintingImage from '@assets/stock_images/antique_oil_painting_d5919781.jpg';
import antiqueImage from '@assets/stock_images/antique_furniture_po_13c004b9.jpg';
import cleaningTeamImage from '@assets/stock_images/professional_cleanin_4637ab2e.jpg';
import cleanApartmentImage from '@assets/stock_images/empty_clean_apartmen_62f7696d.jpg';
import movingTruckImage from '@assets/stock_images/moving_truck_loading_e8cb2b49.jpg';

const serviceImages: Record<ServiceId, string> = {
  [ServiceId.WOHNUNGSRAEUMUNG]: apartmentImage,
  [ServiceId.HAUSHALTSAUFLOESUNG]: estateImage,
  [ServiceId.KELLERRAEUMUNG]: basementImage,
  [ServiceId.DACHBODENRAEUMUNG]: atticImage,
  [ServiceId.GESCHAEFTSRAEUMUNG]: officeImage,
  [ServiceId.MESSIERAEUMUNG]: messieImage,
  [ServiceId.SPERRMULLABHOLUNG]: bulkyWasteImage,
  [ServiceId.UMZUGSSERVICE]: movingImage,
  [ServiceId.GARAGERAEUMUNG]: garageImage,
  [ServiceId.BUROAUFLOESUNG]: officeDissolutionImage,
  [ServiceId.VERLASSENSCHAFTSRAEUMUNG]: probateImage,
  [ServiceId.CONTAINERSERVICE]: containerImage,
  [ServiceId.ERBSTUECKSANKAUF]: heirloomImage,
  [ServiceId.GOLDANKAUF]: goldImage,
  [ServiceId.TEPPICHANKAUF]: carpetImage,
  [ServiceId.BILDERANKAUF]: paintingImage,
  [ServiceId.ANTIKWARENANKAUF]: antiqueImage,
  [ServiceId.TRANSPORTSERVICE]: movingTruckImage,
};

export default function ServicePage() {
  const { t, language } = useLanguage();
  const [location] = useLocation();
  const [matchDe, paramsDe] = useRoute('/leistungen/:slug');
  const [matchDe2, paramsDe2] = useRoute('/de/leistungen/:slug');
  const [matchEn, paramsEn] = useRoute('/en/services/:slug');
  
  const match = matchDe || matchDe2 || matchEn;
  const params = paramsDe || paramsDe2 || paramsEn;
  const service = params?.slug ? getServiceBySlug(params.slug, language) : null;

  useEffect(() => {
    if (service) {
      const content = service.content[language];
      const title = `${content.name} Wien - Transraum | Professionell & Schnell`;
      const alternateUrls = getAlternateUrls(location);

      updateMetaTags({
        title,
        description: content.metaDescription,
        url: location,
        type: 'service',
        image: serviceImages[service.id],
        language,
        alternateUrls,
      });

      const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `https://transraum.com${location}#service`,
        name: content.name,
        description: content.description,
        image: serviceImages[service.id],
        url: `https://transraum.com${location}`,
        provider: {
          '@type': 'MovingCompany',
          '@id': 'https://transraum.com/#organization',
          name: 'Transraum',
          telephone: CONTACT_INFO.phone,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Herndlgasse 7/17',
            addressLocality: 'Wien',
            postalCode: '1100',
            addressCountry: 'AT',
          },
          url: 'https://transraum.com',
        },
        areaServed: [
          {
            '@type': 'City',
            name: language === 'de' ? 'Wien' : 'Vienna',
          },
          {
            '@type': 'Country',
            name: language === 'de' ? 'Österreich' : 'Austria',
          },
        ],
        serviceType: content.name,
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'EUR',
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'EUR',
          },
        },
        potentialAction: [
          {
            '@type': 'ContactAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `https://transraum.com${language === 'de' ? '/kontakt' : '/en/contact'}`,
              actionPlatform: [
                'http://schema.org/DesktopWebPlatform',
                'http://schema.org/MobileWebPlatform'
              ]
            }
          },
          {
            '@type': 'CallAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `tel:${CONTACT_INFO.phoneLink}`,
              actionPlatform: [
                'http://schema.org/DesktopWebPlatform',
                'http://schema.org/MobileWebPlatform'
              ]
            }
          }
        ]
      };

      const webPageSchema = getWebPageSchema(language, {
        type: 'WebPage',
        name: content.name,
        description: content.metaDescription,
        url: location,
      });

      const schemas: Record<string, unknown>[] = [serviceSchema, webPageSchema];
      
      if (content.faq && content.faq.length > 0) {
        schemas.push(getFAQSchema(content.faq));
      }
      
      addMultipleJsonLd(schemas, `service-${service.id}-schemas`);
    }
  }, [service, language, location]);

  if (!match || !service) {
    return null;
  }

  const content = service.content[language];
  const serviceImage = serviceImages[service.id];
  const servicePath = getLocalizedServicePath(service.id, language);
  const servicesPath = language === 'de' ? '/leistungen' : '/en/services';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs 
            items={[
              { name: t.common.services, url: `${servicesPath}#services` },
              { name: content.name, url: servicePath }
            ]} 
          />
        </div>
        <section className="relative bg-primary text-primary-foreground py-20 md:py-28 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(${serviceImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" data-testid="text-service-title">
                {content.name} {t.common.in} {t.common.oesterreich}
              </h1>
              <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8">
                {content.shortDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary text-secondary-foreground" data-testid="button-call-service">
                  <a href={`tel:${CONTACT_INFO.phoneLink}`}>
                    <Phone className="mr-2 w-5 h-5" />
                    {CONTACT_INFO.phone}
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm">
                  <a href={`tel:${CONTACT_INFO.phoneLink}`}>
                    <Phone className="mr-2 w-5 h-5" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>{t.servicePage.about} {content.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {content.description}
                    </p>
                  </CardContent>
                </Card>

                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>{t.servicePage.benefits}</CardTitle>
                    <CardDescription>{t.servicePage.benefitsSubtitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {content.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                          <p className="text-muted-foreground">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>{t.servicePage.process}</CardTitle>
                    <CardDescription>{t.servicePage.processSubtitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {content.process.map((step) => (
                        <div key={step.step} className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                              {step.step}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Euro className="w-6 h-6" />
                      {t.servicePage.pricing}
                    </CardTitle>
                    <CardDescription>{t.servicePage.pricingSubtitle} {content.name}?</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      {content.pricing.info}
                    </p>
                    <h4 className="font-semibold mb-3">{t.servicePage.pricingFactors}</h4>
                    <ul className="space-y-2">
                      {content.pricing.factors.map((factor, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 p-4 bg-accent rounded-lg">
                      <p className="font-semibold mb-2">{t.servicePage.freeInspection}</p>
                      <p className="text-sm text-muted-foreground">
                        {t.servicePage.inspectionText}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t.servicePage.faq}</CardTitle>
                    <CardDescription>{t.servicePage.faqSubtitle} {content.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {content.faq.map((faq, index) => (
                        <AccordionItem key={index} value={`faq-${index}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <Card className="bg-primary text-primary-foreground">
                    <CardHeader>
                      <CardTitle>{t.servicePage.bookAppointment}</CardTitle>
                      <CardDescription className="text-primary-foreground/80">
                        {t.servicePage.freeConsultation}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button asChild size="lg" className="w-full bg-secondary hover:bg-secondary text-secondary-foreground">
                        <a href={`tel:${CONTACT_INFO.phoneLink}`}>
                          <Phone className="mr-2 w-5 h-5" />
                          {t.common.callNow}
                        </a>
                      </Button>
                      <Button asChild size="lg" variant="outline" className="w-full bg-white/10 text-white border-white/30 hover:bg-white/20">
                        <a href={`tel:${CONTACT_INFO.phoneLink}`}>
                          <Phone className="mr-2 w-5 h-5" />
                          {t.servicePage.sendEmail}
                        </a>
                      </Button>
                      <div className="pt-4 border-t border-primary-foreground/20">
                        <p className="text-sm text-primary-foreground/80">
                          {t.servicePage.phoneAvailable}<br />
                          {t.servicePage.phoneHours}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t.servicePage.relatedServices}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {service.relatedServices.map((relatedId) => {
                        const relatedService = getServiceById(relatedId);
                        if (!relatedService) return null;
                        const relatedContent = relatedService.content[language];
                        const relatedPath = getLocalizedServicePath(relatedService.id, language);
                        return (
                          <Link key={relatedId} href={relatedPath}>
                            <div className="hover-elevate active-elevate-2 p-3 rounded-lg border cursor-pointer transition-all">
                              <h4 className="font-semibold text-sm mb-1">{relatedContent.name}</h4>
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {relatedContent.shortDescription}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                      <Link href={servicesPath}>
                        <Button variant="ghost" className="w-full">
                          {language === 'de' ? 'Alle Leistungen anzeigen' : 'View All Services'}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
