import { useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { states } from '@/data/states';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import { updateMetaTags, addJsonLd, getCollectionPageSchema } from '@/lib/seo';
import { getLocalizedBundeslaenderPath, getLocalizedContactPath, getAlternateUrls } from '@/lib/urlMapping';
import { CONTACT_INFO } from '@/lib/constants';

export default function Bundeslaender() {
  const { language, t } = useLanguage();
  const [location] = useLocation();
  const bundeslaenderPath = getLocalizedBundeslaenderPath(language);
  const contactPath = getLocalizedContactPath(language);

  useEffect(() => {
    const title = language === 'de' 
      ? 'Räumung in allen Bundesländern Österreichs | Flächen Frei'
      : 'Clearing Services in All Austrian Federal States | Flächen Frei';
    
    const description = language === 'de'
      ? 'Professionelle Räumung und Transport in allen 9 Bundesländern Österreichs. Von Wien bis Vorarlberg - zuverlässiger Service in ganz Österreich.'
      : 'Professional clearing and transport services in all 9 Austrian federal states. From Vienna to Vorarlberg - reliable service throughout Austria.';

    const alternateUrls = getAlternateUrls(location);

    updateMetaTags({
      title,
      description,
      url: location,
      language,
      alternateUrls,
    });

    const collectionSchema = getCollectionPageSchema(language, {
      name: language === 'de' ? 'Alle Bundesländer Österreichs' : 'All Austrian Federal States',
      description,
      url: location,
      itemType: 'AdministrativeArea',
      items: states.map(state => ({
        name: language === 'de' ? state.name : state.nameEn,
        description: language === 'de' ? state.description : state.descriptionEn,
        url: getLocalizedBundeslaenderPath(language, state.slug),
      })),
    });

    addJsonLd(collectionSchema, 'bundeslaender-collection-schema');
  }, [language, location, bundeslaenderPath]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-bundeslaender-title">
                {t.bundeslaenderPage.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-bundeslaender-subtitle">
                {t.bundeslaenderPage.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* States Grid */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {states.map((state, index) => (
                <Card key={state.slug} className="hover-elevate" data-testid={`card-state-${state.slug}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <CardTitle className="text-xl" data-testid={`text-state-name-${state.slug}`}>
                          {language === 'de' ? state.name : state.nameEn}
                        </CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-base" data-testid={`text-state-description-${state.slug}`}>
                      {language === 'de' ? state.description : state.descriptionEn}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <h4 className="font-semibold text-sm text-foreground">
                        {t.bundeslaenderPage.ourServices}
                      </h4>
                      <ul className="space-y-2">
                        {(language === 'de' ? state.features : state.featuresEn).slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link href={getLocalizedBundeslaenderPath(language, state.slug)}>
                      <Button variant="outline" className="w-full" data-testid={`button-state-${state.slug}`}>
                        {t.bundeslaenderPage.learnMore}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.cta.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t.contact.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${CONTACT_INFO.phoneLink}`}>
                <Button size="lg" data-testid="button-call-cta">
                  {t.nav.callNow}
                </Button>
              </a>
              <Link href={contactPath}>
                <Button variant="outline" size="lg" data-testid="button-contact-cta">
                  {language === 'de' ? 'Kontaktformular' : 'Contact Form'}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
