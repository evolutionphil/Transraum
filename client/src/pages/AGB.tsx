import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { updateMetaTags, addMultipleJsonLd, getWebPageSchema, getBreadcrumbSchema } from '@/lib/seo';
import { getAlternateUrls } from '@/lib/urlMapping';

export default function AGB() {
  const { language } = useLanguage();
  const [location] = useLocation();

  useEffect(() => {
    const title = language === 'de'
      ? 'Allgemeine Geschäftsbedingungen (AGB) | Transraum'
      : 'Terms and Conditions | Transraum';

    const description = language === 'de'
      ? 'Allgemeine Geschäftsbedingungen für Räumungs- und Transportdienstleistungen von Transraum in Österreich.'
      : 'Terms and Conditions for clearing and transport services by Transraum in Austria.';

    const alternateUrls = getAlternateUrls(location);

    updateMetaTags({
      title,
      description,
      url: location,
      language,
      alternateUrls,
    });

    const webPageSchema = getWebPageSchema(language, {
      type: 'WebPage',
      name: language === 'de' ? 'Allgemeine Geschäftsbedingungen' : 'Terms and Conditions',
      description,
      url: location,
    });

    const breadcrumb = getBreadcrumbSchema([
      { name: language === 'de' ? 'Startseite' : 'Home', url: language === 'de' ? '/de' : '/en' },
      { name: language === 'de' ? 'AGB' : 'Terms', url: location },
    ]);

    addMultipleJsonLd([webPageSchema, breadcrumb], 'agb-webpage-schema');
  }, [language, location]);

  const content = language === 'de' ? (
    <>
      <h1 className="text-4xl font-bold mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Geltungsbereich</h2>
          <p className="mb-4">
            Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Leistungen der Transraum im Bereich Räumung, Entrümpelung und Transport in Österreich. Mit der Beauftragung unserer Dienstleistungen akzeptiert der Auftraggeber diese AGB in ihrer jeweils gültigen Fassung.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Vertragsabschluss</h2>
          <p className="mb-4">
            Der Vertrag kommt durch mündliche oder schriftliche Beauftragung zustande. Vor Auftragserteilung führen wir eine kostenlose Besichtigung durch und erstellen ein schriftliches Angebot. Die Annahme des Angebots erfolgt durch Beauftragung seitens des Kunden.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Leistungsumfang</h2>
          <h3 className="text-xl font-semibold mb-3">3.1 Räumungs- und Entrümpelungsarbeiten</h3>
          <p className="mb-4">
            Wir führen Räumungen von Wohnungen, Häusern, Kellern, Dachböden, Geschäftsräumen und anderen Objekten durch. Der Leistungsumfang wird im Angebot spezifiziert und umfasst in der Regel:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>Demontage von Möbeln und Einrichtungsgegenständen (sofern vereinbart)</li>
            <li>Abtransport aller zu entsorgenden Gegenstände</li>
            <li>Fachgerechte Verwertung gemäß den geltenden Vorschriften</li>
            <li>Besenreine Übergabe der Räumlichkeiten</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">3.2 Wertgegenständeund Sonderleistungen</h3>
          <p className="mb-4">
            Verwertbare Gegenstände können nach Absprache vom Auftragswert in Abzug gebracht werden. Sonderleistungen wie spezielle Abwicklungen oder zusätzliche Reinigungsarbeiten werden gesondert berechnet.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Preise und Zahlung</h2>
          <h3 className="text-xl font-semibold mb-3">4.1 Preisgestaltung</h3>
          <p className="mb-4">
            Wir arbeiten mit Festpreisen, die nach der kostenlosen Besichtigung erstellt werden. Alle Preise verstehen sich inklusive gesetzlicher Mehrwertsteuer.
          </p>

          <h3 className="text-xl font-semibold mb-3">4.2 Zahlungsbedingungen</h3>
          <p className="mb-4">
            Die Zahlung erfolgt nach vollständiger Leistungserbringung. Akzeptierte Zahlungsmethoden sind Barzahlung oder Banküberweisung. Bei größeren Aufträgen kann eine Anzahlung von bis zu 30% vereinbart werden.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Pflichten des Auftraggebers</h2>
          <p className="mb-4">
            Der Auftraggeber ist verpflichtet:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>Uns rechtzeitig über besondere Umstände (z.B. Gefahrstoffe, denkmalgeschützte Gegenstände) zu informieren</li>
            <li>Für freien Zugang zum Räumungsobjekt zu sorgen</li>
            <li>Wertvolle oder wichtige Gegenstände vor Beginn der Arbeiten zu entfernen</li>
            <li>Eventuelle Halteverbotszonen zu beantragen (falls erforderlich)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Haftung</h2>
          <h3 className="text-xl font-semibold mb-3">6.1 Unsere Haftung</h3>
          <p className="mb-4">
            Wir haften für Schäden, die von uns oder unseren Mitarbeitern vorsätzlich oder grob fahrlässig verursacht wurden. Die Haftung bei leichter Fahrlässigkeit ist ausgeschlossen, soweit nicht vertragswesentliche Pflichten verletzt werden.
          </p>

          <h3 className="text-xl font-semibold mb-3">6.2 Ausschluss der Haftung</h3>
          <p className="mb-4">
            Keine Haftung besteht für:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>Versteckte Wertgegenstände, die nicht vor Arbeitsbeginn gemeldet wurden</li>
            <li>Schäden an der Bausubstanz, die bereits vor Beginn unserer Tätigkeit bestanden</li>
            <li>Schäden durch höhere Gewalt</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Terminvereinbarung und Stornierung</h2>
          <h3 className="text-xl font-semibold mb-3">7.1 Terminvereinbarung</h3>
          <p className="mb-4">
            Termine werden nach Verfügbarkeit vereinbart. Wir bemühen uns, vereinbarte Termine einzuhalten, können jedoch bei unvorhergesehenen Ereignissen Terminverschiebungen nicht ausschließen.
          </p>

          <h3 className="text-xl font-semibold mb-3">7.2 Stornierung</h3>
          <p className="mb-4">
            Kostenlose Stornierungen sind bis 48 Stunden vor dem vereinbarten Termin möglich. Bei späteren Stornierungen oder Nichterscheinen behalten wir uns vor, eine Ausfallgebühr von bis zu 30% des Auftragswertes zu berechnen.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Datenschutz</h2>
          <p className="mb-4">
            Wir verpflichten uns, alle personenbezogenen Daten unserer Kunden gemäß der DSGVO und dem österreichischen Datenschutzgesetz zu behandeln. Weitere Informationen finden Sie in unserer Datenschutzerklärung.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Schlussbestimmungen</h2>
          <h3 className="text-xl font-semibold mb-3">9.1 Gerichtsstand</h3>
          <p className="mb-4">
            Gerichtsstand ist Wien, Österreich.
          </p>

          <h3 className="text-xl font-semibold mb-3">9.2 Salvatorische Klausel</h3>
          <p className="mb-4">
            Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen davon unberührt.
          </p>
        </section>

        <section>
          <p className="text-sm text-muted-foreground">
            Stand: November 2024
          </p>
        </section>
      </div>
    </>
  ) : (
    <>
      <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Scope of Application</h2>
          <p className="mb-4">
            These Terms and Conditions apply to all services provided by Transraum in the field of clearing, removal, and transport in Austria. By commissioning our services, the client accepts these Terms and Conditions in their current version.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Contract Formation</h2>
          <p className="mb-4">
            The contract is concluded through verbal or written commissioning. Before placing an order, we conduct a free inspection and prepare a written quote. Acceptance of the quote occurs through commissioning by the client.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Scope of Services</h2>
          <h3 className="text-xl font-semibold mb-3">3.1 Clearing and Removal Work</h3>
          <p className="mb-4">
            We carry out clearing of apartments, houses, basements, attics, commercial spaces, and other properties. The scope of services is specified in the quote and typically includes:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>Disassembly of furniture and fixtures (if agreed)</li>
            <li>Removal of all items to be processed</li>
            <li>Professional recycling in accordance with applicable regulations</li>
            <li>Broom-clean handover of the premises</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">3.2 Valuables and Special Services</h3>
          <p className="mb-4">
            Recyclable items can be deducted from the order value by agreement. Special services such as specific processing or additional cleaning work are charged separately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Prices and Payment</h2>
          <h3 className="text-xl font-semibold mb-3">4.1 Pricing</h3>
          <p className="mb-4">
            We work with fixed prices that are prepared after the free inspection. All prices include statutory VAT.
          </p>

          <h3 className="text-xl font-semibold mb-3">4.2 Payment Terms</h3>
          <p className="mb-4">
            Payment is due after complete service delivery. Accepted payment methods are cash or bank transfer. For larger orders, a deposit of up to 30% can be agreed upon.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Client Obligations</h2>
          <p className="mb-4">
            The client is obliged to:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>Inform us in advance about special circumstances (e.g. hazardous materials, protected items)</li>
            <li>Ensure free access to the clearing property</li>
            <li>Remove valuable or important items before work begins</li>
            <li>Apply for any no-parking zones (if required)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Liability</h2>
          <h3 className="text-xl font-semibold mb-3">6.1 Our Liability</h3>
          <p className="mb-4">
            We are liable for damages caused intentionally or through gross negligence by us or our employees. Liability for slight negligence is excluded unless essential contractual obligations are violated.
          </p>

          <h3 className="text-xl font-semibold mb-3">6.2 Exclusion of Liability</h3>
          <p className="mb-4">
            No liability exists for:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>Hidden valuables that were not reported before work began</li>
            <li>Damage to the building structure that existed before our work commenced</li>
            <li>Damage due to force majeure</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Appointment Scheduling and Cancellation</h2>
          <h3 className="text-xl font-semibold mb-3">7.1 Scheduling</h3>
          <p className="mb-4">
            Appointments are scheduled according to availability. We strive to keep agreed appointments but cannot exclude schedule changes due to unforeseen events.
          </p>

          <h3 className="text-xl font-semibold mb-3">7.2 Cancellation</h3>
          <p className="mb-4">
            Free cancellations are possible up to 48 hours before the agreed appointment. For later cancellations or no-shows, we reserve the right to charge a cancellation fee of up to 30% of the order value.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Data Protection</h2>
          <p className="mb-4">
            We commit to handling all personal data of our customers in accordance with the GDPR and Austrian Data Protection Act. Further information can be found in our Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Final Provisions</h2>
          <h3 className="text-xl font-semibold mb-3">9.1 Jurisdiction</h3>
          <p className="mb-4">
            Place of jurisdiction is Vienna, Austria.
          </p>

          <h3 className="text-xl font-semibold mb-3">9.2 Severability Clause</h3>
          <p className="mb-4">
            Should individual provisions of these Terms and Conditions be or become invalid, the validity of the remaining provisions shall remain unaffected.
          </p>
        </section>

        <section>
          <p className="text-sm text-muted-foreground">
            Last updated: November 2024
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
