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
import { updateMetaTags, addMultipleJsonLd, getLocalBusinessSchema, getOrganizationSchema, getFAQSchema, getBreadcrumbSchema } from '@/lib/seo';
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

    const faqData = language === 'de' ? [
      { question: 'Was kostet eine Wohnungsräumung in Wien?', answer: 'Eine Wohnungsräumung in Wien kostet je nach Größe und Zustand ab ca. 500 €. Nach einer kostenlosen Besichtigung erhalten Sie ein verbindliches Festpreisangebot ohne versteckte Kosten.' },
      { question: 'Wie schnell können Sie mit der Räumung beginnen?', answer: 'In der Regel können wir innerhalb von 24 bis 48 Stunden nach der Besichtigung mit der Räumung beginnen. Bei Notfällen sind wir oft noch schneller verfügbar.' },
      { question: 'Arbeiten Sie in allen Wiener Bezirken?', answer: 'Ja, Transraum ist in allen 23 Wiener Bezirken tätig – vom 1. Bezirk (Innere Stadt) bis zum 23. Bezirk (Liesing). Wir kommen auch in die Umlandgemeinden.' },
      { question: 'Bieten Sie auch Entrümpelung in ganz Österreich an?', answer: 'Ja, wir sind österreichweit tätig – in allen 9 Bundesländern. Neben Wien bedienen wir Niederösterreich, Oberösterreich, Steiermark, Tirol, Salzburg und alle weiteren Bundesländer.' },
      { question: 'Was passiert mit den geräumten Gegenständen?', answer: 'Wertvolle Möbel und Gegenstände können wir ankaufen oder für Sie verwerten. Brauchbares geht an karitative Organisationen. Nicht mehr Verwertbares wird ordnungsgemäß entsorgt.' },
    ] : [
      { question: 'How much does apartment clearing in Vienna cost?', answer: 'Apartment clearing in Vienna costs from around €500 depending on size and condition. After a free inspection you receive a binding fixed-price quote with no hidden costs.' },
      { question: 'How quickly can you start the clearing?', answer: 'We can usually start within 24 to 48 hours after the inspection. For emergencies we are often available even faster.' },
      { question: 'Do you work in all Vienna districts?', answer: 'Yes, Transraum operates in all 23 Vienna districts – from the 1st district (Inner City) to the 23rd district (Liesing). We also serve surrounding municipalities.' },
      { question: 'Do you offer clearing throughout Austria?', answer: 'Yes, we operate nationwide across all 9 Austrian federal states. Besides Vienna we serve Lower Austria, Upper Austria, Styria, Tyrol, Salzburg and all other states.' },
      { question: 'What happens to the cleared items?', answer: 'Valuable furniture and items can be purchased or sold for you. Usable items go to charitable organizations. Items that cannot be reused are disposed of properly.' },
    ];

    const breadcrumb = getBreadcrumbSchema([
      { name: language === 'de' ? 'Startseite' : 'Home', url: language === 'de' ? '/de' : '/en' },
    ]);

    addMultipleJsonLd([
      getLocalBusinessSchema(language),
      getOrganizationSchema(),
      getFAQSchema(faqData),
      breadcrumb,
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
