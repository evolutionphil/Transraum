export interface FAQ {
  question: string;
  answer: string;
}

export interface State {
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  detailedIntro: string;
  detailedIntroEn: string;
  metaDescription: string;
  metaDescriptionEn: string;
  features: string[];
  featuresEn: string[];
  cities: string[];
  citiesEn: string[];
  whyChooseUs: string[];
  whyChooseUsEn: string[];
  faqs: FAQ[];
  faqsEn: FAQ[];
  image?: string;
}

export const states: State[] = [
  {
    slug: 'wien',
    name: 'Wien',
    nameEn: 'Vienna',
    description: 'Professionelle Räumung und Räumung in Wien. Als lokales Unternehmen kennen wir alle 23 Bezirke und bieten schnelle, zuverlässige Dienstleistungen in der gesamten Bundeshauptstadt.',
    descriptionEn: 'Professional clearing and removal services in Vienna. As a local company, we know all 23 districts and offer fast, reliable services throughout the federal capital.',
    detailedIntro: 'Wien, die Bundeshauptstadt Österreichs, stellt besondere Anforderungen an Räumungs- und Räumungsdienste. Mit über 1,9 Millionen Einwohnern und einer Vielzahl von Altbauwohnungen, modernen Gebäuden und historischen Immobilien benötigen Sie einen Partner, der sowohl Erfahrung als auch lokales Know-how mitbringt. Transraum ist seit vielen Jahren in allen 23 Wiener Bezirken tätig und kennt die spezifischen Herausforderungen der Bundeshauptstadt. Ob enge Stiegenhäuser in Gründerzeithäusern, Parkplatzmangel in dicht bebauten Innenbezirken oder zeitkritische Räumungen - unser erfahrenes Team meistert jede Situation professionell und effizient.',
    detailedIntroEn: 'Vienna, Austria\'s federal capital, presents unique challenges for clearing and removal services. With over 1.9 million inhabitants and numerous historic buildings, modern structures, and period properties, you need a partner with both experience and local expertise. Transraum has been operating in all 23 Vienna districts for many years and understands the specific challenges of the capital. Whether narrow stairwells in historic buildings, parking shortages in densely built inner districts, or time-critical clearances - our experienced team handles every situation professionally and efficiently.',
    metaDescription: 'Räumung Wien - Schnelle & professionelle Räumung in allen 23 Bezirken. Kostenlose Besichtigung ✓ Faire Preise ✓ Räumung inklusive.',
    metaDescriptionEn: 'Clearing Services Vienna - Fast & professional removal in all 23 districts. Free consultation ✓ Fair prices ✓ Clearing included.',
    features: [
      'Alle 23 Wiener Bezirke',
      'Same-Day Service verfügbar',
      'Lokales Team mit Wiener Expertise',
      'Räumung, Transport & Verwertung',
      'Erfahrung mit Altbauwohnungen',
      'Flexible Parklösungen',
    ],
    featuresEn: [
      'All 23 Vienna districts',
      'Same-day service available',
      'Local team with Vienna expertise',
      'Clearing, transport & recycling',
      'Experience with historic buildings',
      'Flexible parking solutions',
    ],
    cities: [
      '1. Bezirk - Innere Stadt',
      '2. Bezirk - Leopoldstadt',
      '3. Bezirk - Landstraße',
      '10. Bezirk - Favoriten',
      '21. Bezirk - Floridsdorf',
      '22. Bezirk - Donaustadt',
      'und alle weiteren Wiener Bezirke',
    ],
    citiesEn: [
      '1st District - Inner City',
      '2nd District - Leopoldstadt',
      '3rd District - Landstraße',
      '10th District - Favoriten',
      '21st District - Floridsdorf',
      '22nd District - Donaustadt',
      'and all other Vienna districts',
    ],
    whyChooseUs: [
      'Über 26 Jahre Erfahrung in Wien',
      'Kenntnis aller 23 Bezirke und ihrer Besonderheiten',
      'Schnelle Anfahrt innerhalb von 30-60 Minuten',
      'Same-Day Service bei dringenden Aufträgen',
      'Erfahrung mit denkmalgeschützten Gebäuden',
      'Enge Zusammenarbeit mit Wiener Verwertungsbetrieben',
      'Faire, transparente Preisgestaltung',
      'Kostenlose Besichtigung und Beratung vor Ort',
    ],
    whyChooseUsEn: [
      'Over 26 years of experience in Vienna',
      'Knowledge of all 23 districts and their specifics',
      'Quick arrival within 30-60 minutes',
      'Same-day service for urgent orders',
      'Experience with listed buildings',
      'Close cooperation with Vienna waste management',
      'Fair, transparent pricing',
      'Free on-site consultation and assessment',
    ],
    faqs: [
      {
        question: 'Wie schnell können Sie in Wien vor Ort sein?',
        answer: 'In den meisten Fällen können wir innerhalb von 30-60 Minuten bei Ihnen sein. Bei Same-Day Service oft noch am selben Tag.'
      },
      {
        question: 'Arbeiten Sie in allen Wiener Bezirken?',
        answer: 'Ja, wir sind in allen 23 Wiener Bezirken tätig - von der Inneren Stadt bis nach Liesing, von Hietzing bis zur Donaustadt.'
      },
      {
        question: 'Wie handhaben Sie das Parkproblem in Wien?',
        answer: 'Wir kennen die Parkplatzsituation in jedem Bezirk und organisieren im Vorfeld die notwendigen Halteverbotszonen oder nutzen alternative Lösungen.'
      },
      {
        question: 'Können Sie auch Altbauwohnungen räumen?',
        answer: 'Absolut! Wir haben umfangreiche Erfahrung mit Altbauwohnungen, engen Stiegenhäusern und denkmalgeschützten Gebäuden in Wien.'
      },
      {
        question: 'Was kostet eine Räumung in Wien?',
        answer: 'Die Kosten hängen von Umfang, Bezirk und Aufwand ab. Wir bieten eine kostenlose Besichtigung und erstellen Ihnen ein transparentes, faires Angebot.'
      },
    ],
    faqsEn: [
      {
        question: 'How quickly can you be on-site in Vienna?',
        answer: 'In most cases, we can be with you within 30-60 minutes. For same-day service, often on the same day.'
      },
      {
        question: 'Do you work in all Vienna districts?',
        answer: 'Yes, we operate in all 23 Vienna districts - from the Inner City to Liesing, from Hietzing to Donaustadt.'
      },
      {
        question: 'How do you handle the parking problem in Vienna?',
        answer: 'We know the parking situation in every district and organize necessary parking bans in advance or use alternative solutions.'
      },
      {
        question: 'Can you also clear historic apartments?',
        answer: 'Absolutely! We have extensive experience with historic apartments, narrow stairwells, and listed buildings in Vienna.'
      },
      {
        question: 'What does clearing cost in Vienna?',
        answer: 'Costs depend on scope, district, and effort. We offer a free consultation and provide you with a transparent, fair quote.'
      },
    ],
  },
  {
    slug: 'niederoesterreich',
    name: 'Niederösterreich',
    nameEn: 'Lower Austria',
    description: 'Zuverlässige Räumung und Räumung in ganz Niederösterreich. Von St. Pölten bis ins Waldviertel - wir sind in der gesamten Region für Sie da.',
    descriptionEn: 'Reliable clearing and removal services throughout Lower Austria. From St. Pölten to the Waldviertel - we are there for you across the entire region.',
    detailedIntro: 'Niederösterreich ist das flächenmäßig größte Bundesland Österreichs und umfasst sowohl dicht besiedelte Gebiete rund um Wien als auch ländliche Regionen im Waldviertel, Weinviertel, Mostviertel und Industrieviertel. Diese Vielfalt erfordert flexible Lösungen und umfassende Erfahrung. Transraum bietet professionelle Räumungs- und Räumungsdienste im gesamten Bundesland an - von der Landeshauptstadt St. Pölten über Wiener Neustadt und Baden bis in die entlegensten Gemeinden. Unser Team ist bestens mit den regionalen Gegebenheiten vertraut und passt sich an die jeweiligen Anforderungen an, sei es eine Wohnungsauflösung in der Stadt oder eine Hofräumung am Land.',
    detailedIntroEn: 'Lower Austria is Austria\'s largest federal state by area and includes both densely populated areas around Vienna and rural regions in the Waldviertel, Weinviertel, Mostviertel, and Industrieviertel. This diversity requires flexible solutions and comprehensive experience. Transraum offers professional clearing and removal services throughout the state - from the capital St. Pölten via Wiener Neustadt and Baden to the most remote municipalities. Our team is well familiar with regional conditions and adapts to respective requirements, whether an apartment dissolution in the city or a farm clearing in the countryside.',
    metaDescription: 'Räumung Niederösterreich - Professionelle Räumung in ganz NÖ. St. Pölten, Wiener Neustadt, Waldviertel ✓ Kostenlose Besichtigung.',
    metaDescriptionEn: 'Clearing Lower Austria - Professional removal throughout NÖ. St. Pölten, Wiener Neustadt, Waldviertel ✓ Free consultation.',
    features: [
      'Gesamtes Niederösterreich abgedeckt',
      'Schnelle Anfahrt aus Wien',
      'Ländliche und städtische Gebiete',
      'Flexible Terminvereinbarung',
      'Erfahrung mit Hofräumungen',
      'Landwirtschaftliche Objekte',
    ],
    featuresEn: [
      'All of Lower Austria covered',
      'Quick access from Vienna',
      'Rural and urban areas',
      'Flexible scheduling',
      'Experience with farm clearances',
      'Agricultural properties',
    ],
    cities: [
      'St. Pölten',
      'Wiener Neustadt',
      'Baden',
      'Amstetten',
      'Krems an der Donau',
      'Klosterneuburg',
      'Mödling',
      'Tulln',
      'Waldviertel',
      'Weinviertel',
      'Mostviertel',
      'Industrieviertel',
    ],
    citiesEn: [
      'St. Pölten',
      'Wiener Neustadt',
      'Baden',
      'Amstetten',
      'Krems an der Donau',
      'Klosterneuburg',
      'Mödling',
      'Tulln',
      'Waldviertel',
      'Weinviertel',
      'Mostviertel',
      'Industrieviertel',
    ],
    whyChooseUs: [
      'Flächendeckender Service in ganz Niederösterreich',
      'Kurze Anfahrtszeiten aus Wien',
      'Erfahrung mit ländlichen und städtischen Objekten',
      'Spezialisierung auf Hofräumungen und landwirtschaftliche Gebäude',
      'Kenntnis der regionalen Verwertungsmöglichkeiten',
      'Flexible Termingestaltung auch an Wochenenden',
      'Faire Kilometerpreise ohne Aufschläge',
      'Zusammenarbeit mit lokalen Verwertungsbetrieben',
    ],
    whyChooseUsEn: [
      'Comprehensive service throughout Lower Austria',
      'Short travel times from Vienna',
      'Experience with rural and urban properties',
      'Specialization in farm clearances and agricultural buildings',
      'Knowledge of regional recycling facilities',
      'Flexible scheduling including weekends',
      'Fair mileage rates without surcharges',
      'Cooperation with local recycling companies',
    ],
    faqs: [
      {
        question: 'Fahren Sie auch in entlegene Regionen Niederösterreichs?',
        answer: 'Ja, wir decken ganz Niederösterreich ab - vom Waldviertel bis zum Industrieviertel, vom Weinviertel bis zum Mostviertel.'
      },
      {
        question: 'Können Sie auch landwirtschaftliche Gebäude räumen?',
        answer: 'Selbstverständlich! Wir haben umfangreiche Erfahrung mit Hofräumungen, Scheunen, Ställen und anderen landwirtschaftlichen Objekten.'
      },
      {
        question: 'Wie lange brauchen Sie von Wien nach Niederösterreich?',
        answer: 'Je nach Region zwischen 30 Minuten und 2 Stunden. Die genaue Anfahrtszeit klären wir bei der Terminvereinbarung.'
      },
      {
        question: 'Berechnen Sie Anfahrtskosten?',
        answer: 'Die Anfahrtskosten werden fair und transparent in unser Angebot einberechnet - keine versteckten Kosten oder Überraschungen.'
      },
      {
        question: 'Arbeiten Sie auch am Wochenende?',
        answer: 'Ja, wir bieten flexible Termine auch an Samstagen und nach Vereinbarung auch an Sonn- und Feiertagen an.'
      },
    ],
    faqsEn: [
      {
        question: 'Do you also travel to remote regions of Lower Austria?',
        answer: 'Yes, we cover all of Lower Austria - from Waldviertel to Industrieviertel, from Weinviertel to Mostviertel.'
      },
      {
        question: 'Can you also clear agricultural buildings?',
        answer: 'Of course! We have extensive experience with farm clearances, barns, stables, and other agricultural properties.'
      },
      {
        question: 'How long does it take from Vienna to Lower Austria?',
        answer: 'Depending on the region, between 30 minutes and 2 hours. We clarify the exact travel time when scheduling the appointment.'
      },
      {
        question: 'Do you charge travel costs?',
        answer: 'Travel costs are fairly and transparently included in our quote - no hidden costs or surprises.'
      },
      {
        question: 'Do you also work on weekends?',
        answer: 'Yes, we offer flexible appointments on Saturdays and by arrangement also on Sundays and public holidays.'
      },
    ],
  },
  {
    slug: 'oberoesterreich',
    name: 'Oberösterreich',
    nameEn: 'Upper Austria',
    description: 'Professionelle Räumung und Räumung in Oberösterreich. Linz, Wels, Steyr und Umgebung - schneller Service in der gesamten Region.',
    descriptionEn: 'Professional clearing and removal in Upper Austria. Linz, Wels, Steyr and surroundings - fast service throughout the region.',
    detailedIntro: 'Oberösterreich ist das wirtschaftliche Herzstück Österreichs mit einer Mischung aus Industriestandorten, historischen Städten und ländlichen Regionen. Von der Landeshauptstadt Linz über die Industriestadt Steyr bis zu den malerischen Gemeinden im Salzkammergut - Transraum bietet professionelle Räumungsdienste in ganz Oberösterreich an. Unser erfahrenes Team kennt die spezifischen Anforderungen der Region, sei es die Räumung von Produktionshallen in Industriegebieten, die Räumung von Einfamilienhäusern in Wels oder die behutsame Auflösung von Wohnungen in historischen Gebäuden in Steyr. Wir arbeiten eng mit lokalen Verwertungsbetrieben zusammen und sorgen für eine umweltgerechte Verwertung aller Materialien.',
    detailedIntroEn: 'Upper Austria is Austria\'s economic heartland with a mix of industrial sites, historic cities, and rural regions. From the capital Linz via the industrial city Steyr to picturesque municipalities in the Salzkammergut - Transraum offers professional clearing services throughout Upper Austria. Our experienced team knows the region\'s specific requirements, whether clearing production halls in industrial areas, clearing single-family homes in Wels, or carefully dissolving apartments in historic buildings in Steyr. We work closely with local recycling companies and ensure environmentally sound recycling of all materials.',
    metaDescription: 'Räumung Oberösterreich - Räumung in Linz, Wels, Steyr ✓ Kostenlose Besichtigung ✓ Faire Preise ✓ Professionelles Team.',
    metaDescriptionEn: 'Clearing Upper Austria - Removal in Linz, Wels, Steyr ✓ Free consultation ✓ Fair prices ✓ Professional team.',
    features: [
      'Linz, Wels, Steyr und Umland',
      'Industrie- und Wohnimmobilien',
      'Erfahrenes Räumungsteam',
      'Komplettservice mit Verwertung',
      'Gewerberäumungen',
      'Produktionshallen',
    ],
    featuresEn: [
      'Linz, Wels, Steyr and surroundings',
      'Industrial and residential properties',
      'Experienced clearing team',
      'Complete service with recycling',
      'Commercial clearances',
      'Production halls',
    ],
    cities: [
      'Linz',
      'Wels',
      'Steyr',
      'Traun',
      'Leonding',
      'Ansfelden',
      'Marchtrenk',
      'Braunau am Inn',
      'Vöcklabruck',
      'Gmunden',
      'Bad Ischl',
      'Salzkammergut',
    ],
    citiesEn: [
      'Linz',
      'Wels',
      'Steyr',
      'Traun',
      'Leonding',
      'Ansfelden',
      'Marchtrenk',
      'Braunau am Inn',
      'Vöcklabruck',
      'Gmunden',
      'Bad Ischl',
      'Salzkammergut',
    ],
    whyChooseUs: [
      'Umfassende Erfahrung in ganz Oberösterreich',
      'Spezialisierung auf Gewerbe- und Industrieobjekte',
      'Schnelle Abwicklung großer Projekte',
      'Zusammenarbeit mit lokalen Verwertungsbetrieben',
      'Erfahrung mit denkmalgeschützten Objekten',
      'Flexible Arbeitszeiten auch nachts und am Wochenende',
      'Professionelle Projektplanung bei Großaufträgen',
      'Transparente Kostenstruktur ohne Überraschungen',
    ],
    whyChooseUsEn: [
      'Comprehensive experience throughout Upper Austria',
      'Specialization in commercial and industrial properties',
      'Quick processing of large projects',
      'Cooperation with local recycling companies',
      'Experience with listed buildings',
      'Flexible working hours including nights and weekends',
      'Professional project planning for large orders',
      'Transparent cost structure without surprises',
    ],
    faqs: [
      {
        question: 'Können Sie auch große Gewerbeobjekte in Linz räumen?',
        answer: 'Ja, wir sind spezialisiert auf Gewerbe- und Industrieräumungen jeder Größenordnung - von Büros bis zu kompletten Produktionshallen.'
      },
      {
        question: 'Wie weit im Voraus muss ich einen Termin buchen?',
        answer: 'Idealerweise 1-2 Wochen im Voraus, bei dringenden Fällen können wir oft auch kurzfristig helfen - rufen Sie einfach an.'
      },
      {
        question: 'Arbeiten Sie auch im Salzkammergut?',
        answer: 'Selbstverständlich! Wir decken ganz Oberösterreich ab, einschließlich des gesamten Salzkammerguts.'
      },
      {
        question: 'Was passiert mit den entsorgten Materialien?',
        answer: 'Wir arbeiten mit zertifizierten Verwertungsbetrieben zusammen und achten auf umweltgerechte Verwertung und Recycling.'
      },
      {
        question: 'Können Sie auch nachts arbeiten?',
        answer: 'Ja, für Gewerbekunden bieten wir auch Nacht- und Wochenendtermine an, um den laufenden Betrieb nicht zu stören.'
      },
    ],
    faqsEn: [
      {
        question: 'Can you also clear large commercial properties in Linz?',
        answer: 'Yes, we specialize in commercial and industrial clearances of any size - from offices to complete production halls.'
      },
      {
        question: 'How far in advance do I need to book an appointment?',
        answer: 'Ideally 1-2 weeks in advance, in urgent cases we can often help at short notice - just call us.'
      },
      {
        question: 'Do you also work in the Salzkammergut?',
        answer: 'Of course! We cover all of Upper Austria, including the entire Salzkammergut region.'
      },
      {
        question: 'What happens to the processed materials?',
        answer: 'We work with certified recycling companies and ensure environmentally sound recycling and utilization.'
      },
      {
        question: 'Can you also work at night?',
        answer: 'Yes, for commercial clients we also offer night and weekend appointments to avoid disrupting ongoing operations.'
      },
    ],
  },
  {
    slug: 'salzburg',
    name: 'Salzburg',
    nameEn: 'Salzburg',
    description: 'Räumung und Räumung in Salzburg Stadt und Land. Professioneller Service in der gesamten Region mit erfahrenem Team.',
    descriptionEn: 'Clearing and removal in Salzburg city and state. Professional service throughout the region with experienced team.',
    detailedIntro: 'Das Bundesland Salzburg vereint UNESCO-Weltkulturerbe, alpine Schönheit und moderne Infrastruktur. Von der barocken Altstadt Salzburgs über die Skigebiete im Pongau bis zu den Gemeinden im Pinzgau und Lungau - Transraum bietet professionelle Räumungsdienste in der gesamten Region an. Besonders in der historischen Altstadt von Salzburg sind Fingerspitzengefühl und Erfahrung gefragt: Enge Gassen, denkmalgeschützte Gebäude und strenge Auflagen erfordern ein erfahrenes Team. Unser Team kennt die lokalen Gegebenheiten und arbeitet respektvoll mit den historischen Gebäuden. Auch in den touristischen Regionen wie dem Salzkammergut oder den Skiorten bieten wir flexible Lösungen für Ferienwohnungen und Tourismusbetriebe.',
    detailedIntroEn: 'The state of Salzburg combines UNESCO World Heritage, alpine beauty, and modern infrastructure. From Salzburg\'s baroque old town via ski resorts in Pongau to municipalities in Pinzgau and Lungau - Transraum offers professional clearing services throughout the region. Especially in Salzburg\'s historic old town, sensitivity and experience are required: Narrow lanes, listed buildings, and strict regulations demand an experienced team. Our team knows the local conditions and works respectfully with historic buildings. In tourist regions like the Salzkammergut or ski resorts, we also offer flexible solutions for holiday apartments and tourism businesses.',
    metaDescription: 'Räumung Salzburg - Stadt & Land ✓ Professionelle Räumung ✓ Kostenlose Besichtigung ✓ Schneller Service.',
    metaDescriptionEn: 'Clearing Salzburg - City & State ✓ Professional removal ✓ Free consultation ✓ Fast service.',
    features: [
      'Salzburg Stadt und Umgebung',
      'Berg- und Talregionen',
      'Spezialisiert auf alpine Gebiete',
      'Zuverlässiger Service',
      'Tourismusobjekte',
      'Denkmalgeschützte Gebäude',
    ],
    featuresEn: [
      'Salzburg city and surroundings',
      'Mountain and valley regions',
      'Specialized in alpine areas',
      'Reliable service',
      'Tourism properties',
      'Listed buildings',
    ],
    cities: [
      'Salzburg Stadt',
      'Hallein',
      'St. Johann im Pongau',
      'Zell am See',
      'Saalfelden',
      'Tamsweg',
      'Bischofshofen',
      'Bad Gastein',
      'Oberndorf',
      'Seekirchen',
    ],
    citiesEn: [
      'Salzburg City',
      'Hallein',
      'St. Johann im Pongau',
      'Zell am See',
      'Saalfelden',
      'Tamsweg',
      'Bischofshofen',
      'Bad Gastein',
      'Oberndorf',
      'Seekirchen',
    ],
    whyChooseUs: [
      'Erfahrung mit historischen Gebäuden in der Altstadt',
      'Kenntnis der strengen Auflagen für denkmalgeschützte Objekte',
      'Spezialisierung auf touristische Immobilien',
      'Flexible Termingestaltung in der Nebensaison',
      'Schnelle Abwicklung zwischen Gästewechseln',
      'Zusammenarbeit mit lokalen Behörden und Hausverwaltungen',
      'Umweltgerechte Verwertung gemäß Salzburger Standards',
      'Diskreter und respektvoller Umgang',
    ],
    whyChooseUsEn: [
      'Experience with historic buildings in the old town',
      'Knowledge of strict regulations for listed properties',
      'Specialization in tourist properties',
      'Flexible scheduling in the low season',
      'Quick processing between guest changes',
      'Cooperation with local authorities and property managements',
      'Environmentally sound recycling according to Salzburg standards',
      'Discreet and respectful approach',
    ],
    faqs: [
      {
        question: 'Können Sie in der Salzburger Altstadt arbeiten?',
        answer: 'Ja, wir haben umfangreiche Erfahrung mit Räumungen in der historischen Altstadt und kennen alle lokalen Vorschriften und Auflagen.'
      },
      {
        question: 'Wie gehen Sie mit denkmalgeschützten Gebäuden um?',
        answer: 'Wir arbeiten äußerst vorsichtig und respektvoll, kennen die Auflagen und stimmen uns bei Bedarf mit den zuständigen Behörden ab.'
      },
      {
        question: 'Können Sie auch Ferienwohnungen zwischen Gästen räumen?',
        answer: 'Absolut! Wir bieten schnelle Räumungsdienste zwischen Gästewechseln an und arbeiten flexibel nach Ihrem Zeitplan.'
      },
      {
        question: 'Fahren Sie auch in die Bergtäler?',
        answer: 'Ja, wir decken ganz Salzburg ab - von der Stadt bis in die entlegensten Täler im Pongau, Pinzgau und Lungau.'
      },
      {
        question: 'Was kostet eine Räumung in Salzburg?',
        answer: 'Die Kosten variieren je nach Objekt und Aufwand. Wir bieten eine kostenlose Besichtigung und erstellen ein transparentes Angebot.'
      },
    ],
    faqsEn: [
      {
        question: 'Can you work in Salzburg\'s old town?',
        answer: 'Yes, we have extensive experience with clearances in the historic old town and know all local regulations and requirements.'
      },
      {
        question: 'How do you handle listed buildings?',
        answer: 'We work extremely carefully and respectfully, know the requirements, and coordinate with relevant authorities when necessary.'
      },
      {
        question: 'Can you also clear holiday apartments between guests?',
        answer: 'Absolutely! We offer quick clearing services between guest changes and work flexibly according to your schedule.'
      },
      {
        question: 'Do you also travel to the mountain valleys?',
        answer: 'Yes, we cover all of Salzburg - from the city to the most remote valleys in Pongau, Pinzgau, and Lungau.'
      },
      {
        question: 'What does clearing cost in Salzburg?',
        answer: 'Costs vary depending on the property and effort. We offer a free consultation and create a transparent quote.'
      },
    ],
  },
  {
    slug: 'tirol',
    name: 'Tirol',
    nameEn: 'Tyrol',
    description: 'Professionelle Räumung in Tirol. Innsbruck und Umgebung - auch in schwer zugänglichen Bergregionen sind wir für Sie da.',
    descriptionEn: 'Professional clearing in Tyrol. Innsbruck and surroundings - we serve you even in hard-to-reach mountain regions.',
    detailedIntro: 'Tirol ist geprägt von alpiner Landschaft, Tourismus und historischen Städten. Die besonderen geografischen Gegebenheiten mit engen Tälern, Bergregionen und extremen Höhenlagen stellen besondere Anforderungen an Räumungsdienste. Transraum ist in ganz Tirol tätig - von der Landeshauptstadt Innsbruck über die Tourismusregionen wie Kitzbühel, Sölden oder St. Anton bis in die entlegensten Bergdörfer. Unser Team verfügt über Spezialausrüstung für schwer zugängliche Objekte, kennt die alpinen Herausforderungen und arbeitet ganzjährig - auch bei Schnee und Eis. Ob Wohnungsauflösung in Innsbruck, Hotelräumung in einem Skiort oder Almhüttenräumung in den Bergen - wir meistern jede Herausforderung professionell.',
    detailedIntroEn: 'Tyrol is characterized by alpine landscapes, tourism, and historic cities. The special geographical conditions with narrow valleys, mountain regions, and extreme altitudes pose particular challenges for clearing services. Transraum operates throughout Tyrol - from the capital Innsbruck via tourism regions like Kitzbühel, Sölden, or St. Anton to the most remote mountain villages. Our team has special equipment for hard-to-reach properties, knows the alpine challenges, and works year-round - even in snow and ice. Whether apartment dissolution in Innsbruck, hotel clearing in a ski resort, or alpine hut clearing in the mountains - we master every challenge professionally.',
    metaDescription: 'Räumung Tirol - Innsbruck & Umgebung ✓ Bergregionen ✓ Professionelles Team ✓ Kostenlose Besichtigung.',
    metaDescriptionEn: 'Clearing Tyrol - Innsbruck & surroundings ✓ Mountain regions ✓ Professional team ✓ Free consultation.',
    features: [
      'Innsbruck und Tiroler Gemeinden',
      'Spezialausrüstung für Berggebiete',
      'Erfahrung mit alpinen Objekten',
      'Ganzjähriger Service',
      'Tourismusobjekte',
      'Almhütten-Räumungen',
    ],
    featuresEn: [
      'Innsbruck and Tyrolean municipalities',
      'Special equipment for mountain areas',
      'Experience with alpine properties',
      'Year-round service',
      'Tourism properties',
      'Alpine hut clearances',
    ],
    cities: [
      'Innsbruck',
      'Kufstein',
      'Kitzbühel',
      'St. Johann in Tirol',
      'Wörgl',
      'Schwaz',
      'Lienz (Osttirol)',
      'Sölden',
      'St. Anton am Arlberg',
      'Mayrhofen',
      'Landeck',
    ],
    citiesEn: [
      'Innsbruck',
      'Kufstein',
      'Kitzbühel',
      'St. Johann in Tirol',
      'Wörgl',
      'Schwaz',
      'Lienz (East Tyrol)',
      'Sölden',
      'St. Anton am Arlberg',
      'Mayrhofen',
      'Landeck',
    ],
    whyChooseUs: [
      'Spezialisierung auf alpine Räumungen',
      'Spezialausrüstung für Berggebiete und schwer zugängliche Objekte',
      'Ganzjähriger Service auch bei Schnee und Eis',
      'Erfahrung mit Tourismusbetrieben und Saisonbetrieb',
      'Flexible Termingestaltung in Neben- und Hauptsaison',
      'Zusammenarbeit mit Bergbahnen und Hüttenwirten',
      'Kenntnis der lokalen Gegebenheiten und Herausforderungen',
      'Umweltgerechte Verwertung gemäß alpinen Standards',
    ],
    whyChooseUsEn: [
      'Specialization in alpine clearances',
      'Special equipment for mountain areas and hard-to-reach properties',
      'Year-round service even in snow and ice',
      'Experience with tourism businesses and seasonal operations',
      'Flexible scheduling in low and high season',
      'Cooperation with cable cars and alpine hut operators',
      'Knowledge of local conditions and challenges',
      'Environmentally sound recycling according to alpine standards',
    ],
    faqs: [
      {
        question: 'Können Sie auch in schwer zugänglichen Bergregionen arbeiten?',
        answer: 'Ja, wir haben Spezialausrüstung und Erfahrung für alpine Räumungen - von Almhütten bis zu Berggasthöfen.'
      },
      {
        question: 'Arbeiten Sie auch im Winter bei Schnee?',
        answer: 'Absolut! Wir arbeiten ganzjährig und sind auch bei winterlichen Bedingungen im Einsatz.'
      },
      {
        question: 'Können Sie Hotels zwischen Saisonen räumen?',
        answer: 'Ja, wir sind spezialisiert auf Tourismusbetriebe und bieten flexible Termine zwischen den Saisons an.'
      },
      {
        question: 'Wie weit fahren Sie in die Täler hinein?',
        answer: 'Wir decken ganz Tirol ab - von Innsbruck bis Osttirol, vom Inntal bis ins hinterste Ötztal oder Zillertal.'
      },
      {
        question: 'Haben Sie Erfahrung mit Skihotels?',
        answer: 'Ja, wir arbeiten regelmäßig mit Hotels, Pensionen und Ferienwohnungen in Skigebieten zusammen.'
      },
    ],
    faqsEn: [
      {
        question: 'Can you also work in hard-to-reach mountain regions?',
        answer: 'Yes, we have special equipment and experience for alpine clearances - from alpine huts to mountain inns.'
      },
      {
        question: 'Do you also work in winter with snow?',
        answer: 'Absolutely! We work year-round and are also active in winter conditions.'
      },
      {
        question: 'Can you clear hotels between seasons?',
        answer: 'Yes, we specialize in tourism businesses and offer flexible appointments between seasons.'
      },
      {
        question: 'How far do you travel into the valleys?',
        answer: 'We cover all of Tyrol - from Innsbruck to East Tyrol, from the Inn Valley to the furthest Ötztal or Zillertal.'
      },
      {
        question: 'Do you have experience with ski hotels?',
        answer: 'Yes, we regularly work with hotels, guesthouses, and holiday apartments in ski areas.'
      },
    ],
  },
  {
    slug: 'vorarlberg',
    name: 'Vorarlberg',
    nameEn: 'Vorarlberg',
    description: 'Zuverlässige Räumung in Vorarlberg. Bregenz, Dornbirn, Feldkirch - professioneller Service im Ländle.',
    descriptionEn: 'Reliable clearing in Vorarlberg. Bregenz, Dornbirn, Feldkirch - professional service in the Ländle.',
    detailedIntro: 'Vorarlberg, das westlichste Bundesland Österreichs, ist geprägt von der Bodenseeregion, dem Rheintal und den Bergregionen des Bregenzerwaldes und Montafons. Die hohe Lebensqualität und die wirtschaftliche Dynamik machen das "Ländle" zu einer attraktiven Region. Transraum bietet professionelle Räumungs- und Räumungsdienste in ganz Vorarlberg an - von der Landeshauptstadt Bregenz am Bodensee über die Industriestadt Dornbirn bis zu den malerischen Gemeinden im Bregenzerwald. Unser Team kennt die regionalen Besonderheiten, arbeitet schnell und zuverlässig und passt sich flexibel an Ihre Bedürfnisse an. Ob Wohnungsauflösung in Feldkirch, Gewerberäumung in Dornbirn oder Ferienhaus-Räumung am Bodensee - wir sind Ihr kompetenter Partner.',
    detailedIntroEn: 'Vorarlberg, Austria\'s westernmost state, is characterized by the Lake Constance region, the Rhine Valley, and the mountain regions of Bregenzerwald and Montafon. The high quality of life and economic dynamism make the "Ländle" an attractive region. Transraum offers professional clearing and removal services throughout Vorarlberg - from the capital Bregenz on Lake Constance via the industrial city Dornbirn to picturesque municipalities in Bregenzerwald. Our team knows regional peculiarities, works quickly and reliably, and flexibly adapts to your needs. Whether apartment dissolution in Feldkirch, commercial clearing in Dornbirn, or holiday home clearing at Lake Constance - we are your competent partner.',
    metaDescription: 'Räumung Vorarlberg - Bregenz, Dornbirn, Feldkirch ✓ Professionelle Räumung ✓ Kostenlose Besichtigung.',
    metaDescriptionEn: 'Clearing Vorarlberg - Bregenz, Dornbirn, Feldkirch ✓ Professional removal ✓ Free consultation.',
    features: [
      'Bregenz, Dornbirn, Feldkirch',
      'Bodensee-Region',
      'Schnelle Reaktionszeiten',
      'Komplettservice',
      'Gewerbeobjekte',
      'Ferienhäuser',
    ],
    featuresEn: [
      'Bregenz, Dornbirn, Feldkirch',
      'Lake Constance region',
      'Fast response times',
      'Complete service',
      'Commercial properties',
      'Holiday homes',
    ],
    cities: [
      'Bregenz',
      'Dornbirn',
      'Feldkirch',
      'Hohenems',
      'Lustenau',
      'Bludenz',
      'Hard',
      'Rankweil',
      'Götzis',
      'Lauterach',
      'Bregenzerwald',
      'Montafon',
    ],
    citiesEn: [
      'Bregenz',
      'Dornbirn',
      'Feldkirch',
      'Hohenems',
      'Lustenau',
      'Bludenz',
      'Hard',
      'Rankweil',
      'Götzis',
      'Lauterach',
      'Bregenzerwald',
      'Montafon',
    ],
    whyChooseUs: [
      'Umfassende Kenntnis von ganz Vorarlberg',
      'Schnelle Reaktionszeiten im kompakten Bundesland',
      'Erfahrung mit Gewerbeobjekten und Industriebetrieben',
      'Spezialisierung auf Bodensee-Immobilien',
      'Flexible Termine auch kurzfristig',
      'Zusammenarbeit mit lokalen Verwertungsbetrieben',
      'Kenntnis der Vorarlberger Bauweise und Besonderheiten',
      'Diskreter und professioneller Service',
    ],
    whyChooseUsEn: [
      'Comprehensive knowledge of all Vorarlberg',
      'Fast response times in the compact state',
      'Experience with commercial properties and industrial operations',
      'Specialization in Lake Constance properties',
      'Flexible appointments even at short notice',
      'Cooperation with local recycling companies',
      'Knowledge of Vorarlberg construction and peculiarities',
      'Discreet and professional service',
    ],
    faqs: [
      {
        question: 'Wie schnell können Sie in Vorarlberg vor Ort sein?',
        answer: 'Aufgrund der kompakten Größe Vorarlbergs können wir meist innerhalb von 1-2 Stunden überall im Ländle sein.'
      },
      {
        question: 'Arbeiten Sie auch in der Bodenseeregion?',
        answer: 'Ja, wir haben umfangreiche Erfahrung mit Immobilien am Bodensee - von Bregenz über Hard bis Lochau.'
      },
      {
        question: 'Können Sie auch Gewerbeimmobilien räumen?',
        answer: 'Selbstverständlich! Wir sind spezialisiert auf Gewerbe- und Industrieräumungen in ganz Vorarlberg.'
      },
      {
        question: 'Fahren Sie auch ins Montafon oder den Bregenzerwald?',
        answer: 'Ja, wir decken ganz Vorarlberg ab - vom Rheintal bis in die Bergtäler.'
      },
      {
        question: 'Was kostet eine Räumung in Vorarlberg?',
        answer: 'Die Kosten hängen vom Umfang ab. Wir bieten eine kostenlose Besichtigung und ein transparentes Angebot an.'
      },
    ],
    faqsEn: [
      {
        question: 'How quickly can you be on-site in Vorarlberg?',
        answer: 'Due to Vorarlberg\'s compact size, we can usually be anywhere in the Ländle within 1-2 hours.'
      },
      {
        question: 'Do you also work in the Lake Constance region?',
        answer: 'Yes, we have extensive experience with properties at Lake Constance - from Bregenz via Hard to Lochau.'
      },
      {
        question: 'Can you also clear commercial properties?',
        answer: 'Of course! We specialize in commercial and industrial clearances throughout Vorarlberg.'
      },
      {
        question: 'Do you also travel to Montafon or Bregenzerwald?',
        answer: 'Yes, we cover all of Vorarlberg - from the Rhine Valley to the mountain valleys.'
      },
      {
        question: 'What does clearing cost in Vorarlberg?',
        answer: 'Costs depend on the scope. We offer a free consultation and a transparent quote.'
      },
    ],
  },
  {
    slug: 'kaernten',
    name: 'Kärnten',
    nameEn: 'Carinthia',
    description: 'Professionelle Räumung in Kärnten. Klagenfurt, Villach und Umgebung - zuverlässiger Service in der südlichsten Region Österreichs.',
    descriptionEn: 'Professional clearing in Carinthia. Klagenfurt, Villach and surroundings - reliable service in Austria\'s southernmost region.',
    detailedIntro: 'Kärnten, das südlichste Bundesland Österreichs, ist bekannt für seine Seen, Berge und das mediterrane Flair. Von der Landeshauptstadt Klagenfurt über die Industriestadt Villach bis zu den Tourismusregionen an Wörthersee, Millstätter See und Weissensee - Transraum bietet professionelle Räumungsdienste in ganz Kärnten an. Unser erfahrenes Team kennt die Besonderheiten der Region: Tourismusbetriebe mit Saisonbetrieb, historische Villen am Seeufer, moderne Stadtimmobilien und ländliche Gehöfte in den Tälern. Wir arbeiten flexibel, diskret und professionell - ob Ferienhaus-Räumung zwischen Gästen, Hotelräumung nach der Saison oder Wohnungsauflösung in Klagenfurt.',
    detailedIntroEn: 'Carinthia, Austria\'s southernmost state, is known for its lakes, mountains, and Mediterranean flair. From the capital Klagenfurt via the industrial city Villach to tourism regions at Wörthersee, Millstätter See, and Weissensee - Transraum offers professional clearing services throughout Carinthia. Our experienced team knows the region\'s peculiarities: tourism businesses with seasonal operations, historic villas on lakeshores, modern city properties, and rural farms in the valleys. We work flexibly, discreetly, and professionally - whether holiday home clearing between guests, hotel clearing after the season, or apartment dissolution in Klagenfurt.',
    metaDescription: 'Räumung Kärnten - Klagenfurt, Villach ✓ Professionelle Räumung ✓ Kostenlose Besichtigung ✓ Faire Preise.',
    metaDescriptionEn: 'Clearing Carinthia - Klagenfurt, Villach ✓ Professional removal ✓ Free consultation ✓ Fair prices.',
    features: [
      'Klagenfurt, Villach und Umland',
      'Seen- und Bergregionen',
      'Tourismus- und Wohnimmobilien',
      'Flexibler Service',
      'Saisonbetriebe',
      'Seegrundstücke',
    ],
    featuresEn: [
      'Klagenfurt, Villach and surroundings',
      'Lake and mountain regions',
      'Tourism and residential properties',
      'Flexible service',
      'Seasonal businesses',
      'Lakeside properties',
    ],
    cities: [
      'Klagenfurt am Wörthersee',
      'Villach',
      'Spittal an der Drau',
      'Feldkirchen',
      'Wolfsberg',
      'St. Veit an der Glan',
      'Pörtschach',
      'Velden',
      'Millstatt',
      'Bad Kleinkirchheim',
    ],
    citiesEn: [
      'Klagenfurt am Wörthersee',
      'Villach',
      'Spittal an der Drau',
      'Feldkirchen',
      'Wolfsberg',
      'St. Veit an der Glan',
      'Pörtschach',
      'Velden',
      'Millstatt',
      'Bad Kleinkirchheim',
    ],
    whyChooseUs: [
      'Umfassende Erfahrung in ganz Kärnten',
      'Spezialisierung auf Tourismusobjekte und Saisonbetriebe',
      'Kenntnis der Seenregionen und deren Besonderheiten',
      'Flexible Termine zwischen Haupt- und Nebensaison',
      'Diskreter Service für exklusive Seegrundstücke',
      'Zusammenarbeit mit lokalen Verwertungsbetrieben',
      'Erfahrung mit historischen Villen und modernen Hotels',
      'Schnelle Reaktionszeiten im gesamten Bundesland',
    ],
    whyChooseUsEn: [
      'Comprehensive experience throughout Carinthia',
      'Specialization in tourism properties and seasonal businesses',
      'Knowledge of lake regions and their peculiarities',
      'Flexible appointments between high and low season',
      'Discreet service for exclusive lakeside properties',
      'Cooperation with local recycling companies',
      'Experience with historic villas and modern hotels',
      'Fast response times throughout the state',
    ],
    faqs: [
      {
        question: 'Können Sie Ferienhäuser am Wörthersee räumen?',
        answer: 'Ja, wir sind spezialisiert auf Ferienimmobilien an allen Kärntner Seen und bieten flexible Termine an.'
      },
      {
        question: 'Arbeiten Sie auch in der Nebensaison?',
        answer: 'Selbstverständlich! Gerade in der Nebensaison haben wir mehr Kapazitäten für größere Projekte.'
      },
      {
        question: 'Wie diskret arbeiten Sie bei exklusiven Objekten?',
        answer: 'Absolute Diskretion ist für uns selbstverständlich - gerade bei hochwertigen Immobilien am Seeufer.'
      },
      {
        question: 'Fahren Sie auch in die Bergregionen Kärntens?',
        answer: 'Ja, wir decken ganz Kärnten ab - von den Seen bis in die Bergregionen und Täler.'
      },
      {
        question: 'Können Sie Hotels nach der Saison räumen?',
        answer: 'Absolut! Wir arbeiten regelmäßig mit Hotels, Pensionen und Gastronomiebetrieben zusammen.'
      },
    ],
    faqsEn: [
      {
        question: 'Can you clear holiday homes at Wörthersee?',
        answer: 'Yes, we specialize in holiday properties at all Carinthian lakes and offer flexible appointments.'
      },
      {
        question: 'Do you also work in the low season?',
        answer: 'Of course! Especially in the low season, we have more capacity for larger projects.'
      },
      {
        question: 'How discreetly do you work with exclusive properties?',
        answer: 'Absolute discretion is a matter of course for us - especially with high-quality lakeside properties.'
      },
      {
        question: 'Do you also travel to Carinthia\'s mountain regions?',
        answer: 'Yes, we cover all of Carinthia - from the lakes to the mountain regions and valleys.'
      },
      {
        question: 'Can you clear hotels after the season?',
        answer: 'Absolutely! We regularly work with hotels, guesthouses, and gastronomy businesses.'
      },
    ],
  },
  {
    slug: 'steiermark',
    name: 'Steiermark',
    nameEn: 'Styria',
    description: 'Räumung und Räumung in der Steiermark. Graz und Umgebung - professioneller Service in der grünen Mark.',
    descriptionEn: 'Clearing and removal in Styria. Graz and surroundings - professional service in the green state.',
    detailedIntro: 'Die Steiermark, auch "Grüne Mark" genannt, ist das zweitgrößte Bundesland Österreichs und vereint urbanes Leben in Graz mit ländlichen Regionen, Weinbaugebieten und alpinen Landschaften. Von der Landeshauptstadt Graz über die Industrieregionen Mur-Mürz-Furche bis zu den Tourismusregionen Dachstein, Schladming oder Bad Aussee - Transraum bietet professionelle Räumungsdienste in der gesamten Steiermark an. Unser Team kennt die vielfältigen Anforderungen der Region: Von historischen Stadtpalais in Graz über moderne Gewerbeparks bis zu Almhütten in den Bergen. Wir arbeiten mit lokalen Verwertungsbetrieben zusammen und garantieren umweltgerechte Verwertung aller Materialien.',
    detailedIntroEn: 'Styria, also called "Green Mark", is Austria\'s second-largest state and combines urban life in Graz with rural regions, wine-growing areas, and alpine landscapes. From the capital Graz via the industrial regions Mur-Mürz-Furche to tourism regions Dachstein, Schladming, or Bad Aussee - Transraum offers professional clearing services throughout Styria. Our team knows the region\'s diverse requirements: From historic city palaces in Graz via modern business parks to alpine huts in the mountains. We work with local recycling companies and guarantee environmentally sound recycling of all materials.',
    metaDescription: 'Räumung Steiermark - Graz & Umgebung ✓ Professionelle Räumung ✓ Kostenlose Besichtigung ✓ Erfahrenes Team.',
    metaDescriptionEn: 'Clearing Styria - Graz & surroundings ✓ Professional removal ✓ Free consultation ✓ Experienced team.',
    features: [
      'Graz und steirische Gemeinden',
      'Stadt- und Landregionen',
      'Industrie- und Privatobjekte',
      'Umfassender Service',
      'Weinbauregionen',
      'Alpine Gebiete',
    ],
    featuresEn: [
      'Graz and Styrian municipalities',
      'Urban and rural regions',
      'Industrial and private properties',
      'Comprehensive service',
      'Wine-growing regions',
      'Alpine areas',
    ],
    cities: [
      'Graz',
      'Leoben',
      'Kapfenberg',
      'Bruck an der Mur',
      'Leibnitz',
      'Deutschlandsberg',
      'Voitsberg',
      'Judenburg',
      'Schladming',
      'Bad Aussee',
      'Hartberg',
      'Fürstenfeld',
    ],
    citiesEn: [
      'Graz',
      'Leoben',
      'Kapfenberg',
      'Bruck an der Mur',
      'Leibnitz',
      'Deutschlandsberg',
      'Voitsberg',
      'Judenburg',
      'Schladming',
      'Bad Aussee',
      'Hartberg',
      'Fürstenfeld',
    ],
    whyChooseUs: [
      'Umfassende Erfahrung in ganz Steiermark',
      'Spezialisierung auf Graz und Großraum',
      'Kenntnis der vielfältigen regionalen Gegebenheiten',
      'Erfahrung mit Industrie- und Gewerbeobjekten',
      'Flexible Termingestaltung auch in ländlichen Regionen',
      'Zusammenarbeit mit steirischen Verwertungsbetrieben',
      'Umweltgerechte Verwertung und Recycling',
      'Faire Preise für Stadt und Land',
    ],
    whyChooseUsEn: [
      'Comprehensive experience throughout Styria',
      'Specialization in Graz and greater area',
      'Knowledge of diverse regional conditions',
      'Experience with industrial and commercial properties',
      'Flexible scheduling also in rural regions',
      'Cooperation with Styrian recycling companies',
      'Environmentally sound recycling and recycling',
      'Fair prices for city and countryside',
    ],
    faqs: [
      {
        question: 'Decken Sie die gesamte Steiermark ab?',
        answer: 'Ja, wir sind in der gesamten Steiermark tätig - von Graz bis Bad Aussee, von der Südsteiermark bis zur Obersteiermark.'
      },
      {
        question: 'Können Sie auch Gewerbeobjekte in Graz räumen?',
        answer: 'Selbstverständlich! Wir haben umfangreiche Erfahrung mit Gewerbe- und Industrieräumungen in Graz und Umgebung.'
      },
      {
        question: 'Wie schnell können Sie von Graz aus anfahren?',
        answer: 'Innerhalb von Graz in 30-60 Minuten, in die Regionen je nach Entfernung 1-3 Stunden.'
      },
      {
        question: 'Arbeiten Sie auch in Weinbauregionen?',
        answer: 'Ja, wir kennen die Südsteiermark und andere Weinbauregionen gut und räumen regelmäßig dort.'
      },
      {
        question: 'Können Sie Almhütten in den Bergen räumen?',
        answer: 'Absolut! Wir haben Erfahrung mit alpinen Objekten und verfügen über die notwendige Ausrüstung.'
      },
    ],
    faqsEn: [
      {
        question: 'Do you cover all of Styria?',
        answer: 'Yes, we operate throughout Styria - from Graz to Bad Aussee, from Southern Styria to Upper Styria.'
      },
      {
        question: 'Can you also clear commercial properties in Graz?',
        answer: 'Of course! We have extensive experience with commercial and industrial clearances in Graz and surroundings.'
      },
      {
        question: 'How quickly can you travel from Graz?',
        answer: 'Within Graz in 30-60 minutes, to the regions depending on distance 1-3 hours.'
      },
      {
        question: 'Do you also work in wine-growing regions?',
        answer: 'Yes, we know Southern Styria and other wine-growing regions well and regularly clear there.'
      },
      {
        question: 'Can you clear alpine huts in the mountains?',
        answer: 'Absolutely! We have experience with alpine properties and have the necessary equipment.'
      },
    ],
  },
  {
    slug: 'burgenland',
    name: 'Burgenland',
    nameEn: 'Burgenland',
    description: 'Zuverlässige Räumung im Burgenland. Eisenstadt, Neusiedl und Umgebung - schneller Service im östlichsten Bundesland.',
    descriptionEn: 'Reliable clearing in Burgenland. Eisenstadt, Neusiedl and surroundings - fast service in Austria\'s easternmost state.',
    detailedIntro: 'Das Burgenland ist das östlichste und flachste Bundesland Österreichs, geprägt von Weinbauregionen, dem Neusiedler See und pannonischem Klima. Von der Landeshauptstadt Eisenstadt über die Seeregion Neusiedl am See bis zu den ländlichen Gemeinden im Süd- und Mittelburgenland - Transraum bietet professionelle Räumungsdienste im gesamten Bundesland an. Unser Team kennt die Besonderheiten der Region: Traditionelle Kellergassen, Weingüter, Tourismusbetriebe am See und ländliche Gehöfte. Dank der Nähe zu Wien können wir besonders schnell reagieren und bieten flexible Termine an. Ob Wohnungsauflösung in Eisenstadt, Kellerräumung in einem Weingut oder Ferienhaus-Räumung am Neusiedler See - wir sind Ihr kompetenter Partner.',
    detailedIntroEn: 'Burgenland is Austria\'s easternmost and flattest state, characterized by wine-growing regions, Lake Neusiedl, and Pannonian climate. From the capital Eisenstadt via the lake region Neusiedl am See to rural municipalities in South and Central Burgenland - Transraum offers professional clearing services throughout the state. Our team knows the region\'s peculiarities: Traditional wine cellars, wineries, tourism businesses at the lake, and rural farms. Thanks to the proximity to Vienna, we can react particularly quickly and offer flexible appointments. Whether apartment dissolution in Eisenstadt, cellar clearing at a winery, or holiday home clearing at Lake Neusiedl - we are your competent partner.',
    metaDescription: 'Räumung Burgenland - Eisenstadt, Neusiedl ✓ Professionelle Räumung ✓ Kostenlose Besichtigung ✓ Schnell & zuverlässig.',
    metaDescriptionEn: 'Clearing Burgenland - Eisenstadt, Neusiedl ✓ Professional removal ✓ Free consultation ✓ Fast & reliable.',
    features: [
      'Eisenstadt, Neusiedl am See',
      'Weinregion und Seegebiet',
      'Nähe zu Wien',
      'Kompetenter Service',
      'Weingüter',
      'Seeimmobilien',
    ],
    featuresEn: [
      'Eisenstadt, Neusiedl am See',
      'Wine region and lake area',
      'Close to Vienna',
      'Competent service',
      'Wineries',
      'Lake properties',
    ],
    cities: [
      'Eisenstadt',
      'Neusiedl am See',
      'Rust',
      'Mattersburg',
      'Oberwart',
      'Oberpullendorf',
      'Güssing',
      'Jennersdorf',
      'Podersdorf',
      'Mörbisch',
    ],
    citiesEn: [
      'Eisenstadt',
      'Neusiedl am See',
      'Rust',
      'Mattersburg',
      'Oberwart',
      'Oberpullendorf',
      'Güssing',
      'Jennersdorf',
      'Podersdorf',
      'Mörbisch',
    ],
    whyChooseUs: [
      'Schnelle Anfahrt dank Nähe zu Wien',
      'Umfassende Kenntnis des gesamten Burgenlandes',
      'Spezialisierung auf Weinregion und Neusiedler See',
      'Erfahrung mit Kellergassen und Weingütern',
      'Flexible Termine auch zur Weinlese',
      'Zusammenarbeit mit lokalen Verwertungsbetrieben',
      'Diskreter Service für Seeimmobilien',
      'Faire Preise ohne Anfahrtszuschläge',
    ],
    whyChooseUsEn: [
      'Quick arrival thanks to proximity to Vienna',
      'Comprehensive knowledge of all Burgenland',
      'Specialization in wine region and Lake Neusiedl',
      'Experience with wine cellars and wineries',
      'Flexible appointments also during harvest',
      'Cooperation with local recycling companies',
      'Discreet service for lake properties',
      'Fair prices without travel surcharges',
    ],
    faqs: [
      {
        question: 'Wie schnell können Sie ins Burgenland kommen?',
        answer: 'Dank der Nähe zu Wien können wir meist innerhalb von 30-90 Minuten überall im Burgenland sein.'
      },
      {
        question: 'Können Sie auch Weinkeller räumen?',
        answer: 'Ja, wir haben Erfahrung mit Kellergassen, Weinkellern und Presshäusern in der gesamten Weinregion.'
      },
      {
        question: 'Arbeiten Sie auch am Neusiedler See?',
        answer: 'Selbstverständlich! Wir kennen die Seeregion sehr gut und räumen regelmäßig Ferienimmobilien dort.'
      },
      {
        question: 'Fahren Sie auch ins Süd- und Mittelburgenland?',
        answer: 'Ja, wir decken das gesamte Burgenland ab - von Nord bis Süd.'
      },
      {
        question: 'Was kostet eine Räumung im Burgenland?',
        answer: 'Die Kosten hängen vom Umfang ab. Dank kurzer Anfahrt aus Wien sind die Kosten oft günstiger als gedacht.'
      },
    ],
    faqsEn: [
      {
        question: 'How quickly can you get to Burgenland?',
        answer: 'Thanks to the proximity to Vienna, we can usually be anywhere in Burgenland within 30-90 minutes.'
      },
      {
        question: 'Can you also clear wine cellars?',
        answer: 'Yes, we have experience with wine cellars and press houses throughout the wine region.'
      },
      {
        question: 'Do you also work at Lake Neusiedl?',
        answer: 'Of course! We know the lake region very well and regularly clear holiday properties there.'
      },
      {
        question: 'Do you also travel to South and Central Burgenland?',
        answer: 'Yes, we cover all of Burgenland - from north to south.'
      },
      {
        question: 'What does clearing cost in Burgenland?',
        answer: 'Costs depend on scope. Thanks to short travel from Vienna, costs are often cheaper than expected.'
      },
    ],
  },
];
