import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { updateMetaTags, addMultipleJsonLd, getWebPageSchema, getBreadcrumbSchema } from '@/lib/seo';
import { getAlternateUrls } from '@/lib/urlMapping';
import { CONTACT_INFO } from '@/lib/constants';

export default function Datenschutz() {
  const { language } = useLanguage();
  const [location] = useLocation();

  useEffect(() => {
    const title = language === 'de'
      ? 'Datenschutzerklärung – Transraum | Wien & Österreich'
      : 'Privacy Policy – Transraum | Vienna & Austria';

    const description = language === 'de'
      ? 'Datenschutzerklärung von Transraum - Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.'
      : 'Privacy Policy of Transraum - Information on the processing of personal data in accordance with GDPR.';

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
      name: language === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy',
      description,
      url: location,
    });

    const breadcrumb = getBreadcrumbSchema([
      { name: language === 'de' ? 'Startseite' : 'Home', url: language === 'de' ? '/de' : '/en' },
      { name: language === 'de' ? 'Datenschutz' : 'Privacy', url: location },
    ]);

    addMultipleJsonLd([webPageSchema, breadcrumb], 'datenschutz-webpage-schema');
  }, [language, location]);

  const content = language === 'de' ? (
    <>
      <h1 className="text-4xl font-bold mb-8">Datenschutzerklärung</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Datenschutz auf einen Blick</h2>
          <h3 className="text-xl font-semibold mb-3">Allgemeine Hinweise</h3>
          <p className="mb-4">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>

          <h3 className="text-xl font-semibold mb-3">Datenerfassung auf dieser Website</h3>
          <h4 className="text-lg font-semibold mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
          <p className="mb-4">
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
          </p>

          <h4 className="text-lg font-semibold mb-2">Wie erfassen wir Ihre Daten?</h4>
          <p className="mb-4">
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
          </p>
          <p className="mb-4">
            Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
          </p>

          <h4 className="text-lg font-semibold mb-2">Wofür nutzen wir Ihre Daten?</h4>
          <p className="mb-4">
            Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
          </p>

          <h4 className="text-lg font-semibold mb-2">Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
          <p className="mb-4">
            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Hosting und Content Delivery Networks (CDN)</h2>
          <p className="mb-4">
            Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
          </p>

          <h3 className="text-xl font-semibold mb-3">Externes Hosting</h3>
          <p className="mb-4">
            Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters / der Hoster gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
          </p>
          <p className="mb-4">
            Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
          
          <h3 className="text-xl font-semibold mb-3">Datenschutz</h3>
          <p className="mb-4">
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          </p>
          <p className="mb-4">
            Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
          </p>

          <h3 className="text-xl font-semibold mb-3">Hinweis zur verantwortlichen Stelle</h3>
          <p className="mb-4">Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
          <div className="mb-4 p-4 bg-muted rounded-md">
            <p className="font-semibold">Transraum</p>
            <p>{CONTACT_INFO.address.street}</p>
            <p>{CONTACT_INFO.address.postalCode} {CONTACT_INFO.address.city}</p>
            <p>Telefon: {CONTACT_INFO.phone}</p>
            <p>Telefon: {CONTACT_INFO.phone}</p>
          </div>

          <h3 className="text-xl font-semibold mb-3">Speicherdauer</h3>
          <p className="mb-4">
            Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben.
          </p>

          <h3 className="text-xl font-semibold mb-3">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
          <p className="mb-4">
            Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
          </p>

          <h3 className="text-xl font-semibold mb-3">Auskunft, Löschung und Berichtigung</h3>
          <p className="mb-4">
            Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Datenerfassung auf dieser Website</h2>
          
          <h3 className="text-xl font-semibold mb-3">Server-Log-Dateien</h3>
          <p className="mb-4">
            Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>Browsertyp und Browserversion</li>
            <li>verwendetes Betriebssystem</li>
            <li>Referrer URL</li>
            <li>Hostname des zugreifenden Rechners</li>
            <li>Uhrzeit der Serveranfrage</li>
            <li>IP-Adresse</li>
          </ul>
          <p className="mb-4">
            Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.
          </p>

          <h3 className="text-xl font-semibold mb-3">Kontaktformular</h3>
          <p className="mb-4">
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
          </p>
          <p className="mb-4">
            Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
          </p>

          <h3 className="text-xl font-semibold mb-3">Anfrage per E-Mail, Telefon oder Telefax</h3>
          <p className="mb-4">
            Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Ihre Rechte</h2>
          <p className="mb-4">Sie haben folgende Rechte:</p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li><strong>Auskunftsrecht:</strong> Sie können Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten verlangen.</li>
            <li><strong>Berichtigungsrecht:</strong> Sie können die Berichtigung unrichtiger Daten verlangen.</li>
            <li><strong>Löschungsrecht:</strong> Sie können die Löschung Ihrer Daten verlangen.</li>
            <li><strong>Einschränkung der Verarbeitung:</strong> Sie können unter bestimmten Umständen die Einschränkung der Verarbeitung verlangen.</li>
            <li><strong>Datenübertragbarkeit:</strong> Sie haben das Recht, Ihre Daten in einem strukturierten, gängigen Format zu erhalten.</li>
            <li><strong>Widerspruchsrecht:</strong> Sie können der Verarbeitung Ihrer Daten widersprechen.</li>
            <li><strong>Beschwerderecht:</strong> Sie können sich bei einer Aufsichtsbehörde beschweren.</li>
          </ul>
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
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Data Protection at a Glance</h2>
          <h3 className="text-xl font-semibold mb-3">General Information</h3>
          <p className="mb-4">
            The following notes provide a simple overview of what happens to your personal data when you visit this website. Personal data is any data with which you could be personally identified.
          </p>

          <h3 className="text-xl font-semibold mb-3">Data Collection on This Website</h3>
          <h4 className="text-lg font-semibold mb-2">Who is responsible for data collection on this website?</h4>
          <p className="mb-4">
            Data processing on this website is carried out by the website operator. You can find their contact details in the imprint of this website.
          </p>

          <h4 className="text-lg font-semibold mb-2">How do we collect your data?</h4>
          <p className="mb-4">
            Some data is collected when you provide it to us. This could, for example, be data you enter on a contact form. Other data is collected automatically or after you give your consent when visiting the website through our IT systems.
          </p>

          <h4 className="text-lg font-semibold mb-2">What do we use your data for?</h4>
          <p className="mb-4">
            Part of the data is collected to ensure the proper functioning of the website. Other data can be used to analyze how visitors use the site.
          </p>

          <h4 className="text-lg font-semibold mb-2">What rights do you have regarding your data?</h4>
          <p className="mb-4">
            You always have the right to request information about your stored data, its origin, its recipients, and the purpose of its collection at no charge. You also have the right to request that it be corrected or deleted. If you have given consent for data processing, you can revoke this consent at any time for the future.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Hosting and Content Delivery Networks (CDN)</h2>
          <p className="mb-4">
            We host the content of our website with the following provider:
          </p>

          <h3 className="text-xl font-semibold mb-3">External Hosting</h3>
          <p className="mb-4">
            This website is hosted externally. Personal data collected on this website is stored on the servers of the host(s). This may include IP addresses, contact requests, metadata and communication data, contract data, contact details, names, website accesses, and other data generated via a website.
          </p>
          <p className="mb-4">
            External hosting is carried out for the purpose of contract fulfillment with our potential and existing customers (Art. 6(1)(b) GDPR) and in the interest of secure, fast, and efficient provision of our online services by a professional provider (Art. 6(1)(f) GDPR).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. General Information and Mandatory Information</h2>
          
          <h3 className="text-xl font-semibold mb-3">Data Protection</h3>
          <p className="mb-4">
            The operators of this website take the protection of your personal data very seriously. We treat your personal data as confidential and in accordance with the statutory data protection regulations and this privacy policy.
          </p>

          <h3 className="text-xl font-semibold mb-3">Note on the Responsible Party</h3>
          <p className="mb-4">The responsible party for data processing on this website is:</p>
          <div className="mb-4 p-4 bg-muted rounded-md">
            <p className="font-semibold">Transraum</p>
            <p>{CONTACT_INFO.address.street}</p>
            <p>{CONTACT_INFO.address.postalCode} {CONTACT_INFO.address.cityEn}</p>
            <p>Phone: {CONTACT_INFO.phone}</p>
            <p>Phone: {CONTACT_INFO.phone}</p>
          </div>

          <h3 className="text-xl font-semibold mb-3">Storage Duration</h3>
          <p className="mb-4">
            Unless a more specific storage period has been specified in this privacy policy, your personal data will remain with us until the purpose for which it was collected no longer applies. If you assert a justified request for deletion or revoke your consent to data processing, your data will be deleted.
          </p>

          <h3 className="text-xl font-semibold mb-3">Right to Data Portability</h3>
          <p className="mb-4">
            You have the right to have data which we process based on your consent or in fulfillment of a contract automatically delivered to yourself or to a third party in a standard, machine-readable format.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Data Collection on This Website</h2>
          
          <h3 className="text-xl font-semibold mb-3">Server Log Files</h3>
          <p className="mb-4">
            The provider automatically collects and stores information that your browser automatically transmits to us in "server log files". These are:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>Browser type and browser version</li>
            <li>Operating system used</li>
            <li>Referrer URL</li>
            <li>Host name of the accessing computer</li>
            <li>Time of the server request</li>
            <li>IP address</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">Contact Form</h3>
          <p className="mb-4">
            If you send us inquiries via the contact form, your details from the inquiry form, including the contact details you provided there, will be stored by us for the purpose of processing the inquiry and in case of follow-up questions.
          </p>

          <h3 className="text-xl font-semibold mb-3">Inquiry by Email, Phone or Fax</h3>
          <p className="mb-4">
            If you contact us by email, phone or fax, your inquiry, including all resulting personal data (name, inquiry) will be stored and processed by us for the purpose of processing your request.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
          <p className="mb-4">You have the following rights:</p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li><strong>Right to Information:</strong> You can request information about your personal data processed by us.</li>
            <li><strong>Right to Rectification:</strong> You can request the correction of inaccurate data.</li>
            <li><strong>Right to Erasure:</strong> You can request the deletion of your data.</li>
            <li><strong>Right to Restriction of Processing:</strong> Under certain circumstances, you can request restriction of processing.</li>
            <li><strong>Right to Data Portability:</strong> You have the right to receive your data in a structured, common format.</li>
            <li><strong>Right to Object:</strong> You can object to the processing of your data.</li>
            <li><strong>Right to Lodge a Complaint:</strong> You can file a complaint with a supervisory authority.</li>
          </ul>
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
