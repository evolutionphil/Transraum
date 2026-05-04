import { useState } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  CheckCircle, Phone, Truck, Home, ArrowRight, Star, Shield, Clock, ChevronRight
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CONTACT_INFO } from '@/lib/constants';
import { shopPackages, type PackageCategory } from '@/data/shopPackages';
import { useEffect } from 'react';
import { updateMetaTags, addMultipleJsonLd, getFAQSchema, getBreadcrumbSchema, getCollectionPageSchema } from '@/lib/seo';
import { getAlternateUrls } from '@/lib/urlMapping';
import { useLocation } from 'wouter';

const categoryIcons = {
  transport: Truck,
  raeumung: Home,
};

export default function Shop() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<PackageCategory | 'all'>('all');

  const isDE = language === 'de';
  const shopPath = isDE ? '/de/pakete' : '/en/packages';

  const labels = {
    hero: isDE
      ? { title: 'Unsere Festpreis-Pakete', sub: 'Transparente Preise. Kein Verstecktes. Sofort buchbar.', desc: 'Wählen Sie Ihr passendes Paket – für Transport, Räumung oder Wohnungsauflösung in Wien und ganz Österreich.' }
      : { title: 'Our Fixed-Price Packages', sub: 'Transparent pricing. Nothing hidden. Book instantly.', desc: 'Choose your suitable package – for transport, clearance or apartment dissolution in Vienna and throughout Austria.' },
    all: isDE ? 'Alle Pakete' : 'All Packages',
    transport: isDE ? 'Transport' : 'Transport',
    raeumung: isDE ? 'Räumung' : 'Clearance',
    from: isDE ? 'ab' : 'from',
    details: isDE ? 'Paket ansehen' : 'View Package',
    workers: isDE ? 'Helfer' : 'helpers',
    included: isDE ? 'Inklusive' : 'Included',
    popular: isDE ? 'Unser beliebtestes Paket' : 'Our most popular package',
    trustTitle: isDE ? 'Warum Transraum?' : 'Why Transraum?',
    trust: isDE
      ? [
          { icon: Shield, t: 'Haftpflichtversichert', d: 'Alle Pakete inkl. Versicherung' },
          { icon: Clock, t: 'Kurzfristige Termine', d: 'Oft schon am nächsten Tag' },
          { icon: Star, t: '26+ Jahre Erfahrung', d: 'In Wien und ganz Österreich' },
          { icon: CheckCircle, t: 'Festpreisgarantie', d: 'Keine versteckten Kosten' },
        ]
      : [
          { icon: Shield, t: 'Liability insured', d: 'All packages incl. insurance' },
          { icon: Clock, t: 'Short-notice bookings', d: 'Often available next day' },
          { icon: Star, t: '26+ years experience', d: 'In Vienna and all of Austria' },
          { icon: CheckCircle, t: 'Fixed-price guarantee', d: 'No hidden costs' },
        ],
    ctaTitle: isDE ? 'Individuelles Angebot gewünscht?' : 'Need a custom quote?',
    ctaDesc: isDE
      ? 'Passt kein Paket genau? Rufen Sie uns an – wir erstellen innerhalb von 2 Stunden ein maßgeschneidertes Angebot.'
      : 'No package fits exactly? Call us – we create a tailored offer within 2 hours.',
    ctaBtn: isDE ? 'Jetzt anrufen' : 'Call now',
  };

  const [location] = useLocation();
  const alternateUrls = getAlternateUrls(location);

  useEffect(() => {
    const title = isDE ? 'Pakete & Festpreise – Transport & Räumung Wien | Transraum' : 'Packages & Fixed Prices – Transport & Clearance Vienna | Transraum';
    const description = isDE
      ? 'Transraum Festpreis-Pakete: Transport ab €129, Räumung ab €249 – Wien & Österreich. Transparent, versichert, sofort buchbar.'
      : 'Transraum fixed-price packages: Transport from €129, Clearance from €249 – Vienna & Austria. Transparent, insured, instant booking.';

    updateMetaTags({ title, description, url: shopPath, language, alternateUrls });

    const faqData = isDE ? [
      { question: 'Was beinhalten die Festpreis-Pakete?', answer: 'Unsere Pakete enthalten alle Leistungen im Festpreis – Arbeitskräfte, Fahrzeug, Entsorgung und besenreine Übergabe. Keine versteckten Kosten.' },
      { question: 'Wie kann ich ein Paket buchen?', answer: 'Sie können uns anrufen (+43 660 6926375), per WhatsApp kontaktieren oder das Kontaktformular verwenden. Wir erstellen Ihnen innerhalb von 2 Stunden ein verbindliches Angebot.' },
      { question: 'Was ist im Transportpaket ab €129 enthalten?', answer: 'Das Transportpaket beinhaltet 2 Helfer, ein geeignetes Fahrzeug für 2 Stunden und Transport innerhalb Wiens. Für größere Distanzen oder mehr Zeit passen wir das Angebot individuell an.' },
      { question: 'Kann ich das Paket kurzfristig buchen?', answer: 'Ja, wir bieten oft noch am nächsten Tag verfügbare Termine. Bei besonders dringenden Anfragen versuchen wir auch am gleichen Tag zu helfen.' },
    ] : [
      { question: 'What do the fixed-price packages include?', answer: 'Our packages include all services at a fixed price – workers, vehicle, disposal and broom-clean handover. No hidden costs.' },
      { question: 'How can I book a package?', answer: 'You can call us (+43 660 6926375), contact us via WhatsApp or use the contact form. We provide a binding quote within 2 hours.' },
      { question: 'What is included in the transport package from €129?', answer: 'The transport package includes 2 helpers, a suitable vehicle for 2 hours and transport within Vienna. For larger distances or more time we adapt the offer individually.' },
      { question: 'Can I book a package on short notice?', answer: 'Yes, we often have availability the next day. For urgent requests we try to help the same day.' },
    ];

    const collectionSchema = getCollectionPageSchema(language, {
      name: isDE ? 'Festpreis-Pakete' : 'Fixed-Price Packages',
      description,
      url: shopPath,
      items: shopPackages.map(p => ({
        name: isDE ? p.de.name : p.en.name,
        description: isDE ? p.de.description : p.en.description,
        url: isDE ? `/de/pakete/${p.slugDe}` : `/en/packages/${p.slugEn}`,
      })),
    });

    const breadcrumb = getBreadcrumbSchema([
      { name: isDE ? 'Startseite' : 'Home', url: isDE ? '/de' : '/en' },
      { name: isDE ? 'Pakete' : 'Packages', url: shopPath },
    ]);

    addMultipleJsonLd([collectionSchema, getFAQSchema(faqData), breadcrumb], 'shop-page-schemas');
  }, [language]);

  const filtered = activeCategory === 'all'
    ? shopPackages
    : shopPackages.filter(p => p.category === activeCategory);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="mb-4 bg-[hsl(46,100%,50%)] text-black font-semibold px-4 py-1 text-sm uppercase tracking-wide">
              Festpreise 2025
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              {labels.hero.title}
            </h1>
            <p className="text-xl font-medium text-yellow-400 mb-3">{labels.hero.sub}</p>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">{labels.hero.desc}</p>
          </div>
        </section>

        {/* Trust bar */}
        <div className="bg-[hsl(46,100%,50%)] py-3">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-6 text-black text-sm font-semibold">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> Haftpflichtversichert</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> Festpreisgarantie</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{isDE ? 'Kurzfristige Termine' : 'Short-notice'}</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4" />26+ Jahre Erfahrung</span>
            <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" />{CONTACT_INFO.phone}</span>
          </div>
        </div>

        {/* Category filter */}
        <div className="bg-white border-b border-border sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2">
            {(['all', 'transport', 'raeumung'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-testid={`filter-${cat}`}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? labels.all : cat === 'transport' ? labels.transport : labels.raeumung}
              </button>
            ))}
          </div>
        </div>

        {/* Packages grid */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((pkg) => {
                const content = language === 'de' ? pkg.de : pkg.en;
                const slug = language === 'de' ? pkg.slugDe : pkg.slugEn;
                const basePath = language === 'de' ? '/de/pakete' : '/en/packages';
                const Icon = categoryIcons[pkg.category];
                const isBestseller = pkg.id === 'transport-m' || pkg.id === 'raeumung-m';

                return (
                  <Card
                    key={pkg.id}
                    data-testid={`card-package-${pkg.id}`}
                    className={`relative overflow-hidden hover-elevate transition-shadow ${isBestseller ? 'ring-2 ring-[hsl(46,100%,50%)]' : ''}`}
                  >
                    {isBestseller && (
                      <div className="absolute top-0 left-0 right-0 bg-[hsl(46,100%,50%)] text-black text-xs font-bold text-center py-1 uppercase tracking-widest z-10">
                        {labels.popular}
                      </div>
                    )}

                    {/* Product image */}
                    <div className={`relative bg-gray-200 ${isBestseller ? 'mt-6' : ''}`} style={{ height: 220 }}>
                      <img
                        src={`/shop-images/${pkg.imageFile}`}
                        alt={content.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <div className="bg-[hsl(46,100%,50%)] rounded-md p-1.5">
                          <Icon className="w-4 h-4 text-black" />
                        </div>
                        <Badge className="bg-white/90 text-black text-xs font-bold">
                          {content.badge}
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-white rounded-md px-3 py-1.5 shadow">
                        <span className="text-xs text-gray-500">{labels.from}</span>
                        <span className="text-xl font-extrabold text-gray-900 ml-1">€{pkg.price}</span>
                      </div>
                    </div>

                    <CardContent className="p-5">
                      <h2 className="text-xl font-bold text-gray-900 mb-1">{content.name}</h2>
                      <p className="text-sm text-gray-500 mb-4">{content.tagline}</p>

                      {/* Specs row */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {pkg.specs.distance && (
                          <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-md">
                            {pkg.specs.distance}
                          </span>
                        )}
                        {pkg.specs.area && (
                          <span className="bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-md">
                            {pkg.specs.area}
                          </span>
                        )}
                        <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-md">
                          {pkg.specs.workers} {labels.workers}
                        </span>
                        <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-md">
                          {pkg.specs.duration}
                        </span>
                      </div>

                      {/* Top includes */}
                      <ul className="space-y-1.5 mb-5">
                        {content.includes.slice(0, 4).map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="flex gap-2">
                        <Link href={`${basePath}/${slug}`} className="flex-1">
                          <Button className="w-full" data-testid={`btn-package-details-${pkg.id}`}>
                            {labels.details}
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                        <a href={`tel:${CONTACT_INFO.phoneLink}`}>
                          <Button variant="outline" size="icon" data-testid={`btn-package-call-${pkg.id}`}>
                            <Phone className="w-4 h-4" />
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trust section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">{labels.trustTitle}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {labels.trust.map(({ icon: Icon, t, d }, i) => (
                <div key={i} className="text-center p-6 rounded-md bg-gray-50">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-[hsl(46,100%,50%)] mb-3">
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                  <div className="font-bold text-gray-900 mb-1">{t}</div>
                  <div className="text-sm text-gray-500">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-3">{labels.ctaTitle}</h2>
            <p className="text-gray-300 mb-8">{labels.ctaDesc}</p>
            <a href={`tel:${CONTACT_INFO.phoneLink}`}>
              <Button size="lg" className="bg-[hsl(46,100%,50%)] text-black hover:bg-[hsl(46,100%,45%)] font-bold text-base px-8" data-testid="btn-shop-cta-call">
                <Phone className="w-5 h-5 mr-2" />
                {labels.ctaBtn}: {CONTACT_INFO.phone}
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
