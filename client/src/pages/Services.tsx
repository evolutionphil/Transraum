import { useEffect } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { getAllServices, ServiceId, getLocalizedServicePath } from '@/data/services';
import { updateMetaTags, addMultipleJsonLd, getCollectionPageSchema, getFAQSchema, getBreadcrumbSchema } from '@/lib/seo';
import { useLanguage } from '@/contexts/LanguageContext';
import { getAlternateUrls } from '@/lib/urlMapping';
import { useLocation } from 'wouter';
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
import heirloomImage from '@assets/generated_images/Estate_heirloom_purchase_service_26574573.png';
import goldImage from '@assets/generated_images/Gold_purchase_service_Vienna_0145395b.png';
import carpetImage from '@assets/generated_images/Carpet_purchase_service_Vienna_53ce3616.png';
import paintingImage from '@assets/generated_images/Painting_purchase_service_Vienna_6ea34abf.png';
import antiquesImage from '@assets/generated_images/Antiques_purchase_service_Vienna_7da61782.png';

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
  [ServiceId.ANTIKWARENANKAUF]: antiquesImage,
};

export default function Services() {
  const { language, t } = useLanguage();
  const [location] = useLocation();
  const services = getAllServices();

  useEffect(() => {
    const title = language === 'de' 
      ? 'Leistungen – Transport & Räumung Wien | Transraum'
      : 'Our Services - Clearing & Removal in Vienna | Transraum';
    
    const description = language === 'de'
      ? `Professionelle Räumungs-Services in Wien ✓ Wohnungsräumung ✓ Haushaltsauflösung ✓ Keller & Dachboden ✓ Messie-Hilfe ✓ Alle Bezirke ☎ ${CONTACT_INFO.phone}`
      : `Professional clearing services in Vienna ✓ Apartment clearing ✓ Estate dissolution ✓ Basement & Attic ✓ Hoarding help ✓ All districts ☎ ${CONTACT_INFO.phone}`;
    
    const alternateUrls = getAlternateUrls(location);
    
    updateMetaTags({
      title,
      description,
      url: location,
      type: 'website',
      language,
      alternateUrls,
    });

    const collectionSchema = getCollectionPageSchema(language, {
      name: language === 'de' ? 'Unsere Leistungen' : 'Our Services',
      description,
      url: location,
      items: services.map(service => ({
        name: service.content[language].name,
        description: service.content[language].shortDescription,
        url: getLocalizedServicePath(service.id, language),
      })),
    });

    const faqData = language === 'de' ? [
      { question: 'Welche Räumungsleistungen bietet Transraum an?', answer: 'Transraum bietet Wohnungsräumung, Haushaltsauflösung, Kellerräumung, Dachbodenräumung, Geschäftsräumung, Messie-Räumung, Verlassenschaftsräumung, Transportservice, Entrümpelung und mehr.' },
      { question: 'Gibt es Festpreise für die Leistungen?', answer: 'Ja, Transraum arbeitet mit transparenten Festpreisen. Nach einer kostenlosen Besichtigung erhalten Sie ein verbindliches Angebot. Unsere Pakete starten ab €129 für Transport und ab €249 für Räumung.' },
      { question: 'Sind Entsorgungskosten im Preis inbegriffen?', answer: 'Ja, in unseren Festpreisangeboten sind alle Kosten inklusive – auch Entsorgung, Transport und besenreine Übergabe. Keine versteckten Kosten.' },
      { question: 'Bieten Sie Verlassenschaftsräumungen an?', answer: 'Ja, wir bieten sensible Verlassenschaftsräumungen an und gehen mit höchster Diskretion und Einfühlungsvermögen vor. Wertvolle Gegenstände werden fachgerecht bewertet und können angekauft werden.' },
    ] : [
      { question: 'What clearing services does Transraum offer?', answer: 'Transraum offers apartment clearing, household dissolution, basement clearing, attic clearing, commercial clearing, hoarding cleanup, estate clearing, transport service, and more.' },
      { question: 'Are there fixed prices for the services?', answer: 'Yes, Transraum works with transparent fixed prices. After a free inspection you receive a binding quote. Our packages start from €129 for transport and €249 for clearing.' },
      { question: 'Are disposal costs included in the price?', answer: 'Yes, all costs are included in our fixed price offers – including disposal, transport and broom-clean handover. No hidden costs.' },
      { question: 'Do you offer estate clearing services?', answer: 'Yes, we offer sensitive estate clearing with the utmost discretion and empathy. Valuable items are professionally assessed and can be purchased.' },
    ];

    const breadcrumb = getBreadcrumbSchema([
      { name: language === 'de' ? 'Startseite' : 'Home', url: language === 'de' ? '/de' : '/en' },
      { name: language === 'de' ? 'Leistungen' : 'Services', url: location },
    ]);

    addMultipleJsonLd([collectionSchema, getFAQSchema(faqData), breadcrumb], 'services-collection-schema');
  }, [language, location, services]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <section className="bg-primary text-primary-foreground py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-services-title">
                {t.servicesPage.title}
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-8">
                {t.servicesPage.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary text-secondary-foreground" data-testid="button-call-services">
                  <a href={`tel:${CONTACT_INFO.phoneLink}`}>
                    {t.servicesPage.callNow}: {CONTACT_INFO.phone}
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm">
                  <a href={`tel:${CONTACT_INFO.phoneLink}`}>
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t.servicesPage.allServices}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t.servicesPage.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const content = service.content[language];
                const servicePath = getLocalizedServicePath(service.id, language);
                return (
                  <Link key={service.id} href={servicePath}>
                    <Card className="hover-elevate active-elevate-2 cursor-pointer h-full transition-all overflow-hidden" data-testid={`card-service-${index}`}>
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={serviceImages[service.id]} 
                          alt={content.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white">{content.name}</h3>
                        </div>
                      </div>
                      <CardContent className="pt-6">
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {content.shortDescription}
                        </p>
                        <div className="space-y-2 mb-4">
                          {content.benefits.slice(0, 3).map((benefit, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{benefit}</span>
                            </div>
                          ))}
                        </div>
                        <Button variant="ghost" className="w-full group">
                          {t.servicesPage.learnMore}
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6" data-testid="text-services-cta-title">{t.servicesPage.cta.title}</h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t.servicesPage.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" data-testid="button-cta-consultation">
                <a href={`tel:${CONTACT_INFO.phoneLink}`}>
                  {t.servicesPage.cta.freeConsultation}: {CONTACT_INFO.phone}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" data-testid="button-cta-whatsapp">
                <a href={`tel:${CONTACT_INFO.phoneLink}`}>
                  {t.servicesPage.cta.sendEmail}
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
