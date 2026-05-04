import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { updateMetaTags, addMultipleJsonLd, getWebPageSchema, getBreadcrumbSchema } from '@/lib/seo';
import { getAlternateUrls } from '@/lib/urlMapping';
import { CONTACT_INFO } from '@/lib/constants';

export default function Impressum() {
  const { language } = useLanguage();
  const [location] = useLocation();

  useEffect(() => {
    const title = language === 'de'
      ? 'Impressum – Transraum | Räumung & Transport Wien'
      : 'Imprint – Transraum | Clearing & Transport Vienna';

    const description = language === 'de'
      ? 'Impressum und rechtliche Angaben von Transraum - Ihr Partner für Räumung und Transport in Österreich.'
      : 'Imprint and legal information of Transraum - Your partner for clearing and transport in Austria.';

    const alternateUrls = getAlternateUrls(location);

    updateMetaTags({
      title,
      description,
      url: location,
      language,
      alternateUrls,
    });

    const webPageSchema = getWebPageSchema(language, {
      type: 'AboutPage',
      name: language === 'de' ? 'Impressum' : 'Imprint',
      description,
      url: location,
    });

    const breadcrumb = getBreadcrumbSchema([
      { name: language === 'de' ? 'Startseite' : 'Home', url: language === 'de' ? '/de' : '/en' },
      { name: language === 'de' ? 'Impressum' : 'Imprint', url: location },
    ]);

    addMultipleJsonLd([webPageSchema, breadcrumb], 'impressum-webpage-schema');
  }, [language, location]);

  const content = language === 'de' ? (
    <>
      <h1 className="text-4xl font-bold mb-8">Impressum</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Angaben gemäß § 5 TMG</h2>
          <div className="space-y-2">
            <p className="font-semibold text-lg">{CONTACT_INFO.company.legalName}</p>
            <p className="text-muted-foreground">(Markenname: {CONTACT_INFO.company.brandName})</p>
            <p>{CONTACT_INFO.address.street}</p>
            <p>{CONTACT_INFO.address.postalCode} {CONTACT_INFO.address.city}</p>
            <p>{CONTACT_INFO.address.country}</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Kontakt</h2>
          <div className="space-y-2">
            <p><strong>Telefon:</strong> {CONTACT_INFO.phone}</p>
            <p><strong>WhatsApp:</strong> {CONTACT_INFO.phone}</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Unternehmensgegenstand</h2>
          <p className="mb-2">Räumungs- und Entrümpelungsdienstleistungen, Transport</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Unternehmensrechtliche Angaben</h2>
          <div className="space-y-2">
            <p><strong>Rechtsform:</strong> Gesellschaft mit beschränkter Haftung (GmbH)</p>
            <p><strong>UID-Nr:</strong> {CONTACT_INFO.company.uidNr}</p>
            <p><strong>Firmenbuchnummer:</strong> {CONTACT_INFO.company.firmenbuchnummer}</p>
            <p><strong>Firmenbuchgericht:</strong> Handelsgericht Wien</p>
            <p><strong>Kammer:</strong> Wirtschaftskammer Niederösterreich, Fachgruppe Transport und Verkehr</p>
            <p><strong>Gewerbeordnung:</strong> <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.ris.bka.gv.at</a></p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Aufsichtsbehörde/Gewerbebehörde</h2>
          <p>Bezirkshauptmannschaft Gänserndorf</p>
          <p>2230 Gänserndorf</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Berufsrecht</h2>
          <p>Gewerbeordnung: <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.ris.bka.gv.at</a></p>
          <p>Anwendbare Rechtsvorschriften und Zugang zu diesen: ECG, UGB, GewO 1994</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Medieninhaber</h2>
          <p>{CONTACT_INFO.company.legalName}</p>
          <p>{CONTACT_INFO.address.street}</p>
          <p>{CONTACT_INFO.address.postalCode} {CONTACT_INFO.address.city}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Haftungsausschluss</h2>
          
          <h3 className="text-xl font-semibold mb-3">Haftung für Inhalte</h3>
          <p className="mb-4">
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
          <p className="mb-4">
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>

          <h3 className="text-xl font-semibold mb-3">Haftung für Links</h3>
          <p className="mb-4">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          </p>
          <p className="mb-4">
            Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
          </p>

          <h3 className="text-xl font-semibold mb-3">Urheberrecht</h3>
          <p className="mb-4">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem österreichischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
          <p className="mb-4">
            Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">EU-Streitschlichtung</h2>
          <p className="mb-4">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://ec.europa.eu/consumers/odr</a>
          </p>
          <p className="mb-4">
            Für Anfragen erreichen Sie uns unter der oben angegebenen Telefonnummer.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Verbraucher­streit­beilegung/Universal­schlichtungs­stelle</h2>
          <p className="mb-4">
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>
      </div>
    </>
  ) : (
    <>
      <h1 className="text-4xl font-bold mb-8">Imprint</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Information according to § 5 TMG</h2>
          <div className="space-y-2">
            <p className="font-semibold text-lg">{CONTACT_INFO.company.legalName}</p>
            <p className="text-muted-foreground">(Brand name: {CONTACT_INFO.company.brandName})</p>
            <p>{CONTACT_INFO.address.street}</p>
            <p>{CONTACT_INFO.address.postalCode} {CONTACT_INFO.address.cityEn}</p>
            <p>{CONTACT_INFO.address.country}</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <div className="space-y-2">
            <p><strong>Phone:</strong> {CONTACT_INFO.phone}</p>
            <p><strong>WhatsApp:</strong> {CONTACT_INFO.phone}</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Business Purpose</h2>
          <p className="mb-2">Clearing and removal services, transport</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Corporate Legal Information</h2>
          <div className="space-y-2">
            <p><strong>Legal Form:</strong> Limited Liability Company (GmbH)</p>
            <p><strong>VAT ID:</strong> {CONTACT_INFO.company.uidNr}</p>
            <p><strong>Company Register Number:</strong> {CONTACT_INFO.company.firmenbuchnummer}</p>
            <p><strong>Company Register Court:</strong> Commercial Court Vienna</p>
            <p><strong>Chamber:</strong> Lower Austrian Chamber of Commerce, Transport and Traffic Division</p>
            <p><strong>Trade Regulations:</strong> <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.ris.bka.gv.at</a></p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Supervisory Authority</h2>
          <p>District Authority Gänserndorf</p>
          <p>2230 Gänserndorf</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Professional Regulations</h2>
          <p>Trade Regulations: <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.ris.bka.gv.at</a></p>
          <p>Applicable Legal Provisions and Access: ECG, UGB, GewO 1994</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Media Owner</h2>
          <p>{CONTACT_INFO.company.legalName}</p>
          <p>{CONTACT_INFO.address.street}</p>
          <p>{CONTACT_INFO.address.postalCode} {CONTACT_INFO.address.cityEn}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
          
          <h3 className="text-xl font-semibold mb-3">Liability for Content</h3>
          <p className="mb-4">
            As a service provider, we are responsible for our own content on these pages in accordance with general legislation. However, we are not obligated to monitor transmitted or stored third-party information or investigate circumstances that indicate illegal activity.
          </p>

          <h3 className="text-xl font-semibold mb-3">Liability for Links</h3>
          <p className="mb-4">
            Our website contains links to external third-party websites over whose content we have no control. Therefore, we cannot assume any liability for this third-party content. The respective provider or operator of the pages is always responsible for the content of the linked pages.
          </p>

          <h3 className="text-xl font-semibold mb-3">Copyright</h3>
          <p className="mb-4">
            The content and works on these pages created by the site operators are subject to Austrian copyright law. Duplication, processing, distribution, or any form of commercialization of such material beyond the scope of copyright law requires the written consent of the respective author or creator.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">EU Dispute Resolution</h2>
          <p className="mb-4">
            The European Commission provides a platform for online dispute resolution (ODR): <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://ec.europa.eu/consumers/odr</a>
          </p>
          <p className="mb-4">
            For inquiries, please contact us at the phone number listed above.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Consumer Dispute Resolution</h2>
          <p className="mb-4">
            We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.
          </p>
        </section>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {content}
      </main>
      <Footer />
    </div>
  );
}
