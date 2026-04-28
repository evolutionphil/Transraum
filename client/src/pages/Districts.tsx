import { useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, ArrowRight } from 'lucide-react';
import { getAllDistricts } from '@/data/districts';
import { Button } from '@/components/ui/button';
import { updateMetaTags, addJsonLd, getCollectionPageSchema } from '@/lib/seo';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedDistrictsPath, getAlternateUrls } from '@/lib/urlMapping';
import { CONTACT_INFO } from '@/lib/constants';

export default function Districts() {
  const { language, t } = useLanguage();
  const [location] = useLocation();
  const districts = getAllDistricts();
  const districtsPath = getLocalizedDistrictsPath(language);

  useEffect(() => {
    const title = language === 'de'
      ? 'Räumung in allen Wiener Bezirken - Transraum | 1010-1230 Wien'
      : 'Clearing in All Vienna Districts - Transraum | 1010-1230 Vienna';
    
    const description = language === 'de'
      ? `Professionelle Räumung in allen 23 Wiener Bezirken ✓ Schnell ✓ Zuverlässig ✓ Faire Preise. Kostenlose Besichtigung in ganz Wien ☎ ${CONTACT_INFO.phone}`
      : `Professional clearing in all 23 Vienna districts ✓ Fast ✓ Reliable ✓ Fair prices. Free consultation throughout Vienna ☎ ${CONTACT_INFO.phone}`;
    
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
      name: language === 'de' ? 'Alle Wiener Bezirke' : 'All Vienna Districts',
      description,
      url: location,
      itemType: 'Place',
      items: districts.map(district => ({
        name: `${district.postalCode} ${language === 'de' ? district.name : district.nameEn}`,
        description: language === 'de'
          ? `Professionelle Räumungsdienstleistungen in Wien ${district.name} (${district.postalCode})`
          : `Professional clearing services in Vienna ${district.nameEn} (${district.postalCode})`,
        url: getLocalizedDistrictsPath(language, district.slug),
      })),
    });

    addJsonLd(collectionSchema, 'districts-collection-schema');
  }, [language, location, districtsPath, districts]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <section className="bg-primary text-primary-foreground py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-districts-title">
                {t.districtsPage.title}
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-8">
                {t.districtsPage.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`tel:${CONTACT_INFO.phoneLink}`}>
                  <Button size="lg" className="bg-secondary hover:bg-secondary text-secondary-foreground">
                    {CONTACT_INFO.phone}
                  </Button>
                </a>
                <a href={`https://wa.me/${CONTACT_INFO.phoneLink}`} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm">
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">{t.districtsPage.allDistricts}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t.districtsPage.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {districts.map((district, index) => (
                <Link key={district.slug} href={getLocalizedDistrictsPath(language, district.slug)}>
                  <Card className="hover-elevate active-elevate-2 cursor-pointer h-full transition-all" data-testid={`card-district-${index}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-primary" />
                          </div>
                          <div className="text-2xl font-bold text-primary">{district.postalCode}</div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <CardTitle className="text-xl" data-testid={`text-district-name-${index}`}>
                        {language === 'de' ? district.name : district.nameEn}
                      </CardTitle>
                      <CardDescription>
                        {t.common.wien} {language === 'de' ? district.name : district.nameEn}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {district.shortSummary}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {district.landmarks.slice(0, 3).map((landmark, i) => (
                          <div key={i} className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs">
                            {landmark}
                          </div>
                        ))}
                      </div>
                    </CardContent>                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">{t.districtsPage.whyTitle}</h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t.districtsPage.whyDescription}
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">23</div>
                  <div className="font-medium">{t.districtsPage.districtsCovered}</div>
                  <div className="text-sm text-muted-foreground">{t.districtsPage.entireVienna}</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">26+</div>
                  <div className="font-medium">{t.districtsPage.yearsExperience}</div>
                  <div className="text-sm text-muted-foreground">{t.districtsPage.professionalClearing}</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                  <div className="font-medium">{t.districtsPage.available}</div>
                  <div className="text-sm text-muted-foreground">{t.districtsPage.flexibleScheduling}</div>
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
