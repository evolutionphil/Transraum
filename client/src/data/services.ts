export enum ServiceId {
  WOHNUNGSRAEUMUNG = 'wohnungsraeumung',
  HAUSHALTSAUFLOESUNG = 'haushaltsaufloesung',
  KELLERRAEUMUNG = 'kellerraeumung',
  DACHBODENRAEUMUNG = 'dachbodenraeumung',
  GESCHAEFTSRAEUMUNG = 'geschaeftsraeumung',
  MESSIERAEUMUNG = 'messieraeumung',
  SPERRMULLABHOLUNG = 'sperrmullabholung',
  UMZUGSSERVICE = 'umzugsservice',
  GARAGERAEUMUNG = 'garageraeumung',
  BUROAUFLOESUNG = 'buroaufloesung',
  VERLASSENSCHAFTSRAEUMUNG = 'verlassenschaftsraeumung',
  CONTAINERSERVICE = 'containerservice',
  ERBSTUECKSANKAUF = 'erbstuecksankauf',
  GOLDANKAUF = 'goldankauf',
  TEPPICHANKAUF = 'teppichankauf',
  BILDERANKAUF = 'bilderankauf',
  ANTIKWARENANKAUF = 'antikwarenankauf',
  TRANSPORTSERVICE = 'transportservice',
}

export interface ServiceContent {
  name: string;
  shortDescription: string;
  description: string;
  metaDescription: string;
  benefits: string[];
  process: Array<{ step: number; title: string; description: string }>;
  pricing: {
    info: string;
    factors: string[];
  };
  faq: Array<{ question: string; answer: string }>;
}

export interface ServiceEntry {
  id: ServiceId;
  slugs: { de: string; en: string };
  content: { de: ServiceContent; en: ServiceContent };
  relatedServices: ServiceId[];
}

export const servicesData: ServiceEntry[] = [
  {
    id: ServiceId.WOHNUNGSRAEUMUNG,
    slugs: { de: 'wohnungsraeumungen', en: 'apartment-clearing' },
    relatedServices: [ServiceId.HAUSHALTSAUFLOESUNG, ServiceId.KELLERRAEUMUNG, ServiceId.VERLASSENSCHAFTSRAEUMUNG],
    content: {
      de: {
        name: 'Wohnungsräumung',
        shortDescription: 'Professionelle Räumung Ihrer Wohnung in Wien und Umgebung - schnell, zuverlässig und zu fairen Preisen.',
        description: 'Unsere Wohnungsräumung ist der ideale Service für Sie, wenn Sie Ihre Wohnung komplett räumen müssen. Ob bei Umzug, Verkauf, Vermietung oder Erbe - wir räumen Ihre Wohnung professionell, schnell und diskret. Von der 1-Zimmer-Wohnung bis zur großen Altbauwohnung in ganz Österreich.',
        metaDescription: 'Wohnungsräumung Wien und Umgebung ✓ Ganz Österreich ✓ Auch ohne Lift ✓ Besenreine Übergabe ✓ Festpreisgarantie ☎ +43660 39 57 587',
        benefits: [
          'Komplette Räumung vom Keller bis zum Dachboden',
          'Auch Altbauwohnungen ohne Lift bis 5. Stock',
          'Besenreine Übergabe garantiert',
          'Fachgerechte Verwertung und Recycling',
          'Diskrete Abwicklung in Wien und ganz Österreich',
          'Fixpreis nach kostenloser Besichtigung',
        ],
        process: [
          {
            step: 1,
            title: 'Kostenlose Besichtigung',
            description: 'Wir besichtigen Ihre Wohnung vor Ort oder per Video-Call und erstellen ein unverbindliches Festpreisangebot.',
          },
          {
            step: 2,
            title: 'Terminvereinbarung',
            description: 'Nach Ihrer Zusage vereinbaren wir einen Wunschtermin - oft schon innerhalb von 24-48 Stunden möglich.',
          },
          {
            step: 3,
            title: 'Professionelle Räumung',
            description: 'Unser Team räumt Ihre Wohnung komplett - vom Mobiliar über Elektrogeräte bis zu Kleinteilen.',
          },
          {
            step: 4,
            title: 'Besenreine Übergabe',
            description: 'Wir übergeben Ihre Wohnung besenrein und verwerten alles fachgerecht über zertifizierte Partner.',
          },
        ],
        pricing: {
          info: 'Die Kosten für eine Wohnungsräumung hängen von mehreren Faktoren ab. Nach einer kostenlosen Besichtigung erhalten Sie von uns einen transparenten Festpreis.',
          factors: [
            'Wohnungsgröße (m² und Anzahl der Zimmer)',
            'Menge und Art der zu verwertenden Gegenstände',
            'Stockwerk und Vorhandensein eines Lifts',
            'Zufahrtsmöglichkeiten zum Gebäude',
            'Besondere Anforderungen (z.B. Messie-Wohnung, Sperrmüll)',
          ],
        },
        faq: [
          {
            question: 'Was kostet eine Wohnungsräumung?',
            answer: 'Eine 50m² Wohnung kostet durchschnittlich 800-1.200€, eine 80m² Wohnung 1.200-1.800€. Der genaue Preis hängt von der Objektmenge und dem Stockwerk ab. Nach kostenloser Besichtigung erhalten Sie einen verbindlichen Festpreis ohne versteckte Kosten.',
          },
          {
            question: 'Wie lange dauert eine Wohnungsräumung?',
            answer: 'Eine 60m² Wohnung räumen wir in der Regel in 4-6 Stunden. Größere Wohnungen oder stark vollgestellte Objekte benötigen 6-10 Stunden. Bei Messie-Wohnungen planen wir 1-2 Tage ein.',
          },
          {
            question: 'Können Sie auch ohne Lift bis in den 5. Stock?',
            answer: 'Ja, selbstverständlich! Viele Altbauten haben keinen Lift - das ist für uns Routine. Unsere Teams sind trainiert im Tragen schwerer Gegenstände über enge Wendeltreppen. Bei Bedarf nutzen wir Möbel-Tragegurte und Außenaufzüge.',
          },
          {
            question: 'Was passiert mit meinen Möbeln und Gegenständen?',
            answer: 'Brauchbare Möbel und Gegenstände führen wir sozialen Einrichtungen zu. Defekte Möbel werden fachgerecht recycelt. Sondermüll verwerten wir über zertifizierte Fachbetriebe. Sie erhalten auf Wunsch Verwertungsnachweise.',
          },
        ],
      },
      en: {
        name: 'Apartment Clearing',
        shortDescription: 'Professional apartment clearing in Vienna and surroundings - fast, reliable, and at fair prices.',
        description: 'Our apartment clearing service is ideal when you need to completely clear your apartment. Whether for moving, sale, rental, or inheritance - we clear your apartment professionally, quickly, and discreetly. From studio apartments to large heritage buildings throughout Austria.',
        metaDescription: 'Apartment Clearing Vienna & Austria ✓ Nationwide Service ✓ No Elevator Required ✓ Broom-Clean Handover ✓ Fixed Price Guarantee ☎ +43660 39 57 587',
        benefits: [
          'Complete clearing from basement to attic',
          'Heritage buildings without elevator up to 5th floor',
          'Guaranteed broom-clean handover',
          'Professional recycling and recycling',
          'Discreet execution in Vienna and throughout Austria',
          'Fixed price after free inspection',
        ],
        process: [
          {
            step: 1,
            title: 'Free Inspection',
            description: 'We inspect your apartment on-site or via video call and create a non-binding fixed-price offer.',
          },
          {
            step: 2,
            title: 'Appointment Scheduling',
            description: 'After your confirmation, we schedule your preferred date - often possible within 24-48 hours.',
          },
          {
            step: 3,
            title: 'Professional Clearing',
            description: 'Our team completely clears your apartment - from furniture and appliances to small items.',
          },
          {
            step: 4,
            title: 'Broom-Clean Handover',
            description: 'We hand over your apartment broom-clean and recycle of everything professionally through certified partners.',
          },
        ],
        pricing: {
          info: 'The cost of apartment clearing depends on several factors. After a free inspection, we provide a transparent fixed price.',
          factors: [
            'Apartment size (m² and number of rooms)',
            'Quantity and type of items to be processed',
            'Floor level and availability of elevator',
            'Building access options',
            'Special requirements (e.g., hoarding situations, bulky waste)',
          ],
        },
        faq: [
          {
            question: 'How much does apartment clearing cost?',
            answer: 'A 50m² apartment costs on average €800-1,200, an 80m² apartment €1,200-1,800. The exact price depends on the amount of items and floor level. After free inspection, you receive a binding fixed price with no hidden costs.',
          },
          {
            question: 'How long does apartment clearing take?',
            answer: 'We typically clear a 60m² apartment in 4-6 hours. Larger apartments or heavily cluttered spaces require 6-10 hours. For hoarding situations, we plan 1-2 days.',
          },
          {
            question: 'Can you work without an elevator up to the 5th floor?',
            answer: 'Yes, absolutely! Many heritage buildings have no elevator - this is routine for us. Our teams are trained in carrying heavy items up narrow spiral staircases. When needed, we use furniture straps and external lifts.',
          },
          {
            question: 'What happens to my furniture and belongings?',
            answer: 'Usable furniture and items are donated to social organizations. Damaged furniture is professionally recycled. Hazardous waste is recycled through certified specialists. You receive recycling certificates upon request.',
          },
        ],
      },
    },
  },
  {
    id: ServiceId.HAUSHALTSAUFLOESUNG,
    slugs: { de: 'haushaltsaufloesung', en: 'household-dissolution' },
    relatedServices: [ServiceId.WOHNUNGSRAEUMUNG, ServiceId.VERLASSENSCHAFTSRAEUMUNG, ServiceId.SPERRMULLABHOLUNG],
    content: {
      de: {
        name: 'Haushaltsauflösung',
        shortDescription: 'Komplette Haushaltsauflösung in Wien und Umgebung nach Todesfall, Umzug ins Pflegeheim oder bei Verkauf - einfühlsam und professionell.',
        description: 'Eine Haushaltsauflösung ist oft eine emotionale Angelegenheit. Ob nach einem Todesfall, beim Umzug ins Pflegeheim oder bei Verkauf - wir übernehmen die komplette Auflösung Ihres Haushalts in ganz Österreich mit Respekt und Einfühlungsvermögen. Wir kümmern uns um alles: von der Wertgegenständesortierung bis zur besenreinen Übergabe.',
        metaDescription: 'Haushaltsauflösung Wien und Umgebung ✓ Ganz Österreich ✓ Einfühlsam nach Todesfall ✓ Wertgegenstände-Sortierung ☎ +43660 39 57 587',
        benefits: [
          'Einfühlsamer Umgang in schwierigen Situationen',
          'Sortierung von Wertgegenständen und Erinnerungsstücken',
          'Komplette Haushaltsauflösung von A-Z',
          'Diskrete und respektvolle Arbeitsweise',
          'Verwertung brauchbarer Gegenstände',
          'Besenreine Übergabe der Immobilie',
        ],
        process: [
          {
            step: 1,
            title: 'Persönliches Erstgespräch',
            description: 'Wir besprechen in Ruhe Ihre Wünsche und besonderen Anforderungen. Wertgegenstände und Erinnerungsstücke werden markiert.',
          },
          {
            step: 2,
            title: 'Sortierung und Sichtung',
            description: 'Gemeinsam oder eigenständig sortieren wir Wertgegenstände, Dokumente und persönliche Erinnerungen aus.',
          },
          {
            step: 3,
            title: 'Komplette Auflösung',
            description: 'Wir räumen den gesamten Haushalt - von Möbeln über Kleidung bis zu Kleinteilen und Küchenutensilien.',
          },
          {
            step: 4,
            title: 'Fachgerechte Verwertung',
            description: 'Brauchbare Gegenstände spenden wir an soziale Einrichtungen. Rest wird umweltgerecht verwertet.',
          },
        ],
        pricing: {
          info: 'Die Kosten einer Haushaltsauflösung variieren je nach Umfang. Wertvolle Gegenstände können die Kosten reduzieren oder sogar eine kostenlose Auflösung ermöglichen.',
          factors: [
            'Größe des Haushalts und Anzahl der Räume',
            'Vorhandensein verwertbarer Gegenstände',
            'Zeitaufwand für Sortierung',
            'Stockwerk und Liftvorhandensein',
            'Abwicklungsaufwand',
          ],
        },
        faq: [
          {
            question: 'Was kostet eine Haushaltsauflösung?',
            answer: 'Die Kosten variieren stark je nach Haushaltsgröße. Ein 3-Zimmer-Haushalt kostet durchschnittlich 1.500-2.500€. Bei wertvollen Gegenständen (Antiquitäten, hochwertige Möbel) kann die Auflösung kostenlos sein oder sogar eine Vergütung bringen.',
          },
          {
            question: 'Wie lange dauert eine Haushaltsauflösung?',
            answer: 'Ein durchschnittlicher 3-Zimmer-Haushalt benötigt 1-2 Tage. Größere Haushalte oder intensive Sortierarbeiten können 2-3 Tage dauern. Wir planen immer ausreichend Zeit für sorgfältiges Arbeiten ein.',
          },
          {
            question: 'Was passiert mit wertvollen Gegenständen?',
            answer: 'Wertgegenstände wie Schmuck, Uhren, Kunstwerke oder Antiquitäten werden sorgfältig aussortiert und an Sie übergeben. Auf Wunsch vermitteln wir auch Ankäufer oder Auktionshäuser.',
          },
          {
            question: 'Können Sie auch nach Todesfall diskret arbeiten?',
            answer: 'Ja, wir arbeiten sehr diskret und einfühlsam. Unsere Teams sind im Umgang mit emotionalen Situationen geschult. Wir respektieren die Privatsphäre und arbeiten auf Wunsch auch außerhalb der üblichen Zeiten.',
          },
        ],
      },
      en: {
        name: 'Household Dissolution',
        shortDescription: 'Complete household dissolution in Vienna and surroundings after bereavement, nursing home move, or sale - compassionate and professional.',
        description: 'Household dissolution is often an emotional matter. Whether after a death, moving to a care home, or property sale - we handle the complete dissolution of your household throughout Austria with respect and compassion. We take care of everything: from sorting valuables to broom-clean handover.',
        metaDescription: 'Household Dissolution Vienna & Austria ✓ Compassionate After Bereavement ✓ Valuables Sorting ✓ Professional Service ☎ +43660 39 57 587',
        benefits: [
          'Compassionate handling in difficult situations',
          'Sorting of valuables and keepsakes',
          'Complete household dissolution A to Z',
          'Discreet and respectful work approach',
          'Utilization of usable items',
          'Broom-clean property handover',
        ],
        process: [
          {
            step: 1,
            title: 'Personal Initial Consultation',
            description: 'We discuss your wishes and special requirements at leisure. Valuables and keepsakes are marked.',
          },
          {
            step: 2,
            title: 'Sorting and Review',
            description: 'Together or independently, we sort out valuables, documents, and personal memories.',
          },
          {
            step: 3,
            title: 'Complete Dissolution',
            description: 'We clear the entire household - from furniture and clothing to small items and kitchen utensils.',
          },
          {
            step: 4,
            title: 'Professional Utilization',
            description: 'Usable items are donated to social organizations. The rest is recycled in an environmentally friendly manner.',
          },
        ],
        pricing: {
          info: 'The cost of household dissolution varies depending on scope. Valuable items can reduce costs or even enable free dissolution.',
          factors: [
            'Household size and number of rooms',
            'Presence of usable items',
            'Time required for sorting',
            'Floor level and elevator availability',
            'Processing effort required',
          ],
        },
        faq: [
          {
            question: 'How much does household dissolution cost?',
            answer: 'Costs vary greatly depending on household size. A 3-room household costs on average €1,500-2,500. With valuable items (antiques, high-quality furniture), dissolution can be free or even provide compensation.',
          },
          {
            question: 'How long does household dissolution take?',
            answer: 'An average 3-room household requires 1-2 days. Larger households or intensive sorting work can take 2-3 days. We always plan sufficient time for careful work.',
          },
          {
            question: 'What happens to valuable items?',
            answer: 'Valuables such as jewelry, watches, artworks, or antiques are carefully sorted and handed over to you. Upon request, we also arrange buyers or auction houses.',
          },
          {
            question: 'Can you work discreetly after bereavement?',
            answer: 'Yes, we work very discreetly and compassionately. Our teams are trained in handling emotional situations. We respect privacy and can work outside regular hours if desired.',
          },
        ],
      },
    },
  },
  {
    id: ServiceId.KELLERRAEUMUNG,
    slugs: { de: 'kellerraeumung', en: 'basement-clearing' },
    relatedServices: [ServiceId.DACHBODENRAEUMUNG, ServiceId.GARAGERAEUMUNG, ServiceId.SPERRMULLABHOLUNG],
    content: {
      de: {
        name: 'Kellerräumung',
        shortDescription: 'Professionelle Kellerräumung in Wien und Umgebung - wir räumen Ihren Keller komplett aus und verwerten alles fachgerecht.',
        description: 'Ihr Keller ist voll und Sie möchten wieder Platz schaffen? Wir räumen Ihren Keller komplett - von alten Möbeln über Gerümpel bis zu Sperrmüll. Auch bei schwierigen Bedingungen wie engen Treppen oder fehlendem Lift arbeiten wir professionell und zuverlässig in ganz Österreich.',
        metaDescription: 'Kellerräumung Wien und Umgebung ✓ Ganz Österreich ✓ Auch bei engen Treppen ✓ Komplette Räumung ✓ Festpreis ☎ +43660 39 57 587',
        benefits: [
          'Komplette Räumung auch vollgestellter Keller',
          'Abholung von Sperrmüll und Gerümpel',
          'Auch bei engen Treppen und ohne Lift',
          'Besenreine Übergabe',
          'Kurzfristige Termine möglich',
          'Festpreis nach Besichtigung',
        ],
        process: [
          {
            step: 1,
            title: 'Kostenlose Besichtigung',
            description: 'Wir besichtigen Ihren Keller und erstellen ein unverbindliches Festpreisangebot.',
          },
          {
            step: 2,
            title: 'Terminvereinbarung',
            description: 'Nach Ihrer Zusage vereinbaren wir einen passenden Termin - oft innerhalb weniger Tage.',
          },
          {
            step: 3,
            title: 'Professionelle Räumung',
            description: 'Unser Team räumt Ihren Keller komplett aus - von großen Möbeln bis zu Kleinteilen.',
          },
          {
            step: 4,
            title: 'Fachgerechte Verwertung',
            description: 'Wir verwerten alles fachgerecht und übergeben Ihren Keller besenrein.',
          },
        ],
        pricing: {
          info: 'Die Kosten für eine Kellerräumung hängen vom Umfang ab. Nach kostenloser Besichtigung erhalten Sie einen transparenten Festpreis.',
          factors: [
            'Größe und Füllstand des Kellers',
            'Art der zu verwertenden Gegenstände',
            'Zugänglichkeit (Treppen, Gänge)',
            'Entfernung zum Transportfahrzeug',
            'Besondere Abwicklungsanforderungen',
          ],
        },
        faq: [
          {
            question: 'Was kostet eine Kellerräumung?',
            answer: 'Ein durchschnittlicher Kellerraum (15-20m²) kostet 400-800€. Größere Keller oder stark vollgestellte Bereiche kosten entsprechend mehr. Nach kostenloser Besichtigung erhalten Sie einen verbindlichen Festpreis.',
          },
          {
            question: 'Wie lange dauert eine Kellerräumung?',
            answer: 'Ein Kellerraum von ca. 20m² räumen wir in 2-4 Stunden. Größere Keller oder schwer zugängliche Bereiche benötigen entsprechend mehr Zeit.',
          },
          {
            question: 'Können Sie auch bei sehr engen Treppen arbeiten?',
            answer: 'Ja, enge Kellertreppen sind für uns kein Problem. Unsere Teams sind ausgerüstet und trainiert für schwierige Zugangssituationen. Notfalls nutzen wir Kellerabgänge oder Lichtschächte.',
          },
          {
            question: 'Was passiert mit alten Chemikalien im Keller?',
            answer: 'Alte Farben, Lacke und Chemikalien verwerten wir als Sondermüll über zertifizierte Fachbetriebe. Diese Verwertung wird separat berechnet und erfolgt vollständig nach Vorschrift.',
          },
        ],
      },
      en: {
        name: 'Basement Clearing',
        shortDescription: 'Professional basement clearing in Vienna and surroundings - we completely clear your basement and recycle of everything properly.',
        description: 'Is your basement full and you want to create space again? We completely clear your basement - from old furniture to clutter and bulky waste. Even under difficult conditions like narrow stairs or no elevator, we work professionally and reliably throughout Austria.',
        metaDescription: 'Basement Clearing Vienna & Austria ✓ Even Narrow Stairs ✓ Complete Clearing ✓ Fixed Price ✓ Professional Service ☎ +43660 39 57 587',
        benefits: [
          'Complete clearing even of heavily cluttered basements',
          'Collection of bulky waste and clutter',
          'Works with narrow stairs and no elevator',
          'Broom-clean handover',
          'Short-notice appointments available',
          'Fixed price after inspection',
        ],
        process: [
          {
            step: 1,
            title: 'Free Inspection',
            description: 'We inspect your basement and create a non-binding fixed-price offer.',
          },
          {
            step: 2,
            title: 'Appointment Scheduling',
            description: 'After your confirmation, we schedule a suitable date - often within a few days.',
          },
          {
            step: 3,
            title: 'Professional Clearing',
            description: 'Our team completely clears your basement - from large furniture to small items.',
          },
          {
            step: 4,
            title: 'Professional Recycling',
            description: 'We recycle everything properly and hand over your basement broom-clean.',
          },
        ],
        pricing: {
          info: 'The cost of basement clearing depends on scope. After free inspection, you receive a transparent fixed price.',
          factors: [
            'Size and fill level of basement',
            'Type of items to be processed',
            'Accessibility (stairs, corridors)',
            'Distance to transport vehicle',
            'Special recycling requirements',
          ],
        },
        faq: [
          {
            question: 'How much does basement clearing cost?',
            answer: 'An average basement room (15-20m²) costs €400-800. Larger basements or heavily cluttered areas cost proportionally more. After free inspection, you receive a binding fixed price.',
          },
          {
            question: 'How long does basement clearing take?',
            answer: 'We clear a basement room of approximately 20m² in 2-4 hours. Larger basements or hard-to-access areas require correspondingly more time.',
          },
          {
            question: 'Can you work with very narrow stairs?',
            answer: 'Yes, narrow basement stairs are no problem for us. Our teams are equipped and trained for difficult access situations. If necessary, we use basement entrances or light wells.',
          },
          {
            question: 'What happens to old chemicals in the basement?',
            answer: 'Old paints, varnishes, and chemicals are recycled as hazardous waste through certified specialists. This recycling is billed separately and carried out fully according to regulations.',
          },
        ],
      },
    },
  },
  {
    id: ServiceId.DACHBODENRAEUMUNG,
    slugs: { de: 'dachbodenraeumung', en: 'attic-clearing' },
    relatedServices: [ServiceId.KELLERRAEUMUNG, ServiceId.SPERRMULLABHOLUNG, ServiceId.HAUSHALTSAUFLOESUNG],
    content: {
      de: {
        name: 'Dachbodenräumung',
        shortDescription: 'Professionelle Dachbodenräumung in Wien und ganz Österreich - auch bei schwierigem Zugang und ohne Lift.',
        description: 'Ihr Dachboden ist vollgestellt mit alten Möbeln, Kartons und Gerümpel? Wir räumen Ihren Dachboden komplett - auch bei schwierigem Zugang, niedrigen Decken oder steilen Treppen. Professionell, sicher und zu fairen Preisen in ganz Österreich.',
        metaDescription: 'Dachbodenräumung Wien ✓ Ganz Österreich ✓ Auch ohne Lift ✓ Schwieriger Zugang kein Problem ✓ Festpreis ☎ +43660 39 57 587',
        benefits: [
          'Räumung auch bei schwierigem Dachbodenzugang',
          'Sicherer Transport über steile Treppen',
          'Abholung von Gerümpel und Sperrmüll',
          'Besenreine Übergabe',
          'Erfahrung mit Altbau-Dachböden',
          'Festpreis nach Besichtigung',
        ],
        process: [
          {
            step: 1,
            title: 'Kostenlose Besichtigung',
            description: 'Wir besichtigen Ihren Dachboden und prüfen die Zugangsmöglichkeiten für ein genaues Angebot.',
          },
          {
            step: 2,
            title: 'Planung und Termin',
            description: 'Wir planen die Räumung unter Berücksichtigung besonderer Anforderungen und vereinbaren einen Termin.',
          },
          {
            step: 3,
            title: 'Sichere Räumung',
            description: 'Unser geschultes Team räumt den Dachboden sicher - auch bei niedrigen Decken und engen Treppen.',
          },
          {
            step: 4,
            title: 'Fachgerechte Verwertung',
            description: 'Wir verwerten alles fachgerecht und hinterlassen einen besenreinen Dachboden.',
          },
        ],
        pricing: {
          info: 'Die Kosten hängen von Größe, Füllstand und Zugänglichkeit ab. Nach Besichtigung erhalten Sie einen transparenten Festpreis.',
          factors: [
            'Dachbodengröße und Füllstand',
            'Zugänglichkeit und Treppensituation',
            'Art und Menge der Gegenstände',
            'Stockwerkshöhe',
            'Besondere Sicherheitsanforderungen',
          ],
        },
        faq: [
          {
            question: 'Was kostet eine Dachbodenräumung?',
            answer: 'Ein durchschnittlicher Dachboden (30-40m²) kostet 600-1.200€. Schwer zugängliche oder sehr vollgestellte Dachböden können mehr kosten. Nach Besichtigung erhalten Sie einen genauen Festpreis.',
          },
          {
            question: 'Wie kommen Sie auf schwer zugängliche Dachböden?',
            answer: 'Wir sind ausgerüstet für alle Zugangssituationen: steile Treppen, Bodentreppen, niedrige Durchgänge. Bei Bedarf nutzen wir Außenaufzüge oder arbeiten über Dachfenster.',
          },
          {
            question: 'Können Sie auch bei niedriger Deckenhöhe arbeiten?',
            answer: 'Ja, niedrige Dachböden sind für uns Routine. Unsere Teams arbeiten auch in gebeugter Haltung sicher und effizient. Wir planen dafür entsprechend mehr Zeit ein.',
          },
          {
            question: 'Was passiert mit alten Holzbalken und Baumaterial?',
            answer: 'Altes Holz wird fachgerecht verwertet oder recycelt. Baumaterialien werden getrennt verwertet. Bei Verdacht auf Schadstoffe (z.B. Asbest) informieren wir Sie sofort.',
          },
        ],
      },
      en: {
        name: 'Attic Clearing',
        shortDescription: 'Professional attic clearing in Vienna and throughout Austria - even with difficult access and no elevator.',
        description: 'Is your attic cluttered with old furniture, boxes, and junk? We completely clear your attic - even with difficult access, low ceilings, or steep stairs. Professional, safe, and at fair prices throughout Austria.',
        metaDescription: 'Attic Clearing Vienna & Austria ✓ No Elevator Required ✓ Difficult Access No Problem ✓ Fixed Price ✓ Safe Service ☎ +43660 39 57 587',
        benefits: [
          'Clearing even with difficult attic access',
          'Safe transport over steep stairs',
          'Collection of clutter and bulky waste',
          'Broom-clean handover',
          'Experience with heritage building attics',
          'Fixed price after inspection',
        ],
        process: [
          {
            step: 1,
            title: 'Free Inspection',
            description: 'We inspect your attic and check access options for an accurate quote.',
          },
          {
            step: 2,
            title: 'Planning and Scheduling',
            description: 'We plan the clearing considering special requirements and schedule an appointment.',
          },
          {
            step: 3,
            title: 'Safe Clearing',
            description: 'Our trained team safely clears the attic - even with low ceilings and narrow stairs.',
          },
          {
            step: 4,
            title: 'Professional Recycling',
            description: 'We recycle everything properly and leave a broom-clean attic.',
          },
        ],
        pricing: {
          info: 'Costs depend on size, fill level, and accessibility. After inspection, you receive a transparent fixed price.',
          factors: [
            'Attic size and fill level',
            'Accessibility and stair situation',
            'Type and quantity of items',
            'Floor height',
            'Special safety requirements',
          ],
        },
        faq: [
          {
            question: 'How much does attic clearing cost?',
            answer: 'An average attic (30-40m²) costs €600-1,200. Hard-to-access or very cluttered attics may cost more. After inspection, you receive an exact fixed price.',
          },
          {
            question: 'How do you access hard-to-reach attics?',
            answer: 'We are equipped for all access situations: steep stairs, loft ladders, low passages. When needed, we use external lifts or work through roof windows.',
          },
          {
            question: 'Can you work with low ceiling height?',
            answer: 'Yes, low attics are routine for us. Our teams work safely and efficiently even in stooped positions. We plan correspondingly more time for this.',
          },
          {
            question: 'What happens to old wooden beams and building materials?',
            answer: 'Old wood is properly recycled or recycled. Building materials are separately recycled. If we suspect hazardous materials (e.g., asbestos), we inform you immediately.',
          },
        ],
      },
    },
  },
  {
    id: ServiceId.GESCHAEFTSRAEUMUNG,
    slugs: { de: 'geschaeftsraeumung', en: 'commercial-clearing' },
    relatedServices: [ServiceId.BUROAUFLOESUNG, ServiceId.SPERRMULLABHOLUNG, ServiceId.CONTAINERSERVICE],
    content: {
      de: {
        name: 'Geschäftsräumung',
        shortDescription: 'Professionelle Räumung von Geschäftslokalen, Läden und Gewerbeflächen in Wien und ganz Österreich.',
        description: 'Sie schließen Ihr Geschäft oder übernehmen ein neues Lokal? Wir räumen Geschäftslokale jeder Art - vom kleinen Laden bis zur großen Gewerbefläche. Professionell, diskret und termingerecht in ganz Österreich.',
        metaDescription: 'Geschäftsräumung Wien ✓ Ganz Österreich ✓ Läden & Gewerbeflächen ✓ Termingerecht ✓ Diskret ☎ +43660 39 57 587',
        benefits: [
          'Räumung aller Geschäftsarten und Gewerbeflächen',
          'Termingerechte Ausführung (auch Wochenende)',
          'Diskrete Abwicklung',
          'Abholung von Ladeneinrichtung und Inventar',
          'Besenreine Übergabe',
          'Festpreis nach Besichtigung',
        ],
        process: [
          {
            step: 1,
            title: 'Besichtigung vor Ort',
            description: 'Wir besichtigen Ihre Geschäftsräume und erstellen ein detailliertes Angebot inkl. Zeitplan.',
          },
          {
            step: 2,
            title: 'Terminplanung',
            description: 'Wir planen die Räumung nach Ihrem Zeitplan - auch außerhalb der Geschäftszeiten oder am Wochenende.',
          },
          {
            step: 3,
            title: 'Professionelle Räumung',
            description: 'Wir räumen Ihr Geschäft komplett - von Ladeneinrichtung über Inventar bis zu Restbeständen.',
          },
          {
            step: 4,
            title: 'Besenreine Übergabe',
            description: 'Wir übergeben die Räumlichkeiten besenrein und termingerecht.',
          },
        ],
        pricing: {
          info: 'Die Kosten hängen von Art und Größe des Geschäfts ab. Nach Besichtigung erhalten Sie einen detaillierten Festpreis.',
          factors: [
            'Größe der Geschäftsfläche',
            'Art und Menge der Einrichtung',
            'Zeitfenster und Dringlichkeit',
            'Abwicklungsaufwand',
            'Besondere Anforderungen (Demontage, etc.)',
          ],
        },
        faq: [
          {
            question: 'Was kostet eine Geschäftsräumung?',
            answer: 'Ein kleiner Laden (50m²) kostet ab 1.500€, größere Geschäftsflächen ab 3.000€. Der genaue Preis hängt von Einrichtung und Inventar ab. Nach Besichtigung erhalten Sie ein detailliertes Festpreisangebot.',
          },
          {
            question: 'Können Sie auch am Wochenende räumen?',
            answer: 'Ja, wir räumen auch am Wochenende und außerhalb der üblichen Geschäftszeiten. So stören wir den laufenden Betrieb nicht und Sie können termingerecht übergeben.',
          },
          {
            question: 'Was passiert mit der Ladeneinrichtung?',
            answer: 'Brauchbare Ladeneinrichtung versuchen wir zu verkaufen - das reduziert Ihre Kosten. Nicht verwertbare Teile werden fachgerecht verwertet oder recycelt.',
          },
          {
            question: 'Wie diskret läuft eine Geschäftsräumung ab?',
            answer: 'Wir arbeiten sehr diskret - auf Wunsch mit neutralen Fahrzeugen und ohne sichtbare Firmenaufschrift. Die Räumung erfolgt professionell und ohne Aufsehen.',
          },
        ],
      },
      en: {
        name: 'Commercial Clearing',
        shortDescription: 'Professional clearing of commercial premises, stores, and business spaces in Vienna and throughout Austria.',
        description: 'Closing your business or taking over new premises? We clear commercial premises of all types - from small shops to large business spaces. Professional, discreet, and on schedule throughout Austria.',
        metaDescription: 'Commercial Clearing Vienna & Austria ✓ Stores & Business Spaces ✓ On Schedule ✓ Discreet Service ✓ Fixed Price ☎ +43660 39 57 587',
        benefits: [
          'Clearing of all business types and commercial spaces',
          'On-schedule execution (including weekends)',
          'Discreet handling',
          'Collection of store fixtures and inventory',
          'Broom-clean handover',
          'Fixed price after inspection',
        ],
        process: [
          {
            step: 1,
            title: 'On-Site Inspection',
            description: 'We inspect your business premises and create a detailed quote including timeline.',
          },
          {
            step: 2,
            title: 'Schedule Planning',
            description: 'We plan the clearing according to your schedule - even outside business hours or on weekends.',
          },
          {
            step: 3,
            title: 'Professional Clearing',
            description: 'We completely clear your business - from store fixtures and inventory to remaining stock.',
          },
          {
            step: 4,
            title: 'Broom-Clean Handover',
            description: 'We hand over the premises broom-clean and on schedule.',
          },
        ],
        pricing: {
          info: 'Costs depend on type and size of business. After inspection, you receive a detailed fixed price.',
          factors: [
            'Size of business space',
            'Type and quantity of fixtures',
            'Time window and urgency',
            'Processing effort',
            'Special requirements (dismantling, etc.)',
          ],
        },
        faq: [
          {
            question: 'How much does commercial clearing cost?',
            answer: 'A small shop (50m²) costs from €1,500, larger business spaces from €3,000. The exact price depends on fixtures and inventory. After inspection, you receive a detailed fixed-price offer.',
          },
          {
            question: 'Can you clear on weekends?',
            answer: 'Yes, we clear on weekends and outside regular business hours. This way we don\'t disturb ongoing operations and you can hand over on schedule.',
          },
          {
            question: 'What happens to store fixtures?',
            answer: 'We try to sell usable store fixtures - this reduces your costs. Non-usable parts are professionally recycled or recycled.',
          },
          {
            question: 'How discreet is commercial clearing?',
            answer: 'We work very discreetly - on request with unmarked vehicles and no visible company branding. Clearing is carried out professionally and without attracting attention.',
          },
        ],
      },
    },
  },
  {
    id: ServiceId.MESSIERAEUMUNG,
    slugs: { de: 'messie-raeumung', en: 'hoarding-clearing' },
    relatedServices: [ServiceId.WOHNUNGSRAEUMUNG, ServiceId.HAUSHALTSAUFLOESUNG, ServiceId.SPERRMULLABHOLUNG],
    content: {
      de: {
        name: 'Messie-Räumung',
        shortDescription: 'Einfühlsame und professionelle Räumung von Messie-Wohnungen in Wien und ganz Österreich - diskret und respektvoll.',
        description: 'Messie-Wohnungen erfordern besondere Sensibilität und Professionalität. Wir räumen Messie-Wohnungen diskret, respektvoll und gründlich in ganz Österreich. Unser geschultes Team arbeitet einfühlsam und unterstützt Sie bei der Wiederherstellung Ihrer Wohn qualität.',
        metaDescription: 'Messie-Räumung Wien ✓ Ganz Österreich ✓ Diskret & einfühlsam ✓ Professionelle Hilfe ✓ Vertrauensvoll ☎ +43660 39 57 587',
        benefits: [
          'Einfühlsames und geschultes Team',
          'Absolut diskrete Abwicklung',
          'Gründliche Reinigung nach Räumung',
          'Sortierung von Wertgegenständen',
          'Professionelle Geruchsbeseitigung',
          'Vertrauliche Behandlung',
        ],
        process: [
          {
            step: 1,
            title: 'Vertrauliches Erstgespräch',
            description: 'Wir besprechen in Ruhe und diskret Ihre Situation und besonderen Anforderungen.',
          },
          {
            step: 2,
            title: 'Behutsame Planung',
            description: 'Wir planen die Räumung sensibel und berücksichtigen Ihre persönlichen Wünsche.',
          },
          {
            step: 3,
            title: 'Professionelle Räumung',
            description: 'Unser geschultes Team räumt behutsam und gründlich - mit Respekt für Ihre Situation.',
          },
          {
            step: 4,
            title: 'Gründliche Reinigung',
            description: 'Nach der Räumung reinigen wir gründlich und beseitigen professionell Gerüche.',
          },
        ],
        pricing: {
          info: 'Messie-Räumungen sind individuell. Nach einem vertraulichen Gespräch erstellen wir ein faires Festpreisangebot.',
          factors: [
            'Wohnungsgröße und Füllgrad',
            'Verschmutzungsgrad',
            'Reinigungsaufwand',
            'Geruchsbeseitigung',
            'Zeitaufwand',
          ],
        },
        faq: [
          {
            question: 'Was kostet eine Messie-Räumung?',
            answer: 'Eine 60m² Messie-Wohnung kostet durchschnittlich 2.000-4.000€, abhängig vom Verschmutzungs- und Füllgrad. Nach vertraulichem Gespräch erhalten Sie ein transparentes Festpreisangebot.',
          },
          {
            question: 'Wie diskret arbeiten Sie?',
            answer: 'Absolute Diskretion ist uns sehr wichtig. Wir verwenden auf Wunsch neutrale Fahrzeuge, arbeiten zu vereinbarten Zeiten und behandeln Ihre Situation streng vertraulich.',
          },
          {
            question: 'Können Sie auch Gerüche beseitigen?',
            answer: 'Ja, wir haben professionelle Methoden zur Geruchsbeseitigung. Nach der Räumung und Reinigung setzen wir Ozonbehandlung oder spezielle Reinigungsmittel ein.',
          },
          {
            question: 'Wie gehen Sie mit persönlichen Gegenständen um?',
            answer: 'Wir sortieren behutsam alle Gegenstände. Persönliche Dokumente, Wertgegenstände und Erinnerungsstücke werden gesondert behandelt und Ihnen übergeben oder nach Ihren Wünschen verwahrt.',
          },
        ],
      },
      en: {
        name: 'Hoarding Clearing',
        shortDescription: 'Compassionate and professional clearing of hoarding situations in Vienna and throughout Austria - discreet and respectful.',
        description: 'Hoarding situations require special sensitivity and professionalism. We clear hoarding apartments discreetly, respectfully, and thoroughly throughout Austria. Our trained team works compassionately and supports you in restoring your living quality.',
        metaDescription: 'Hoarding Clearing Vienna & Austria ✓ Discreet & Compassionate ✓ Professional Help ✓ Confidential Service ☎ +43660 39 57 587',
        benefits: [
          'Compassionate and trained team',
          'Absolutely discreet handling',
          'Thorough cleaning after clearing',
          'Sorting of valuables',
          'Professional odor removal',
          'Confidential treatment',
        ],
        process: [
          {
            step: 1,
            title: 'Confidential Initial Consultation',
            description: 'We discuss your situation and special requirements calmly and discreetly.',
          },
          {
            step: 2,
            title: 'Gentle Planning',
            description: 'We plan the clearing sensitively and consider your personal wishes.',
          },
          {
            step: 3,
            title: 'Professional Clearing',
            description: 'Our trained team clears gently and thoroughly - with respect for your situation.',
          },
          {
            step: 4,
            title: 'Thorough Cleaning',
            description: 'After clearing, we clean thoroughly and professionally eliminate odors.',
          },
        ],
        pricing: {
          info: 'Hoarding clearings are individual. After a confidential consultation, we create a fair fixed-price offer.',
          factors: [
            'Apartment size and fill level',
            'Degree of soiling',
            'Cleaning effort required',
            'Odor removal',
            'Time required',
          ],
        },
        faq: [
          {
            question: 'How much does hoarding clearing cost?',
            answer: 'A 60m² hoarding apartment costs on average €2,000-4,000, depending on the degree of soiling and fill level. After confidential consultation, you receive a transparent fixed-price offer.',
          },
          {
            question: 'How discreet do you work?',
            answer: 'Absolute discretion is very important to us. Upon request, we use unmarked vehicles, work at agreed times, and treat your situation in strict confidence.',
          },
          {
            question: 'Can you also eliminate odors?',
            answer: 'Yes, we have professional methods for odor removal. After clearing and cleaning, we use ozone treatment or special cleaning agents.',
          },
          {
            question: 'How do you handle personal belongings?',
            answer: 'We carefully sort all items. Personal documents, valuables, and keepsakes are treated separately and handed over to you or kept according to your wishes.',
          },
        ],
      },
    },
  },
  {
    id: ServiceId.SPERRMULLABHOLUNG,
    slugs: { de: 'sperrmullabholung', en: 'bulky-waste-collection' },
    relatedServices: [ServiceId.CONTAINERSERVICE, ServiceId.WOHNUNGSRAEUMUNG, ServiceId.KELLERRAEUMUNG],
    content: {
      de: {
        name: 'Sperrmüllabholung',
        shortDescription: 'Professionelle Sperrmüllabholung in Wien und ganz Österreich - schnell, zuverlässig und umweltgerecht.',
        description: 'Sie müssen Sperrmüll verwerten? Wir holen Ihren Sperrmüll ab und verwerten ihn fachgerecht. Von einzelnen Möbelstücken bis zu größeren Mengen - schnell, zuverlässig und umweltbewusst in ganz Österreich.',
        metaDescription: 'Sperrmüllabholung Wien ✓ Ganz Österreich ✓ Schnelle Abholung ✓ Umweltgerecht ✓ Faire Preise ☎ +43660 39 57 587',
        benefits: [
          'Schnelle Abholung oft schon am nächsten Tag',
          'Abholung von Möbeln und Elektrogeräten',
          'Umweltgerechte Verwertung und Recycling',
          'Auch größere Mengen kein Problem',
          'Festpreis nach Besichtigung',
          'Abtransport aus allen Stockwerken',
        ],
        process: [
          {
            step: 1,
            title: 'Anfrage',
            description: 'Sie beschreiben uns Ihren Sperrmüll telefonisch, per E-Mail oder mit Fotos.',
          },
          {
            step: 2,
            title: 'Preisangebot',
            description: 'Wir erstellen ein transparentes Festpreisangebot für Abholung und Verwertung.',
          },
          {
            step: 3,
            title: 'Schnelle Abholung',
            description: 'Wir holen Ihren Sperrmüll zum vereinbarten Termin ab - oft schon am nächsten Tag möglich.',
          },
          {
            step: 4,
            title: 'Fachgerechte Verwertung',
            description: 'Wir verwerten alles umweltgerecht und führen verwertbare Teile dem Recycling zu.',
          },
        ],
        pricing: {
          info: 'Die Kosten hängen von Art und Menge des Sperrmülls ab. Nach Beschreibung oder Besichtigung erhalten Sie einen Festpreis.',
          factors: [
            'Art und Menge des Sperrmülls',
            'Stockwerk und Liftvorhandensein',
            'Anzahl der benötigten Helfer',
            'Abwicklungskosten',
            'Entfernung',
          ],
        },
        faq: [
          {
            question: 'Was kostet Sperrmüllabholung?',
            answer: 'Ein Sofa oder Schrank kostet ab 80€, ein komplettes Schlafzimmer ab 200€. Der Preis hängt von Größe, Gewicht und Stockwerk ab. Nach Beschreibung erhalten Sie einen genauen Festpreis.',
          },
          {
            question: 'Wie schnell können Sie kommen?',
            answer: 'In dringenden Fällen oft schon am nächsten Tag. Normalerweise können wir innerhalb von 2-3 Tagen einen Termin anbieten.',
          },
          {
            question: 'Was zählt alles als Sperrmüll?',
            answer: 'Möbel, Matratzen, Teppiche, Elektrogeräte, Fahrräder, Gartengeräte - alles was nicht in die normale Mülltonne passt. Keine Baustellenabfälle oder Gefahrenstoffe.',
          },
          {
            question: 'Holen Sie auch aus oberen Stockwerken ab?',
            answer: 'Ja, wir holen Sperrmüll aus allen Stockwerken ab - auch ohne Lift. Unsere Teams sind ausgerüstet für alle Transportsituationen.',
          },
        ],
      },
      en: {
        name: 'Bulky Waste Collection',
        shortDescription: 'Professional bulky waste collection in Vienna and throughout Austria - fast, reliable, and environmentally friendly.',
        description: 'Need bulky waste collected? We collect your bulky waste and recycle it properly. From individual furniture pieces to larger quantities - fast, reliable, and environmentally conscious throughout Austria.',
        metaDescription: 'Bulky Waste Collection Vienna & Austria ✓ Fast Collection ✓ Environmentally Friendly ✓ Fair Prices ✓ Same-Day Service ☎ +43660 39 57 587',
        benefits: [
          'Fast collection often the next day',
          'Collection of furniture and electrical appliances',
          'Environmentally friendly recycling',
          'Large quantities no problem',
          'Fixed price after inspection',
          'Collection from all floors',
        ],
        process: [
          {
            step: 1,
            title: 'Inquiry',
            description: 'You describe your bulky waste by phone, email, or with photos.',
          },
          {
            step: 2,
            title: 'Price Quote',
            description: 'We create a transparent fixed-price offer for collection and recycling.',
          },
          {
            step: 3,
            title: 'Fast Collection',
            description: 'We collect your bulky waste at the agreed time - often possible the next day.',
          },
          {
            step: 4,
            title: 'Professional Recycling',
            description: 'We recycle everything environmentally and recycle usable parts.',
          },
        ],
        pricing: {
          info: 'Costs depend on type and quantity of bulky waste. After description or inspection, you receive a fixed price.',
          factors: [
            'Type and quantity of bulky waste',
            'Floor level and elevator availability',
            'Number of helpers needed',
            'Collection costs',
            'Distance',
          ],
        },
        faq: [
          {
            question: 'How much does bulky waste collection cost?',
            answer: 'A sofa or wardrobe costs from €80, a complete bedroom set from €200. Price depends on size, weight, and floor level. After description, you receive an exact fixed price.',
          },
          {
            question: 'How quickly can you come?',
            answer: 'In urgent cases, often the next day. Normally, we can offer an appointment within 2-3 days.',
          },
          {
            question: 'What counts as bulky waste?',
            answer: 'Furniture, mattresses, carpets, electrical appliances, bicycles, garden equipment - anything that doesn\'t fit in the regular trash bin. No construction waste or hazardous materials.',
          },
          {
            question: 'Do you collect from upper floors?',
            answer: 'Yes, we collect bulky waste from all floors - even without elevator. Our teams are equipped for all transport situations.',
          },
        ],
      },
    },
  },
  {
    id: ServiceId.UMZUGSSERVICE,
    slugs: { de: 'umzugsservice', en: 'moving-service' },
    relatedServices: [ServiceId.WOHNUNGSRAEUMUNG, ServiceId.SPERRMULLABHOLUNG, ServiceId.HAUSHALTSAUFLOESUNG],
    content: {
      de: {
        name: 'Umzugsservice',
        shortDescription: 'Professioneller Umzugsservice in Wien und ganz Österreich - von der Planung bis zur Endreinigung.',
        description: 'Ihr Umzug steht an? Wir kümmern uns um alles - vom Verpacken über den Transport bis zur Endreinigung der alten Wohnung. Professionell, zuverlässig und stressfrei in ganz Österreich.',
        metaDescription: 'Umzugsservice Wien ✓ Ganz Österreich ✓ Komplettservice mit Endreinigung ✓ Professionell ✓ Festpreis ☎ +43660 39 57 587',
        benefits: [
          'Kompletter Umzugsservice von A-Z',
          'Professionelles Verpackungsmaterial',
          'Möbelmontage und -demontage',
          'Endreinigung der alten Wohnung',
          'Versicherter Transport',
          'Festpreis nach Besichtigung',
        ],
        process: [
          {
            step: 1,
            title: 'Kostenlose Besichtigung',
            description: 'Wir besichtigen beide Wohnungen und planen den Umzug im Detail.',
          },
          {
            step: 2,
            title: 'Umzugsplanung',
            description: 'Wir erstellen einen detaillierten Umzugsplan mit Zeitablauf und Kostenübersicht.',
          },
          {
            step: 3,
            title: 'Durchführung',
            description: 'Am Umzugstag packen wir, montieren, transportieren und montieren wieder auf.',
          },
          {
            step: 4,
            title: 'Endreinigung',
            description: 'Wir reinigen Ihre alte Wohnung besenrein für die Übergabe.',
          },
        ],
        pricing: {
          info: 'Die Umzugskosten hängen von mehreren Faktoren ab. Nach Besichtigung erhalten Sie einen detaillierten Festpreis.',
          factors: [
            'Wohnungsgröße und Zimmerzahl',
            'Menge und Art des Umzugsguts',
            'Entfernung zwischen Alt- und Neuwohnung',
            'Stockwerk und Liftvorhandensein',
            'Zusatzleistungen (Montage, Endreinigung)',
          ],
        },
        faq: [
          {
            question: 'Was kostet ein Umzug?',
            answer: 'Ein 2-Zimmer-Umzug innerhalb Wiens kostet ab 800€, eine 4-Zimmer-Wohnung ab 1.500€. Der genaue Preis hängt von Umfang und Entfernung ab. Nach Besichtigung erhalten Sie einen verbindlichen Festpreis.',
          },
          {
            question: 'Wie lange dauert ein Umzug?',
            answer: 'Eine 2-Zimmer-Wohnung innerhalb Wiens schaffen wir in 4-6 Stunden. Größere Wohnungen oder weitere Entfernungen benötigen entsprechend mehr Zeit.',
          },
          {
            question: 'Ist mein Umzugsgut versichert?',
            answer: 'Ja, Ihr Umzugsgut ist während des Transports versichert. Die Versicherungssumme und Bedingungen besprechen wir im Erstgespräch.',
          },
          {
            question: 'Bringen Sie Verpackungsmaterial mit?',
            answer: 'Ja, wir bringen professionelles Verpackungsmaterial mit - Kartons, Luftpolsterfolie, Möbeldecken, etc. Die Kosten sind im Festpreis enthalten.',
          },
        ],
      },
      en: {
        name: 'Moving Service',
        shortDescription: 'Professional moving service in Vienna and throughout Austria - from planning to final cleaning.',
        description: 'Your move is coming up? We take care of everything - from packing and transport to final cleaning of the old apartment. Professional, reliable, and stress-free throughout Austria.',
        metaDescription: 'Moving Service Vienna & Austria ✓ Complete Service with Final Cleaning ✓ Professional ✓ Fixed Price ✓ Insured ☎ +43660 39 57 587',
        benefits: [
          'Complete moving service from A to Z',
          'Professional packing materials',
          'Furniture assembly and disassembly',
          'Final cleaning of old apartment',
          'Insured transport',
          'Fixed price after inspection',
        ],
        process: [
          {
            step: 1,
            title: 'Free Inspection',
            description: 'We inspect both apartments and plan the move in detail.',
          },
          {
            step: 2,
            title: 'Move Planning',
            description: 'We create a detailed moving plan with timeline and cost overview.',
          },
          {
            step: 3,
            title: 'Execution',
            description: 'On moving day, we pack, disassemble, transport, and reassemble.',
          },
          {
            step: 4,
            title: 'Final Cleaning',
            description: 'We clean your old apartment broom-clean for handover.',
          },
        ],
        pricing: {
          info: 'Moving costs depend on several factors. After inspection, you receive a detailed fixed price.',
          factors: [
            'Apartment size and number of rooms',
            'Quantity and type of items to move',
            'Distance between old and new apartment',
            'Floor level and elevator availability',
            'Additional services (assembly, final cleaning)',
          ],
        },
        faq: [
          {
            question: 'How much does a move cost?',
            answer: 'A 2-room move within Vienna costs from €800, a 4-room apartment from €1,500. The exact price depends on scope and distance. After inspection, you receive a binding fixed price.',
          },
          {
            question: 'How long does a move take?',
            answer: 'We complete a 2-room apartment within Vienna in 4-6 hours. Larger apartments or longer distances require correspondingly more time.',
          },
          {
            question: 'Are my belongings insured?',
            answer: 'Yes, your belongings are insured during transport. We discuss insurance coverage and conditions in the initial consultation.',
          },
          {
            question: 'Do you bring packing materials?',
            answer: 'Yes, we bring professional packing materials - boxes, bubble wrap, furniture blankets, etc. Costs are included in the fixed price.',
          },
        ],
      },
    },
  },
  {
    id: ServiceId.GARAGERAEUMUNG,
    slugs: { de: 'garageraeumung', en: 'garage-clearing' },
    relatedServices: [ServiceId.KELLERRAEUMUNG, ServiceId.CONTAINERSERVICE, ServiceId.SPERRMULLABHOLUNG],
    content: {
      de: {
        name: 'Garageräumung',
        shortDescription: 'Professionelle Räumung von Garagen, Carports und Stellplätzen in Wien und ganz Österreich.',
        description: 'Ihre Garage ist vollgestellt und Sie brauchen wieder Platz fürs Auto? Wir räumen Garagen, Carports und Stellplätze komplett - von alten Autoreifen über Werkzeug bis zu jahrelang gesammeltem Gerümpel in ganz Österreich.',
        metaDescription: 'Garageräumung Wien ✓ Ganz Österreich ✓ Carports & Stellplätze ✓ Schnelle Abwicklung ✓ Festpreis ☎ +43660 39 57 587',
        benefits: [
          'Komplette Räumung von Garagen und Carports',
          'Abholung von Autoreifen und Altöl',
          'Auch größere Mengen kein Problem',
          'Schnelle Abwicklung',
          'Besenreine Übergabe',
          'Festpreis nach Besichtigung',
        ],
        process: [
          {
            step: 1,
            title: 'Kostenlose Besichtigung',
            description: 'Wir besichtigen Ihre Garage und erstellen ein unverbindliches Festpreisangebot.',
          },
          {
            step: 2,
            title: 'Terminvereinbarung',
            description: 'Nach Ihrer Zusage vereinbaren wir schnellstmöglich einen Termin.',
          },
          {
            step: 3,
            title: 'Professionelle Räumung',
            description: 'Wir räumen Ihre Garage komplett - inkl. fachgerechter Abholung von Sondermüll.',
          },
          {
            step: 4,
            title: 'Besenreine Übergabe',
            description: 'Wir übergeben Ihre Garage sauber und besenrein.',
          },
        ],
        pricing: {
          info: 'Die Kosten hängen vom Füllstand und der Größe ab. Nach Besichtigung erhalten Sie einen transparenten Festpreis.',
          factors: [
            'Garagengröße',
            'Füllstand und Art der Gegenstände',
            'Sondermüll (Reifen, Öl, Chemikalien)',
            'Zugänglichkeit',
            'Abwicklungsaufwand',
          ],
        },
        faq: [
          {
            question: 'Was kostet eine Garageräumung?',
            answer: 'Eine durchschnittliche Einzelgarage kostet 300-600€. Größere Garagen oder stark vollgestellte Bereiche kosten entsprechend mehr. Nach Besichtigung erhalten Sie einen genauen Festpreis.',
          },
          {
            question: 'Wie gehen Sie mit Autoreifen und Altöl um?',
            answer: 'Autoreifen und Altöl verwerten wir fachgerecht über zertifizierte Fachbetriebe. Die Abwicklungskosten sind im Festpreis enthalten.',
          },
          {
            question: 'Können Sie auch Werkzeug und Maschinen abtransportieren?',
            answer: 'Ja, wir transportieren alles ab - von Werkzeugen über Maschinen bis zu Gartengeräten. Brauchbare Gegenstände können wir auf Wunsch auch verkaufen.',
          },
          {
            question: 'Wie lange dauert eine Garageräumung?',
            answer: 'Eine normale Einzelgarage räumen wir in 2-3 Stunden. Größere oder stark vollgestellte Garagen benötigen entsprechend mehr Zeit.',
          },
        ],
      },
      en: {
        name: 'Garage Clearing',
        shortDescription: 'Professional clearing of garages, carports, and parking spaces in Vienna and throughout Austria.',
        description: 'Is your garage cluttered and you need space for your car again? We completely clear garages, carports, and parking spaces - from old car tires and tools to years of accumulated clutter throughout Austria.',
        metaDescription: 'Garage Clearing Vienna & Austria ✓ Carports & Parking Spaces ✓ Fast Service ✓ Fixed Price ✓ Professional Recycling ☎ +43660 39 57 587',
        benefits: [
          'Complete clearing of garages and carports',
          'Collection of car tires and waste oil',
          'Large quantities no problem',
          'Fast service',
          'Broom-clean handover',
          'Fixed price after inspection',
        ],
        process: [
          {
            step: 1,
            title: 'Free Inspection',
            description: 'We inspect your garage and create a non-binding fixed-price offer.',
          },
          {
            step: 2,
            title: 'Appointment Scheduling',
            description: 'After your confirmation, we schedule an appointment as soon as possible.',
          },
          {
            step: 3,
            title: 'Professional Clearing',
            description: 'We completely clear your garage - including proper recycling of hazardous waste.',
          },
          {
            step: 4,
            title: 'Broom-Clean Handover',
            description: 'We hand over your garage clean and broom-clean.',
          },
        ],
        pricing: {
          info: 'Costs depend on fill level and size. After inspection, you receive a transparent fixed price.',
          factors: [
            'Garage size',
            'Fill level and type of items',
            'Hazardous waste (tires, oil, chemicals)',
            'Accessibility',
            'Processing effort',
          ],
        },
        faq: [
          {
            question: 'How much does garage clearing cost?',
            answer: 'An average single garage costs €300-600. Larger garages or heavily cluttered areas cost proportionally more. After inspection, you receive an exact fixed price.',
          },
          {
            question: 'How do you handle car tires and waste oil?',
            answer: 'We properly recycle of car tires and waste oil through certified specialists. Collection costs are included in the fixed price.',
          },
          {
            question: 'Can you also transport tools and machinery?',
            answer: 'Yes, we transport everything - from tools and machinery to garden equipment. Upon request, we can also sell usable items.',
          },
          {
            question: 'How long does garage clearing take?',
            answer: 'We clear a normal single garage in 2-3 hours. Larger or heavily cluttered garages require correspondingly more time.',
          },
        ],
      },
    },
  },
  {
    id: ServiceId.BUROAUFLOESUNG,
    slugs: { de: 'bueroaufloesung', en: 'office-dissolution' },
    relatedServices: [ServiceId.GESCHAEFTSRAEUMUNG, ServiceId.SPERRMULLABHOLUNG, ServiceId.CONTAINERSERVICE],
    content: {
      de: {
        name: 'Büroauflösung',
        shortDescription: 'Professionelle Auflösung von Büros und Praxen in Wien und ganz Österreich - diskret und termingerecht.',
        description: 'Sie lösen Ihr Büro oder Ihre Praxis auf? Wir übernehmen die komplette Büroauflösung - von der Demontage der Möbel bis zur fachgerechten Abholung von IT-Equipment. Diskret, professionell und termingerecht in ganz Österreich.',
        metaDescription: 'Büroauflösung Wien ✓ Ganz Österreich ✓ IT-Verwertung ✓ Diskret ✓ Termingerecht ✓ Festpreis ☎ +43660 39 57 587',
        benefits: [
          'Komplette Büroauflösung von A-Z',
          'Fachgerechte IT- und Datenträger-Verwertung',
          'Demontage von Büromöbeln',
          'Diskrete Abwicklung',
          'Termingerechte Ausführung',
          'Festpreis nach Besichtigung',
        ],
        process: [
          {
            step: 1,
            title: 'Besichtigung vor Ort',
            description: 'Wir besichtigen Ihre Büroräume und erstellen ein detailliertes Angebot.',
          },
          {
            step: 2,
            title: 'Detailplanung',
            description: 'Wir planen die Auflösung nach Ihrem Zeitplan - auch außerhalb der Geschäftszeiten.',
          },
          {
            step: 3,
            title: 'Professionelle Auflösung',
            description: 'Wir demontieren, räumen und verwerten alles fachgerecht - inkl. IT-Equipment.',
          },
          {
            step: 4,
            title: 'Besenreine Übergabe',
            description: 'Wir übergeben die Räumlichkeiten besenrein und termingerecht.',
          },
        ],
        pricing: {
          info: 'Die Kosten hängen von Größe und Ausstattung ab. Nach Besichtigung erhalten Sie einen detaillierten Festpreis.',
          factors: [
            'Größe der Bürofläche',
            'Anzahl und Art der Büromöbel',
            'Menge an IT-Equipment',
            'Zeitfenster und Dringlichkeit',
            'Besondere Abwicklungsanforderungen',
          ],
        },
        faq: [
          {
            question: 'Was kostet eine Büroauflösung?',
            answer: 'Ein kleines Büro (30m²) kostet ab 1.000€, größere Büroflächen ab 2.500€. Der genaue Preis hängt von Möbeln und IT-Equipment ab. Nach Besichtigung erhalten Sie ein detailliertes Angebot.',
          },
          {
            question: 'Wie werden Datenträger verwertet?',
            answer: 'Festplatten und Datenträger werden nach Datenschutzrichtlinien vernichtet. Auf Wunsch erhalten Sie Verwertungsnachweise und Zertifikate über die fachgerechte Vernichtung.',
          },
          {
            question: 'Können Sie auch am Wochenende arbeiten?',
            answer: 'Ja, wir führen Büroauflösungen auch am Wochenende oder nachts durch, um den laufenden Betrieb nicht zu stören.',
          },
          {
            question: 'Was passiert mit den Büromöbeln?',
            answer: 'Hochwertige Büromöbel versuchen wir zu verkaufen - das reduziert Ihre Kosten. Nicht verwertbare Möbel werden fachgerecht verwertet oder recycelt.',
          },
        ],
      },
      en: {
        name: 'Office Dissolution',
        shortDescription: 'Professional dissolution of offices and practices in Vienna and throughout Austria - discreet and on schedule.',
        description: 'Dissolving your office or practice? We handle the complete office dissolution - from furniture disassembly to proper IT equipment recycling. Discreet, professional, and on schedule throughout Austria.',
        metaDescription: 'Office Dissolution Vienna & Austria ✓ IT Recycling ✓ Discreet ✓ On Schedule ✓ Fixed Price ✓ Data Protection ☎ +43660 39 57 587',
        benefits: [
          'Complete office dissolution A to Z',
          'Professional IT and data carrier recycling',
          'Office furniture disassembly',
          'Discreet handling',
          'On-schedule execution',
          'Fixed price after inspection',
        ],
        process: [
          {
            step: 1,
            title: 'On-Site Inspection',
            description: 'We inspect your office premises and create a detailed quote.',
          },
          {
            step: 2,
            title: 'Detailed Planning',
            description: 'We plan the dissolution according to your schedule - even outside business hours.',
          },
          {
            step: 3,
            title: 'Professional Dissolution',
            description: 'We disassemble, clear, and properly recycle of everything - including IT equipment.',
          },
          {
            step: 4,
            title: 'Broom-Clean Handover',
            description: 'We hand over the premises broom-clean and on schedule.',
          },
        ],
        pricing: {
          info: 'Costs depend on size and equipment. After inspection, you receive a detailed fixed price.',
          factors: [
            'Office space size',
            'Number and type of office furniture',
            'Amount of IT equipment',
            'Time window and urgency',
            'Special recycling requirements',
          ],
        },
        faq: [
          {
            question: 'How much does office dissolution cost?',
            answer: 'A small office (30m²) costs from €1,000, larger office spaces from €2,500. The exact price depends on furniture and IT equipment. After inspection, you receive a detailed quote.',
          },
          {
            question: 'How are data carriers recycled?',
            answer: 'Hard drives and data carriers are destroyed according to data protection regulations. Upon request, you receive recycling certificates for proper destruction.',
          },
          {
            question: 'Can you work on weekends?',
            answer: 'Yes, we also carry out office dissolutions on weekends or at night to avoid disrupting ongoing operations.',
          },
          {
            question: 'What happens to office furniture?',
            answer: 'We try to sell high-quality office furniture - this reduces your costs. Non-usable furniture is professionally recycled or recycled.',
          },
        ],
      },
    },
  },
  {
    id: ServiceId.VERLASSENSCHAFTSRAEUMUNG,
    slugs: { de: 'verlassenschaftsraeumung', en: 'estate-clearing' },
    relatedServices: [ServiceId.HAUSHALTSAUFLOESUNG, ServiceId.WOHNUNGSRAEUMUNG, ServiceId.SPERRMULLABHOLUNG],
    content: {
      de: {
        name: 'Verlassenschaftsräumung',
        shortDescription: 'Einfühlsame Verlassenschaftsräumung nach Todesfall in Wien und ganz Österreich - respektvoll und professionell.',
        description: 'Nach einem Todesfall ist die Räumung der Wohnung oder des Hauses emotional belastend. Wir übernehmen die Verlassenschaftsräumung respektvoll und einfühlsam. Wir kümmern uns um alles - von der Sortierung persönlicher Gegenstände bis zur besenreinen Übergabe in ganz Österreich.',
        metaDescription: 'Verlassenschaftsräumung Wien ✓ Ganz Österreich ✓ Einfühlsam nach Todesfall ✓ Diskret ✓ Respektvoll ☎ +43660 39 57 587',
        benefits: [
          'Einfühlsamer Umgang in schwierigen Zeiten',
          'Sorgfältige Sortierung von Wertgegenständen',
          'Diskrete und respektvolle Arbeitsweise',
          'Komplette Räumung von A-Z',
          'Besenreine Übergabe',
          'Festpreis nach Besichtigung',
        ],
        process: [
          {
            step: 1,
            title: 'Persönliches Erstgespräch',
            description: 'Wir besprechen in Ruhe Ihre Situation und besonderen Wünsche bezüglich der Verlassenschaft.',
          },
          {
            step: 2,
            title: 'Sorgfältige Sortierung',
            description: 'Wir sortieren behutsam Wertgegenstände, Dokumente und persönliche Erinnerungen aus.',
          },
          {
            step: 3,
            title: 'Respektvolle Räumung',
            description: 'Wir räumen die gesamte Verlassenschaft mit Respekt und Sorgfalt.',
          },
          {
            step: 4,
            title: 'Besenreine Übergabe',
            description: 'Wir übergeben die Immobilie besenrein und bereit zur Weitervermietung oder zum Verkauf.',
          },
        ],
        pricing: {
          info: 'Die Kosten variieren je nach Umfang. Wertvolle Gegenstände können die Kosten reduzieren. Nach Besichtigung erhalten Sie ein faires Angebot.',
          factors: [
            'Größe der Immobilie',
            'Umfang der Verlassenschaft',
            'Vorhandensein verwertbarer Gegenstände',
            'Zeitaufwand für Sortierung',
            'Abwicklungsaufwand',
          ],
        },
        faq: [
          {
            question: 'Was kostet eine Verlassenschaftsräumung?',
            answer: 'Eine 3-Zimmer-Wohnung kostet durchschnittlich 1.500-2.500€. Bei wertvollen Gegenständen können die Kosten deutlich reduziert werden. Nach Besichtigung erhalten Sie ein transparentes Angebot.',
          },
          {
            question: 'Wie gehen Sie mit persönlichen Gegenständen um?',
            answer: 'Wir sortieren sehr sorgfältig. Schmuck, Uhren, Dokumente, Fotoalben und Erinnerungsstücke werden gesondert behandelt und Ihnen übergeben.',
          },
          {
            question: 'Können Sie diskret arbeiten?',
            answer: 'Absolute Diskretion ist uns sehr wichtig. Wir arbeiten respektvoll, ruhig und auf Wunsch auch außerhalb der üblichen Zeiten.',
          },
          {
            question: 'Wie lange dauert eine Verlassenschaftsräumung?',
            answer: 'Ein durchschnittlicher 3-Zimmer-Haushalt benötigt 1-2 Tage. Wir nehmen uns Zeit für sorgfältiges Sortieren und respektvolles Arbeiten.',
          },
        ],
      },
      en: {
        name: 'Estate Clearing',
        shortDescription: 'Compassionate estate clearing after bereavement in Vienna and throughout Austria - respectful and professional.',
        description: 'After a death, clearing the apartment or house is emotionally challenging. We handle estate clearing respectfully and compassionately. We take care of everything - from sorting personal belongings to broom-clean handover throughout Austria.',
        metaDescription: 'Estate Clearing Vienna & Austria ✓ Compassionate After Bereavement ✓ Discreet ✓ Respectful ✓ Professional Service ☎ +43660 39 57 587',
        benefits: [
          'Compassionate handling in difficult times',
          'Careful sorting of valuables',
          'Discreet and respectful work approach',
          'Complete clearing from A to Z',
          'Broom-clean handover',
          'Fixed price after inspection',
        ],
        process: [
          {
            step: 1,
            title: 'Personal Initial Consultation',
            description: 'We calmly discuss your situation and special wishes regarding the estate.',
          },
          {
            step: 2,
            title: 'Careful Sorting',
            description: 'We gently sort valuables, documents, and personal memories.',
          },
          {
            step: 3,
            title: 'Respectful Clearing',
            description: 'We clear the entire estate with respect and care.',
          },
          {
            step: 4,
            title: 'Broom-Clean Handover',
            description: 'We hand over the property broom-clean and ready for re-rental or sale.',
          },
        ],
        pricing: {
          info: 'Costs vary depending on scope. Valuable items can reduce costs. After inspection, you receive a fair offer.',
          factors: [
            'Property size',
            'Scope of estate',
            'Presence of usable items',
            'Time required for sorting',
            'Processing effort',
          ],
        },
        faq: [
          {
            question: 'How much does estate clearing cost?',
            answer: 'A 3-room apartment costs on average €1,500-2,500. With valuable items, costs can be significantly reduced. After inspection, you receive a transparent offer.',
          },
          {
            question: 'How do you handle personal belongings?',
            answer: 'We sort very carefully. Jewelry, watches, documents, photo albums, and keepsakes are treated separately and handed over to you.',
          },
          {
            question: 'Can you work discreetly?',
            answer: 'Absolute discretion is very important to us. We work respectfully, quietly, and upon request also outside regular hours.',
          },
          {
            question: 'How long does estate clearing take?',
            answer: 'An average 3-room household requires 1-2 days. We take time for careful sorting and respectful work.',
          },
        ],
      },
    },
  },
  {
    id: ServiceId.CONTAINERSERVICE,
    slugs: { de: 'container-service', en: 'container-service' },
    relatedServices: [ServiceId.SPERRMULLABHOLUNG, ServiceId.GESCHAEFTSRAEUMUNG, ServiceId.GARAGERAEUMUNG],
    content: {
      de: {
        name: 'Container-Service',
        shortDescription: 'Professioneller Container-Service in Wien und ganz Österreich - von 3m³ bis 10m³ für alle Abfallarten.',
        description: 'Sie benötigen einen Container für Ihre Renovierung oder Baustelle? Wir liefern Container in verschiedenen Größen (3-10m³) für Bauschutt, Holz oder Mischabfall. Mit Abholung, Verwertung und auf Wunsch Genehmigungsservice in ganz Österreich.',
        metaDescription: 'Container-Service Wien ✓ Ganz Österreich ✓ 3-10m³ Container ✓ Bauschutt & Mischabfall ✓ Inkl. Verwertung ☎ +43660 39 57 587',
        benefits: [
          'Container in verschiedenen Größen (3-10m³)',
          'Für alle Abfallarten (Bauschutt, Holz, Mischabfall)',
          'Schnelle Lieferung und Abholung',
          'Inklusive fachgerechter Abwicklung',
          'Hilfe bei Straßen-Genehmigung',
          'Transparente Festpreise',
        ],
        process: [
          {
            step: 1,
            title: 'Anfrage & Beratung',
            description: 'Wir beraten Sie zur richtigen Containergröße und erstellen ein Angebot.',
          },
          {
            step: 2,
            title: 'Lieferung',
            description: 'Wir liefern den Container zum Wunschtermin an die gewünschte Stelle (Straße, Grundstück, Baustelle).',
          },
          {
            step: 3,
            title: 'Befüllung',
            description: 'Sie befüllen den Container in Ihrem Tempo. Wir beraten bei Fragen zur richtigen Befüllung.',
          },
          {
            step: 4,
            title: 'Abholung & Verwertung',
            description: 'Nach Ihrer Meldung holen wir den Container ab und verwerten den Inhalt fachgerecht.',
          },
        ],
        pricing: {
          info: 'Container-Preise richten sich nach Größe, Mietdauer und Abfallart. Wir erstellen transparente All-inclusive-Angebote.',
          factors: [
            'Containergröße (3m³, 5m³, 7m³, 10m³)',
            'Mietdauer (Tage oder Wochen)',
            'Art des Abfalls (Bauschutt, Holz, Mischabfall)',
            'Lieferentfernung',
            'Stellplatz-Genehmigung (bei Straßenaufstellung)',
          ],
        },
        faq: [
          {
            question: 'Was kostet ein Container?',
            answer: 'Ein 3m³ Container für Bauschutt kostet ab 180€ (inkl. Lieferung, Abholung, Verwertung, 7 Tage Miete). Ein 7m³ Container ab 350€. Mischabfall ist teurer als sortenreiner Bauschutt. Festpreis im Angebot.',
          },
          {
            question: 'Welche Containergröße brauche ich?',
            answer: 'Für kleine Renovierungen (Bad, Küche) reicht meist 3-5m³. Bei Wohnungsräumungen empfehlen wir 5-7m³. Für Hausabbruch oder große Baustellen 7-10m³. Wir beraten Sie gerne telefonisch.',
          },
          {
            question: 'Brauche ich eine Genehmigung für Straßenaufstellung?',
            answer: 'Bei Aufstellung auf öffentlichem Grund (Straße, Gehsteig) benötigen Sie eine Bewilligung der MA46. Wir helfen Ihnen bei der Beantragung oder stellen den Container auf Privatgrund.',
          },
          {
            question: 'Was darf in den Container?',
            answer: 'In Bauschutt-Container: Ziegel, Beton, Fliesen, Keramik. In Holz-Container: Holzabfälle, Möbel, Paletten. In Mischabfall: alle gemischten Abfälle. Nicht erlaubt: Asbest, Gefahrstoffe, Elektrogeräte.',
          },
        ],
      },
      en: {
        name: 'Container Service',
        shortDescription: 'Professional container service in Vienna and throughout Austria - from 3m³ to 10m³ for all waste types.',
        description: 'Need a container for your renovation or construction site? We deliver containers in various sizes (3-10m³) for construction debris, wood, or mixed waste. With collection, recycling, and optional permit service throughout Austria.',
        metaDescription: 'Container Service Vienna & Austria ✓ 3-10m³ Containers ✓ Construction & Mixed Waste ✓ Incl. Recycling ✓ Fast Delivery ☎ +43660 39 57 587',
        benefits: [
          'Containers in various sizes (3-10m³)',
          'For all waste types (construction debris, wood, mixed waste)',
          'Fast delivery and collection',
          'Including professional recycling',
          'Help with street permits',
          'Transparent fixed prices',
        ],
        process: [
          {
            step: 1,
            title: 'Inquiry & Consultation',
            description: 'We advise you on the right container size and create an offer.',
          },
          {
            step: 2,
            title: 'Delivery',
            description: 'We deliver the container at your desired time to the desired location (street, property, construction site).',
          },
          {
            step: 3,
            title: 'Filling',
            description: 'You fill the container at your own pace. We advise on proper filling if needed.',
          },
          {
            step: 4,
            title: 'Collection & Recycling',
            description: 'After your notification, we collect the container and recycle contents properly.',
          },
        ],
        pricing: {
          info: 'Container prices depend on size, rental period, and waste type. We create transparent all-inclusive offers.',
          factors: [
            'Container size (3m³, 5m³, 7m³, 10m³)',
            'Rental period (days or weeks)',
            'Type of waste (construction debris, wood, mixed waste)',
            'Delivery distance',
            'Placement permit (for street placement)',
          ],
        },
        faq: [
          {
            question: 'How much does a container cost?',
            answer: 'A 3m³ container for construction debris costs from €180 (incl. delivery, collection, recycling, 7 days rental). A 7m³ container from €350. Mixed waste is more expensive than sorted construction debris. Fixed price in quote.',
          },
          {
            question: 'What container size do I need?',
            answer: 'For small renovations (bathroom, kitchen), 3-5m³ is usually sufficient. For apartment clearings, we recommend 5-7m³. For house demolition or large construction sites, 7-10m³. We are happy to advise you by phone.',
          },
          {
            question: 'Do I need a permit for street placement?',
            answer: 'For placement on public ground (street, sidewalk), you need approval from MA46. We help you with the application or place the container on private property.',
          },
          {
            question: 'What can go in the container?',
            answer: 'Construction debris container: bricks, concrete, tiles, ceramics. Wood container: wood waste, furniture, pallets. Mixed waste: all mixed waste. Not allowed: asbestos, hazardous materials, electrical appliances.',
          },
        ],
      },
    },
  },
  {
    id: ServiceId.ERBSTUECKSANKAUF,
    slugs: { de: 'erbstuecksankauf', en: 'heirloom-purchase' },
    relatedServices: [ServiceId.VERLASSENSCHAFTSRAEUMUNG, ServiceId.GOLDANKAUF, ServiceId.ANTIKWARENANKAUF],
    content: {
      de: {
        name: 'Erbstücksankauf',
        shortDescription: 'Wir kaufen wertvolle Erbstücke in Österreich - faire Bewertung, seriöse Abwicklung, Barzahlung vor Ort.',
        description: 'Bei einer Verlassenschaft bleiben oft wertvolle Erbstücke zurück - Familienerbstücke, Sammlerstücke, antike Möbel oder wertvoller Schmuck. Wir kaufen Ihre Erbstücke zu fairen Marktpreisen an. Unsere Experten bewerten Ihre Gegenstände kostenlos und machen Ihnen ein transparentes Angebot. Schnelle, diskrete Abwicklung und Barzahlung vor Ort in ganz Österreich.',
        metaDescription: 'Erbstücksankauf Österreich ✓ Faire Bewertung ✓ Kostenlose Schätzung ✓ Barzahlung sofort ✓ Seriöse Abwicklung ☎ +43660 39 57 587',
        benefits: [
          'Kostenlose Bewertung durch Experten',
          'Faire Marktpreise für Ihre Erbstücke',
          'Barzahlung sofort vor Ort',
          'Diskrete und seriöse Abwicklung',
          'Ankauf in ganz Österreich',
          'Komplette Haushaltsauflösung möglich',
        ],
        process: [
          {
            step: 1,
            title: 'Kontaktaufnahme',
            description: 'Rufen Sie uns an oder schicken Sie uns Fotos Ihrer Erbstücke per WhatsApp oder E-Mail.',
          },
          {
            step: 2,
            title: 'Kostenlose Bewertung',
            description: 'Unsere Experten besichtigen und bewerten Ihre Erbstücke kostenlos vor Ort.',
          },
          {
            step: 3,
            title: 'Faires Angebot',
            description: 'Sie erhalten ein transparentes Kaufangebot basierend auf aktuellen Marktpreisen.',
          },
          {
            step: 4,
            title: 'Sofortige Barzahlung',
            description: 'Bei Annahme zahlen wir sofort in bar und übernehmen die Gegenstände.',
          },
        ],
        pricing: {
          info: 'Der Ankaufspreis richtet sich nach Art, Zustand und Marktwert der Erbstücke. Wir bieten faire Preise basierend auf aktuellen Marktpreisen.',
          factors: [
            'Art und Alter des Erbstücks',
            'Erhaltungszustand und Originalität',
            'Aktueller Marktwert und Nachfrage',
            'Seltenheit und historischer Wert',
            'Material und Herkunft',
          ],
        },
        faq: [
          {
            question: 'Welche Erbstücke kaufen Sie an?',
            answer: 'Wir kaufen antike Möbel, Schmuck, Uhren, Gemälde, Porzellan, Silber, Münzen, Briefmarken, alte Bücher, Teppiche und vieles mehr. Am besten senden Sie uns Fotos - wir beraten Sie gerne.',
          },
          {
            question: 'Wie wird der Wert meiner Erbstücke ermittelt?',
            answer: 'Unsere Experten prüfen Alter, Zustand, Herkunft und Seltenheit. Wir orientieren uns an aktuellen Marktpreisen und Auktionsergebnissen. Die Bewertung ist für Sie kostenlos und unverbindlich.',
          },
          {
            question: 'Kaufen Sie auch ganze Nachlässe an?',
            answer: 'Ja, wir kaufen auch komplette Nachlässe an. Oft kombinieren wir Ankauf wertvoller Stücke mit der Räumung des restlichen Haushalts - so sparen Sie Kosten und haben nur einen Ansprechpartner.',
          },
          {
            question: 'Wie schnell kann die Abwicklung erfolgen?',
            answer: 'Nach Terminvereinbarung kommen wir meist innerhalb von 24-48 Stunden vorbei. Nach Bewertung und Ihrer Zusage zahlen wir sofort in bar und nehmen die Gegenstände gleich mit.',
          },
        ],
      },
      en: {
        name: 'Heirloom Purchase',
        shortDescription: 'We purchase valuable heirlooms in Austria - fair appraisal, professional handling, cash payment on-site.',
        description: 'Estate settlements often leave behind valuable heirlooms - family treasures, collectibles, antique furniture, or precious jewelry. We purchase your heirlooms at fair market prices. Our experts appraise your items free of charge and make you a transparent offer. Fast, discreet handling and cash payment on-site throughout Austria.',
        metaDescription: 'Heirloom Purchase Austria ✓ Fair Appraisal ✓ Free Estimate ✓ Immediate Cash Payment ✓ Professional Service ☎ +43660 39 57 587',
        benefits: [
          'Free expert appraisal',
          'Fair market prices for your heirlooms',
          'Immediate cash payment on-site',
          'Discreet and professional handling',
          'Purchase throughout Austria',
          'Complete estate clearance possible',
        ],
        process: [
          {
            step: 1,
            title: 'Contact',
            description: 'Call us or send photos of your heirlooms via WhatsApp or email.',
          },
          {
            step: 2,
            title: 'Free Appraisal',
            description: 'Our experts inspect and appraise your heirlooms free of charge on-site.',
          },
          {
            step: 3,
            title: 'Fair Offer',
            description: 'You receive a transparent purchase offer based on current market prices.',
          },
          {
            step: 4,
            title: 'Immediate Cash Payment',
            description: 'Upon acceptance, we pay immediately in cash and take over the items.',
          },
        ],
        pricing: {
          info: 'Purchase price depends on type, condition, and market value of the heirlooms. We offer fair prices based on current market rates.',
          factors: [
            'Type and age of the heirloom',
            'Condition and authenticity',
            'Current market value and demand',
            'Rarity and historical value',
            'Material and origin',
          ],
        },
        faq: [
          {
            question: 'What kind of heirlooms do you purchase?',
            answer: 'We purchase antique furniture, jewelry, watches, paintings, porcelain, silver, coins, stamps, old books, carpets and much more. Best to send us photos - we are happy to advise you.',
          },
          {
            question: 'How is the value of my heirlooms determined?',
            answer: 'Our experts examine age, condition, origin and rarity. We base our evaluation on current market prices and auction results. The appraisal is free and non-binding for you.',
          },
          {
            question: 'Do you also purchase complete estates?',
            answer: 'Yes, we also purchase complete estates. We often combine the purchase of valuable items with clearing the remaining household - saving you costs with only one contact person.',
          },
          {
            question: 'How quickly can the transaction be completed?',
            answer: 'After scheduling, we usually visit within 24-48 hours. After appraisal and your acceptance, we pay immediately in cash and take the items right away.',
          },
        ],
      },
    },
  },
  {
    id: ServiceId.GOLDANKAUF,
    slugs: { de: 'goldankauf', en: 'gold-purchase' },
    relatedServices: [ServiceId.ERBSTUECKSANKAUF, ServiceId.ANTIKWARENANKAUF, ServiceId.VERLASSENSCHAFTSRAEUMUNG],
    content: {
      de: {
        name: 'Goldankauf',
        shortDescription: 'Seriöser Goldankauf in Österreich - Altgold, Schmuck, Münzen zu tagesaktuellen Preisen. Kostenlose Prüfung, faire Bewertung, sofortige Barzahlung.',
        description: 'Wir kaufen Gold in allen Formen an - Altgold, Goldschmuck, Zahngold, Goldmünzen, Barren und Bruchgold. Sie erhalten tagesaktuelle Goldpreise und transparente Bewertung. Unsere Experten prüfen Ihr Gold kostenlos und zahlen sofort in bar. Seriöser Goldankauf in Österreich - ohne Termin, ohne Wartezeit.',
        metaDescription: 'Goldankauf Österreich ✓ Tagesaktuelle Preise ✓ Kostenlose Prüfung ✓ Sofort Bargeld ✓ Seriös & Fair ☎ +43660 39 57 587',
        benefits: [
          'Tagesaktuelle Goldpreise - faire Bewertung',
          'Kostenlose Goldprüfung und Analyse',
          'Sofortige Barzahlung ohne Wartezeit',
          'Ankauf aller Goldlegierungen (333, 585, 750, 999)',
          'Auch defekter oder alter Schmuck',
          'Diskrete Abwicklung in ganz Österreich',
        ],
        process: [
          {
            step: 1,
            title: 'Kontakt & Termin',
            description: 'Rufen Sie uns an oder kommen Sie direkt vorbei - ohne Terminvereinbarung möglich.',
          },
          {
            step: 2,
            title: 'Kostenlose Prüfung',
            description: 'Wir prüfen Ihr Gold professionell auf Reinheit und Gewicht vor Ihren Augen.',
          },
          {
            step: 3,
            title: 'Transparentes Angebot',
            description: 'Sie erhalten ein faires Angebot basierend auf dem aktuellen Goldpreis.',
          },
          {
            step: 4,
            title: 'Sofortige Auszahlung',
            description: 'Bei Annahme zahlen wir Ihnen den Betrag sofort in bar aus.',
          },
        ],
        pricing: {
          info: 'Der Ankaufspreis richtet sich nach dem aktuellen Goldkurs, der Legierung (Karat) und dem Gewicht Ihres Goldes.',
          factors: [
            'Aktueller Goldkurs (täglich schwankend)',
            'Goldlegierung (999, 750, 585, 333)',
            'Gewicht in Gramm',
            'Zustand und Verarbeitung',
            'Eventueller Sammlerwert bei Münzen',
          ],
        },
        faq: [
          {
            question: 'Was zahlen Sie für 1 Gramm Gold?',
            answer: 'Der Preis richtet sich nach dem tagesaktuellen Goldkurs und der Legierung. Beispiel bei Goldkurs 60€/Gramm: 999er Gold ca. 57€/g, 750er (18 Karat) ca. 43€/g, 585er (14 Karat) ca. 33€/g. Aktuellen Preis erfahren Sie bei uns telefonisch.',
          },
          {
            question: 'Welches Gold kaufen Sie an?',
            answer: 'Wir kaufen alle Arten von Gold: Altgold, Schmuck (auch defekt), Zahngold, Goldmünzen, Goldbarren, Bruchgold, Goldringe, Ketten, Armbänder. Egal ob 333er, 585er, 750er oder 999er Gold.',
          },
          {
            question: 'Brauche ich einen Ausweis für den Goldverkauf?',
            answer: 'Ja, aus gesetzlichen Gründen (Geldwäschegesetz) benötigen wir bei jedem Goldankauf einen gültigen Lichtbildausweis (Personalausweis oder Reisepass).',
          },
          {
            question: 'Wie wird der Goldwert ermittelt?',
            answer: 'Wir wiegen Ihr Gold auf geeichten Waagen und testen die Legierung mit professionellen Prüfgeräten (Säuretest oder Röntgenfluoreszenz). Die Bewertung erfolgt transparent vor Ihren Augen.',
          },
        ],
      },
      en: {
        name: 'Gold Purchase',
        shortDescription: 'Professional gold purchase in Austria - scrap gold, jewelry, coins at daily prices. Free testing, fair appraisal, immediate cash payment.',
        description: 'We purchase gold in all forms - scrap gold, gold jewelry, dental gold, gold coins, bars, and broken gold. You receive daily gold prices and transparent appraisal. Our experts test your gold free of charge and pay immediately in cash. Professional gold purchase in Austria - no appointment needed, no waiting time.',
        metaDescription: 'Gold Purchase Austria ✓ Daily Updated Prices ✓ Free Testing ✓ Immediate Cash ✓ Professional & Fair ☎ +43660 39 57 587',
        benefits: [
          'Daily updated gold prices - fair appraisal',
          'Free gold testing and analysis',
          'Immediate cash payment without waiting',
          'Purchase of all gold alloys (333, 585, 750, 999)',
          'Also damaged or old jewelry',
          'Discreet handling throughout Austria',
        ],
        process: [
          {
            step: 1,
            title: 'Contact & Appointment',
            description: 'Call us or visit directly - walk-ins possible without appointment.',
          },
          {
            step: 2,
            title: 'Free Testing',
            description: 'We professionally test your gold for purity and weight before your eyes.',
          },
          {
            step: 3,
            title: 'Transparent Offer',
            description: 'You receive a fair offer based on the current gold price.',
          },
          {
            step: 4,
            title: 'Immediate Payout',
            description: 'Upon acceptance, we pay you the amount immediately in cash.',
          },
        ],
        pricing: {
          info: 'Purchase price depends on current gold price, alloy (karat), and weight of your gold.',
          factors: [
            'Current gold price (daily fluctuating)',
            'Gold alloy (999, 750, 585, 333)',
            'Weight in grams',
            'Condition and workmanship',
            'Possible collector value for coins',
          ],
        },
        faq: [
          {
            question: 'What do you pay per gram of gold?',
            answer: 'Price depends on daily gold price and alloy. Example at 60€/gram gold price: 999 gold approx. 57€/g, 750 (18 karat) approx. 43€/g, 585 (14 karat) approx. 33€/g. Current price available by phone.',
          },
          {
            question: 'What types of gold do you purchase?',
            answer: 'We purchase all types of gold: scrap gold, jewelry (even damaged), dental gold, gold coins, gold bars, broken gold, gold rings, chains, bracelets. Whether 333, 585, 750, or 999 gold.',
          },
          {
            question: 'Do I need ID for selling gold?',
            answer: 'Yes, for legal reasons (money laundering laws) we require valid photo ID (ID card or passport) for every gold purchase.',
          },
          {
            question: 'How is gold value determined?',
            answer: 'We weigh your gold on calibrated scales and test the alloy with professional testing equipment (acid test or X-ray fluorescence). Appraisal is done transparently before your eyes.',
          },
        ],
      },
    },
  },
  {
    id: ServiceId.TEPPICHANKAUF,
    slugs: { de: 'teppichankauf', en: 'carpet-purchase' },
    relatedServices: [ServiceId.ERBSTUECKSANKAUF, ServiceId.ANTIKWARENANKAUF, ServiceId.HAUSHALTSAUFLOESUNG],
    content: {
      de: {
        name: 'Teppichankauf',
        shortDescription: 'Ankauf hochwertiger Teppiche in Österreich - Perserteppiche, Orient-Teppiche, antike Teppiche. Faire Bewertung durch Experten, sofortige Barzahlung.',
        description: 'Wir kaufen hochwertige Teppiche an - Perserteppiche, Orient-Teppiche, antike Teppiche und handgeknüpfte Sammlerstücke. Unsere Teppich-Experten bewerten Ihre Stücke kostenlos nach Herkunft, Alter, Knüpfart und Zustand. Sie erhalten ein faires Angebot basierend auf aktuellen Marktpreisen. Schnelle Abwicklung und Barzahlung in ganz Österreich.',
        metaDescription: 'Teppichankauf Österreich ✓ Perserteppiche ✓ Orientteppiche ✓ Kostenlose Bewertung ✓ Faire Preise ☎ +43660 39 57 587',
        benefits: [
          'Expertise für Perserteppiche und Orientteppiche',
          'Kostenlose Bewertung durch Teppich-Experten',
          'Faire Marktpreise für Ihre Teppiche',
          'Ankauf einzelner Teppiche oder ganzer Sammlungen',
          'Barzahlung sofort vor Ort',
          'Abholung in ganz Österreich',
        ],
        process: [
          {
            step: 1,
            title: 'Erstkontakt',
            description: 'Senden Sie uns Fotos Ihrer Teppiche per WhatsApp/E-Mail oder rufen Sie uns an.',
          },
          {
            step: 2,
            title: 'Fachgerechte Bewertung',
            description: 'Unsere Experten besichtigen Ihre Teppiche und prüfen Herkunft, Alter und Zustand.',
          },
          {
            step: 3,
            title: 'Kaufangebot',
            description: 'Sie erhalten ein transparentes Angebot basierend auf Marktwert und Zustand.',
          },
          {
            step: 4,
            title: 'Abwicklung',
            description: 'Bei Zusage zahlen wir bar und holen die Teppiche ab oder Sie bringen sie zu uns.',
          },
        ],
        pricing: {
          info: 'Der Wert eines Teppichs hängt von vielen Faktoren ab. Unsere Experten bewerten fair nach aktuellen Marktpreisen.',
          factors: [
            'Herkunft und Provenienz (Persien, Türkei, etc.)',
            'Alter und historischer Wert',
            'Knüpfart (handgeknüpft vs. maschinengewebt)',
            'Zustand (Abnutzung, Schäden, Reparaturen)',
            'Größe und Seltenheit des Musters',
          ],
        },
        faq: [
          {
            question: 'Welche Teppiche kaufen Sie an?',
            answer: 'Wir kaufen hochwertige handgeknüpfte Teppiche: Perserteppiche (Tabriz, Isfahan, Nain, Ghom), türkische Teppiche (Hereke, Kayseri), afghanische, kaukasische und andere Orientteppiche. Auch antike Teppiche und Sammlerstücke.',
          },
          {
            question: 'Wie ermitteln Sie den Wert meines Teppichs?',
            answer: 'Wir prüfen Herkunft, Knüpfdichte, Material (Wolle, Seide), Alter, Zustand und Seltenheit. Wir vergleichen mit aktuellen Marktpreisen und Auktionsergebnissen ähnlicher Stücke.',
          },
          {
            question: 'Kaufen Sie auch beschädigte Teppiche?',
            answer: 'Ja, wir kaufen auch Teppiche mit Gebrauchsspuren oder kleineren Schäden, wenn es sich um hochwertige Stücke handelt. Der Zustand fließt natürlich in die Bewertung ein.',
          },
          {
            question: 'Muss ich den Teppich zu Ihnen bringen?',
            answer: 'Nein, wir kommen gerne zu Ihnen nach Hause oder ins Büro. Bei größeren Sammlungen oder schweren Teppichen übernehmen wir auch die Abholung nach Kauf.',
          },
        ],
      },
      en: {
        name: 'Carpet Purchase',
        shortDescription: 'Purchase of high-quality carpets in Austria - Persian carpets, Oriental rugs, antique carpets. Fair expert appraisal, immediate cash payment.',
        description: 'We purchase high-quality carpets - Persian rugs, Oriental carpets, antique rugs, and hand-knotted collector pieces. Our carpet experts appraise your pieces free of charge based on origin, age, knotting technique, and condition. You receive a fair offer based on current market prices. Fast handling and cash payment throughout Austria.',
        metaDescription: 'Carpet Purchase Austria ✓ Persian Rugs ✓ Oriental Carpets ✓ Free Appraisal ✓ Fair Prices ☎ +43660 39 57 587',
        benefits: [
          'Expertise for Persian and Oriental carpets',
          'Free appraisal by carpet experts',
          'Fair market prices for your carpets',
          'Purchase of individual carpets or entire collections',
          'Immediate cash payment on-site',
          'Pickup throughout Austria',
        ],
        process: [
          {
            step: 1,
            title: 'Initial Contact',
            description: 'Send us photos of your carpets via WhatsApp/email or call us.',
          },
          {
            step: 2,
            title: 'Expert Appraisal',
            description: 'Our experts inspect your carpets and examine origin, age, and condition.',
          },
          {
            step: 3,
            title: 'Purchase Offer',
            description: 'You receive a transparent offer based on market value and condition.',
          },
          {
            step: 4,
            title: 'Transaction',
            description: 'Upon acceptance, we pay cash and pick up the carpets or you bring them to us.',
          },
        ],
        pricing: {
          info: 'The value of a carpet depends on many factors. Our experts appraise fairly based on current market prices.',
          factors: [
            'Origin and provenance (Persia, Turkey, etc.)',
            'Age and historical value',
            'Knotting technique (hand-knotted vs. machine-woven)',
            'Condition (wear, damage, repairs)',
            'Size and rarity of pattern',
          ],
        },
        faq: [
          {
            question: 'What types of carpets do you purchase?',
            answer: 'We purchase high-quality hand-knotted carpets: Persian rugs (Tabriz, Isfahan, Nain, Qom), Turkish carpets (Hereke, Kayseri), Afghan, Caucasian and other Oriental rugs. Also antique carpets and collector pieces.',
          },
          {
            question: 'How do you determine the value of my carpet?',
            answer: 'We examine origin, knot density, material (wool, silk), age, condition and rarity. We compare with current market prices and auction results of similar pieces.',
          },
          {
            question: 'Do you also purchase damaged carpets?',
            answer: 'Yes, we also purchase carpets with signs of use or minor damage if they are high-quality pieces. Condition is of course factored into the appraisal.',
          },
          {
            question: 'Do I have to bring the carpet to you?',
            answer: 'No, we gladly come to your home or office. For larger collections or heavy carpets, we also arrange pickup after purchase.',
          },
        ],
      },
    },
  },
  {
    id: ServiceId.BILDERANKAUF,
    slugs: { de: 'bilderankauf', en: 'painting-purchase' },
    relatedServices: [ServiceId.ERBSTUECKSANKAUF, ServiceId.ANTIKWARENANKAUF, ServiceId.VERLASSENSCHAFTSRAEUMUNG],
    content: {
      de: {
        name: 'Bilderankauf',
        shortDescription: 'Ankauf von Gemälden und Kunstwerken in Österreich - Ölbilder, Aquarelle, Grafiken. Kostenlose Expertise, faire Bewertung, seriöse Abwicklung.',
        description: 'Wir kaufen Gemälde, Ölbilder, Aquarelle, Grafiken und andere Kunstwerke an. Ob Nachlass, Sammlung oder Einzelstücke - unsere Kunstexperten bewerten Ihre Bilder kostenlos nach Künstler, Epoche, Zustand und Marktwert. Sie erhalten ein faires Angebot für Ihre Kunstwerke. Diskreter Ankauf in Österreich mit sofortiger Barzahlung.',
        metaDescription: 'Bilderankauf Österreich ✓ Gemälde & Kunstwerke ✓ Kostenlose Expertise ✓ Faire Preise ✓ Seriöser Ankauf ☎ +43660 39 57 587',
        benefits: [
          'Kostenlose Expertise durch Kunstexperten',
          'Ankauf von Gemälden aller Epochen',
          'Faire Bewertung nach Marktpreisen',
          'Diskrete und seriöse Abwicklung',
          'Barzahlung oder Überweisung',
          'Österreichweiter Service',
        ],
        process: [
          {
            step: 1,
            title: 'Bildersendung',
            description: 'Senden Sie uns hochwertige Fotos Ihrer Bilder (Vorder- und Rückseite, Signatur).',
          },
          {
            step: 2,
            title: 'Kunsthistorische Bewertung',
            description: 'Unsere Experten analysieren Künstler, Epoche, Technik und Zustand.',
          },
          {
            step: 3,
            title: 'Wertermittlung',
            description: 'Sie erhalten eine kostenlose Einschätzung und ein Kaufangebot.',
          },
          {
            step: 4,
            title: 'Ankauf & Zahlung',
            description: 'Bei Einigung holen wir die Bilder ab und zahlen sofort bar oder per Überweisung.',
          },
        ],
        pricing: {
          info: 'Der Wert eines Gemäldes hängt stark vom Künstler, der Epoche, dem Zustand und der Marktlage ab. Wir bieten faire Preise.',
          factors: [
            'Künstler und dessen Bekanntheit',
            'Epoche und Stilrichtung',
            'Technik (Öl, Aquarell, Mischtechnik)',
            'Zustand und Erhaltung',
            'Größe und Motiv',
            'Provenienz und Echtheitszertifikate',
          ],
        },
        faq: [
          {
            question: 'Welche Bilder kaufen Sie an?',
            answer: 'Wir kaufen Ölgemälde, Aquarelle, Grafiken, Zeichnungen und andere Kunstwerke vom 16. bis 21. Jahrhundert. Besonders interessiert sind wir an österreichischen Künstlern, aber auch internationalen Meistern.',
          },
          {
            question: 'Wie erkenne ich, ob mein Bild wertvoll ist?',
            answer: 'Achten Sie auf Signaturen, Rahmen, Maltechnik und Herkunft. Alte Ölgemälde in Originalrahmen, signierte Werke oder Bilder mit Provenienz-Nachweis sind oft wertvoll. Wir helfen Ihnen bei der Einschätzung - kostenlos.',
          },
          {
            question: 'Brauche ich ein Echtheitszertifikat?',
            answer: 'Ein Echtheitszertifikat ist hilfreich, aber nicht zwingend nötig. Unsere Experten können die Echtheit oft auch ohne Zertifikat einschätzen. Bei sehr wertvollen Stücken empfehlen wir eine professionelle Expertise.',
          },
          {
            question: 'Kaufen Sie auch Bilder unbekannter Künstler?',
            answer: 'Ja, wenn die Qualität stimmt. Auch Bilder unbekannter Künstler können wertvoll sein, wenn sie handwerklich hochwertig sind, eine besondere Epoche repräsentieren oder ein interessantes Motiv haben.',
          },
        ],
      },
      en: {
        name: 'Painting Purchase',
        shortDescription: 'Purchase of paintings and artworks in Austria - oil paintings, watercolors, graphics. Free expertise, fair appraisal, professional handling.',
        description: 'We purchase paintings, oil paintings, watercolors, graphics and other artworks. Whether estate, collection or individual pieces - our art experts appraise your paintings free of charge based on artist, era, condition and market value. You receive a fair offer for your artworks. Discreet purchase in Austria with immediate cash payment.',
        metaDescription: 'Painting Purchase Austria ✓ Paintings & Artworks ✓ Free Expertise ✓ Fair Prices ✓ Professional Purchase ☎ +43660 39 57 587',
        benefits: [
          'Free expertise by art experts',
          'Purchase of paintings from all eras',
          'Fair appraisal based on market prices',
          'Discreet and professional handling',
          'Cash payment or bank transfer',
          'Austria-wide service',
        ],
        process: [
          {
            step: 1,
            title: 'Submit Images',
            description: 'Send us high-quality photos of your paintings (front and back, signature).',
          },
          {
            step: 2,
            title: 'Art Historical Appraisal',
            description: 'Our experts analyze artist, era, technique and condition.',
          },
          {
            step: 3,
            title: 'Value Assessment',
            description: 'You receive a free estimate and purchase offer.',
          },
          {
            step: 4,
            title: 'Purchase & Payment',
            description: 'Upon agreement, we pick up the paintings and pay immediately in cash or by transfer.',
          },
        ],
        pricing: {
          info: 'The value of a painting depends heavily on the artist, era, condition and market situation. We offer fair prices.',
          factors: [
            'Artist and their renown',
            'Era and artistic style',
            'Technique (oil, watercolor, mixed media)',
            'Condition and preservation',
            'Size and motif',
            'Provenance and authenticity certificates',
          ],
        },
        faq: [
          {
            question: 'What types of paintings do you purchase?',
            answer: 'We purchase oil paintings, watercolors, graphics, drawings and other artworks from the 16th to 21st century. We are particularly interested in Austrian artists, but also international masters.',
          },
          {
            question: 'How do I know if my painting is valuable?',
            answer: 'Look for signatures, frames, painting technique and origin. Old oil paintings in original frames, signed works or paintings with provenance documentation are often valuable. We help you with the assessment - free of charge.',
          },
          {
            question: 'Do I need an authenticity certificate?',
            answer: 'An authenticity certificate is helpful but not mandatory. Our experts can often assess authenticity without a certificate. For very valuable pieces, we recommend professional expertise.',
          },
          {
            question: 'Do you also purchase paintings by unknown artists?',
            answer: 'Yes, if the quality is right. Even paintings by unknown artists can be valuable if they are crafted to high standards, represent a special era, or feature an interesting motif.',
          },
        ],
      },
    },
  },
  {
    id: ServiceId.ANTIKWARENANKAUF,
    slugs: { de: 'antikwarenankauf', en: 'antique-purchase' },
    relatedServices: [ServiceId.ERBSTUECKSANKAUF, ServiceId.TEPPICHANKAUF, ServiceId.BILDERANKAUF],
    content: {
      de: {
        name: 'Antikwarenankauf',
        shortDescription: 'Ankauf von Antiquitäten in Österreich - Möbel, Porzellan, Silber, Uhren und mehr. Faire Bewertung, seriöse Abwicklung, Barzahlung vor Ort.',
        description: 'Wir kaufen hochwertige Antiquitäten und Sammlerstücke an - antike Möbel, Porzellan, Silber, Uhren, Glas, Bronzen, Kronleuchter und vieles mehr. Unsere Antiquitäten-Experten bewerten Ihre Stücke kostenlos nach Alter, Herkunft und Zustand. Sie erhalten ein faires Angebot basierend auf aktuellen Marktpreisen. Diskreter Ankauf in Österreich mit sofortiger Barzahlung.',
        metaDescription: 'Antikwarenankauf Österreich ✓ Möbel, Porzellan, Silber ✓ Kostenlose Bewertung ✓ Faire Preise ✓ Sofort Bargeld ☎ +43660 39 57 587',
        benefits: [
          'Expertise für alle Arten von Antiquitäten',
          'Kostenlose Bewertung durch Fachexperten',
          'Faire Marktpreise für Ihre Antiquitäten',
          'Ankauf einzelner Stücke oder ganzer Sammlungen',
          'Sofortige Barzahlung vor Ort',
          'Abholung und Transport inklusive',
        ],
        process: [
          {
            step: 1,
            title: 'Kontakt',
            description: 'Senden Sie uns Fotos oder Beschreibungen Ihrer Antiquitäten per WhatsApp, E-Mail oder Telefon.',
          },
          {
            step: 2,
            title: 'Fachkundige Bewertung',
            description: 'Unsere Experten besichtigen und bewerten Ihre Antiquitäten kostenlos vor Ort.',
          },
          {
            step: 3,
            title: 'Kaufangebot',
            description: 'Sie erhalten ein transparentes Angebot basierend auf Marktwert und Zustand.',
          },
          {
            step: 4,
            title: 'Abwicklung & Abtransport',
            description: 'Bei Zusage zahlen wir sofort bar und kümmern uns um den fachgerechten Abtransport.',
          },
        ],
        pricing: {
          info: 'Der Wert von Antiquitäten hängt von Alter, Seltenheit, Zustand und Marktnachfrage ab. Wir bieten faire Preise nach aktueller Marktlage.',
          factors: [
            'Alter und Epoche des Stücks',
            'Herkunft und Provenienz',
            'Erhaltungszustand und Originalität',
            'Seltenheit und Marktnachfrage',
            'Material und Verarbeitung',
            'Historischer oder künstlerischer Wert',
          ],
        },
        faq: [
          {
            question: 'Welche Antiquitäten kaufen Sie an?',
            answer: 'Wir kaufen antike Möbel (Biedermeier, Jugendstil, Barock), Porzellan (Meissen, Wien Augarten), Silber, alte Uhren, Kronleuchter, Bronzefiguren, Jugendstil-Objekte, Art Deco, Glas und vieles mehr.',
          },
          {
            question: 'Wie alt muss ein Gegenstand sein, um als Antiquität zu gelten?',
            answer: 'Üblicherweise gelten Gegenstände ab 100 Jahren als Antiquitäten. Wir kaufen aber auch jüngere Sammlerstücke aus dem frühen 20. Jahrhundert (Art Deco, Bauhaus, 50er-Jahre-Design) wenn sie wertvoll sind.',
          },
          {
            question: 'Kaufen Sie auch restaurierungsbedürftige Stücke?',
            answer: 'Ja, wenn es sich um hochwertige Antiquitäten handelt. Der Restaurierungsbedarf fließt in die Preisbewertung ein. Oft sind auch beschädigte Stücke von bedeutenden Epochen noch wertvoll.',
          },
          {
            question: 'Wie wird der Wert meiner Antiquitäten ermittelt?',
            answer: 'Wir prüfen Alter (oft durch Stilmerkmale, Handwerkszeichen), Herkunft, Material, Zustand und vergleichen mit aktuellen Marktpreisen ähnlicher Stücke. Die Bewertung erfolgt transparent vor Ort.',
          },
        ],
      },
      en: {
        name: 'Antique Purchase',
        shortDescription: 'Purchase of antiques in Austria - furniture, porcelain, silver, clocks and more. Fair appraisal, professional handling, cash payment on-site.',
        description: 'We purchase high-quality antiques and collectibles - antique furniture, porcelain, silver, clocks, glass, bronzes, chandeliers and much more. Our antique experts appraise your pieces free of charge based on age, origin and condition. You receive a fair offer based on current market prices. Discreet purchase in Austria with immediate cash payment.',
        metaDescription: 'Antique Purchase Austria ✓ Furniture, Porcelain, Silver ✓ Free Appraisal ✓ Fair Prices ✓ Immediate Cash ☎ +43660 39 57 587',
        benefits: [
          'Expertise for all types of antiques',
          'Free appraisal by expert specialists',
          'Fair market prices for your antiques',
          'Purchase of individual pieces or entire collections',
          'Immediate cash payment on-site',
          'Pickup and transport included',
        ],
        process: [
          {
            step: 1,
            title: 'Contact',
            description: 'Send us photos or descriptions of your antiques via WhatsApp, email or phone.',
          },
          {
            step: 2,
            title: 'Expert Appraisal',
            description: 'Our experts inspect and appraise your antiques free of charge on-site.',
          },
          {
            step: 3,
            title: 'Purchase Offer',
            description: 'You receive a transparent offer based on market value and condition.',
          },
          {
            step: 4,
            title: 'Transaction & Transport',
            description: 'Upon acceptance, we pay immediately in cash and handle professional transport.',
          },
        ],
        pricing: {
          info: 'The value of antiques depends on age, rarity, condition and market demand. We offer fair prices according to current market conditions.',
          factors: [
            'Age and era of the piece',
            'Origin and provenance',
            'Condition and authenticity',
            'Rarity and market demand',
            'Material and craftsmanship',
            'Historical or artistic value',
          ],
        },
        faq: [
          {
            question: 'What types of antiques do you purchase?',
            answer: 'We purchase antique furniture (Biedermeier, Art Nouveau, Baroque), porcelain (Meissen, Vienna Augarten), silver, old clocks, chandeliers, bronze figures, Art Nouveau objects, Art Deco, glass and much more.',
          },
          {
            question: 'How old must an item be to be considered an antique?',
            answer: 'Typically, items from 100 years ago are considered antiques. However, we also purchase younger collectibles from the early 20th century (Art Deco, Bauhaus, 1950s design) if they are valuable.',
          },
          {
            question: 'Do you also purchase items needing restoration?',
            answer: 'Yes, if they are high-quality antiques. The restoration need is factored into the price appraisal. Often damaged pieces from significant eras are still valuable.',
          },
          {
            question: 'How is the value of my antiques determined?',
            answer: 'We examine age (often through style features, craftsman marks), origin, material, condition and compare with current market prices of similar pieces. Appraisal is done transparently on-site.',
          },
        ],
      },
    },
  },
  {
    id: ServiceId.TRANSPORTSERVICE,
    slugs: { de: 'transportservice', en: 'transport-service' },
    relatedServices: [ServiceId.UMZUGSSERVICE, ServiceId.SPERRMULLABHOLUNG, ServiceId.CONTAINERSERVICE],
    content: {
      de: {
        name: 'Transportservice',
        shortDescription: 'Professioneller Transport in Wien und ganz Österreich – Möbel, Sperrgut, Maschinen und mehr. Schnell, sicher, versichert.',
        description: 'Transraum bietet zuverlässigen Transportservice für Privatpersonen und Unternehmen in Wien und ganz Österreich. Ob Möbeltransport, Sperrguttransport, Maschinentransport oder Warentransport – unsere erfahrenen Teams und modernen Fahrzeuge sorgen für eine sichere und pünktliche Lieferung. Kein Auftrag ist zu groß oder zu klein.',
        metaDescription: 'Transportservice Wien & Österreich ✓ Möbel-, Sperrgut- & Maschinentransport ✓ Versichert ✓ Festpreis ✓ 24h-Service ☎ +43 660 6926375',
        benefits: [
          'Transport für Privatpersonen & Unternehmen',
          'Möbel, Sperrgut, Maschinen & Waren',
          'Versicherter Transport – kein Risiko',
          'Festpreis nach Besichtigung / telefonisch',
          'Moderne Fahrzeuge bis 7,5t',
          'Österreichweit & Wien-intern',
          'Kurzfristige Termine möglich',
          '26 Jahre Erfahrung',
        ],
        process: [
          {
            step: 1,
            title: 'Kostenloses Angebot',
            description: 'Rufen Sie uns an oder schreiben Sie per WhatsApp. Wir klären Umfang, Gewicht und Route – und erstellen sofort ein Festpreisangebot.',
          },
          {
            step: 2,
            title: 'Terminvereinbarung',
            description: 'Wir vereinbaren einen passenden Termin – auch kurzfristig. Unser Team ist flexibel und kommt zu Ihnen.',
          },
          {
            step: 3,
            title: 'Professionelle Verladung',
            description: 'Unsere Profis verladen Ihre Güter sicher und fachgerecht. Empfindliche Gegenstände werden gesondert verpackt.',
          },
          {
            step: 4,
            title: 'Sichere Zustellung',
            description: 'Transport zum Zielort – pünktlich, versichert, ohne Überraschungen. Auf Wunsch mit Auf- und Abladeservice.',
          },
        ],
        pricing: {
          info: 'Die Transportkosten richten sich nach Entfernung, Gewicht und Aufwand. Nach kurzer Beschreibung erhalten Sie telefonisch einen verbindlichen Festpreis.',
          factors: [
            'Transportstrecke (Wien-intern oder österreichweit)',
            'Gewicht und Volumen der Güter',
            'Anzahl der benötigten Träger',
            'Stockwerk und Liftvorhandensein',
            'Verpackungs- und Montageleistungen',
          ],
        },
        faq: [
          {
            question: 'Was kostet ein Transportservice in Wien?',
            answer: 'Ein einfacher Möbeltransport innerhalb Wiens beginnt ab 150€. Der genaue Preis hängt von Entfernung, Gewicht und Stockwerk ab. Nach kurzer Beschreibung erhalten Sie telefonisch einen Festpreis.',
          },
          {
            question: 'Welche Güter transportieren Sie?',
            answer: 'Wir transportieren Möbel, Haushaltsgeräte, Sperrgut, Maschinen, Paletten, Baumaterialien und Waren aller Art – sowohl für Privat- als auch für Geschäftskunden.',
          },
          {
            question: 'Ist mein Transportgut versichert?',
            answer: 'Ja. Alle Güter sind während des Transports versichert. Bei empfindlichen oder besonders wertvollen Gegenständen sprechen wir im Vorfeld über geeignete Schutzmaßnahmen.',
          },
          {
            question: 'Transportieren Sie auch österreichweit?',
            answer: 'Ja, wir sind österreichweit tätig – von Wien nach Linz, Graz, Salzburg, Innsbruck und überall dazwischen. Gerne erstellen wir ein Angebot für Ihre gewünschte Route.',
          },
          {
            question: 'Wie kurzfristig kann ich einen Transporttermin buchen?',
            answer: 'Sehr kurzfristig – oft auch noch am selben oder nächsten Tag. Rufen Sie uns einfach an oder schreiben Sie per WhatsApp, wir finden eine Lösung.',
          },
        ],
      },
      en: {
        name: 'Transport Service',
        shortDescription: 'Professional transport throughout Vienna and all of Austria – furniture, bulky goods, machinery and more. Fast, safe, insured.',
        description: 'Transraum provides reliable transport services for private individuals and businesses in Vienna and throughout Austria. Whether furniture, bulky goods, machinery or goods – our experienced teams and modern vehicles ensure safe and punctual delivery. No job is too big or too small.',
        metaDescription: 'Transport Service Vienna & Austria ✓ Furniture, Bulky Goods & Machinery Transport ✓ Insured ✓ Fixed Price ✓ 24h Service ☎ +43 660 6926375',
        benefits: [
          'Transport for private individuals & businesses',
          'Furniture, bulky goods, machinery & goods',
          'Insured transport – no risk',
          'Fixed price by phone or after inspection',
          'Modern vehicles up to 7.5t',
          'Throughout Austria & within Vienna',
          'Short-notice appointments possible',
          '26 years of experience',
        ],
        process: [
          {
            step: 1,
            title: 'Free Quote',
            description: 'Call us or write via WhatsApp. We clarify scope, weight and route – and create a fixed price quote immediately.',
          },
          {
            step: 2,
            title: 'Appointment',
            description: 'We arrange a suitable appointment – also at short notice. Our team is flexible and comes to you.',
          },
          {
            step: 3,
            title: 'Professional Loading',
            description: 'Our professionals load your goods safely and properly. Sensitive items are packed separately.',
          },
          {
            step: 4,
            title: 'Safe Delivery',
            description: 'Transport to the destination – punctual, insured, without surprises. Loading and unloading service available on request.',
          },
        ],
        pricing: {
          info: 'Transport costs are based on distance, weight and effort. After a brief description, you receive a binding fixed price by phone.',
          factors: [
            'Transport distance (within Vienna or throughout Austria)',
            'Weight and volume of goods',
            'Number of helpers required',
            'Floor level and elevator availability',
            'Packing and assembly services',
          ],
        },
        faq: [
          {
            question: 'How much does a transport service in Vienna cost?',
            answer: 'A simple furniture transport within Vienna starts from €150. The exact price depends on distance, weight and floor level. After a brief description, you receive a fixed price by phone.',
          },
          {
            question: 'What goods do you transport?',
            answer: 'We transport furniture, household appliances, bulky goods, machinery, pallets, building materials and goods of all kinds – for both private and business customers.',
          },
          {
            question: 'Is my transport cargo insured?',
            answer: 'Yes. All goods are insured during transport. For sensitive or particularly valuable items, we discuss appropriate protective measures in advance.',
          },
          {
            question: 'Do you also transport throughout Austria?',
            answer: 'Yes, we operate throughout Austria – from Vienna to Linz, Graz, Salzburg, Innsbruck and everywhere in between. We are happy to provide a quote for your desired route.',
          },
          {
            question: 'How short notice can I book a transport appointment?',
            answer: 'Very short notice – often the same or next day. Just call us or write via WhatsApp, we will find a solution.',
          },
        ],
      },
    },
  },
];

export const slugIndex: Record<'de' | 'en', Record<string, ServiceId>> = {
  de: {},
  en: {},
};

servicesData.forEach((service) => {
  slugIndex.de[service.slugs.de] = service.id;
  slugIndex.en[service.slugs.en] = service.id;
});

export function getServiceById(id: ServiceId): ServiceEntry | null {
  return servicesData.find((s) => s.id === id) || null;
}

export function getServiceBySlug(slug: string, locale: 'de' | 'en' = 'de'): ServiceEntry | null {
  const id = slugIndex[locale][slug];
  return id ? getServiceById(id) : null;
}

export function getServiceContent(id: ServiceId, locale: 'de' | 'en' = 'de'): ServiceContent | null {
  const service = getServiceById(id);
  return service ? service.content[locale] : null;
}

export function getLocalizedServicePath(id: ServiceId, locale: 'de' | 'en' = 'de'): string {
  const service = getServiceById(id);
  if (!service) return '/';
  
  const basePath = locale === 'de' ? '/leistungen' : '/en/services';
  return `${basePath}/${service.slugs[locale]}`;
}

export function getAllServices(): ServiceEntry[] {
  return servicesData;
}
