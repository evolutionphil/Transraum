export type PackageCategory = 'transport' | 'raeumung';

export interface PackageSpec {
  distance?: string;
  area?: string;
  workers: number;
  vehicle: string;
  duration: string;
}

export interface PackageLang {
  name: string;
  tagline: string;
  description: string;
  badge: string;
  includes: string[];
  notIncludes: string[];
  steps: { title: string; description: string }[];
  faq: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
  keywords: string;
}

export interface ShopPackage {
  id: string;
  slugDe: string;
  slugEn: string;
  category: PackageCategory;
  price: number;
  imageFile: string;
  dallePrompt: string;
  specs: PackageSpec;
  de: PackageLang;
  en: PackageLang;
}

export const shopPackages: ShopPackage[] = [
  {
    id: 'transport-s',
    slugDe: 'transport-paket-s',
    slugEn: 'transport-package-s',
    category: 'transport',
    price: 129,
    imageFile: 'transport-paket-s.png',
    dallePrompt:
      'Professional Austrian moving service, compact white cargo van being loaded with furniture boxes on a Vienna street, two workers in yellow uniforms, clean modern look, bright daylight, photorealistic',
    specs: {
      distance: 'ca. 30 km',
      workers: 2,
      vehicle: 'Transporter 12 m³',
      duration: 'bis 2 Std.',
    },
    de: {
      name: 'Transport Paket S',
      tagline: 'Ideal für Einzeltransporte & Kleintransporte in Wien',
      badge: 'KLEINUMZUG',
      description:
        'Perfekt für einzelne Möbelstücke, kleine Mengen oder wenn Sie Platz schaffen möchten. Unser Transport Paket S bringt Ihre Gegenstände sicher und pünktlich ans Ziel – innerhalb Wiens oder bis ca. 30 km Entfernung.',
      includes: [
        '1 Transporter (12 m³) inkl. Fahrer',
        '2 erfahrene Helfer',
        'Bis zu 2 Arbeitsstunden',
        'Möbelschutzdecken & Spanngurte',
        'Be- und Entladen inklusive',
        'Haftpflichtversicherung inklusive',
        'Kostenlose Terminabsprache',
      ],
      notIncludes: [
        'Verpackungsmaterial (auf Wunsch zubuchbar)',
        'Demontage & Montage von Möbeln',
        'Halteverbotszone (auf Wunsch organisierbar)',
        'Fahrten über 30 km (Paket M empfohlen)',
      ],
      steps: [
        { title: 'Anfrage stellen', description: 'Rufen Sie uns an oder senden Sie eine Anfrage. Wir melden uns innerhalb von 2 Stunden zurück.' },
        { title: 'Termin bestätigen', description: 'Wir bestätigen Datum, Uhrzeit und Abholadresse. Kurzfristige Termine möglich.' },
        { title: 'Transport durchführen', description: 'Unser Team erscheint pünktlich, lädt alles fachgerecht und transportiert sicher ans Ziel.' },
        { title: 'Übergabe & Abschluss', description: 'Ablieferung an gewünschter Stelle, Abzeichnung und Sie sind fertig.' },
      ],
      faq: [
        { q: 'Was ist inklusive beim Paket S?', a: 'Transporter (12 m³), 2 Helfer, bis 2 Arbeitsstunden, Möbelschutzdecken, Be- und Entladen sowie Haftpflichtversicherung.' },
        { q: 'Was kostet eine Halteverbotszone?', a: 'Wir können die Halteverbotszone für Sie beantragen. Die Kosten betragen je nach Gemeinde ca. €30–€80 und werden separat verrechnet.' },
        { q: 'Kann ich zusätzliche Stunden buchen?', a: 'Ja, jede weitere Stunde wird zum Stundensatz von €45/Stunde berechnet und vorab mitgeteilt.' },
        { q: 'Wie kurzfristig kann ich buchen?', a: 'In der Regel sind wir innerhalb von 24–48 Stunden verfügbar. Bei Dringlichkeit rufen Sie uns direkt an.' },
        { q: 'Sind meine Möbel versichert?', a: 'Ja, unser Transport ist haftpflichtversichert. Bei besonderen Wertgegenständen empfehlen wir zusätzliche Absicherung.' },
      ],
      metaTitle: 'Transport Paket S Wien – Kleinumzug ab €129 | Transraum',
      metaDescription: 'Kleintransport Wien ab €129: 1 Transporter, 2 Helfer, bis 2 Stunden. Ideal für Einzeltransporte bis 30 km. Jetzt Termin vereinbaren!',
      keywords: 'Kleintransport Wien, Transport Paket S, Kleinumzug Wien günstig, Möbeltransport Wien Festpreis',
    },
    en: {
      name: 'Transport Package S',
      tagline: 'Perfect for single items & small moves in Vienna',
      badge: 'SMALL MOVE',
      description:
        'Perfect for single furniture pieces, small quantities, or when you need to clear some space. Our Transport Package S delivers your items safely and on time – within Vienna or up to approx. 30 km away.',
      includes: [
        '1 van (12 m³) incl. driver',
        '2 experienced helpers',
        'Up to 2 working hours',
        'Furniture protection blankets & straps',
        'Loading and unloading included',
        'Liability insurance included',
        'Free appointment scheduling',
      ],
      notIncludes: [
        'Packing materials (available as add-on)',
        'Furniture assembly/disassembly',
        'No-parking zone permit (arrangeable)',
        'Trips over 30 km (Package M recommended)',
      ],
      steps: [
        { title: 'Make a request', description: 'Call us or send a request. We will respond within 2 hours.' },
        { title: 'Confirm appointment', description: 'We confirm date, time and pickup address. Short-notice bookings possible.' },
        { title: 'Transport execution', description: 'Our team arrives on time, loads everything carefully and transports safely to destination.' },
        { title: 'Delivery & completion', description: 'Delivery to desired location, sign-off and you are done.' },
      ],
      faq: [
        { q: 'What is included in Package S?', a: 'Van (12 m³), 2 helpers, up to 2 working hours, furniture protection blankets, loading/unloading and liability insurance.' },
        { q: 'What does a no-parking zone cost?', a: 'We can apply for a no-parking zone on your behalf. Costs are approximately €30–€80 depending on the municipality, billed separately.' },
        { q: 'Can I book extra hours?', a: 'Yes, each additional hour is charged at €45/hour, communicated in advance.' },
        { q: 'How soon can I book?', a: 'We are generally available within 24–48 hours. For urgent requests, call us directly.' },
        { q: 'Are my items insured?', a: 'Yes, our transport is liability insured. For particularly valuable items, we recommend additional coverage.' },
      ],
      metaTitle: 'Transport Package S Vienna – Small Move from €129 | Transraum',
      metaDescription: 'Small transport Vienna from €129: 1 van, 2 helpers, up to 2 hours. Ideal for single transports up to 30 km. Book now!',
      keywords: 'small transport Vienna, transport package S, small move Vienna cheap, furniture transport Vienna fixed price',
    },
  },
  {
    id: 'transport-m',
    slugDe: 'transport-paket-m',
    slugEn: 'transport-package-m',
    category: 'transport',
    price: 199,
    imageFile: 'transport-paket-m.png',
    dallePrompt:
      'Professional Austrian moving company, large white moving truck being loaded with furniture and boxes on a Vienna residential street, two workers in yellow safety vests carefully carrying sofa, sunny day, photorealistic',
    specs: {
      distance: 'ca. 60 km',
      workers: 2,
      vehicle: 'Transporter 20 m³',
      duration: 'bis 4 Std.',
    },
    de: {
      name: 'Transport Paket M',
      tagline: 'Der Klassiker – Wohnungsumzug Wien bis 60 km',
      badge: 'BESTSELLER',
      description:
        'Unser meistgebuchtes Paket – ideal für einen typischen Wohnungsumzug. Mit einem 20 m³ Transporter, 2 Helfern und bis zu 4 Stunden Arbeitszeit meistern wir Ihren Umzug innerhalb Wiens oder bis ca. 60 km Entfernung.',
      includes: [
        '1 Transporter (20 m³) inkl. Fahrer',
        '2 erfahrene Helfer',
        'Bis zu 4 Arbeitsstunden',
        'Möbelschutzdecken & Spanngurte',
        'Be- und Entladen inklusive',
        'Treppenhilfe bis 4. OG',
        'Haftpflichtversicherung inklusive',
        'Kostenlose Terminabsprache',
      ],
      notIncludes: [
        'Verpackungsmaterial (auf Wunsch zubuchbar)',
        'Möbelmontage & -demontage',
        'Halteverbotszone (auf Wunsch organisierbar)',
        'Fahrten über 60 km (Paket L empfohlen)',
        'Einlagerung',
      ],
      steps: [
        { title: 'Kostenlose Anfrage', description: 'Kontaktieren Sie uns – per Telefon oder Formular. Wir erstellen sofort ein Angebot.' },
        { title: 'Terminbestätigung', description: 'Wir senden eine Auftragsbestätigung mit allen Details: Datum, Uhrzeit, Adressen.' },
        { title: 'Tag des Umzugs', description: 'Pünktlich erscheint unser Team, sichert alle Möbel fachgerecht und lädt den Transporter effizient.' },
        { title: 'Anlieferung & Aufstellung', description: 'Am Zielort stellen wir alle Möbel wunschgemäß auf und hinterlassen einen ordentlichen Eindruck.' },
      ],
      faq: [
        { q: 'Was ist beim Paket M alles inklusive?', a: 'Transporter (20 m³), 2 Helfer, bis 4 Arbeitsstunden, Möbelschutzdecken, Treppenhilfe, Be- und Entladen sowie Haftpflichtversicherung.' },
        { q: 'Reicht ein 20 m³ Transporter für meine 2-Zimmer-Wohnung?', a: 'In den meisten Fällen ja. Ein 20 m³ Transporter fasst den typischen Hausrat einer 2–3 Zimmer Wohnung. Bei Unsicherheit beraten wir Sie kostenlos.' },
        { q: 'Was kostet es, wenn wir länger als 4 Stunden brauchen?', a: 'Jede weitere Stunde wird zum Satz von €45/Stunde abgerechnet und wird vorab kommuniziert.' },
        { q: 'Fahren Sie auch nach Niederösterreich oder ins Ausland?', a: 'Ja, für Fahrten über 60 km empfehlen wir Paket L oder ein individuelles Angebot.' },
        { q: 'Kann ich Umzugskartons dazubuchen?', a: 'Ja, Umzugskartons und Verpackungsmaterial sind auf Wunsch zubuchbar. Fragen Sie beim Buchen danach.' },
      ],
      metaTitle: 'Transport Paket M Wien – Wohnungsumzug ab €199 | Transraum',
      metaDescription: 'Wohnungsumzug Wien ab €199: Transporter 20 m³, 2 Helfer, bis 4 Stunden, bis 60 km. Bestseller für 2–3 Zimmer Wohnungen. Jetzt buchen!',
      keywords: 'Wohnungsumzug Wien, Transport Paket M, Umzug Wien Festpreis, Transporter mieten Wien mit Fahrer',
    },
    en: {
      name: 'Transport Package M',
      tagline: 'The classic – apartment move Vienna up to 60 km',
      badge: 'BESTSELLER',
      description:
        'Our most booked package – ideal for a typical apartment move. With a 20 m³ van, 2 helpers, and up to 4 working hours, we handle your move within Vienna or up to approx. 60 km away.',
      includes: [
        '1 van (20 m³) incl. driver',
        '2 experienced helpers',
        'Up to 4 working hours',
        'Furniture protection blankets & straps',
        'Loading and unloading included',
        'Staircase assistance up to 4th floor',
        'Liability insurance included',
        'Free appointment scheduling',
      ],
      notIncludes: [
        'Packing materials (available as add-on)',
        'Furniture assembly/disassembly',
        'No-parking zone permit (arrangeable)',
        'Trips over 60 km (Package L recommended)',
        'Storage',
      ],
      steps: [
        { title: 'Free request', description: 'Contact us by phone or form. We provide an offer immediately.' },
        { title: 'Appointment confirmation', description: 'We send a booking confirmation with all details: date, time, addresses.' },
        { title: 'Moving day', description: 'Our team arrives on time, secures all furniture properly and loads the van efficiently.' },
        { title: 'Delivery & placement', description: 'At the destination we place all furniture as desired and leave a tidy impression.' },
      ],
      faq: [
        { q: 'What is included in Package M?', a: 'Truck (20 m³), 2 helpers, up to 4 working hours, furniture protection blankets, staircase assistance, loading/unloading and liability insurance.' },
        { q: 'Is a 20 m³ van enough for my 2-bedroom apartment?', a: 'In most cases yes. A 20 m³ van holds the typical household contents of a 2–3 room apartment. If unsure, we advise you for free.' },
        { q: 'What if we need more than 4 hours?', a: 'Each additional hour is charged at €45/hour, communicated in advance.' },
        { q: 'Do you travel to Lower Austria or abroad?', a: 'Yes, for trips over 60 km we recommend Package L or an individual quote.' },
        { q: 'Can I add moving boxes?', a: 'Yes, moving boxes and packing materials are available as an add-on. Just ask when booking.' },
      ],
      metaTitle: 'Transport Package M Vienna – Apartment Move from €199 | Transraum',
      metaDescription: 'Apartment move Vienna from €199: van 20 m³, 2 helpers, up to 4 hours, up to 60 km. Bestseller for 2–3 room apartments. Book now!',
      keywords: 'apartment move Vienna, transport package M, move Vienna fixed price, van hire Vienna with driver',
    },
  },
  {
    id: 'transport-l',
    slugDe: 'transport-paket-l',
    slugEn: 'transport-package-l',
    category: 'transport',
    price: 299,
    imageFile: 'transport-paket-l.png',
    dallePrompt:
      'Large professional Austrian moving operation, big white moving truck fully loaded parked in front of Vienna historic building, three workers in matching uniforms efficiently moving large furniture, photorealistic, premium service',
    specs: {
      distance: 'ca. 100 km',
      workers: 3,
      vehicle: 'Transporter 20 m³',
      duration: 'bis 6 Std.',
    },
    de: {
      name: 'Transport Paket L',
      tagline: 'Großumzug & Fernstransport bis 100 km – alles inklusive',
      badge: 'VOLLSERVICE',
      description:
        'Für größere Haushalte, Mehrfamilienumzüge oder weitere Strecken. Mit 3 Helfern und bis zu 6 Stunden Arbeitszeit sowie einem 20 m³ Transporter stemmen wir auch anspruchsvolle Umzüge bis ca. 100 km.',
      includes: [
        '1 Transporter (20 m³) inkl. erfahrenem Fahrer',
        '3 erfahrene Helfer',
        'Bis zu 6 Arbeitsstunden',
        'Möbelschutzdecken & professionelle Spanngurte',
        'Be- und Entladen inklusive',
        'Treppenhilfe ohne Etagenbegrenzung',
        'Haftpflichtversicherung inklusive',
        'Koordination & Aufmaß inklusive',
        'Kostenlose Vorabbesichtigung auf Wunsch',
      ],
      notIncludes: [
        'Umzugskartons & Verpackungsmaterial (zubuchbar)',
        'Möbelmontage & -demontage (zubuchbar)',
        'Halteverbotszone (auf Wunsch organisierbar)',
        'Strecken über 100 km (individuelles Angebot)',
        'Einlagerungsservice',
      ],
      steps: [
        { title: 'Kostenlose Beratung', description: 'Wir besprechen Ihren Umzug im Detail und geben Ihnen eine genaue Kostenschätzung.' },
        { title: 'Detaillierte Planung', description: 'Route, Parkplatz, Aufzug, besondere Möbel – wir planen alles im Voraus.' },
        { title: 'Professionelle Durchführung', description: '3 Helfer arbeiten koordiniert: Sichern, Tragen, Laden – alles mit Bedacht.' },
        { title: 'Vollständige Übergabe', description: 'Möbel am Zielort aufgestellt, alle Kartons geliefert, kein Stück vergessen.' },
      ],
      faq: [
        { q: 'Für wen eignet sich Paket L?', a: 'Paket L ist ideal für Haushalte ab 80 m², große Wohnungsumzüge, Büroumzüge oder Strecken bis 100 km.' },
        { q: 'Kann ich Möbelmontage dazubuchen?', a: 'Ja, An- und Abbau von Möbeln ist gegen Aufpreis buchbar. Bitte bei der Anfrage angeben.' },
        { q: 'Bieten Sie Expressumzüge an?', a: 'Ja, bei freier Kapazität sind Expressumzüge auch am nächsten Tag möglich. Bitte telefonisch anfragen.' },
        { q: 'Haben Sie eigene Fahrzeuge?', a: 'Ja, wir arbeiten mit eigenen, regelmäßig gewarteten Fahrzeugen und festem Stammpersonal.' },
        { q: 'Was passiert wenn mehr Zeit benötigt wird?', a: 'Zusätzliche Stunden werden zum Satz von €45/Std. abgerechnet und immer vorab besprochen.' },
      ],
      metaTitle: 'Transport Paket L Wien – Großumzug ab €299 | Transraum',
      metaDescription: 'Großumzug Wien ab €299: Transporter 20 m³, 3 Helfer, bis 6 Stunden, bis 100 km. Vollservice für große Haushalte und Büros. Jetzt anfragen!',
      keywords: 'Großumzug Wien, Transport Paket L, Fernumzug Österreich, Büroumzug Wien Festpreis, Transporter 3 Helfer Wien',
    },
    en: {
      name: 'Transport Package L',
      tagline: 'Large move & long-distance transport up to 100 km – all included',
      badge: 'FULL SERVICE',
      description:
        'For larger households, multi-room moves or longer distances. With 3 helpers and up to 6 working hours plus a 20 m³ van, we handle even demanding moves up to approx. 100 km.',
      includes: [
        '1 van (20 m³) incl. experienced driver',
        '3 experienced helpers',
        'Up to 6 working hours',
        'Furniture protection blankets & professional straps',
        'Loading and unloading included',
        'Staircase assistance without floor limit',
        'Liability insurance included',
        'Coordination & assessment included',
        'Free preliminary inspection on request',
      ],
      notIncludes: [
        'Moving boxes & packing materials (add-on)',
        'Furniture assembly/disassembly (add-on)',
        'No-parking zone permit (arrangeable)',
        'Routes over 100 km (individual quote)',
        'Storage service',
      ],
      steps: [
        { title: 'Free consultation', description: 'We discuss your move in detail and give you an accurate cost estimate.' },
        { title: 'Detailed planning', description: 'Route, parking, elevator, special furniture – we plan everything in advance.' },
        { title: 'Professional execution', description: '3 helpers work in a coordinated manner: secure, carry, load – all with care.' },
        { title: 'Complete handover', description: 'Furniture placed at destination, all boxes delivered, nothing forgotten.' },
      ],
      faq: [
        { q: 'Who is Package L suitable for?', a: 'Package L is ideal for households from 80 m², large apartment moves, office moves or distances up to 100 km.' },
        { q: 'Can I add furniture assembly?', a: 'Yes, furniture assembly and disassembly is bookable for an extra charge. Please specify when requesting.' },
        { q: 'Do you offer express moves?', a: 'Yes, express moves are possible the next day when capacity is available. Please inquire by phone.' },
        { q: 'Do you have your own vehicles?', a: 'Yes, we work with our own regularly maintained vehicles and permanent staff.' },
        { q: 'What if more time is needed?', a: 'Additional hours are charged at €45/hour and always discussed in advance.' },
      ],
      metaTitle: 'Transport Package L Vienna – Large Move from €299 | Transraum',
      metaDescription: 'Large move Vienna from €299: van 20 m³, 3 helpers, up to 6 hours, up to 100 km. Full service for large households and offices. Request now!',
      keywords: 'large move Vienna, transport package L, long distance move Austria, office move Vienna fixed price',
    },
  },
  {
    id: 'raeumung-s',
    slugDe: 'raeumung-paket-s',
    slugEn: 'clearance-package-s',
    category: 'raeumung',
    price: 249,
    imageFile: 'raeumung-paket-s.png',
    dallePrompt:
      'Professional Austrian apartment clearance service, two workers in yellow uniforms clearing a small compact studio apartment in Vienna, removing furniture and boxes, clean and organized work, photorealistic',
    specs: {
      area: 'bis 35 m²',
      workers: 2,
      vehicle: 'Transporter 12 m³',
      duration: 'ca. 3–4 Std.',
    },
    de: {
      name: 'Räumung Paket S',
      tagline: 'Kompletträumung für Studios & 1-Zimmer-Wohnungen',
      badge: 'SCHNELLLÖSUNG',
      description:
        'Ideale Lösung für kleine Wohnungen bis 35 m². Unser Team räumt Ihre Wohnung vollständig, sachgemäß und schnell – inklusive Abtransport des gesamten Hausrats. Hinterlassen wir den Raum besenrein.',
      includes: [
        'Vollständige Räumung bis 35 m²',
        '2 erfahrene Räumungshelfer',
        'Abtransport aller Gegenstände',
        'Besenreiner Zustand garantiert',
        'Fachgerechte Entsorgung',
        'Haftpflichtversicherung',
        'Terminflexibilität',
      ],
      notIncludes: [
        'Professionelle Endreinigung (auf Wunsch zubuchbar)',
        'Wohnfläche über 35 m² (Paket M empfohlen)',
        'Sonderentsorgung (z.B. Elektronik, Gefahrstoffe)',
        'Ankauf von Wertgegenständen (separat buchbar)',
      ],
      steps: [
        { title: 'Kostenloser Rückruf', description: 'Beschreiben Sie kurz Ihre Räumung. Wir rufen innerhalb von 2 Stunden zurück.' },
        { title: 'Besichtigung optional', description: 'Bei unklarem Umfang kommen wir zur kostenlosen Besichtigung vorbei.' },
        { title: 'Räumung & Abtransport', description: 'Unser Team räumt systematisch, sorgt für Ordnung und transportiert alles ab.' },
        { title: 'Besenreine Übergabe', description: 'Wir übergeben den Raum sauber und komplett geräumt.' },
      ],
      faq: [
        { q: 'Was bedeutet "besenrein"?', a: 'Besenrein bedeutet: vollständig geräumt, grob gesaugt/gefegt, keine Gegenstände mehr vorhanden. Nicht zu verwechseln mit Endreinigung.' },
        { q: 'Was passiert mit noch brauchbaren Möbeln?', a: 'Brauchbare Gegenstände können auf Wunsch durch unseren Verlassenschaftsankauf-Service bewertet und aufgekauft werden.' },
        { q: 'Wie lange dauert eine Räumung bis 35 m²?', a: 'In der Regel 3–4 Stunden, je nach Füllstand und Zugänglichkeit der Räume.' },
        { q: 'Brauche ich bei der Räumung anwesend zu sein?', a: 'Nicht zwingend. Sie können uns eine Schlüsselübergabe oder Zugang organisieren – wir erledigen den Rest.' },
        { q: 'Entsorgen Sie auch Elektronik und Sondermüll?', a: 'Standardmäßig nein, aber gegen Aufpreis können wir auch Sonderentsorgung organisieren.' },
      ],
      metaTitle: 'Räumung Paket S Wien – 1-Zimmer-Wohnung ab €249 | Transraum',
      metaDescription: 'Wohnungsräumung Wien ab €249: bis 35 m², 2 Helfer, besenrein, inkl. Abtransport. Schnell und professionell. Jetzt anfragen!',
      keywords: 'Wohnungsräumung Wien günstig, Räumung 1 Zimmer Wien, Haushaltsauflösung Wien Festpreis, Räumung Paket Wien',
    },
    en: {
      name: 'Clearance Package S',
      tagline: 'Complete clearance for studios & 1-room apartments',
      badge: 'QUICK SOLUTION',
      description:
        'Ideal solution for small apartments up to 35 m². Our team clears your apartment completely, properly and quickly – including removal of all household items. We leave the space broom-clean.',
      includes: [
        'Complete clearance up to 35 m²',
        '2 experienced clearance helpers',
        'Removal of all items',
        'Broom-clean condition guaranteed',
        'Proper disposal',
        'Liability insurance',
        'Flexible scheduling',
      ],
      notIncludes: [
        'Professional end cleaning (available as add-on)',
        'Floor space over 35 m² (Package M recommended)',
        'Special disposal (e.g. electronics, hazardous materials)',
        'Purchase of valuables (bookable separately)',
      ],
      steps: [
        { title: 'Free callback', description: 'Briefly describe your clearance. We call back within 2 hours.' },
        { title: 'Optional inspection', description: 'If the scope is unclear, we come by for a free inspection.' },
        { title: 'Clearance & removal', description: 'Our team clears systematically, maintains order and transports everything away.' },
        { title: 'Broom-clean handover', description: 'We hand over the space clean and completely cleared.' },
      ],
      faq: [
        { q: 'What does "broom-clean" mean?', a: 'Broom-clean means: completely cleared, roughly vacuumed/swept, no items remaining. Not to be confused with end cleaning.' },
        { q: 'What happens to still usable furniture?', a: 'Usable items can be assessed and purchased by our estate purchase service on request.' },
        { q: 'How long does a clearance up to 35 m² take?', a: 'Usually 3–4 hours, depending on how full and accessible the rooms are.' },
        { q: 'Do I need to be present during the clearance?', a: 'Not necessarily. You can organize a key handover or access – we handle the rest.' },
        { q: 'Do you also dispose of electronics and special waste?', a: 'Not as standard, but for an extra charge we can organize special disposal.' },
      ],
      metaTitle: 'Clearance Package S Vienna – 1-Room Apartment from €249 | Transraum',
      metaDescription: 'Apartment clearance Vienna from €249: up to 35 m², 2 helpers, broom-clean, incl. removal. Fast and professional. Request now!',
      keywords: 'apartment clearance Vienna cheap, clearance 1 room Vienna, household dissolution Vienna fixed price',
    },
  },
  {
    id: 'raeumung-m',
    slugDe: 'raeumung-paket-m',
    slugEn: 'clearance-package-m',
    category: 'raeumung',
    price: 399,
    imageFile: 'raeumung-paket-m.png',
    dallePrompt:
      'Professional Austrian apartment clearance team, three workers in yellow vests clearing a medium-sized 2-bedroom apartment in Vienna, systematically removing furniture and household items, efficient teamwork, photorealistic',
    specs: {
      area: 'bis 70 m²',
      workers: 3,
      vehicle: 'Transporter 20 m³',
      duration: 'ca. 5–7 Std.',
    },
    de: {
      name: 'Räumung Paket M',
      tagline: 'Komplettlösung für 2–3 Zimmer Wohnungen in Wien',
      badge: 'BELIEBT',
      description:
        'Das am häufigsten gebuchte Räumungspaket – perfekt für typische Wiener Wohnungen bis 70 m². Mit 3 Helfern, einem 20 m³ Transporter und voller Haftpflichtversicherung übergeben wir Ihre Wohnung besenrein.',
      includes: [
        'Vollständige Räumung bis 70 m²',
        '3 erfahrene Räumungshelfer',
        '1 Transporter (20 m³) für Abtransport',
        'Abtransport aller Gegenstände',
        'Besenreiner Zustand garantiert',
        'Fachgerechte Entsorgung',
        'Haftpflichtversicherung inklusive',
        'Kostenlose Vorabbesichtigung',
      ],
      notIncludes: [
        'Professionelle Endreinigung (zubuchbar)',
        'Wohnfläche über 70 m² (Paket L empfohlen)',
        'Sonderentsorgung Elektro/Gefahrstoffe',
        'Renovierungsarbeiten',
      ],
      steps: [
        { title: 'Kostenlose Besichtigung', description: 'Wir besichtigen kostenlos und geben ein verbindliches Festpreisangebot.' },
        { title: 'Terminvereinbarung', description: 'Wir fixieren Datum und Uhrzeit – auch kurzfristig innerhalb von 1–2 Tagen möglich.' },
        { title: 'Professionelle Räumung', description: 'Drei Helfer räumen systematisch von oben nach unten, Raum für Raum.' },
        { title: 'Besenreine Übergabe', description: 'Vollständig geräumt, besenrein, Schlüsselübergabe an Eigentümer oder Makler.' },
      ],
      faq: [
        { q: 'Was kostet eine Wohnungsräumung in Wien?', a: 'Unser Paket M beginnt ab €399 für Wohnungen bis 70 m². Der genaue Preis hängt vom Füllgrad und der Zugänglichkeit ab.' },
        { q: 'Haben Sie Erfahrung mit Verlassenschaften/Nachlasswohnungen?', a: 'Ja, wir haben langjährige Erfahrung in der sensiblen Räumung von Nachlasswohnungen – diskret und respektvoll.' },
        { q: 'Können Sie auch Keller und Dachboden mitrechnen?', a: 'Ja, Keller und Dachböden können gegen Aufpreis mitgeräumt werden. Bitte bei der Anfrage angeben.' },
        { q: 'Wie wird der Müll entsorgt?', a: 'Wir entsorgen auf lizenzierten österreichischen Sammelstellen. Auf Wunsch erhalten Sie einen Nachweis.' },
        { q: 'Gibt es einen Ankaufservice für Wertgegenstände?', a: 'Ja, unsere Verlassenschaftsankauf-Abteilung bewertet und kauft Möbel, Schmuck, Teppiche und Antiquitäten.' },
      ],
      metaTitle: 'Räumung Paket M Wien – 2-3 Zimmer Wohnung ab €399 | Transraum',
      metaDescription: 'Wohnungsräumung Wien ab €399: bis 70 m², 3 Helfer, besenrein, Transporter inklusive. Perfekt für 2–3 Zimmer. Jetzt Festpreis anfragen!',
      keywords: 'Wohnungsräumung Wien 2 Zimmer, Räumung 70 m² Wien, Haushaltsauflösung Wien Pauschal, Räumungsfirma Wien',
    },
    en: {
      name: 'Clearance Package M',
      tagline: 'Complete solution for 2–3 room apartments in Vienna',
      badge: 'POPULAR',
      description:
        'The most frequently booked clearance package – perfect for typical Viennese apartments up to 70 m². With 3 helpers, a 20 m³ van and full liability insurance, we hand over your apartment broom-clean.',
      includes: [
        'Complete clearance up to 70 m²',
        '3 experienced clearance helpers',
        '1 van (20 m³) for removal',
        'Removal of all items',
        'Broom-clean condition guaranteed',
        'Proper disposal',
        'Liability insurance included',
        'Free preliminary inspection',
      ],
      notIncludes: [
        'Professional end cleaning (add-on)',
        'Floor space over 70 m² (Package L recommended)',
        'Special disposal electronics/hazardous',
        'Renovation work',
      ],
      steps: [
        { title: 'Free inspection', description: 'We inspect for free and provide a binding fixed-price offer.' },
        { title: 'Appointment scheduling', description: 'We fix date and time – also possible at short notice within 1–2 days.' },
        { title: 'Professional clearance', description: 'Three helpers systematically clear from top to bottom, room by room.' },
        { title: 'Broom-clean handover', description: 'Completely cleared, broom-clean, key handover to owner or realtor.' },
      ],
      faq: [
        { q: 'What does an apartment clearance cost in Vienna?', a: 'Our Package M starts from €399 for apartments up to 70 m². The exact price depends on the fill level and accessibility.' },
        { q: 'Do you have experience with estate/probate apartments?', a: 'Yes, we have many years of experience in the sensitive clearance of estate apartments – discreet and respectful.' },
        { q: 'Can you also clear the basement and attic?', a: 'Yes, basements and attics can be cleared for an extra charge. Please specify when requesting.' },
        { q: 'How is the waste disposed of?', a: 'We dispose at licensed Austrian collection points. A certificate is available on request.' },
        { q: 'Is there a purchase service for valuables?', a: 'Yes, our estate purchase department assesses and buys furniture, jewellery, carpets and antiques.' },
      ],
      metaTitle: 'Clearance Package M Vienna – 2-3 Room Apartment from €399 | Transraum',
      metaDescription: 'Apartment clearance Vienna from €399: up to 70 m², 3 helpers, broom-clean, van included. Perfect for 2–3 rooms. Request fixed price now!',
      keywords: 'apartment clearance Vienna 2 rooms, clearance 70 m² Vienna, household dissolution Vienna flat rate, clearance company Vienna',
    },
  },
  {
    id: 'raeumung-l',
    slugDe: 'raeumung-paket-l',
    slugEn: 'clearance-package-l',
    category: 'raeumung',
    price: 599,
    imageFile: 'raeumung-paket-l.png',
    dallePrompt:
      'Large-scale professional Austrian house clearance, four workers in yellow uniforms clearing a large family home in Vienna, multiple rooms being emptied simultaneously, big truck outside, organized and efficient, photorealistic',
    specs: {
      area: 'bis 120 m²',
      workers: 4,
      vehicle: '2 Transporter',
      duration: 'ca. 1–2 Tage',
    },
    de: {
      name: 'Räumung Paket L',
      tagline: 'Hausräumung & Großräumung – komplette Auflösung',
      badge: 'KOMPLETT',
      description:
        'Für große Wohnungen, Häuser oder komplexe Räumungen bis 120 m². Mit 4 Helfern, 2 Transportern liefern wir ein Rundumpaket – inklusive Vorabbesichtigung, vollständiger Entsorgung und besenreiner Übergabe.',
      includes: [
        'Vollständige Räumung bis 120 m²',
        '4 erfahrene Räumungshelfer',
        '2 Transporter',
        'Abtransport aller Gegenstände',
        'Besenreiner Zustand garantiert',
        'Fachgerechte Entsorgung inklusive',
        'Haftpflichtversicherung inklusive',
        'Kostenlose Vorabbesichtigung & Festpreisangebot',
        'Koordination mit Hausverwaltung möglich',
      ],
      notIncludes: [
        'Professionelle Endreinigung (zubuchbar)',
        'Flächen über 120 m² (individuelles Angebot)',
        'Renovierungsarbeiten',
        'Lagerung von Gegenständen',
      ],
      steps: [
        { title: 'Detaillierte Besichtigung', description: 'Wir kommen zur Besichtigung, nehmen Maß und erstellen ein verbindliches Festpreisangebot.' },
        { title: 'Planung & Organisation', description: 'Fahrzeuge, Team, Route und Entsorgungswege werden vorab geplant – kein Stress am Tag selbst.' },
        { title: 'Räumung in 1–2 Tagen', description: '4 Helfer arbeiten parallel, systematisch durch alle Räume, auch Keller und Dachboden inklusive.' },
        { title: 'Besenreine Übergabe & Dokumentation', description: 'Vollständig geräumt und gereinigt. Auf Wunsch Fotoprotokoll für Vermieter/Nachlass.' },
      ],
      faq: [
        { q: 'Was ist beim Paket L alles inklusive?', a: 'Bis 120 m² Wohnfläche, 4 Helfer, 2 Transporter, vollständiger Abtransport, fachgerechte Entsorgung, Vorabbesichtigung und Haftpflichtversicherung.' },
        { q: 'Können Sie auch Keller und Dachboden mitrechnen?', a: 'Bei Paket L sind Keller und Dachboden bis zu einer Gesamtfläche von 120 m² inklusive.' },
        { q: 'Wie lange dauert eine Hausräumung?', a: 'In der Regel 1–2 Tage, je nach Füllgrad und Zugänglichkeit. Bei der Besichtigung geben wir eine genaue Einschätzung.' },
        { q: 'Arbeiten Sie auch am Wochenende?', a: 'Ja, wir sind auch samstags und auf Wunsch sonntags verfügbar. Terminanfragen bitte telefonisch.' },
        { q: 'Kann ich einen Ankauf von Möbeln und Wertsachen dazubuchen?', a: 'Ja, unser Verlassenschaftsankauf-Team bewertet und kauft Möbel, Teppiche, Kunstwerke, Schmuck und mehr.' },
      ],
      metaTitle: 'Räumung Paket L Wien – Hausräumung ab €599 | Transraum',
      metaDescription: 'Hausräumung Wien ab €599: bis 120 m², 4 Helfer, 2 Transporter, Komplettservice. Wochenende möglich. Jetzt Festpreis anfragen!',
      keywords: 'Hausräumung Wien, Räumung Paket L Wien, Großräumung Wien Festpreis, Verlassenschaftsräumung Wien, Räumungsfirma Wien groß',
    },
    en: {
      name: 'Clearance Package L',
      tagline: 'House clearance & large-scale clearance – complete dissolution',
      badge: 'COMPLETE',
      description:
        'For large apartments, houses or complex clearances up to 120 m². With 4 helpers, 2 vans, we deliver an all-round package – including preliminary inspection, complete disposal and broom-clean handover.',
      includes: [
        'Complete clearance up to 120 m²',
        '4 experienced clearance helpers',
        'Truck (20 m³) + van',
        'Removal of all items',
        'Broom-clean condition guaranteed',
        'Proper disposal included',
        'Liability insurance included',
        'Free preliminary inspection & fixed-price offer',
        'Coordination with property management possible',
      ],
      notIncludes: [
        'Professional end cleaning (add-on)',
        'Areas over 120 m² (individual quote)',
        'Renovation work',
        'Storage of items',
      ],
      steps: [
        { title: 'Detailed inspection', description: 'We come for an inspection, take measurements and create a binding fixed-price offer.' },
        { title: 'Planning & organisation', description: 'Vehicles, team, route and disposal routes are planned in advance – no stress on the day.' },
        { title: 'Clearance in 1–2 days', description: '4 helpers work in parallel, systematically through all rooms, basement and attic included.' },
        { title: 'Broom-clean handover & documentation', description: 'Completely cleared and cleaned. Photo protocol for landlord/estate on request.' },
      ],
      faq: [
        { q: 'What is included in Package L?', a: 'Up to 120 m² living space, 4 helpers, 2 vans, complete removal, proper disposal, preliminary inspection and liability insurance.' },
        { q: 'Can basement and attic be included?', a: 'In Package L, basement and attic are included up to a total area of 120 m².' },
        { q: 'How long does a house clearance take?', a: 'Usually 1–2 days, depending on fill level and accessibility. We provide an accurate estimate at the inspection.' },
        { q: 'Do you work on weekends?', a: 'Yes, we are available on Saturdays and Sundays on request. Please inquire by phone.' },
        { q: 'Can I add a purchase of furniture and valuables?', a: 'Yes, our estate purchase team assesses and buys furniture, carpets, artwork, jewellery and more.' },
      ],
      metaTitle: 'Clearance Package L Vienna – House Clearance from €599 | Transraum',
      metaDescription: 'House clearance Vienna from €599: up to 120 m², 4 helpers, 2 vans, complete service. Weekend possible. Request fixed price now!',
      keywords: 'house clearance Vienna, clearance package L Vienna, large clearance Vienna fixed price, estate clearance Vienna, clearance company Vienna large',
    },
  },
];

export function getPackageBySlug(slug: string, language: 'de' | 'en'): ShopPackage | undefined {
  if (language === 'de') return shopPackages.find(p => p.slugDe === slug);
  return shopPackages.find(p => p.slugEn === slug);
}

export function getPackageById(id: string): ShopPackage | undefined {
  return shopPackages.find(p => p.id === id);
}

export function getPackagesByCategory(category: PackageCategory): ShopPackage[] {
  return shopPackages.filter(p => p.category === category);
}
