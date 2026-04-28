import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';

export default function SEOContent() {
  const { language } = useLanguage();
  
  const servicesPath = language === 'de' ? '/de/leistungen' : '/en/services';
  const districtsPath = language === 'de' ? '/de/bezirke' : '/en/districts';
  const statesPath = language === 'de' ? '/de/bundeslaender' : '/en/federal-states';
  const contactPath = language === 'de' ? '/de/kontakt' : '/en/contact';

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="prose prose-lg max-w-none">
          {language === 'de' ? (
            <>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Professionelle Räumungsdienste in Wien und ganz Österreich
              </h2>
              
              <div className="text-muted-foreground space-y-4 leading-relaxed">
                <p>
                  <strong>Transraum</strong> ist Ihr zuverlässiger Partner für professionelle{' '}
                  <Link href={servicesPath} className="text-primary hover:underline font-semibold">
                    Räumungen in Wien und ganz Österreich
                  </Link>
                  . Mit über 26 Jahren Erfahrung im Bereich Wohnungsräumung, Haushaltsauflösung und Entrümpelung haben wir uns als 
                  führende Räumungsfirma in Österreich etabliert. Unser erfahrenes Team steht Ihnen mit Rat und Tat zur Seite, wenn 
                  es darum geht, Ihre Immobilie schnell, sauber und professionell zu räumen.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                  Umfassende Räumungsdienstleistungen für jeden Bedarf
                </h3>
                
                <p>
                  Ob{' '}
                  <Link href={`${districtsPath}/innere-stadt`} className="text-primary hover:underline">
                    Wohnungsräumung in Wien
                  </Link>
                  , Kellerräumung in{' '}
                  <Link href={`${statesPath}/niederoesterreich`} className="text-primary hover:underline">
                    Niederösterreich
                  </Link>
                  {' '}oder Geschäftsräumung in{' '}
                  <Link href={`${statesPath}/steiermark/graz`} className="text-primary hover:underline">
                    Graz
                  </Link>
                  {' '}– wir bieten maßgeschneiderte Lösungen für jeden Räumungsbedarf. Unsere{' '}
                  <Link href={servicesPath} className="text-primary hover:underline font-semibold">
                    Leistungen
                  </Link>
                  {' '}umfassen die komplette Entrümpelung von Wohnungen, Häusern, Kellern, 
                  Dachböden, Garagen und Geschäftsräumen. Dabei legen wir großen Wert auf eine fachgerechte und umweltfreundliche Verwertung 
                  aller Gegenstände. Wertvolle Möbel und Antiquitäten können wir auf Wunsch auch ankaufen.
                </p>

                <p>
                  Besonders bei Verlassenschaftsräumungen gehen wir mit höchster Sensibilität und Diskretion vor. Wir wissen, wie emotional 
                  belastend die Auflösung eines Haushalts nach einem Todesfall sein kann und unterstützen Sie einfühlsam bei diesem schwierigen 
                  Prozess. Unser Team arbeitet respektvoll mit Ihren Erinnerungsstücken und sorgt dafür, dass alles ordnungsgemäß sortiert und 
                  entsorgt wird.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                  Schnelle Terminvergabe und flexible Lösungen
                </h3>

                <p>
                  Zeit ist oft ein entscheidender Faktor bei Räumungen. Deshalb bieten wir kurzfristige Termine an und können in der Regel 
                  innerhalb von 24 bis 48 Stunden mit der Arbeit beginnen. Bei Notfällen sind wir sogar noch schneller vor Ort. Nach einer 
                  kostenlosen und unverbindlichen Besichtigung erstellen wir Ihnen ein transparentes Festpreisangebot ohne versteckte Kosten. 
                  So wissen Sie von Anfang an, welche Kosten auf Sie zukommen.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                  Faire Preise und transparente Abwicklung
                </h3>

                <p>
                  Bei uns gibt es keine bösen Überraschungen. Nach der kostenlosen Besichtigung vor Ort erhalten Sie ein klares Festpreisangebot. 
                  Die Kosten für eine Wohnungsräumung in Wien beginnen je nach Größe und Zustand der Immobilie bei etwa 500 Euro. Größere Projekte 
                  wie Hausräumungen oder Geschäftsauflösungen kalkulieren wir individuell. Dabei berücksichtigen wir auch den Verwertungswert 
                  vorhandener Gegenstände, was Ihre Kosten zusätzlich reduzieren kann.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                  Besenreine Übergabe garantiert
                </h3>

                <p>
                  Unser Qualitätsversprechen: Wir hinterlassen Ihre Räumlichkeiten in besenreinem Zustand. Das bedeutet, dass alle Gegenstände 
                  entfernt, Böden gefegt und die Immobilie für die Übergabe vorbereitet ist. Auf Wunsch dokumentieren wir den Vorher-Nachher-Zustand 
                  mit Fotos. So können Sie sicher sein, dass die Räumung zu Ihrer vollsten Zufriedenheit durchgeführt wurde.
                </p>

                <p>
                  <Link href={contactPath} className="text-primary hover:underline font-semibold">
                    Kontaktieren Sie uns
                  </Link>
                  {' '}noch heute für eine kostenlose Beratung und Besichtigung. Unser freundliches Team ist 24/7 für Sie 
                  erreichbar und beantwortet gerne all Ihre Fragen rund um das Thema Räumung, Entrümpelung und Transport in{' '}
                  <Link href={districtsPath} className="text-primary hover:underline">
                    Wien
                  </Link>
                  {' '}und ganz{' '}
                  <Link href={statesPath} className="text-primary hover:underline">
                    Österreich
                  </Link>.
                </p>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Professional Clearing Services in Vienna and Throughout Austria
              </h2>
              
              <div className="text-muted-foreground space-y-4 leading-relaxed">
                <p>
                  <strong>Transraum</strong> is your reliable partner for professional clearing services in Vienna and throughout Austria. 
                  With over 26 years of experience in apartment clearing, household dissolution, and decluttering, we have established ourselves 
                  as a leading clearing company in Austria. Our experienced team is here to help you clear your property quickly, cleanly, and 
                  professionally.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                  Comprehensive Clearing Services for Every Need
                </h3>
                
                <p>
                  Whether apartment clearing in Vienna, basement clearing in Lower Austria, or commercial clearing in Graz – we offer customized 
                  solutions for every clearing need. Our services include complete clearing of apartments, houses, basements, attics, garages, 
                  and commercial spaces. We place great emphasis on proper and environmentally friendly recycling of all items. Valuable furniture 
                  and antiques can also be purchased upon request.
                </p>

                <p>
                  We approach estate clearings with the utmost sensitivity and discretion. We understand how emotionally challenging the dissolution 
                  of a household after a death can be and support you compassionately through this difficult process. Our team works respectfully 
                  with your memorabilia and ensures that everything is properly sorted and processed.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                  Fast Scheduling and Flexible Solutions
                </h3>

                <p>
                  Time is often a crucial factor in clearings. That's why we offer short-notice appointments and can usually start work within 
                  24 to 48 hours. In emergencies, we can be on-site even faster. After a free and non-binding inspection, we provide you with 
                  a transparent fixed-price quote with no hidden costs. This way, you know from the start what costs to expect.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                  Fair Prices and Transparent Processing
                </h3>

                <p>
                  With us, there are no unpleasant surprises. After the free on-site inspection, you receive a clear fixed-price offer. The costs 
                  for apartment clearing in Vienna start at around 500 euros, depending on the size and condition of the property. Larger projects 
                  such as house clearings or commercial dissolutions are calculated individually. We also consider the resale value of existing 
                  items, which can further reduce your costs.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                  Broom-Clean Handover Guaranteed
                </h3>

                <p>
                  Our quality promise: We leave your premises in broom-clean condition. This means all items are removed, floors are swept, and 
                  the property is prepared for handover. Upon request, we document the before-and-after condition with photos. This ensures that 
                  the clearing is carried out to your complete satisfaction.
                </p>

                <p>
                  Contact us today for a free consultation and inspection. Our friendly team is available 24/7 and is happy to answer all your 
                  questions about clearing, decluttering, and transport in Vienna and throughout Austria.
                </p>
              </div>
            </>
          )}
        </article>
      </div>
    </section>
  );
}
