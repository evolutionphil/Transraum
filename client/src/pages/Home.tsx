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
      ? 'Räumung Wien & Österreich - Flächen Frei seit 1998'
      : 'Clearing Vienna & Austria - Flächen Frei since 1998';

    const description = language === 'de'
      ? 'Professionelle Räumung in Wien & Österreich seit 1998. Faire Festpreise, 24h-Service, kostenlose Besichtigung. ☎ +43 660 6926375'
      : 'Professional clearing company in Vienna & throughout Austria ⭐ 26+ years experience ⚡ Fair fixed prices with no surprises ✓ Free on-site consultation ✓ Fast appointments within 24h ✓ Guaranteed broom-clean handover. Get your free quote now!';

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
