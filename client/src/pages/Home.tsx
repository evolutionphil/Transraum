import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { CONTACT_INFO } from '@/lib/constants';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Gallery from '@/components/Gallery';
import Services from '@/components/Services';
import TrustStats from '@/components/TrustStats';
import WhyUs from '@/components/WhyUs';
import Testimonials from '@/components/Testimonials';
import SEOContent from '@/components/SEOContent';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import { updateMetaTags, addMultipleJsonLd, getLocalBusinessSchema, getOrganizationSchema } from '@/lib/seo';
import { getAlternateUrls } from '@/lib/urlMapping';

export default function Home() {
  const { language } = useLanguage();
  const [location] = useLocation();

  useEffect(() => {
    const title = language === 'de'
      ? 'Räumung Wien & Österreich - Transraum seit 1998'
      : 'Clearing Vienna & Austria - Transraum since 1998';

    const description = language === 'de'
      ? 'Professionelle Räumung in Wien & Österreich seit 1998. Faire Festpreise, 24h-Service, kostenlose Besichtigung. ☎ +43 660 6926375'
      : 'Professional clearing & transport in Vienna since 1998. Fair fixed prices, free on-site consultation, 24h service. ☎ +43 660 6926375';

    const keywords = language === 'de'
      ? 'Räumung Wien, Wohnungsräumung, Haushaltsauflösung, Kellerräumung, Räumung Österreich, Räumung Wien, Messie-Räumung, Verlassenschaftsräumung, Geschäftsräumung, Räumungsfirma Wien'
      : 'Clearing Vienna, apartment clearing, household dissolution, basement clearing, clearing Austria, removal Vienna, hoarder clearing, estate clearing, commercial clearing, clearing company Vienna';

    const alternateUrls = getAlternateUrls(location);

    updateMetaTags({
      title,
      description,
      url: location,
      keywords,
      language,
      alternateUrls,
    });

    addMultipleJsonLd([
      getLocalBusinessSchema(language),
      getOrganizationSchema(),
    ], 'home-page-schemas');
  }, [language, location]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Gallery />
        <Services />
        <TrustStats />
        <WhyUs />
        <SEOContent />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
