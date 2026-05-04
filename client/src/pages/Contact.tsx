import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { updateMetaTags, addMultipleJsonLd, getLocalBusinessSchema, getWebPageSchema, getFAQSchema, getBreadcrumbSchema } from '@/lib/seo';
import { CONTACT_INFO } from '@/lib/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, Clock } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { getLocalizedContactPath, getAlternateUrls } from '@/lib/urlMapping';

export default function Contact() {
  const { t, language } = useLanguage();
  const [location] = useLocation();
  const contactPath = getLocalizedContactPath(language);
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.phoneLink}?text=${encodeURIComponent(t.contact.whatsappMessage)}`;

  useEffect(() => {
    const title = language === 'de' 
      ? 'Kontakt – Transraum | Räumung & Transport Wien'
      : 'Contact – Transraum | Clearing & Transport Vienna';
    
    const description = language === 'de'
      ? `Kontaktieren Sie Transraum für professionelle Räumung in Wien und ganz Österreich ✓ Kostenlose Beratung ✓ Schnelle Termine ✓ 24/7 Erreichbar ☎ ${CONTACT_INFO.phone}`
      : `Contact Transraum for professional clearing services in Vienna and throughout Austria ✓ Free consultation ✓ Fast appointments ✓ 24/7 available ☎ ${CONTACT_INFO.phone}`;

    const alternateUrls = getAlternateUrls(location);

    updateMetaTags({
      title,
      description,
      url: location,
      type: 'website',
      language,
      alternateUrls,
    });

    const faqData = language === 'de' ? [
      { question: 'Wie kann ich Transraum kontaktieren?', answer: 'Sie erreichen uns telefonisch unter +43 660 6926375 (24/7), per WhatsApp oder über das Kontaktformular auf unserer Website. Wir antworten in der Regel innerhalb von 2 Stunden.' },
      { question: 'Bieten Sie kostenlose Besichtigungen an?', answer: 'Ja, wir bieten kostenlose und unverbindliche Besichtigungen in ganz Wien und Österreich an. Nach der Besichtigung erhalten Sie ein verbindliches Festpreisangebot.' },
      { question: 'Wie schnell erhalte ich einen Termin?', answer: 'Wir vergeben Termine oft schon am nächsten Tag. Bei dringenden Fällen kommen wir auch am gleichen Tag. Rufen Sie uns einfach an: +43 660 6926375.' },
      { question: 'In welchen Sprachen kann ich mit Transraum kommunizieren?', answer: 'Wir sprechen Deutsch und Englisch. Unser Team steht Ihnen in beiden Sprachen zur Verfügung.' },
    ] : [
      { question: 'How can I contact Transraum?', answer: 'You can reach us by phone at +43 660 6926375 (24/7), via WhatsApp, or through the contact form on our website. We usually respond within 2 hours.' },
      { question: 'Do you offer free inspections?', answer: 'Yes, we offer free and non-binding inspections throughout Vienna and Austria. After the inspection you receive a binding fixed-price quote.' },
      { question: 'How quickly can I get an appointment?', answer: 'We often schedule appointments as soon as the next day. For urgent cases we can come the same day. Just call us: +43 660 6926375.' },
      { question: 'What languages does Transraum speak?', answer: 'We speak German and English. Our team is available in both languages.' },
    ];

    const breadcrumb = getBreadcrumbSchema([
      { name: language === 'de' ? 'Startseite' : 'Home', url: language === 'de' ? '/de' : '/en' },
      { name: language === 'de' ? 'Kontakt' : 'Contact', url: location },
    ]);

    addMultipleJsonLd([
      getLocalBusinessSchema(language),
      getWebPageSchema(language, {
        type: 'ContactPage',
        name: language === 'de' ? 'Kontakt' : 'Contact',
        description,
        url: location,
      }),
      getFAQSchema(faqData),
      breadcrumb,
    ], 'contact-page-schemas');
  }, [language, location, contactPath, t]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-contact-title">
              {t.contact.title}
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-primary-foreground/90">
              {t.contact.subtitle}
            </p>
            <p className="text-lg max-w-3xl mx-auto text-primary-foreground/80">
              {t.contact.description}
            </p>
            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a href={`tel:${CONTACT_INFO.phoneLink}`}>
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary w-full sm:w-auto text-base font-bold" data-testid="button-hero-phone">
                  <Phone className="mr-2 w-5 h-5" />
                  {CONTACT_INFO.phone}
                </Button>
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm w-full sm:w-auto" data-testid="button-hero-whatsapp">
                  <SiWhatsapp className="mr-2 w-5 h-5" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Phone Card */}
            <Card className="hover-elevate" data-testid="card-phone-info">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t.contact.phone}</CardTitle>
                <CardDescription>24/7 {t.contact.available247}</CardDescription>
              </CardHeader>
              <CardContent>
                <a href={`tel:${CONTACT_INFO.phoneLink}`} data-testid="link-phone">
                  <Button size="lg" className="w-full font-bold text-base" data-testid="button-call-contact">
                    <Phone className="mr-2 w-5 h-5" />
                    {CONTACT_INFO.phone}
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* WhatsApp Card */}
            <Card className="hover-elevate" data-testid="card-whatsapp-info">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mb-4">
                  <SiWhatsapp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t.contact.whatsapp}</CardTitle>
                <CardDescription>{t.contact.directMessage}</CardDescription>
              </CardHeader>
              <CardContent>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" data-testid="link-whatsapp">
                  <Button size="lg" variant="outline" className="w-full font-bold text-base" data-testid="button-whatsapp-contact">
                    <SiWhatsapp className="mr-2 w-5 h-5" />
                    {language === 'de' ? 'Jetzt auf WhatsApp schreiben' : 'Message us on WhatsApp'}
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Opening Hours */}
            <Card data-testid="card-opening-hours">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t.contact.hours.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">{t.contact.hours.weekdays}:</span>
                  <span className="text-muted-foreground">{t.contact.hours.weekdaysTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">{t.contact.hours.saturday}:</span>
                  <span className="text-muted-foreground">{t.contact.hours.saturdayTime}</span>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-sm font-semibold text-primary">{t.contact.hours.emergency}</p>
                </div>
              </CardContent>
            </Card>

            {/* Address */}
            <Card data-testid="card-address">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{t.contact.coverage.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {t.contact.coverage.description}
                </p>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">{t.contact.headquarters}:</p>
                  <p className="text-muted-foreground">
                    {CONTACT_INFO.address.street}<br />
                    {CONTACT_INFO.address.postalCode} {CONTACT_INFO.address.city}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Call CTA */}
            <Card className="bg-secondary text-secondary-foreground" data-testid="card-quick-call">
              <CardContent className="pt-6 space-y-4">
                <h3 className="font-bold text-lg">
                  {t.contact.immediateContact}
                </h3>
                <p className="text-sm">
                  {t.contact.callNowForConsultation}
                </p>
                <a href={`tel:${CONTACT_INFO.phoneLink}`} className="block">
                  <Button variant="outline" size="lg" className="w-full bg-background text-foreground hover:bg-background font-bold" data-testid="button-quick-call">
                    <Phone className="w-4 h-4 mr-2" />
                    {CONTACT_INFO.phone}
                  </Button>
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
                  <Button variant="outline" size="lg" className="w-full bg-background text-foreground hover:bg-background" data-testid="button-quick-whatsapp">
                    <SiWhatsapp className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-12 bg-background" data-testid="section-map">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center" data-testid="heading-map">
            {language === 'de' ? 'Unser Standort' : 'Our Location'}
          </h2>
          <p className="text-center text-muted-foreground mb-8" data-testid="text-map-address">
            {CONTACT_INFO.address.street}, {CONTACT_INFO.address.postalCode} {CONTACT_INFO.address.city}
          </p>
          <div className="rounded-md overflow-hidden border shadow-sm" data-testid="map-embed">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2655.1!2d16.6!3d48.31!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zR2V3ZXJiZXBhcmtzdHJhw59lIDIxLzIzLCAyMjMxIFN0cmFzc2hvZiBhbiBkZXIgTm9yZGJhaG4!5e0!3m2!1sde!2sat!4v1714300000000!5m2!1sde!2sat&q=Gewerbeparkstra%C3%9Fe+21%2F23%2C+2231+Strasshof+an+der+Nordbahn%2C+Austria"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={language === 'de' ? 'Transraum Standort in Strasshof an der Nordbahn' : 'Transraum location in Strasshof an der Nordbahn'}
            />
          </div>
          <div className="mt-6 text-center">
            <a
              href="https://maps.google.com/?q=Gewerbeparkstra%C3%9Fe+21%2F23,+2231+Strasshof+an+der+Nordbahn"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-open-maps"
            >
              <Button variant="outline" data-testid="button-open-maps">
                {language === 'de' ? 'In Google Maps öffnen' : 'Open in Google Maps'}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
