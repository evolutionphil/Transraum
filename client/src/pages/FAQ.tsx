import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { updateMetaTags, addMultipleJsonLd, getFAQSchema, getBreadcrumbSchema } from '@/lib/seo';
import { getAlternateUrls } from '@/lib/urlMapping';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const { language } = useLanguage();
  const [location] = useLocation();
  const [openItem, setOpenItem] = useState<string>('');

  const faqsDE: FAQItem[] = [
    {
      question: 'Wie viel kostet eine Räumung?',
      answer: 'Die Kosten für eine Räumung hängen von verschiedenen Faktoren ab: Größe der zu räumenden Fläche, Menge des Inventars, Stockwerk ohne Aufzug, Abwicklungsaufwand und eventuelle Verwertung von Gegenständen. Wir bieten eine kostenlose Besichtigung vor Ort an und erstellen Ihnen anschließend ein transparentes Festpreisangebot. So haben Sie volle Kostenkontrolle ohne versteckte Gebühren.'
    },
    {
      question: 'Wie schnell können Sie mit der Räumung beginnen?',
      answer: 'In dringenden Fällen können wir oft schon am nächsten Werktag mit der Räumung beginnen. Bei besonders eiligen Aufträgen bieten wir auch einen Same-Day-Service an. Für die Terminvereinbarung kontaktieren Sie uns einfach telefonisch oder per WhatsApp, und wir finden gemeinsam den passenden Zeitpunkt.'
    },
    {
      question: 'Muss ich bei der Räumung anwesend sein?',
      answer: 'Nein, Sie müssen nicht die ganze Zeit vor Ort sein. Nach der Besichtigung und Beauftragung können wir die Räumung auch in Ihrer Abwesenheit durchführen. Wichtig ist nur, dass wir Zugang zum Objekt haben. Viele unserer Kunden übergeben uns einfach den Schlüssel und können sich anderen Dingen widmen, während wir die Arbeit erledigen.'
    },
    {
      question: 'Was passiert mit den geräumten Gegenständen?',
      answer: 'Wir entsorgen alle Gegenstände fachgerecht und umweltbewusst gemäß den österreichischen Vorschriften. Wiederverwertbare Materialien werden recycelt. Wertvolle oder noch verwendbare Gegenstände können nach Absprache vom Auftragswert abgezogen werden. Sondermüll und Gefahrstoffe werden ordnungsgemäß bei den zuständigen Stellen entsorgt.'
    },
    {
      question: 'Bieten Sie auch Entrümpelungen von Kellern und Dachböden an?',
      answer: 'Ja, wir räumen Keller, Dachböden, Garagen und alle anderen Räumlichkeiten. Auch verwinkelte oder schwer zugängliche Bereiche stellen für unser erfahrenes Team kein Problem dar. Wir haben die notwendige Ausrüstung und Erfahrung, um auch in engen Treppenhäusern oder bei schwierigen Zugangsbedingungen professionell zu arbeiten.'
    },
    {
      question: 'Können Sie auch Möbel demontieren und entsorgen?',
      answer: 'Selbstverständlich! Die Demontage von Möbeln, Einbauküchen, Einbauschränken und anderen fest installierten Gegenständen gehört zu unserem Service. Wir bringen das notwendige Werkzeug mit und erledigen die Demontage fachgerecht, sodass keine Schäden an der Bausubstanz entstehen.'
    },
    {
      question: 'Arbeiten Sie auch am Wochenende?',
      answer: 'Ja, nach Vereinbarung führen wir Räumungen auch am Wochenende durch. Dies ist besonders praktisch für Berufstätige oder wenn zeitkritische Termine eingehalten werden müssen. Kontaktieren Sie uns, um die Verfügbarkeit zu prüfen und einen Termin zu vereinbaren.'
    },
    {
      question: 'Sind Sie versichert?',
      answer: 'Ja, wir verfügen über eine umfassende Betriebshaftpflichtversicherung. Sollte während der Räumungsarbeiten ein Schaden entstehen, sind Sie abgesichert. Unsere Mitarbeiter sind erfahren und gehen sorgfältig mit Ihrer Immobilie um, sodass Schäden sehr selten vorkommen.'
    },
    {
      question: 'Was bedeutet "besenreine Übergabe"?',
      answer: 'Besenreine Übergabe bedeutet, dass wir die Räumlichkeiten so hinterlassen, dass sie gefegt und grundgereinigt sind. Alle Gegenstände sind entfernt, der Boden ist gekehrt und grober Schmutz ist beseitigt. Auf Wunsch bieten wir auch eine Endreinigung an, die über die besenreine Übergabe hinausgeht.'
    },
    {
      question: 'Können Sie auch eine Wohnungsauflösung nach einem Todesfall durchführen?',
      answer: 'Ja, wir übernehmen sensibel und diskret die Räumung von Verlassenschaften. Wir wissen, dass dies eine emotional schwierige Zeit ist und gehen besonders behutsam vor. Auf Wunsch sortieren wir auch Dokumente und persönliche Gegenstände aus, die Sie behalten möchten, bevor wir mit der eigentlichen Räumung beginnen.'
    },
    {
      question: 'In welchen Regionen sind Sie tätig?',
      answer: 'Wir sind in ganz Österreich tätig, mit Schwerpunkt auf Wien und Umgebung. Wir bedienen alle 23 Wiener Bezirke sowie alle 9 Bundesländer. Für größere Aufträge außerhalb Wiens reisen wir gerne an. Kontaktieren Sie uns für eine Anfrage in Ihrer Region.'
    },
    {
      question: 'Wie kann ich Sie erreichen und einen Termin vereinbaren?',
      answer: `Sie können uns telefonisch unter ${CONTACT_INFO.phone} erreichen oder eine E-Mail an ${CONTACT_INFO.phone} senden. Wir melden uns schnellstmöglich bei Ihnen zurück, besprechen Ihre Anforderungen und vereinbaren einen kostenlosen Besichtigungstermin. Nach der Besichtigung erhalten Sie ein unverbindliches Festpreisangebot.`
    }
  ];

  const faqsEN: FAQItem[] = [
    {
      question: 'How much does a clearing service cost?',
      answer: 'The cost of clearing depends on various factors: size of the area to be cleared, amount of inventory, floor without elevator, processing effort, and potential value of items. We offer a free on-site inspection and then provide you with a transparent fixed-price quote. This gives you full cost control with no hidden fees.'
    },
    {
      question: 'How quickly can you start the clearing?',
      answer: 'In urgent cases, we can often start clearing as early as the next business day. For particularly urgent orders, we also offer same-day service. To schedule an appointment, simply contact us by phone or WhatsApp, and we\'ll find a suitable time together.'
    },
    {
      question: 'Do I need to be present during the clearing?',
      answer: 'No, you don\'t need to be on site the entire time. After the inspection and order confirmation, we can carry out the clearing in your absence. The only important thing is that we have access to the property. Many of our clients simply hand us the key and can attend to other matters while we do the work.'
    },
    {
      question: 'What happens to the cleared items?',
      answer: 'We process all items professionally and environmentally consciously in accordance with Austrian regulations. Recyclable materials are recycled. Valuable or still usable items can be deducted from the order value by agreement. Special waste and hazardous materials are properly processed at the appropriate facilities.'
    },
    {
      question: 'Do you also offer clearance of basements and attics?',
      answer: 'Yes, we clear basements, attics, garages, and all other spaces. Even winding or hard-to-reach areas are no problem for our experienced team. We have the necessary equipment and experience to work professionally even in narrow stairwells or difficult access conditions.'
    },
    {
      question: 'Can you also dismantle and remove furniture?',
      answer: 'Of course! Dismantling furniture, fitted kitchens, built-in wardrobes, and other permanently installed items is part of our service. We bring the necessary tools and carry out the dismantling professionally so that no damage occurs to the building structure.'
    },
    {
      question: 'Do you also work on weekends?',
      answer: 'Yes, by arrangement we also carry out clearances on weekends. This is particularly convenient for working people or when time-critical deadlines need to be met. Contact us to check availability and schedule an appointment.'
    },
    {
      question: 'Are you insured?',
      answer: 'Yes, we have comprehensive business liability insurance. Should damage occur during the clearing work, you are covered. Our employees are experienced and handle your property carefully, so damage is very rare.'
    },
    {
      question: 'What does "broom-clean handover" mean?',
      answer: 'Broom-clean handover means that we leave the premises swept and basically cleaned. All items are removed, the floor is swept, and coarse dirt is eliminated. Upon request, we also offer a final cleaning that goes beyond the broom-clean handover.'
    },
    {
      question: 'Can you also handle estate clearance after a death?',
      answer: 'Yes, we sensitively and discreetly handle the clearing of estates. We know this is an emotionally difficult time and proceed particularly carefully. Upon request, we also sort out documents and personal items that you wish to keep before we begin the actual clearing.'
    },
    {
      question: 'In which regions do you operate?',
      answer: 'We operate throughout Austria, with a focus on Vienna and surrounding areas. We serve all 23 Vienna districts as well as all 9 federal states. For larger jobs outside Vienna, we are happy to travel. Contact us for an inquiry in your region.'
    },
    {
      question: 'How can I reach you and schedule an appointment?',
      answer: `You can reach us by phone at ${CONTACT_INFO.phone} or send an email to ${CONTACT_INFO.phone}. We will get back to you as soon as possible, discuss your requirements, and arrange a free inspection appointment. After the inspection, you will receive a non-binding fixed-price quote.`
    }
  ];

  const faqs = language === 'de' ? faqsDE : faqsEN;

  useEffect(() => {
    const title = language === 'de'
      ? 'Häufig gestellte Fragen (FAQ) | Transraum'
      : 'Frequently Asked Questions (FAQ) | Transraum';

    const description = language === 'de'
      ? 'Antworten auf häufig gestellte Fragen zu Räumung, Entrümpelung und Transport in Österreich. Preise, Ablauf, Termine und mehr.'
      : 'Answers to frequently asked questions about clearing, removal and transport services in Austria. Prices, process, scheduling and more.';

    const alternateUrls = getAlternateUrls(location);

    updateMetaTags({
      title,
      description,
      url: location,
      language,
      alternateUrls,
    });

    const breadcrumb = getBreadcrumbSchema([
      { name: language === 'de' ? 'Startseite' : 'Home', url: language === 'de' ? '/de' : '/en' },
      { name: language === 'de' ? 'FAQ' : 'FAQ', url: location },
    ]);

    addMultipleJsonLd([getFAQSchema(faqs), breadcrumb], 'faq-page-schema');
  }, [language, location, faqs]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" data-testid="text-faq-title">
            {language === 'de' ? 'Häufig gestellte Fragen' : 'Frequently Asked Questions'}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-faq-subtitle">
            {language === 'de' 
              ? 'Hier finden Sie Antworten auf die häufigsten Fragen zu unseren Räumungs- und Transportdienstleistungen.'
              : 'Here you will find answers to the most common questions about our clearing and transport services.'}
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4" value={openItem} onValueChange={setOpenItem}>
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border rounded-md px-6 bg-card"
              data-testid={`accordion-faq-${index}`}
            >
              <AccordionTrigger className="text-left hover:no-underline py-4" data-testid={`button-faq-question-${index}`}>
                <span className="font-semibold">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4" data-testid={`text-faq-answer-${index}`}>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Card className="mt-12" data-testid="card-faq-contact">
          <CardHeader>
            <CardTitle>
              {language === 'de' ? 'Ihre Frage ist nicht dabei?' : 'Your question not listed?'}
            </CardTitle>
            <CardDescription>
              {language === 'de' 
                ? 'Kontaktieren Sie uns direkt - wir beantworten gerne alle Ihre Fragen persönlich.'
                : 'Contact us directly - we are happy to answer all your questions personally.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`tel:${CONTACT_INFO.phoneLink}`} className="flex-1">
                <Button className="w-full" data-testid="button-faq-call">
                  <Phone className="w-4 h-4 mr-2" />
                  {CONTACT_INFO.phone}
                </Button>
              </a>
              <a href={`tel:${CONTACT_INFO.phoneLink}`} className="flex-1">
                <Button variant="outline" className="w-full" data-testid="button-faq-email">
                  <Mail className="w-4 h-4 mr-2" />
                  {language === 'de' ? 'E-Mail senden' : 'Send Email'}
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
