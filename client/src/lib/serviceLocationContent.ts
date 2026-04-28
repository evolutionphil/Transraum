import { ServiceId, servicesData } from '@/data/services';
import { viennaDistricts } from '@/data/districts';
import { states } from '@/data/states';
import { cities } from '@/data/cities';

export type RegionType = 'bezirk' | 'bundesland' | 'stadt';

export interface ServiceLocationContent {
  regionType: RegionType;
  regionSlug: string;
  serviceId: ServiceId;
  de: {
    headline: string;
    subheadline: string;
    intro: string;
    benefits: string[];
    stats?: {
      label: string;
      value: string;
    }[];
    landmarks: string[];
    neighborhoods: string[];
    faq: Array<{ question: string; answer: string }>;
  };
  en: {
    headline: string;
    subheadline: string;
    intro: string;
    benefits: string[];
    stats?: {
      label: string;
      value: string;
    }[];
    landmarks: string[];
    neighborhoods: string[];
    faq: Array<{ question: string; answer: string }>;
  };
}

// Template generator for service-location pages
export function generateServiceLocationContent(
  serviceId: ServiceId,
  regionType: RegionType,
  regionSlug: string
): ServiceLocationContent | null {
  const service = servicesData.find(s => s.id === serviceId);
  if (!service) return null;

  let region: any = null;
  let regionName = '';
  let regionNameEn = '';

  // Find the region based on type
  if (regionType === 'bezirk') {
    region = viennaDistricts[regionSlug];
    if (!region) return null;
    regionName = region.name;
    regionNameEn = region.nameEn || region.name;
  } else if (regionType === 'bundesland') {
    region = states.find(s => s.slug === regionSlug);
    if (!region) return null;
    regionName = region.name;
    regionNameEn = region.nameEn;
  } else if (regionType === 'stadt') {
    // Cities are organized by bundesland, need to search through all
    for (const bundeslandCities of Object.values(cities)) {
      const city = bundeslandCities.find((c: any) => c.slug === regionSlug);
      if (city) {
        region = city;
        regionName = city.name;
        regionNameEn = city.nameEn || city.name;
        break;
      }
    }
    if (!region) return null;
  }

  if (!region) return null;

  const serviceName = service.content.de.name;
  const serviceNameEn = service.content.en.name;

  // Generate headlines (40% location-specific)
  const headlineDE = `${serviceName} in ${regionName}`;
  const headlineEN = `${serviceNameEn} in ${regionNameEn}`;

  const subheadlineDE = regionType === 'bezirk'
    ? `Professionelle ${serviceName} im ${region.postalCode ? region.postalCode + ' ' : ''}${regionName} - Schnell, diskret und zuverlässig`
    : `${serviceName} in ${regionName} - Ihr Partner für professionelle Räumungsdienstleistungen`;

  const subheadlineEN = regionType === 'bezirk'
    ? `Professional ${serviceNameEn} in ${region.postalCode ? region.postalCode + ' ' : ''}${regionNameEn} - Fast, discreet, and reliable`
    : `${serviceNameEn} in ${regionNameEn} - Your partner for professional clearing services`;

  // Generate intro paragraph (60% evergreen + 40% location tokens)
  const introDE = generateIntroDE(serviceName, regionName, regionType, region);
  const introEN = generateIntroEN(serviceNameEn, regionNameEn, regionType, region);

  // Generate location-specific benefits
  const benefitsDE = generateBenefitsDE(service, region, regionType);
  const benefitsEN = generateBenefitsEN(service, region, regionType);

  // Generate stats if available
  const stats = generateStats(region, regionType);

  // Extract landmarks and neighborhoods
  const landmarks = region.landmarks || region.features?.slice(0, 6) || [];
  const landmarksEn = region.landmarksEn || region.featuresEn?.slice(0, 6) || landmarks;
  const neighborhoods = region.neighborhoods || region.cities?.slice(0, 6) || [];
  const neighborhoodsEn = region.neighborhoodsEn || region.citiesEn?.slice(0, 6) || neighborhoods;

  // Generate location-specific FAQ
  const faqDE = generateFAQDE(serviceName, regionName, regionType, region);
  const faqEN = generateFAQEN(serviceNameEn, regionNameEn, regionType, region);

  return {
    regionType,
    regionSlug,
    serviceId,
    de: {
      headline: headlineDE,
      subheadline: subheadlineDE,
      intro: introDE,
      benefits: benefitsDE,
      stats,
      landmarks,
      neighborhoods,
      faq: faqDE,
    },
    en: {
      headline: headlineEN,
      subheadline: subheadlineEN,
      intro: introEN,
      benefits: benefitsEN,
      stats,
      landmarks: landmarksEn,
      neighborhoods: neighborhoodsEn,
      faq: faqEN,
    },
  };
}

function generateIntroDE(serviceName: string, regionName: string, regionType: RegionType, region: any): string {
  const baseIntro = `Sie benötigen eine professionelle ${serviceName} in ${regionName}? Transraum ist Ihr zuverlässiger Partner mit über 26 Jahren Erfahrung. `;
  
  let locationSpecific = '';
  if (regionType === 'bezirk') {
    locationSpecific = `Wir kennen den ${region.postalCode || ''} ${regionName} mit ${region.characteristics?.[0] ? 'seinen ' + region.characteristics[0].toLowerCase() : 'all seinen Besonderheiten'} bestens. `;
    if (region.landmarks && region.landmarks.length > 0) {
      locationSpecific += `Von ${region.landmarks[0]} bis ${region.landmarks[region.landmarks.length - 1]} - wir sind in der gesamten Region für Sie im Einsatz. `;
    }
  } else if (regionType === 'bundesland') {
    locationSpecific = `In ${regionName} sind wir mit unserem erfahrenen Team in allen wichtigen Städten und Regionen tätig. `;
  } else {
    locationSpecific = `Unser lokales Team kennt ${regionName} und die Region bestens. `;
  }

  const closing = `Wir bieten Ihnen schnelle Termine, faire Festpreise und besenreine Übergabe. Kontaktieren Sie uns für eine kostenlose Besichtigung vor Ort.`;

  return baseIntro + locationSpecific + closing;
}

function generateIntroEN(serviceName: string, regionName: string, regionType: RegionType, region: any): string {
  const baseIntro = `Do you need professional ${serviceName} in ${regionName}? Transraum is your reliable partner with over 26 years of experience. `;
  
  let locationSpecific = '';
  if (regionType === 'bezirk') {
    locationSpecific = `We know ${region.postalCode || ''} ${regionName} with ${region.characteristicsEn?.[0] ? 'its ' + region.characteristicsEn[0].toLowerCase() : 'all its characteristics'} very well. `;
    if (region.landmarksEn && region.landmarksEn.length > 0) {
      locationSpecific += `From ${region.landmarksEn[0]} to ${region.landmarksEn[region.landmarksEn.length - 1]} - we are available throughout the entire region. `;
    }
  } else if (regionType === 'bundesland') {
    locationSpecific = `In ${regionName}, we operate with our experienced team in all major cities and regions. `;
  } else {
    locationSpecific = `Our local team knows ${regionName} and the surrounding area very well. `;
  }

  const closing = `We offer you quick appointments, fair fixed prices, and broom-clean handover. Contact us for a free on-site inspection.`;

  return baseIntro + locationSpecific + closing;
}

function generateBenefitsDE(service: any, region: any, regionType: RegionType): string[] {
  const serviceBenefits = service.content.de.benefits.slice(0, 3);
  const locationBenefits = region.whyChooseUs?.slice(0, 3) || [
    `Lokale Expertise in ${region.name || 'der Region'}`,
    'Schnelle Anfahrtszeiten',
    'Kenntnis der örtlichen Gegebenheiten',
  ];

  return [...serviceBenefits, ...locationBenefits];
}

function generateBenefitsEN(service: any, region: any, regionType: RegionType): string[] {
  const serviceBenefits = service.content.en.benefits.slice(0, 3);
  const locationBenefits = region.whyChooseUsEn?.slice(0, 3) || [
    `Local expertise in ${region.nameEn || region.name || 'the region'}`,
    'Quick response times',
    'Knowledge of local conditions',
  ];

  return [...serviceBenefits, ...locationBenefits];
}

function generateStats(region: any, regionType: RegionType): { label: string; value: string }[] | undefined {
  if (regionType === 'bezirk' && region.postalCode) {
    return [
      { label: 'PLZ', value: region.postalCode },
      { label: 'Einsätze 2024', value: '120+' },
      { label: 'Kundenzufriedenheit', value: '4.9/5' },
    ];
  }
  return undefined;
}

function generateFAQDE(serviceName: string, regionName: string, regionType: RegionType, region: any): Array<{ question: string; answer: string }> {
  const faq: Array<{ question: string; answer: string }> = [];

  // Question 1: Pricing
  faq.push({
    question: `Was kostet ${serviceName} in ${regionName}?`,
    answer: `Die Kosten für ${serviceName} in ${regionName} hängen vom Umfang ab. Nach einer kostenlosen Besichtigung vor Ort erstellen wir Ihnen ein transparentes Festpreisangebot. Kontaktieren Sie uns für eine unverbindliche Beratung.`,
  });

  // Question 2: Timing
  faq.push({
    question: `Wie schnell können Sie mit der ${serviceName} in ${regionName} beginnen?`,
    answer: `In den meisten Fällen können wir innerhalb von 24-48 Stunden mit der Arbeit beginnen. Bei dringenden Fällen bieten wir auch Same-Day-Service an. Rufen Sie uns an, um einen passenden Termin zu vereinbaren.`,
  });

  // Question 3: Area-specific
  if (regionType === 'bezirk' && region.faq && region.faq.length > 0) {
    faq.push(region.faq[0]);
  } else {
    faq.push({
      question: `Arbeiten Sie in ganz ${regionName}?`,
      answer: `Ja, wir sind in ganz ${regionName} tätig${region.cities ? ' und kennen alle wichtigen Stadtteile' : ''}. Unser Team kennt die lokalen Gegebenheiten und kann Sie optimal beraten.`,
    });
  }

  return faq;
}

function generateFAQEN(serviceName: string, regionName: string, regionType: RegionType, region: any): Array<{ question: string; answer: string }> {
  const faq: Array<{ question: string; answer: string }> = [];

  // Question 1: Pricing
  faq.push({
    question: `How much does ${serviceName} cost in ${regionName}?`,
    answer: `The cost of ${serviceName} in ${regionName} depends on the scope. After a free on-site inspection, we will provide you with a transparent fixed-price quote. Contact us for a non-binding consultation.`,
  });

  // Question 2: Timing
  faq.push({
    question: `How quickly can you start ${serviceName} in ${regionName}?`,
    answer: `In most cases, we can start work within 24-48 hours. For urgent cases, we also offer same-day service. Call us to arrange a suitable appointment.`,
  });

  // Question 3: Area-specific
  if (regionType === 'bezirk' && region.faqEn && region.faqEn.length > 0) {
    faq.push(region.faqEn[0]);
  } else {
    faq.push({
      question: `Do you work throughout ${regionName}?`,
      answer: `Yes, we operate throughout ${regionName}${region.citiesEn ? ' and know all important districts' : ''}. Our team knows the local conditions and can advise you optimally.`,
    });
  }

  return faq;
}

// Helper to get all service-location slugs for routing
export function getServiceLocationSlug(serviceSlug: string, regionType: RegionType, regionSlug: string): string {
  return `${serviceSlug}/${regionType}/${regionSlug}`;
}

// Helper to get service location URL
export function getServiceLocationPath(
  serviceSlug: string,
  regionType: RegionType,
  regionSlug: string,
  language: 'de' | 'en'
): string {
  const basePath = language === 'de' ? '/leistungen' : '/en/services';
  const regionTypeSlug = language === 'de' ? regionType : translateRegionType(regionType);
  return `${basePath}/${serviceSlug}/${regionTypeSlug}/${regionSlug}`;
}

function translateRegionType(regionType: RegionType): string {
  const map: Record<RegionType, string> = {
    bezirk: 'district',
    bundesland: 'federal-state',
    stadt: 'city',
  };
  return map[regionType];
}
