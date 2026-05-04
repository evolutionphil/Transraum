export function updateMetaTags(config: {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: string;
  keywords?: string;
  language?: 'de' | 'en';
  alternateUrls?: { de: string; en: string };
}) {
  const baseUrl = window.location.origin;
  const fullUrl = `${baseUrl}${config.url}`;
  const defaultImage = `${baseUrl}/og-image.jpg`;
  const language = config.language || 'de';
  const locale = language === 'de' ? 'de_AT' : 'en_US';

  document.title = config.title;
  document.documentElement.lang = language;

  const metaTags = [
    { name: 'description', content: config.description },
    { property: 'og:title', content: config.title },
    { property: 'og:description', content: config.description },
    { property: 'og:url', content: fullUrl },
    { property: 'og:type', content: config.type || 'website' },
    { property: 'og:image', content: config.image || defaultImage },
    { property: 'og:site_name', content: 'Transraum' },
    { property: 'og:locale', content: locale },
    { property: 'og:locale:alternate', content: language === 'de' ? 'en_US' : 'de_AT' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: config.title },
    { name: 'twitter:description', content: config.description },
    { name: 'twitter:image', content: config.image || defaultImage },
  ];

  if (config.keywords) {
    metaTags.push({ name: 'keywords', content: config.keywords });
  }

  metaTags.forEach(({ name, property, content }) => {
    const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
    let element = document.querySelector(selector);

    if (!element) {
      element = document.createElement('meta');
      if (name) element.setAttribute('name', name);
      if (property) element.setAttribute('property', property);
      document.head.appendChild(element);
    }

    element.setAttribute('content', content);
  });

  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = fullUrl;

  document.querySelectorAll('link[rel="alternate"]').forEach(el => el.remove());

  if (config.alternateUrls) {
    const hreflangDe = document.createElement('link');
    hreflangDe.rel = 'alternate';
    hreflangDe.hreflang = 'de';
    hreflangDe.href = `${baseUrl}${config.alternateUrls.de}`;
    document.head.appendChild(hreflangDe);

    const hreflangEn = document.createElement('link');
    hreflangEn.rel = 'alternate';
    hreflangEn.hreflang = 'en';
    hreflangEn.href = `${baseUrl}${config.alternateUrls.en}`;
    document.head.appendChild(hreflangEn);

    const hreflangXDefault = document.createElement('link');
    hreflangXDefault.rel = 'alternate';
    hreflangXDefault.hreflang = 'x-default';
    hreflangXDefault.href = `${baseUrl}${config.alternateUrls.de}`;
    document.head.appendChild(hreflangXDefault);
  }
}

export function addJsonLd(data: Record<string, unknown>, id?: string) {
  if (id) {
    const existing = document.getElementById(id);
    if (existing) {
      existing.remove();
    }
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  if (id) {
    script.id = id;
  }
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

export function addMultipleJsonLd(dataArray: Record<string, unknown>[], schemaId: string = 'page-schemas') {
  const existingScripts = document.querySelectorAll(`script[data-schema-group="${schemaId}"]`);
  existingScripts.forEach(script => script.remove());

  dataArray.forEach((data, index) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema-group', schemaId);
    script.setAttribute('data-schema-index', String(index));
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  });
}

export function getLocalBusinessSchema(language: 'de' | 'en' = 'de') {
  return {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    '@id': 'https://transraum.com/#business',
    'name': 'Transraum',
    'alternateName': 'Transraum Räumung',
    'slogan': language === 'de'
      ? 'Professionelle Räumung - Schnell, zuverlässig, fair'
      : 'Professional Clearing - Fast, reliable, fair',
    'description': language === 'de'
      ? 'Professionelle Räumung und Transportdienste in Wien und ganz Österreich. Über 26 Jahre Erfahrung. Schnell, zuverlässig und zu fairen Preisen.'
      : 'Professional clearing and transport services in Vienna and throughout Austria. Over 26 years of experience. Fast, reliable, and at fair prices.',
    'url': 'https://transraum.com',
    'telephone': '+43 660 6926375',
    'foundingDate': '1998',
    'priceRange': language === 'de' ? 'Faire Preise auf Anfrage' : 'Fair prices on request',
    'currenciesAccepted': 'EUR',
    'paymentAccepted': language === 'de' 
      ? 'Bar, Banküberweisung, Kreditkarte'
      : 'Cash, Bank Transfer, Credit Card',
    'image': 'https://transraum.com/og-image.jpg',
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://transraum.com/logo.png',
    },
    'knowsAbout': language === 'de'
      ? [
          'Wohnungsräumung',
          'Haushaltsauflösung',
          'Kellerräumung',
          'Entrümpelung',
          'Möbeltransport',
          'Entrümpelung',
          'Nachlassräumung',
          'Gewerbliche Räumung'
        ]
      : [
          'Apartment clearing',
          'Household dissolution',
          'Basement clearing',
          'Decluttering',
          'Furniture transport',
          'Recycling',
          'Estate clearing',
          'Commercial clearing'
        ],
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Gewerbeparkstraße 21/23',
      'addressLocality': 'Strasshof an der Nordbahn',
      'addressRegion': 'Niederösterreich',
      'postalCode': '2231',
      'addressCountry': 'AT',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 48.3170,
      'longitude': 16.6430,
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '08:00',
        'closes': '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Saturday', 'Sunday'],
        'opens': '08:00',
        'closes': '18:00',
      },
    ],
    'availableChannel': {
      '@type': 'ServiceChannel',
      'serviceUrl': 'https://transraum.com/de/kontakt',
      'servicePhone': '+43 660 6926375',
      'availableLanguage': ['de', 'en'],
    },
    'areaServed': [
      {
        '@type': 'City',
        'name': 'Wien',
        'description': 'Alle 23 Wiener Bezirke',
      },
      {
        '@type': 'State',
        'name': 'Niederösterreich',
      },
      {
        '@type': 'State',
        'name': 'Burgenland',
      },
      {
        '@type': 'State',
        'name': 'Oberösterreich',
      },
      {
        '@type': 'State',
        'name': 'Steiermark',
      },
      {
        '@type': 'State',
        'name': 'Kärnten',
      },
      {
        '@type': 'State',
        'name': 'Salzburg',
      },
      {
        '@type': 'State',
        'name': 'Tirol',
      },
      {
        '@type': 'State',
        'name': 'Vorarlberg',
      },
    ],
    'sameAs': [
      'https://www.facebook.com/transraum',
      'https://www.instagram.com/transraum',
      'https://www.google.com/maps?cid=transraum',
    ],
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '156',
      'bestRating': '5',
      'worstRating': '1',
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': language === 'de' ? 'Räumungsdienste' : 'Clearing Services',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': language === 'de' ? 'Wohnungsräumung' : 'Apartment Clearing',
            'description': language === 'de' 
              ? 'Professionelle Räumung von Wohnungen in Wien und ganz Österreich'
              : 'Professional clearing of apartments in Vienna and throughout Austria',
          },
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': language === 'de' ? 'Haushaltsauflösung' : 'Household Dissolution',
            'description': language === 'de'
              ? 'Komplette Auflösung von Haushalten mit Transport und Verwertung'
              : 'Complete dissolution of households with transport and recycling',
          },
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': language === 'de' ? 'Kellerräumung' : 'Basement Clearing',
            'description': language === 'de'
              ? 'Entrümpelung von Kellern, Dachböden und Lagerräumen'
              : 'Clearing of basements, attics and storage rooms',
          },
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': language === 'de' ? 'Geschäftsräumung' : 'Commercial Clearing',
            'description': language === 'de'
              ? 'Räumung von Büros, Geschäftslokalen und Gewerbeflächen'
              : 'Clearing of offices, commercial premises and business spaces',
          },
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': language === 'de' ? 'Messieräumung' : 'Hoarding Cleanup',
            'description': language === 'de'
              ? 'Diskrete und professionelle Messie-Entrümpelung'
              : 'Discreet and professional hoarding cleanup',
          },
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': language === 'de' ? 'Nachlassräumung' : 'Estate Clearing',
            'description': language === 'de'
              ? 'Sensible Räumung von Nachlässen und Erbschaften'
              : 'Sensitive clearing of estates and inheritances',
          },
        },
      ],
    },
    'potentialAction': [
      {
        '@type': 'CallAction',
        'name': language === 'de' ? 'Anrufen' : 'Call',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': 'tel:+436606926375',
        },
      },
      {
        '@type': 'ReserveAction',
        'name': language === 'de' ? 'Termin anfragen' : 'Request Appointment',
        'target': {
          '@type': 'EntryPoint',
          'urlTemplate': 'https://transraum.com/de/kontakt',
        },
      },
    ],
  };
}

export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `https://transraum.com${item.url}`,
    })),
  };
}

export function getCollectionPageSchema(
  language: 'de' | 'en',
  config: {
    name: string;
    description: string;
    url: string;
    itemType?: 'Service' | 'Place' | 'AdministrativeArea';
    items: Array<{
      name: string;
      description: string;
      url: string;
    }>;
  }
) {
  const itemType = config.itemType || 'Service';
  const isServiceType = itemType === 'Service';

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': config.name,
    'description': config.description,
    'url': `https://transraum.com${config.url}`,
    'inLanguage': language,
    'isPartOf': {
      '@type': 'WebSite',
      'name': 'Transraum',
      'url': 'https://transraum.com',
    },
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': config.items.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'item': {
          '@type': itemType,
          'name': item.name,
          'description': item.description,
          'url': `https://transraum.com${item.url}`,
          ...(isServiceType && {
            'provider': {
              '@type': 'MovingCompany',
              'name': 'Transraum',
              'url': 'https://transraum.com',
            },
          }),
        },
      })),
    },
  };
}

export function getWebPageSchema(
  language: 'de' | 'en',
  config: {
    type: 'WebPage' | 'AboutPage' | 'ContactPage' | 'FAQPage';
    name: string;
    description: string;
    url: string;
  }
) {
  return {
    '@context': 'https://schema.org',
    '@type': config.type,
    'name': config.name,
    'description': config.description,
    'url': `https://transraum.com${config.url}`,
    'inLanguage': language,
    'isPartOf': {
      '@type': 'WebSite',
      'name': 'Transraum',
      'url': 'https://transraum.com',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Transraum',
      'url': 'https://transraum.com',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://transraum.com/logo.png',
      },
    },
  };
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://transraum.com/#organization',
    'name': 'Transraum',
    'url': 'https://transraum.com',
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://transraum.com/logo.png',
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+43 660 6926375',
      'contactType': 'customer service',
      'areaServed': 'AT',
      'availableLanguage': ['de', 'en'],
      'contactOption': 'TollFree',
    },
  };
}
