export interface CityInfo {
  name: string;
  nameEn?: string;
  slug: string;
  bundesland: string;
  bundeslandEn?: string;
  bundeslandSlug: string;
  postalCode: string;
  population?: number;
  description: string;
  descriptionEn?: string;
  metaDescription: string;
  metaDescriptionEn?: string;
  services: string[];
  servicesEn?: string[];
  benefits: string[];
  benefitsEn?: string[];
  coverage: string;
  coverageEn?: string;
  faq: Array<{ question: string; answer: string }>;
  faqEn?: Array<{ question: string; answer: string }>;
}

export const cities: Record<string, CityInfo[]> = {
  niederoesterreich: [
    {
      name: 'St. Pölten',
      nameEn: 'St. Pölten',
      slug: 'st-poelten',
      bundesland: 'Niederösterreich',
      bundeslandEn: 'Lower Austria',
      bundeslandSlug: 'niederoesterreich',
      postalCode: '3100',
      population: 55000,
      description: 'Professionelle Räumung und Transport in St. Pölten, der Landeshauptstadt von Niederösterreich. Wir sind Ihr zuverlässiger Partner für Wohnungsräumung, Haushaltsauflösung und Kellerräumung in St. Pölten und Umgebung.',
      descriptionEn: 'Professional clearing and transport services in St. Pölten, the capital of Lower Austria. We are your reliable partner for apartment clearance, household dissolution, and basement clearing in St. Pölten and surrounding areas.',
      metaDescription: 'Räumung St. Pölten ✓ Wohnungsräumung ✓ Haushaltsauflösung ✓ Transport ✓ Schnell & zuverlässig in ganz St. Pölten ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing St. Pölten ✓ Apartment Clearance ✓ Household Dissolution ✓ Transport ✓ Fast & reliable throughout St. Pölten ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Haushaltsauflösung', 'Kellerräumung', 'Dachbodenräumung', 'Geschäftsräumung', 'Transportservice'],
      servicesEn: ['Apartment Clearance', 'Household Dissolution', 'Basement Clearing', 'Attic Clearing', 'Commercial Clearance', 'Transport Service'],
      benefits: [
        'Schnelle Anfahrt in St. Pölten und Umgebung',
        'Erfahrung mit Altbauten im Stadtzentrum',
        'Flexible Termine auch am Wochenende',
        'Besenreine Übergabe garantiert',
        'Faire Festpreise nach kostenloser Besichtigung'
      ],
      benefitsEn: [
        'Quick arrival in St. Pölten and surrounding areas',
        'Experience with old buildings in the city center',
        'Flexible appointments including weekends',
        'Broom-clean handover guaranteed',
        'Fair fixed prices after free inspection'
      ],
      coverage: 'Wir sind in ganz St. Pölten tätig - vom Zentrum bis zu den Stadtteilen wie Wagram, Spratzern, Pottenbrunn und Viehofen.',
      coverageEn: 'We operate throughout St. Pölten - from the center to districts like Wagram, Spratzern, Pottenbrunn, and Viehofen.',
      faq: [
        {
          question: 'Wie schnell können Sie in St. Pölten anfahren?',
          answer: 'Wir sind innerhalb von 30-45 Minuten in St. Pölten vor Ort. Für dringende Fälle bieten wir Express-Service innerhalb von 24 Stunden.'
        },
        {
          question: 'Arbeiten Sie auch in den Stadtteilen von St. Pölten?',
          answer: 'Ja, wir arbeiten in allen Stadtteilen von St. Pölten - Wagram, Spratzern, Pottenbrunn, Viehofen und allen weiteren Bezirken der Landeshauptstadt.'
        }
      ],
      faqEn: [
        {
          question: 'How quickly can you arrive in St. Pölten?',
          answer: 'We can be on-site in St. Pölten within 30-45 minutes. For urgent cases, we offer express service within 24 hours.'
        },
        {
          question: 'Do you also work in the districts of St. Pölten?',
          answer: 'Yes, we work in all districts of St. Pölten - Wagram, Spratzern, Pottenbrunn, Viehofen, and all other districts of the capital.'
        }
      ]
    },
    {
      name: 'Wiener Neustadt',
      nameEn: 'Wiener Neustadt',
      slug: 'wiener-neustadt',
      bundesland: 'Niederösterreich',
      bundeslandEn: 'Lower Austria',
      bundeslandSlug: 'niederoesterreich',
      postalCode: '2700',
      population: 45000,
      description: 'Professionelle Räumungsdienste in Wiener Neustadt. Von der Innenstadt bis zu den Außenbezirken - wir räumen Wohnungen, Häuser und Keller schnell und zuverlässig.',
      descriptionEn: 'Professional clearing services in Wiener Neustadt. From the city center to the outer districts - we clear apartments, houses, and basements quickly and reliably.',
      metaDescription: 'Räumung Wiener Neustadt ✓ Wohnungsräumung ✓ Kellerräumung ✓ Transport ✓ Schnell & professionell ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Wiener Neustadt ✓ Apartment Clearance ✓ Basement Clearing ✓ Transport ✓ Fast & professional ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Hausräumung', 'Kellerräumung', 'Transportservice'],
      servicesEn: ['Apartment Clearance', 'House Clearance', 'Basement Clearing', 'Transport Service'],
      benefits: [
        'Kurze Anfahrtswege aus Wien',
        'Erfahrung mit historischen Gebäuden',
        'Besenreine Übergabe',
        'Transparente Festpreise'
      ],
      benefitsEn: [
        'Short travel distance from Vienna',
        'Experience with historic buildings',
        'Broom-clean handover',
        'Transparent fixed prices'
      ],
      coverage: 'Gesamtes Stadtgebiet Wiener Neustadt und Umgebung.',
      coverageEn: 'Entire city area of Wiener Neustadt and surrounding areas.',
      faq: [
        {
          question: 'Wie lange dauert eine Wohnungsräumung in Wiener Neustadt?',
          answer: 'Eine durchschnittliche 70m² Wohnung räumen wir in 4-6 Stunden. Bei größeren Objekten oder Altbauten ohne Lift kann es 6-8 Stunden dauern.'
        }
      ],
      faqEn: [
        {
          question: 'How long does an apartment clearance take in Wiener Neustadt?',
          answer: 'We clear an average 70m² apartment in 4-6 hours. For larger properties or old buildings without elevators, it can take 6-8 hours.'
        }
      ]
    },
    {
      name: 'Baden',
      nameEn: 'Baden',
      slug: 'baden',
      bundesland: 'Niederösterreich',
      bundeslandEn: 'Lower Austria',
      bundeslandSlug: 'niederoesterreich',
      postalCode: '2500',
      population: 26000,
      description: 'Räumung und Transport in Baden bei Wien. Spezialisiert auf die besonderen Anforderungen der Kurstadt mit ihren historischen Villen und Altbauten.',
      descriptionEn: 'Clearing and transport services in Baden near Vienna. Specialized in the unique requirements of the spa town with its historic villas and old buildings.',
      metaDescription: 'Räumung Baden bei Wien ✓ Villenräumung ✓ Altbau-Expertise ✓ Diskret & professionell ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Baden near Vienna ✓ Villa Clearance ✓ Historic Building Expertise ✓ Discreet & professional ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Villenräumung', 'Haushaltsauflösung', 'Kellerräumung'],
      servicesEn: ['Apartment Clearance', 'Villa Clearance', 'Household Dissolution', 'Basement Clearing'],
      benefits: [
        'Erfahrung mit historischen Villen',
        'Diskrete Abwicklung in gehobenen Wohngegenden',
        'Schonendes Arbeiten in denkmalgeschützten Gebäuden',
        'Kurze Anfahrt aus Wien'
      ],
      benefitsEn: [
        'Experience with historic villas',
        'Discreet handling in upscale residential areas',
        'Careful work in listed buildings',
        'Short distance from Vienna'
      ],
      coverage: 'Baden Zentrum, Weikersdorf, Leesdorf und alle Ortsteile.',
      coverageEn: 'Baden center, Weikersdorf, Leesdorf, and all districts.',
      faq: [
        {
          question: 'Können Sie auch denkmalgeschützte Villen in Baden räumen?',
          answer: 'Ja, wir haben umfangreiche Erfahrung mit historischen Gebäuden und Villen in Baden. Wir arbeiten besonders schonend und achten auf die Bausubstanz.'
        }
      ],
      faqEn: [
        {
          question: 'Can you also clear listed villas in Baden?',
          answer: 'Yes, we have extensive experience with historic buildings and villas in Baden. We work with particular care and pay attention to the building structure.'
        }
      ]
    },
    {
      name: 'Klosterneuburg',
      nameEn: 'Klosterneuburg',
      slug: 'klosterneuburg',
      bundesland: 'Niederösterreich',
      bundeslandEn: 'Lower Austria',
      bundeslandSlug: 'niederoesterreich',
      postalCode: '3400',
      population: 28000,
      description: 'Professionelle Räumung in Klosterneuburg. Schnelle Anfahrt aus Wien, spezialisiert auf Wohnungen und Häuser in allen Stadtteilen.',
      descriptionEn: 'Professional clearing in Klosterneuburg. Quick arrival from Vienna, specialized in apartments and houses in all districts.',
      metaDescription: 'Räumung Klosterneuburg ✓ Wohnungsräumung ✓ Hausräumung ✓ Schnelle Anfahrt ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Klosterneuburg ✓ Apartment Clearance ✓ House Clearance ✓ Quick arrival ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Hausräumung', 'Kellerräumung', 'Transportservice'],
      servicesEn: ['Apartment Clearance', 'House Clearance', 'Basement Clearing', 'Transport Service'],
      benefits: [
        'Sehr schnelle Anfahrt aus Wien',
        'Lokale Marktkenntnis',
        'Flexible Terminvereinbarung',
        'Faire Preise'
      ],
      benefitsEn: [
        'Very quick arrival from Vienna',
        'Local market knowledge',
        'Flexible appointment scheduling',
        'Fair prices'
      ],
      coverage: 'Alle Stadtteile von Klosterneuburg inklusive Kierling, Weidling und Kritzendorf.',
      coverageEn: 'All districts of Klosterneuburg including Kierling, Weidling, and Kritzendorf.',
      faq: []
    },
    {
      name: 'Mödling',
      nameEn: 'Mödling',
      slug: 'moedling',
      bundesland: 'Niederösterreich',
      bundeslandEn: 'Lower Austria',
      bundeslandSlug: 'niederoesterreich',
      postalCode: '2340',
      population: 21000,
      description: 'Räumungsdienste in Mödling. Von kleinen Wohnungen bis zu großen Häusern - wir räumen professionell und zuverlässig.',
      descriptionEn: 'Clearing services in Mödling. From small apartments to large houses - we clear professionally and reliably.',
      metaDescription: 'Räumung Mödling ✓ Professionell & schnell ✓ Wohnungen & Häuser ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Mödling ✓ Professional & fast ✓ Apartments & Houses ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Hausräumung', 'Kellerräumung'],
      servicesEn: ['Apartment Clearance', 'House Clearance', 'Basement Clearing'],
      benefits: [
        'Schnelle Anfahrt aus Wien Süd',
        'Erfahrung mit Einfamilienhäusern',
        'Besenreine Übergabe',
        'Transparente Preise'
      ],
      benefitsEn: [
        'Quick arrival from South Vienna',
        'Experience with single-family houses',
        'Broom-clean handover',
        'Transparent prices'
      ],
      coverage: 'Mödling und alle umliegenden Gemeinden.',
      coverageEn: 'Mödling and all surrounding municipalities.',
      faq: [],
      faqEn: []
    },
    {
      name: 'Krems an der Donau',
      nameEn: 'Krems an der Donau',
      slug: 'krems',
      bundesland: 'Niederösterreich',
      bundeslandEn: 'Lower Austria',
      bundeslandSlug: 'niederoesterreich',
      postalCode: '3500',
      population: 25000,
      description: 'Räumung in Krems an der Donau und Umgebung. Professionelle Dienstleistungen für die gesamte Wachau-Region.',
      descriptionEn: 'Clearing in Krems an der Donau and surrounding areas. Professional services for the entire Wachau region.',
      metaDescription: 'Räumung Krems ✓ Wachau ✓ Wohnungsräumung ✓ Zuverlässig ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Krems ✓ Wachau ✓ Apartment Clearance ✓ Reliable ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Hausräumung', 'Kellerräumung', 'Geschäftsräumung'],
      servicesEn: ['Apartment Clearance', 'House Clearance', 'Basement Clearing', 'Commercial Clearance'],
      benefits: [
        'Regionale Präsenz in der Wachau',
        'Erfahrung mit Weinkellern',
        'Flexible Terminvereinbarung',
        'Faire Konditionen'
      ],
      benefitsEn: [
        'Regional presence in the Wachau',
        'Experience with wine cellars',
        'Flexible appointment scheduling',
        'Fair terms'
      ],
      coverage: 'Krems, Stein, Mautern und gesamte Wachau-Region.',
      coverageEn: 'Krems, Stein, Mautern and entire Wachau region.',
      faq: [],
      faqEn: []
    },
    {
      name: 'Amstetten',
      nameEn: 'Amstetten',
      slug: 'amstetten',
      bundesland: 'Niederösterreich',
      bundeslandEn: 'Lower Austria',
      bundeslandSlug: 'niederoesterreich',
      postalCode: '3300',
      population: 24000,
      description: 'Professionelle Räumung in Amstetten. Schnell und zuverlässig für Wohnungen, Häuser und Gewerbeobjekte.',
      descriptionEn: 'Professional clearing in Amstetten. Fast and reliable for apartments, houses, and commercial properties.',
      metaDescription: 'Räumung Amstetten ✓ Professionell ✓ Wohnungen & Gewerbe ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Amstetten ✓ Professional ✓ Apartments & Commercial ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Hausräumung', 'Geschäftsräumung', 'Kellerräumung'],
      servicesEn: ['Apartment Clearance', 'House Clearance', 'Commercial Clearance', 'Basement Clearing'],
      benefits: [
        'Regionale Expertise im Mostviertel',
        'Schnelle Abwicklung',
        'Besenreine Übergabe',
        'Festpreisgarantie'
      ],
      benefitsEn: [
        'Regional expertise in Mostviertel',
        'Fast processing',
        'Broom-clean handover',
        'Fixed price guarantee'
      ],
      coverage: 'Amstetten und Umgebung im Mostviertel.',
      coverageEn: 'Amstetten and surrounding areas in Mostviertel.',
      faq: [],
      faqEn: []
    },
    {
      name: 'Traiskirchen',
      nameEn: 'Traiskirchen',
      slug: 'traiskirchen',
      bundesland: 'Niederösterreich',
      bundeslandEn: 'Lower Austria',
      bundeslandSlug: 'niederoesterreich',
      postalCode: '2514',
      population: 18000,
      description: 'Räumung in Traiskirchen. Schnelle Anfahrt aus Wien für alle Räumungsarbeiten.',
      descriptionEn: 'Clearing in Traiskirchen. Quick arrival from Vienna for all clearing work.',
      metaDescription: 'Räumung Traiskirchen ✓ Schnelle Anfahrt ✓ Professionell ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Traiskirchen ✓ Quick arrival ✓ Professional ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Hausräumung', 'Kellerräumung'],
      servicesEn: ['Apartment Clearance', 'House Clearance', 'Basement Clearing'],
      benefits: [
        'Sehr kurze Anfahrt aus Wien',
        'Flexible Termine',
        'Transparente Preise',
        'Professionelle Abwicklung'
      ],
      benefitsEn: [
        'Very short travel time from Vienna',
        'Flexible appointments',
        'Transparent prices',
        'Professional processing'
      ],
      coverage: 'Traiskirchen und Umgebung.',
      coverageEn: 'Traiskirchen and surrounding areas.',
      faq: [],
      faqEn: []
    }
  ],
  burgenland: [
    {
      name: 'Eisenstadt',
      nameEn: 'Eisenstadt',
      slug: 'eisenstadt',
      bundesland: 'Burgenland',
      bundeslandEn: 'Burgenland',
      bundeslandSlug: 'burgenland',
      postalCode: '7000',
      population: 15000,
      description: 'Räumung in Eisenstadt, der Landeshauptstadt des Burgenlandes. Professionelle Dienstleistungen für Wohnungen, Häuser und Geschäfte.',
      descriptionEn: 'Clearing services in Eisenstadt, the capital of Burgenland. Professional services for apartments, houses, and commercial properties.',
      metaDescription: 'Räumung Eisenstadt ✓ Burgenland ✓ Wohnungen & Häuser ✓ Professionell ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Eisenstadt ✓ Burgenland ✓ Apartments & Houses ✓ Professional ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Hausräumung', 'Geschäftsräumung', 'Kellerräumung'],
      servicesEn: ['Apartment Clearance', 'House Clearance', 'Commercial Clearance', 'Basement Clearing'],
      benefits: [
        'Kurze Anfahrt aus Wien',
        'Regionale Expertise im Burgenland',
        'Flexible Terminvereinbarung',
        'Faire Festpreise'
      ],
      benefitsEn: [
        'Short travel time from Vienna',
        'Regional expertise in Burgenland',
        'Flexible appointment scheduling',
        'Fair fixed prices'
      ],
      coverage: 'Eisenstadt und gesamtes nördliches Burgenland.',
      coverageEn: 'Eisenstadt and entire northern Burgenland.',
      faq: [
        {
          question: 'Wie schnell können Sie in Eisenstadt sein?',
          answer: 'Von Wien aus erreichen wir Eisenstadt in etwa 45-60 Minuten. Termine können oft schon innerhalb von 24-48 Stunden vereinbart werden.'
        }
      ],
      faqEn: [
        {
          question: 'How quickly can you be in Eisenstadt?',
          answer: 'We reach Eisenstadt from Vienna in about 45-60 minutes. Appointments can often be arranged within 24-48 hours.'
        }
      ]
    },
    {
      name: 'Rust',
      nameEn: 'Rust',
      slug: 'rust',
      bundesland: 'Burgenland',
      bundeslandEn: 'Burgenland',
      bundeslandSlug: 'burgenland',
      postalCode: '7071',
      population: 2000,
      description: 'Räumung in Rust am Neusiedlersee. Spezialisiert auf historische Gebäude in der Freistadt.',
      descriptionEn: 'Clearing in Rust on Lake Neusiedl. Specialized in historic buildings in the free city.',
      metaDescription: 'Räumung Rust ✓ Neusiedlersee ✓ Historische Gebäude ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Rust ✓ Lake Neusiedl ✓ Historic Buildings ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Hausräumung', 'Kellerräumung'],
      servicesEn: ['Apartment Clearance', 'House Clearance', 'Basement Clearing'],
      benefits: [
        'Erfahrung mit historischen Gebäuden',
        'Schonendes Arbeiten',
        'Regionale Präsenz',
        'Diskrete Abwicklung'
      ],
      benefitsEn: [
        'Experience with historic buildings',
        'Careful work',
        'Regional presence',
        'Discreet handling'
      ],
      coverage: 'Rust und Neusiedlersee-Region.',
      coverageEn: 'Rust and Lake Neusiedl region.',
      faq: [],
      faqEn: []
    },
    {
      name: 'Neusiedl am See',
      nameEn: 'Neusiedl am See',
      slug: 'neusiedl-am-see',
      bundesland: 'Burgenland',
      bundeslandEn: 'Burgenland',
      bundeslandSlug: 'burgenland',
      postalCode: '7100',
      population: 8000,
      description: 'Professionelle Räumung in Neusiedl am See und Umgebung.',
      descriptionEn: 'Professional clearing in Neusiedl am See and surrounding areas.',
      metaDescription: 'Räumung Neusiedl am See ✓ Burgenland ✓ Professionell ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Neusiedl am See ✓ Burgenland ✓ Professional ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Hausräumung', 'Kellerräumung'],
      servicesEn: ['Apartment Clearance', 'House Clearance', 'Basement Clearing'],
      benefits: [
        'Regionale Expertise',
        'Schnelle Abwicklung',
        'Faire Preise',
        'Besenreine Übergabe'
      ],
      benefitsEn: [
        'Regional expertise',
        'Fast processing',
        'Fair prices',
        'Broom-clean handover'
      ],
      coverage: 'Neusiedl am See und Seewinkel.',
      coverageEn: 'Neusiedl am See and Seewinkel.',
      faq: [],
      faqEn: []
    },
    {
      name: 'Oberwart',
      nameEn: 'Oberwart',
      slug: 'oberwart',
      bundesland: 'Burgenland',
      bundeslandEn: 'Burgenland',
      bundeslandSlug: 'burgenland',
      postalCode: '7400',
      population: 7000,
      description: 'Räumungsdienste in Oberwart im Südburgenland.',
      descriptionEn: 'Clearing services in Oberwart in southern Burgenland.',
      metaDescription: 'Räumung Oberwart ✓ Südburgenland ✓ Zuverlässig ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Oberwart ✓ Southern Burgenland ✓ Reliable ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Hausräumung', 'Kellerräumung'],
      servicesEn: ['Apartment Clearance', 'House Clearance', 'Basement Clearing'],
      benefits: [
        'Regionale Präsenz im Südburgenland',
        'Flexible Termine',
        'Transparente Preise',
        'Professionelle Abwicklung'
      ],
      benefitsEn: [
        'Regional presence in southern Burgenland',
        'Flexible appointments',
        'Transparent prices',
        'Professional processing'
      ],
      coverage: 'Oberwart und Südburgenland.',
      coverageEn: 'Oberwart and southern Burgenland.',
      faq: [],
      faqEn: []
    }
  ],
  oberoesterreich: [
    {
      name: 'Linz',
      nameEn: 'Linz',
      slug: 'linz',
      bundesland: 'Oberösterreich',
      bundeslandEn: 'Upper Austria',
      bundeslandSlug: 'oberoesterreich',
      postalCode: '4020',
      population: 206000,
      description: 'Professionelle Räumung in Linz, der Landeshauptstadt von Oberösterreich. Schnell, zuverlässig und zu fairen Preisen in allen Stadtteilen.',
      descriptionEn: 'Professional clearing in Linz, the capital of Upper Austria. Fast, reliable, and at fair prices in all districts.',
      metaDescription: 'Räumung Linz ✓ Wohnungsräumung ✓ Haushaltsauflösung ✓ Alle Bezirke ✓ Schnell & professionell ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Linz ✓ Apartment Clearance ✓ Household Dissolution ✓ All Districts ✓ Fast & professional ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Haushaltsauflösung', 'Kellerräumung', 'Geschäftsräumung', 'Dachbodenräumung', 'Transportservice'],
      servicesEn: ['Apartment Clearance', 'Household Dissolution', 'Basement Clearing', 'Commercial Clearance', 'Attic Clearing', 'Transport Service'],
      benefits: [
        'Lokale Präsenz in Linz',
        'Alle Stadtbezirke abgedeckt',
        'Erfahrung mit Altbauten und Neubauten',
        'Flexible Terminvereinbarung',
        'Besenreine Übergabe garantiert'
      ],
      benefitsEn: [
        'Local presence in Linz',
        'All city districts covered',
        'Experience with old and new buildings',
        'Flexible appointment scheduling',
        'Broom-clean handover guaranteed'
      ],
      coverage: 'Alle Stadtteile von Linz - Urfahr, Zentrum, Ebelsberg, Pichling, Pöstlingberg und alle weiteren Bezirke.',
      coverageEn: 'All districts of Linz - Urfahr, Zentrum, Ebelsberg, Pichling, Pöstlingberg and all other districts.',
      faq: [
        {
          question: 'In welchen Stadtteilen von Linz sind Sie tätig?',
          answer: 'Wir arbeiten in allen Stadtteilen von Linz - von Urfahr über das Zentrum bis nach Ebelsberg, Pichling und den Pöstlingberg. Kein Stadtteil ist zu weit.'
        },
        {
          question: 'Wie lange dauert eine Räumung in Linz?',
          answer: 'Eine durchschnittliche 70m² Wohnung räumen wir in 4-6 Stunden. Bei größeren Objekten oder besonderen Anforderungen kann es länger dauern.'
        }
      ],
      faqEn: [
        {
          question: 'In which districts of Linz do you work?',
          answer: 'We work in all districts of Linz - from Urfahr through the center to Ebelsberg, Pichling and Pöstlingberg. No district is too far.'
        },
        {
          question: 'How long does a clearance take in Linz?',
          answer: 'We clear an average 70m² apartment in 4-6 hours. For larger properties or special requirements, it may take longer.'
        }
      ]
    },
    {
      name: 'Wels',
      nameEn: 'Wels',
      slug: 'wels',
      bundesland: 'Oberösterreich',
      bundeslandEn: 'Upper Austria',
      bundeslandSlug: 'oberoesterreich',
      postalCode: '4600',
      population: 62000,
      description: 'Räumung in Wels - professionell, schnell und zuverlässig in der zweitgrößten Stadt Oberösterreichs.',
      descriptionEn: 'Clearing in Wels - professional, fast and reliable in the second-largest city of Upper Austria.',
      metaDescription: 'Räumung Wels ✓ Wohnungsräumung ✓ Hausräumung ✓ Professionell ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Wels ✓ Apartment Clearance ✓ House Clearance ✓ Professional ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Hausräumung', 'Kellerräumung', 'Geschäftsräumung'],
      servicesEn: ['Apartment Clearance', 'House Clearance', 'Basement Clearing', 'Commercial Clearance'],
      benefits: [
        'Regionale Präsenz in Wels',
        'Schnelle Abwicklung',
        'Erfahrung mit Altstadt-Gebäuden',
        'Transparente Festpreise'
      ],
      benefitsEn: [
        'Regional presence in Wels',
        'Fast processing',
        'Experience with old town buildings',
        'Transparent fixed prices'
      ],
      coverage: 'Gesamtes Stadtgebiet Wels.',
      coverageEn: 'Entire city area of Wels.',
      faq: [],
      faqEn: []
    },
    {
      name: 'Steyr',
      nameEn: 'Steyr',
      slug: 'steyr',
      bundesland: 'Oberösterreich',
      bundeslandEn: 'Upper Austria',
      bundeslandSlug: 'oberoesterreich',
      postalCode: '4400',
      population: 38000,
      description: 'Professionelle Räumungsdienste in Steyr. Expertise für historische Gebäude in der Altstadt.',
      descriptionEn: 'Professional clearing services in Steyr. Expertise for historic buildings in the old town.',
      metaDescription: 'Räumung Steyr ✓ Altstadt-Expertise ✓ Professionell ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Steyr ✓ Old Town Expertise ✓ Professional ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Hausräumung', 'Kellerräumung'],
      servicesEn: ['Apartment Clearance', 'House Clearance', 'Basement Clearing'],
      benefits: [
        'Erfahrung mit Altstadt-Gebäuden',
        'Schonendes Arbeiten',
        'Lokale Marktkenntnis',
        'Besenreine Übergabe'
      ],
      benefitsEn: [
        'Experience with old town buildings',
        'Careful work',
        'Local market knowledge',
        'Broom-clean handover'
      ],
      coverage: 'Steyr und Umgebung.',
      coverageEn: 'Steyr and surrounding areas.',
      faq: [],
      faqEn: []
    },
    {
      name: 'Leonding',
      nameEn: 'Leonding',
      slug: 'leonding',
      bundesland: 'Oberösterreich',
      bundeslandEn: 'Upper Austria',
      bundeslandSlug: 'oberoesterreich',
      postalCode: '4060',
      population: 29000,
      description: 'Räumung in Leonding bei Linz. Schnelle Anfahrt, professioneller Service.',
      descriptionEn: 'Clearing in Leonding near Linz. Quick arrival, professional service.',
      metaDescription: 'Räumung Leonding ✓ Bei Linz ✓ Schnell & zuverlässig ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Leonding ✓ Near Linz ✓ Fast & reliable ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Hausräumung', 'Kellerräumung'],
      servicesEn: ['Apartment Clearance', 'House Clearance', 'Basement Clearing'],
      benefits: [
        'Sehr schnelle Anfahrt aus Linz',
        'Flexible Termine',
        'Faire Preise',
        'Professionelle Abwicklung'
      ],
      benefitsEn: [
        'Very quick arrival from Linz',
        'Flexible appointments',
        'Fair prices',
        'Professional processing'
      ],
      coverage: 'Leonding und angrenzende Gemeinden.',
      coverageEn: 'Leonding and adjacent municipalities.',
      faq: [],
      faqEn: []
    }
  ],
  salzburg: [
    {
      name: 'Salzburg',
      nameEn: 'Salzburg',
      slug: 'salzburg',
      bundesland: 'Salzburg',
      bundeslandEn: 'Salzburg',
      bundeslandSlug: 'salzburg',
      postalCode: '5020',
      population: 156000,
      description: 'Professionelle Räumung in der Stadt Salzburg. Von der Altstadt bis zu den modernen Stadtteilen - wir sind Ihr Partner für alle Räumungsarbeiten.',
      descriptionEn: 'Professional clearing in the city of Salzburg. From the old town to modern districts - we are your partner for all clearing work.',
      metaDescription: 'Räumung Salzburg ✓ Altstadt ✓ Alle Bezirke ✓ Professionell & diskret ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Salzburg ✓ Old Town ✓ All Districts ✓ Professional & discreet ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Haushaltsauflösung', 'Kellerräumung', 'Geschäftsräumung', 'Dachbodenräumung'],
      servicesEn: ['Apartment Clearance', 'Household Dissolution', 'Basement Clearing', 'Commercial Clearance', 'Attic Clearing'],
      benefits: [
        'Erfahrung mit denkmalgeschützten Gebäuden',
        'Diskrete Abwicklung in der Altstadt',
        'Alle Stadtteile abgedeckt',
        'Flexible Terminvereinbarung',
        'Besenreine Übergabe'
      ],
      benefitsEn: [
        'Experience with listed buildings',
        'Discreet handling in the old town',
        'All districts covered',
        'Flexible appointment scheduling',
        'Broom-clean handover'
      ],
      coverage: 'Alle Stadtteile - Altstadt, Neustadt, Maxglan, Gnigl, Lehen und alle weiteren Bezirke.',
      coverageEn: 'All districts - Altstadt, Neustadt, Maxglan, Gnigl, Lehen and all other districts.',
      faq: [
        {
          question: 'Können Sie auch in der Salzburger Altstadt räumen?',
          answer: 'Ja, wir haben umfangreiche Erfahrung mit engen Gassen und denkmalgeschützten Gebäuden in der Altstadt. Wir arbeiten besonders schonend und diskret.'
        }
      ],
      faqEn: [
        {
          question: 'Can you also clear in the Salzburg old town?',
          answer: 'Yes, we have extensive experience with narrow streets and listed buildings in the old town. We work with particular care and discretion.'
        }
      ]
    },
    {
      name: 'Hallein',
      nameEn: 'Hallein',
      slug: 'hallein',
      bundesland: 'Salzburg',
      bundeslandEn: 'Salzburg',
      bundeslandSlug: 'salzburg',
      postalCode: '5400',
      population: 21000,
      description: 'Räumungsdienste in Hallein im Tennengau.',
      descriptionEn: 'Clearing services in Hallein in the Tennengau region.',
      metaDescription: 'Räumung Hallein ✓ Tennengau ✓ Professionell ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Hallein ✓ Tennengau ✓ Professional ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Hausräumung', 'Kellerräumung'],
      servicesEn: ['Apartment Clearance', 'House Clearance', 'Basement Clearing'],
      benefits: [
        'Regionale Präsenz im Tennengau',
        'Schnelle Abwicklung',
        'Faire Preise',
        'Besenreine Übergabe'
      ],
      benefitsEn: [
        'Regional presence in Tennengau',
        'Fast processing',
        'Fair prices',
        'Broom-clean handover'
      ],
      coverage: 'Hallein und Tennengau.',
      coverageEn: 'Hallein and Tennengau region.',
      faq: [],
      faqEn: []
    },
    {
      name: 'Saalfelden',
      nameEn: 'Saalfelden',
      slug: 'saalfelden',
      bundesland: 'Salzburg',
      bundeslandEn: 'Salzburg',
      bundeslandSlug: 'salzburg',
      postalCode: '5760',
      population: 16000,
      description: 'Professionelle Räumung in Saalfelden im Pinzgau.',
      descriptionEn: 'Professional clearing in Saalfelden in the Pinzgau region.',
      metaDescription: 'Räumung Saalfelden ✓ Pinzgau ✓ Zuverlässig ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Saalfelden ✓ Pinzgau ✓ Reliable ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Hausräumung', 'Kellerräumung'],
      servicesEn: ['Apartment Clearance', 'House Clearance', 'Basement Clearing'],
      benefits: [
        'Regionale Expertise im Pinzgau',
        'Flexible Termine',
        'Transparente Preise',
        'Professionelle Abwicklung'
      ],
      benefitsEn: [
        'Regional expertise in Pinzgau',
        'Flexible appointments',
        'Transparent prices',
        'Professional processing'
      ],
      coverage: 'Saalfelden und Pinzgau-Region.',
      coverageEn: 'Saalfelden and Pinzgau region.',
      faq: [],
      faqEn: []
    }
  ],
  tirol: [
    {
      name: 'Innsbruck',
      nameEn: 'Innsbruck',
      slug: 'innsbruck',
      bundesland: 'Tirol',
      bundeslandEn: 'Tyrol',
      bundeslandSlug: 'tirol',
      postalCode: '6020',
      population: 132000,
      description: 'Professionelle Räumung in Innsbruck, der Landeshauptstadt von Tirol. Schnell und zuverlässig in allen Stadtteilen.',
      descriptionEn: 'Professional clearing in Innsbruck, the capital of Tyrol. Fast and reliable in all districts.',
      metaDescription: 'Räumung Innsbruck ✓ Alle Stadtteile ✓ Altstadt-Expertise ✓ Professionell ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Innsbruck ✓ All Districts ✓ Old Town Expertise ✓ Professional ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Haushaltsauflösung', 'Kellerräumung', 'Geschäftsräumung', 'Dachbodenräumung'],
      servicesEn: ['Apartment Clearance', 'Household Dissolution', 'Basement Clearing', 'Commercial Clearance', 'Attic Clearing'],
      benefits: [
        'Lokale Präsenz in Innsbruck',
        'Erfahrung mit Altstadtgebäuden',
        'Alle Stadtbezirke abgedeckt',
        'Besenreine Übergabe',
        'Flexible Termine'
      ],
      benefitsEn: [
        'Local presence in Innsbruck',
        'Experience with old town buildings',
        'All city districts covered',
        'Broom-clean handover',
        'Flexible appointments'
      ],
      coverage: 'Alle Stadtteile von Innsbruck - Altstadt, Wilten, Hötting, Pradl und alle weiteren Bezirke.',
      coverageEn: 'All districts of Innsbruck - Altstadt, Wilten, Hötting, Pradl and all other districts.',
      faq: [
        {
          question: 'Arbeiten Sie auch in der engen Altstadt von Innsbruck?',
          answer: 'Ja, wir haben große Erfahrung mit den engen Gassen und historischen Gebäuden der Innsbrucker Altstadt. Wir arbeiten schonend und mit spezieller Ausrüstung.'
        }
      ],
      faqEn: [
        {
          question: 'Do you also work in the narrow old town of Innsbruck?',
          answer: 'Yes, we have extensive experience with the narrow streets and historic buildings of the Innsbruck old town. We work carefully and with special equipment.'
        }
      ]
    },
    {
      name: 'Kufstein',
      nameEn: 'Kufstein',
      slug: 'kufstein',
      bundesland: 'Tirol',
      bundeslandEn: 'Tyrol',
      bundeslandSlug: 'tirol',
      postalCode: '6330',
      population: 19000,
      description: 'Räumung in Kufstein. Professionelle Dienstleistungen im Tiroler Unterland.',
      descriptionEn: 'Clearing in Kufstein. Professional services in the Tyrolean Unterland.',
      metaDescription: 'Räumung Kufstein ✓ Tiroler Unterland ✓ Professionell ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Kufstein ✓ Tyrolean Unterland ✓ Professional ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Hausräumung', 'Kellerräumung'],
      servicesEn: ['Apartment Clearance', 'House Clearance', 'Basement Clearing'],
      benefits: [
        'Regionale Präsenz im Unterland',
        'Schnelle Abwicklung',
        'Faire Preise',
        'Besenreine Übergabe'
      ],
      benefitsEn: [
        'Regional presence in Unterland',
        'Fast processing',
        'Fair prices',
        'Broom-clean handover'
      ],
      coverage: 'Kufstein und Umgebung.',
      coverageEn: 'Kufstein and surrounding areas.',
      faq: [],
      faqEn: []
    },
    {
      name: 'Wörgl',
      nameEn: 'Wörgl',
      slug: 'woergl',
      bundesland: 'Tirol',
      bundeslandEn: 'Tyrol',
      bundeslandSlug: 'tirol',
      postalCode: '6300',
      population: 14000,
      description: 'Professionelle Räumungsdienste in Wörgl.',
      descriptionEn: 'Professional clearing services in Wörgl.',
      metaDescription: 'Räumung Wörgl ✓ Tirol ✓ Zuverlässig ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Wörgl ✓ Tyrol ✓ Reliable ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Hausräumung', 'Kellerräumung'],
      servicesEn: ['Apartment Clearance', 'House Clearance', 'Basement Clearing'],
      benefits: [
        'Regionale Expertise',
        'Flexible Termine',
        'Transparente Preise',
        'Professionelle Abwicklung'
      ],
      benefitsEn: [
        'Regional expertise',
        'Flexible appointments',
        'Transparent prices',
        'Professional processing'
      ],
      coverage: 'Wörgl und Tiroler Unterland.',
      coverageEn: 'Wörgl and Tyrolean Unterland.',
      faq: [],
      faqEn: []
    }
  ],
  vorarlberg: [
    {
      name: 'Bregenz',
      nameEn: 'Bregenz',
      slug: 'bregenz',
      bundesland: 'Vorarlberg',
      bundeslandEn: 'Vorarlberg',
      bundeslandSlug: 'vorarlberg',
      postalCode: '6900',
      population: 30000,
      description: 'Professionelle Räumung in Bregenz am Bodensee. Landeshauptstadt von Vorarlberg.',
      descriptionEn: 'Professional clearing in Bregenz on Lake Constance. Capital of Vorarlberg.',
      metaDescription: 'Räumung Bregenz ✓ Bodensee ✓ Vorarlberg ✓ Professionell ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Bregenz ✓ Lake Constance ✓ Vorarlberg ✓ Professional ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Haushaltsauflösung', 'Kellerräumung', 'Geschäftsräumung'],
      servicesEn: ['Apartment Clearance', 'Household Dissolution', 'Basement Clearing', 'Commercial Clearance'],
      benefits: [
        'Lokale Präsenz in Vorarlberg',
        'Erfahrung mit Seeanrainern',
        'Flexible Terminvereinbarung',
        'Besenreine Übergabe'
      ],
      benefitsEn: [
        'Local presence in Vorarlberg',
        'Experience with lakefront properties',
        'Flexible appointment scheduling',
        'Broom-clean handover'
      ],
      coverage: 'Bregenz und Bodensee-Region.',
      coverageEn: 'Bregenz and Lake Constance region.',
      faq: [],
      faqEn: []
    },
    {
      name: 'Dornbirn',
      nameEn: 'Dornbirn',
      slug: 'dornbirn',
      bundesland: 'Vorarlberg',
      bundeslandEn: 'Vorarlberg',
      bundeslandSlug: 'vorarlberg',
      postalCode: '6850',
      population: 50000,
      description: 'Räumung in Dornbirn, der größten Stadt Vorarlbergs.',
      descriptionEn: 'Clearing in Dornbirn, the largest city in Vorarlberg.',
      metaDescription: 'Räumung Dornbirn ✓ Vorarlberg ✓ Professionell ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Dornbirn ✓ Vorarlberg ✓ Professional ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Hausräumung', 'Kellerräumung', 'Geschäftsräumung'],
      servicesEn: ['Apartment Clearance', 'House Clearance', 'Basement Clearing', 'Commercial Clearance'],
      benefits: [
        'Regionale Präsenz',
        'Schnelle Abwicklung',
        'Faire Preise',
        'Besenreine Übergabe'
      ],
      benefitsEn: [
        'Regional presence',
        'Fast processing',
        'Fair prices',
        'Broom-clean handover'
      ],
      coverage: 'Dornbirn und Rheintal.',
      coverageEn: 'Dornbirn and Rheintal valley.',
      faq: [],
      faqEn: []
    },
    {
      name: 'Feldkirch',
      nameEn: 'Feldkirch',
      slug: 'feldkirch',
      bundesland: 'Vorarlberg',
      bundeslandEn: 'Vorarlberg',
      bundeslandSlug: 'vorarlberg',
      postalCode: '6800',
      population: 35000,
      description: 'Professionelle Räumungsdienste in Feldkirch.',
      descriptionEn: 'Professional clearing services in Feldkirch.',
      metaDescription: 'Räumung Feldkirch ✓ Vorarlberg ✓ Zuverlässig ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Feldkirch ✓ Vorarlberg ✓ Reliable ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Hausräumung', 'Kellerräumung'],
      servicesEn: ['Apartment Clearance', 'House Clearance', 'Basement Clearing'],
      benefits: [
        'Regionale Expertise',
        'Erfahrung mit Altstadt',
        'Flexible Termine',
        'Transparente Preise'
      ],
      benefitsEn: [
        'Regional expertise',
        'Experience with old town',
        'Flexible appointments',
        'Transparent prices'
      ],
      coverage: 'Feldkirch und Umgebung.',
      coverageEn: 'Feldkirch and surrounding areas.',
      faq: [],
      faqEn: []
    }
  ],
  kaernten: [
    {
      name: 'Klagenfurt',
      nameEn: 'Klagenfurt',
      slug: 'klagenfurt',
      bundesland: 'Kärnten',
      bundeslandEn: 'Carinthia',
      bundeslandSlug: 'kaernten',
      postalCode: '9020',
      population: 101000,
      description: 'Professionelle Räumung in Klagenfurt am Wörthersee, der Landeshauptstadt von Kärnten.',
      descriptionEn: 'Professional clearing in Klagenfurt on Lake Wörthersee, the capital of Carinthia.',
      metaDescription: 'Räumung Klagenfurt ✓ Wörthersee ✓ Alle Stadtteile ✓ Professionell ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Klagenfurt ✓ Lake Wörthersee ✓ All Districts ✓ Professional ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Haushaltsauflösung', 'Kellerräumung', 'Geschäftsräumung', 'Dachbodenräumung'],
      servicesEn: ['Apartment Clearance', 'Household Dissolution', 'Basement Clearing', 'Commercial Clearance', 'Attic Clearing'],
      benefits: [
        'Lokale Präsenz in Kärnten',
        'Alle Stadtteile abgedeckt',
        'Erfahrung mit Seeliegenschaften',
        'Flexible Termine',
        'Besenreine Übergabe'
      ],
      benefitsEn: [
        'Local presence in Carinthia',
        'All districts covered',
        'Experience with lakefront properties',
        'Flexible appointments',
        'Broom-clean handover'
      ],
      coverage: 'Alle Stadtteile von Klagenfurt und Wörthersee-Region.',
      coverageEn: 'All districts of Klagenfurt and Lake Wörthersee region.',
      faq: [],
      faqEn: []
    },
    {
      name: 'Villach',
      nameEn: 'Villach',
      slug: 'villach',
      bundesland: 'Kärnten',
      bundeslandEn: 'Carinthia',
      bundeslandSlug: 'kaernten',
      postalCode: '9500',
      population: 63000,
      description: 'Räumung in Villach, der zweitgrößten Stadt Kärntens.',
      descriptionEn: 'Clearing in Villach, the second-largest city in Carinthia.',
      metaDescription: 'Räumung Villach ✓ Kärnten ✓ Professionell ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Villach ✓ Carinthia ✓ Professional ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Hausräumung', 'Kellerräumung', 'Geschäftsräumung'],
      servicesEn: ['Apartment Clearance', 'House Clearance', 'Basement Clearing', 'Commercial Clearance'],
      benefits: [
        'Regionale Präsenz',
        'Schnelle Abwicklung',
        'Faire Preise',
        'Besenreine Übergabe'
      ],
      benefitsEn: [
        'Regional presence',
        'Fast processing',
        'Fair prices',
        'Broom-clean handover'
      ],
      coverage: 'Villach und Umgebung.',
      coverageEn: 'Villach and surrounding areas.',
      faq: [],
      faqEn: []
    },
    {
      name: 'Wolfsberg',
      nameEn: 'Wolfsberg',
      slug: 'wolfsberg',
      bundesland: 'Kärnten',
      bundeslandEn: 'Carinthia',
      bundeslandSlug: 'kaernten',
      postalCode: '9400',
      population: 25000,
      description: 'Professionelle Räumungsdienste in Wolfsberg im Lavanttal.',
      descriptionEn: 'Professional clearing services in Wolfsberg in the Lavanttal valley.',
      metaDescription: 'Räumung Wolfsberg ✓ Lavanttal ✓ Zuverlässig ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Wolfsberg ✓ Lavanttal ✓ Reliable ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Hausräumung', 'Kellerräumung'],
      servicesEn: ['Apartment Clearance', 'House Clearance', 'Basement Clearing'],
      benefits: [
        'Regionale Expertise im Lavanttal',
        'Flexible Termine',
        'Transparente Preise',
        'Professionelle Abwicklung'
      ],
      benefitsEn: [
        'Regional expertise in Lavanttal',
        'Flexible appointments',
        'Transparent prices',
        'Professional processing'
      ],
      coverage: 'Wolfsberg und Lavanttal.',
      coverageEn: 'Wolfsberg and Lavanttal valley.',
      faq: [],
      faqEn: []
    }
  ],
  steiermark: [
    {
      name: 'Graz',
      nameEn: 'Graz',
      slug: 'graz',
      bundesland: 'Steiermark',
      bundeslandEn: 'Styria',
      bundeslandSlug: 'steiermark',
      postalCode: '8010',
      population: 291000,
      description: 'Professionelle Räumung in Graz, der Landeshauptstadt der Steiermark. Schnell, zuverlässig und professionell in allen Bezirken.',
      descriptionEn: 'Professional clearing in Graz, the capital of Styria. Fast, reliable and professional in all districts.',
      metaDescription: 'Räumung Graz ✓ Alle Bezirke ✓ Altstadt-Expertise ✓ Professionell & diskret ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Graz ✓ All Districts ✓ Old Town Expertise ✓ Professional & discreet ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Haushaltsauflösung', 'Kellerräumung', 'Geschäftsräumung', 'Dachbodenräumung', 'Transportservice'],
      servicesEn: ['Apartment Clearance', 'Household Dissolution', 'Basement Clearing', 'Commercial Clearance', 'Attic Clearing', 'Transport Service'],
      benefits: [
        'Lokale Präsenz in Graz',
        'Alle Stadtbezirke abgedeckt',
        'Erfahrung mit Altstadtgebäuden',
        'Flexible Terminvereinbarung',
        'Besenreine Übergabe garantiert'
      ],
      benefitsEn: [
        'Local presence in Graz',
        'All city districts covered',
        'Experience with old town buildings',
        'Flexible appointment scheduling',
        'Broom-clean handover guaranteed'
      ],
      coverage: 'Alle Stadtbezirke von Graz - Innere Stadt, Gries, Lend, Jakomini, Liebenau, St. Peter und alle weiteren Bezirke.',
      coverageEn: 'All city districts of Graz - Innere Stadt, Gries, Lend, Jakomini, Liebenau, St. Peter and all other districts.',
      faq: [
        {
          question: 'In welchen Bezirken von Graz sind Sie tätig?',
          answer: 'Wir arbeiten in allen 17 Bezirken von Graz - von der Altstadt über Gries und Lend bis nach St. Peter, Liebenau und Andritz. Kein Bezirk ist zu weit.'
        }
      ],
      faqEn: [
        {
          question: 'In which districts of Graz do you work?',
          answer: 'We work in all 17 districts of Graz - from the old town through Gries and Lend to St. Peter, Liebenau and Andritz. No district is too far.'
        }
      ]
    },
    {
      name: 'Leoben',
      nameEn: 'Leoben',
      slug: 'leoben',
      bundesland: 'Steiermark',
      bundeslandEn: 'Styria',
      bundeslandSlug: 'steiermark',
      postalCode: '8700',
      population: 25000,
      description: 'Räumung in Leoben in der Obersteiermark.',
      descriptionEn: 'Clearing in Leoben in Upper Styria.',
      metaDescription: 'Räumung Leoben ✓ Obersteiermark ✓ Professionell ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Leoben ✓ Upper Styria ✓ Professional ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Hausräumung', 'Kellerräumung'],
      servicesEn: ['Apartment Clearance', 'House Clearance', 'Basement Clearing'],
      benefits: [
        'Regionale Präsenz in der Obersteiermark',
        'Schnelle Abwicklung',
        'Faire Preise',
        'Besenreine Übergabe'
      ],
      benefitsEn: [
        'Regional presence in Upper Styria',
        'Fast processing',
        'Fair prices',
        'Broom-clean handover'
      ],
      coverage: 'Leoben und Mur-Mürz-Furche.',
      coverageEn: 'Leoben and Mur-Mürz-Furche region.',
      faq: [],
      faqEn: []
    },
    {
      name: 'Kapfenberg',
      nameEn: 'Kapfenberg',
      slug: 'kapfenberg',
      bundesland: 'Steiermark',
      bundeslandEn: 'Styria',
      bundeslandSlug: 'steiermark',
      postalCode: '8605',
      population: 22000,
      description: 'Professionelle Räumungsdienste in Kapfenberg.',
      descriptionEn: 'Professional clearing services in Kapfenberg.',
      metaDescription: 'Räumung Kapfenberg ✓ Steiermark ✓ Zuverlässig ☎ +43 660 6926375',
      metaDescriptionEn: 'Clearing Kapfenberg ✓ Styria ✓ Reliable ☎ +43 660 6926375',
      services: ['Wohnungsräumung', 'Hausräumung', 'Kellerräumung'],
      servicesEn: ['Apartment Clearance', 'House Clearance', 'Basement Clearing'],
      benefits: [
        'Regionale Expertise',
        'Flexible Termine',
        'Transparente Preise',
        'Professionelle Abwicklung'
      ],
      benefitsEn: [
        'Regional expertise',
        'Flexible appointments',
        'Transparent prices',
        'Professional processing'
      ],
      coverage: 'Kapfenberg und Umgebung.',
      coverageEn: 'Kapfenberg and surrounding areas.',
      faq: [],
      faqEn: []
    }
  ]
};

export function getCitiesByBundesland(bundeslandSlug: string): CityInfo[] {
  return cities[bundeslandSlug] || [];
}

export function getAllCities(): CityInfo[] {
  return Object.values(cities).flat();
}

export function getCityBySlug(bundeslandSlug: string, citySlug: string): CityInfo | undefined {
  const bundeslandCities = getCitiesByBundesland(bundeslandSlug);
  return bundeslandCities.find(city => city.slug === citySlug);
}
