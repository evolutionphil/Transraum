import { useEffect } from 'react';
import { Link, useRoute, useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  CheckCircle, XCircle, Phone, Truck, Home, ArrowRight, Star, Shield,
  Clock, ChevronRight, Users, MapPin, Timer, Package
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { CONTACT_INFO } from '@/lib/constants';
import { getPackageBySlug, shopPackages, type ShopPackage } from '@/data/shopPackages';
import { updateMetaTags, addMultipleJsonLd } from '@/lib/seo';

export default function ShopProduct() {
  const { language } = useLanguage();
  const [location] = useLocation();

  const [matchDe] = useRoute('/de/pakete/:slug');
  const [matchEn] = useRoute('/en/packages/:slug');
  const [matchShort] = useRoute('/pakete/:slug');

  const slug = location.split('/').pop() || '';
  const pkg: ShopPackage | undefined = getPackageBySlug(slug, language);

  const isDE = language === 'de';

  const labels = {
    breadcrumb: isDE
      ? [{ label: 'Start', href: '/' }, { label: 'Pakete', href: '/de/pakete' }]
      : [{ label: 'Home', href: '/en' }, { label: 'Packages', href: '/en/packages' }],
    from: isDE ? 'ab' : 'from',
    callNow: isDE ? 'Jetzt anrufen' : 'Call now',
    requestOffer: isDE ? 'Angebot anfordern' : 'Request offer',
    includedTitle: isDE ? 'Das ist inklusive' : 'What is included',
    notIncludedTitle: isDE ? 'Nicht inklusive' : 'Not included',
    stepsTitle: isDE ? 'So läuft es ab' : 'How it works',
    specsTitle: isDE ? 'Paket-Details' : 'Package details',
    faqTitle: isDE ? 'Häufige Fragen' : 'Frequently asked questions',
    relatedTitle: isDE ? 'Weitere Pakete' : 'More packages',
    workers: isDE ? 'Helfer' : 'helpers',
    vehicle: isDE ? 'Fahrzeug' : 'Vehicle',
    duration: isDE ? 'Dauer' : 'Duration',
    distance: isDE ? 'Reichweite' : 'Range',
    area: isDE ? 'Fläche' : 'Area',
    reviewsTitle: isDE ? 'Kundenstimmen' : 'Customer reviews',
    stickyCall: isDE ? 'Direkt anrufen' : 'Call directly',
    stickyRequest: isDE ? 'Anfrage senden' : 'Send request',
    stickyNote: isDE ? 'Antwort innerhalb 2 Stunden' : 'Response within 2 hours',
    notFound: isDE ? 'Paket nicht gefunden.' : 'Package not found.',
    backToShop: isDE ? 'Alle Pakete ansehen' : 'View all packages',
    guarantee: isDE
      ? ['Festpreisgarantie', 'Haftpflichtversichert', 'Kurzfristige Termine', '26+ Jahre Erfahrung']
      : ['Fixed-price guarantee', 'Liability insured', 'Short-notice bookings', '26+ years experience'],
    reviewsList: [
      { name: 'Markus W.', rating: 5, text: isDE ? 'Absolut professionell und pünktlich. Das Team hat alles sorgfältig transportiert. Klare Empfehlung!' : 'Absolutely professional and on time. The team transported everything carefully. Clear recommendation!' },
      { name: 'Sandra K.', rating: 5, text: isDE ? 'Faire Preise, freundliches Team, super schnell. Räumung war in 4 Stunden erledigt.' : 'Fair prices, friendly team, super fast. Clearance was done in 4 hours.' },
      { name: 'Thomas R.', rating: 5, text: isDE ? 'Haben uns den Umzug wirklich erleichtert. Kein Stress, alles lief wie geplant.' : 'They really made our move easier. No stress, everything went as planned.' },
    ],
  };

  useEffect(() => {
    if (!pkg) return;
    const content = language === 'de' ? pkg.de : pkg.en;
    const slug = language === 'de' ? pkg.slugDe : pkg.slugEn;
    const basePath = language === 'de' ? '/de/pakete' : '/en/packages';
    const pageUrl = `${basePath}/${slug}`;

    updateMetaTags({
      title: content.metaTitle,
      description: content.metaDescription,
      url: pageUrl,
      language,
      keywords: content.keywords,
    });

    // Google Merchant Center compatible Product schema
    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: content.name,
      description: content.description,
      image: `https://transraum.com/shop-images/${pkg.imageFile}`,
      brand: { '@type': 'Brand', name: 'Transraum' },
      sku: pkg.id,
      mpn: pkg.id,
      url: `https://transraum.com${pageUrl}`,
      offers: {
        '@type': 'Offer',
        price: pkg.price.toString(),
        priceCurrency: 'EUR',
        priceValidUntil: '2025-12-31',
        availability: 'https://schema.org/InStock',
        url: `https://transraum.com${pageUrl}`,
        seller: {
          '@type': 'Organization',
          name: 'Transraum – Golden Trend Armaturen GmbH',
          telephone: CONTACT_INFO.phone,
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: pkg.price,
          priceCurrency: 'EUR',
          valueAddedTaxIncluded: true,
        },
      },
      provider: {
        '@type': 'LocalBusiness',
        name: 'Transraum',
        telephone: CONTACT_INFO.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: CONTACT_INFO.address.street,
          postalCode: CONTACT_INFO.address.postalCode,
          addressLocality: CONTACT_INFO.address.city,
          addressCountry: 'AT',
        },
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        reviewCount: '47',
        bestRating: '5',
        worstRating: '1',
      },
    };
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: isDE ? 'Start' : 'Home', item: 'https://transraum.com' },
        { '@type': 'ListItem', position: 2, name: isDE ? 'Pakete' : 'Packages', item: `https://transraum.com${basePath}` },
        { '@type': 'ListItem', position: 3, name: content.name, item: `https://transraum.com${pageUrl}` },
      ],
    };

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: (pkg.faq || []).map((item: { question: string; answer: string }) => ({
        '@type': 'Question',
        name: isDE ? item.question : item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    };

    addMultipleJsonLd([productSchema, breadcrumbSchema, ...(pkg.faq?.length ? [faqSchema] : [])], 'shop-product-schemas');
  }, [pkg, language]);

  if (!pkg) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 mb-4">{labels.notFound}</p>
            <Link href={isDE ? '/de/pakete' : '/en/packages'}>
              <Button>{labels.backToShop}</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const content = language === 'de' ? pkg.de : pkg.en;
  const relatedPackages = shopPackages.filter(p => p.id !== pkg.id && p.category === pkg.category);

  return (
    <>
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
            {labels.breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <ChevronRight className="w-4 h-4" />}
                <Link href={item.href} className="hover:text-gray-900 transition-colors">{item.label}</Link>
              </span>
            ))}
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{content.name}</span>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-gray-50 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left: image */}
              <div className="relative rounded-md overflow-hidden bg-gray-200" style={{ minHeight: 360 }}>
                <img
                  src={`/shop-images/${pkg.imageFile}`}
                  alt={content.name}
                  className="w-full h-full object-cover"
                  style={{ minHeight: 360 }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <Badge className="absolute top-4 left-4 bg-[hsl(46,100%,50%)] text-black font-bold text-sm px-4 py-1.5">
                  {content.badge}
                </Badge>
              </div>

              {/* Right: content */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {pkg.category === 'transport' ? (isDE ? 'Transport' : 'Transport') : (isDE ? 'Räumung' : 'Clearance')}
                  </Badge>
                  {(pkg.id === 'transport-m' || pkg.id === 'raeumung-m') && (
                    <Badge className="bg-green-600 text-white text-xs">Bestseller</Badge>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">{content.name}</h1>
                <p className="text-lg text-gray-600 mb-6">{content.tagline}</p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-gray-500 text-lg">{labels.from}</span>
                  <span className="text-5xl font-extrabold text-gray-900">€{pkg.price}</span>
                  <span className="text-gray-400 text-sm">inkl. MwSt.</span>
                </div>

                {/* Spec pills */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {pkg.specs.distance && (
                    <div className="flex items-center gap-1.5 bg-blue-50 text-blue-800 px-3 py-2 rounded-md text-sm font-medium">
                      <MapPin className="w-4 h-4" />
                      {pkg.specs.distance}
                    </div>
                  )}
                  {pkg.specs.area && (
                    <div className="flex items-center gap-1.5 bg-green-50 text-green-800 px-3 py-2 rounded-md text-sm font-medium">
                      <Home className="w-4 h-4" />
                      {pkg.specs.area}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    <Users className="w-4 h-4" />
                    {pkg.specs.workers} {labels.workers}
                  </div>
                  <div className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    <Truck className="w-4 h-4" />
                    {pkg.specs.vehicle}
                  </div>
                  <div className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    <Timer className="w-4 h-4" />
                    {pkg.specs.duration}
                  </div>
                </div>

                {/* Guarantee pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {labels.guarantee.map((g, i) => (
                    <span key={i} className="flex items-center gap-1 text-xs bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-md font-medium">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                      {g}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <a href={`tel:${CONTACT_INFO.phoneLink}`} className="flex-1 min-w-[160px]">
                    <Button size="lg" className="w-full bg-gray-900 text-white font-bold text-base" data-testid="btn-product-call">
                      <Phone className="w-5 h-5 mr-2" />
                      {labels.callNow}
                    </Button>
                  </a>
                  <a href={`tel:${CONTACT_INFO.phoneLink}`} className="flex-1 min-w-[160px]">
                    <Button size="lg" variant="outline" className="w-full font-bold text-base border-2" data-testid="btn-product-request">
                      {labels.requestOffer}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main content + sticky sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: main content */}
            <div className="lg:col-span-2 space-y-8">

              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <p className="text-gray-700 text-lg leading-relaxed">{content.description}</p>
                </CardContent>
              </Card>

              {/* Included */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    {labels.includedTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {content.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 bg-green-50 rounded-md px-4 py-3">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-800 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Not included */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-xl text-gray-600">
                    <XCircle className="w-5 h-5 text-gray-400" />
                    {labels.notIncludedTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <ul className="space-y-2">
                    {content.notIncludes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-500">
                        <XCircle className="w-4 h-4 text-gray-300 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Steps */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">{labels.stepsTitle}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="space-y-6">
                    {content.steps.map((step, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-md bg-[hsl(46,100%,50%)] flex items-center justify-center font-extrabold text-black text-lg">
                          {i + 1}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">{labels.faqTitle}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <Accordion type="single" collapsible className="w-full">
                    {content.faq.map((item, i) => (
                      <AccordionItem key={i} value={`faq-${i}`}>
                        <AccordionTrigger className="text-left font-medium text-gray-900 hover:no-underline">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              {/* Reviews */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    {labels.reviewsTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {labels.reviewsList.map((review, i) => (
                      <div key={i} className="bg-gray-50 rounded-md p-4">
                        <div className="flex gap-0.5 mb-2">
                          {Array(review.rating).fill(0).map((_, s) => (
                            <Star key={s} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                        <p className="text-sm text-gray-700 mb-2 italic">"{review.text}"</p>
                        <p className="text-xs text-gray-500 font-semibold">– {review.name}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Related */}
              {relatedPackages.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">{labels.relatedTitle}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedPackages.map(related => {
                      const rc = language === 'de' ? related.de : related.en;
                      const rSlug = language === 'de' ? related.slugDe : related.slugEn;
                      const basePath = language === 'de' ? '/de/pakete' : '/en/packages';
                      return (
                        <Link key={related.id} href={`${basePath}/${rSlug}`}>
                          <Card className="hover-elevate cursor-pointer">
                            <CardContent className="p-4 flex items-center gap-4">
                              <div className="bg-gray-200 rounded-md w-16 h-16 flex-shrink-0 overflow-hidden">
                                <img src={`/shop-images/${related.imageFile}`} alt={rc.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                              </div>
                              <div>
                                <p className="font-bold text-gray-900 text-sm">{rc.name}</p>
                                <p className="text-xs text-gray-500">{labels.from} €{related.price}</p>
                              </div>
                              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto flex-shrink-0" />
                            </CardContent>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right: sticky sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-4">
                <Card className="border-2 border-gray-900 shadow-lg">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-gray-500 text-sm mb-1">{labels.from}</div>
                      <div className="text-4xl font-extrabold text-gray-900">€{pkg.price}</div>
                      <div className="text-xs text-gray-400 mt-1">inkl. MwSt.</div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <a href={`tel:${CONTACT_INFO.phoneLink}`} className="block">
                        <Button size="lg" className="w-full bg-[hsl(46,100%,50%)] text-black hover:bg-[hsl(46,100%,45%)] font-bold text-base" data-testid="btn-sidebar-call">
                          <Phone className="w-5 h-5 mr-2" />
                          {labels.stickyCall}
                        </Button>
                      </a>
                      <a href={`tel:${CONTACT_INFO.phoneLink}`} className="block">
                        <Button size="lg" variant="outline" className="w-full font-bold border-2" data-testid="btn-sidebar-request">
                          {labels.stickyRequest}
                        </Button>
                      </a>
                    </div>

                    <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {labels.stickyNote}
                    </p>

                    <div className="mt-5 pt-5 border-t border-border space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">{labels.workers}</span>
                        <span className="font-medium">{pkg.specs.workers}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">{labels.vehicle}</span>
                        <span className="font-medium">{pkg.specs.vehicle}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">{labels.duration}</span>
                        <span className="font-medium">{pkg.specs.duration}</span>
                      </div>
                      {pkg.specs.distance && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">{labels.distance}</span>
                          <span className="font-medium">{pkg.specs.distance}</span>
                        </div>
                      )}
                      {pkg.specs.area && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">{labels.area}</span>
                          <span className="font-medium">{pkg.specs.area}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Trust badges */}
                <Card>
                  <CardContent className="p-4 space-y-3">
                    {[
                      { icon: Shield, label: isDE ? 'Haftpflichtversichert' : 'Liability insured' },
                      { icon: CheckCircle, label: isDE ? 'Festpreisgarantie' : 'Fixed price guarantee' },
                      { icon: Clock, label: isDE ? 'Kurzfristige Termine' : 'Short-notice available' },
                      { icon: Star, label: isDE ? '26+ Jahre Erfahrung' : '26+ years experience' },
                    ].map(({ icon: Icon, label }, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                        <Icon className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{label}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className="bg-gray-900 rounded-md p-4 text-center text-white">
                  <Phone className="w-5 h-5 mx-auto mb-2 text-[hsl(46,100%,50%)]" />
                  <p className="text-xs text-gray-400 mb-1">{isDE ? 'Direkt anrufen' : 'Call directly'}</p>
                  <a href={`tel:${CONTACT_INFO.phoneLink}`} className="text-lg font-bold text-white hover:text-yellow-400 transition-colors">
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
