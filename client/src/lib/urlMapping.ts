import { servicesData, ServiceId } from '@/data/services';

export type Language = 'de' | 'en';

interface RouteConfig {
  de: string;
  en: string;
}

export const routeMapping: Record<string, RouteConfig> = {
  home: { de: '/de', en: '/en' },
  services: { de: '/de/leistungen', en: '/en/services' },
  districts: { de: '/de/bezirke', en: '/en/districts' },
  bundeslaender: { de: '/de/bundeslaender', en: '/en/federal-states' },
  contact: { de: '/de/kontakt', en: '/en/contact' },
  datenschutz: { de: '/de/datenschutz', en: '/en/privacy-policy' },
  impressum: { de: '/de/impressum', en: '/en/imprint' },
  agb: { de: '/de/agb', en: '/en/terms' },
  faq: { de: '/de/faq', en: '/en/faq' },
  shop: { de: '/de/pakete', en: '/en/packages' },
  blog: { de: '/de/blog', en: '/en/blog' },
};

const serviceSlugMap: Record<string, string> = {
  'wohnungsraeumungen': 'apartment-clearing',
  'haushaltsaufloesung': 'household-dissolution',
  'kellerraeumung': 'basement-clearing',
  'dachbodenraeumung': 'attic-clearing',
  'geschaeftsraeumung': 'commercial-clearing',
  'messie-raeumung': 'hoarding-clearing',
  'sperrmullabholung': 'bulky-waste-collection',
  'umzugsservice': 'moving-service',
  'garageraeumung': 'garage-clearing',
  'bueroaufloesung': 'office-dissolution',
  'verlassenschaftsraeumung': 'estate-clearing',
  'container-service': 'container-service',
  'erbstuecksankauf': 'heirloom-purchase',
  'goldankauf': 'gold-purchase',
  'teppichankauf': 'carpet-purchase',
  'bilderankauf': 'painting-purchase',
  'antikwarenankauf': 'antique-purchase',
};

const reverseServiceSlugMap = Object.fromEntries(
  Object.entries(serviceSlugMap).map(([k, v]) => [v, k])
);

const regionTypeToEnglish: Record<string, string> = {
  'bezirk': 'district',
  'bundesland': 'federal-state',
  'stadt': 'city',
};

const regionTypeToGerman: Record<string, string> = {
  'district': 'bezirk',
  'federal-state': 'bundesland',
  'city': 'stadt',
};

export function getLocalizedPath(basePath: string, language: Language): string {
  if (basePath === '/' || basePath === '/de' || basePath === '/en') {
    return language === 'de' ? '/de' : '/en';
  }

  const pathWithoutLang = basePath.replace(/^\/(de|en)/, '');
  
  const pathMappings: Record<string, RouteConfig> = {
    '/leistungen': routeMapping.services,
    '/services': routeMapping.services,
    '/bezirke': routeMapping.districts,
    '/districts': routeMapping.districts,
    '/bundeslaender': routeMapping.bundeslaender,
    '/federal-states': routeMapping.bundeslaender,
    '/kontakt': routeMapping.contact,
    '/contact': routeMapping.contact,
    '/datenschutz': routeMapping.datenschutz,
    '/privacy-policy': routeMapping.datenschutz,
    '/impressum': routeMapping.impressum,
    '/imprint': routeMapping.impressum,
    '/agb': routeMapping.agb,
    '/terms': routeMapping.agb,
    '/faq': routeMapping.faq,
    '/pakete': routeMapping.shop,
    '/packages': routeMapping.shop,
    '/blog': routeMapping.blog,
  };

  for (const [path, config] of Object.entries(pathMappings)) {
    if (pathWithoutLang.startsWith(path)) {
      const remainder = pathWithoutLang.slice(path.length);
      if (remainder) {
        if (path === '/leistungen' || path === '/services') {
          // Check if this is a 3-level service-location path
          // Format: /leistungen/serviceSlug/regionType/regionSlug
          // Filter empty strings to handle trailing slashes
          const parts = remainder.slice(1).split('/').filter(p => p.length > 0);
          
          if (parts.length === 3) {
            // Service-location page
            const [serviceSlug, regionType, regionSlug] = parts;
            
            // Translate service slug
            let translatedServiceSlug = serviceSlug;
            if (language === 'en' && serviceSlugMap[serviceSlug]) {
              translatedServiceSlug = serviceSlugMap[serviceSlug];
            } else if (language === 'de' && reverseServiceSlugMap[serviceSlug]) {
              translatedServiceSlug = reverseServiceSlugMap[serviceSlug];
            }
            
            // Translate region type based on target language
            let translatedRegionType = regionType;
            if (language === 'en' && regionTypeToEnglish[regionType]) {
              translatedRegionType = regionTypeToEnglish[regionType];
            } else if (language === 'de' && regionTypeToGerman[regionType]) {
              translatedRegionType = regionTypeToGerman[regionType];
            }
            
            // Region slug stays the same (language-neutral)
            return `${config[language]}/${translatedServiceSlug}/${translatedRegionType}/${regionSlug}`;
          } else if (parts.length === 1) {
            // Regular service page (2-level)
            const slug = parts[0];
            let translatedSlug = slug;
            if (language === 'en' && serviceSlugMap[slug]) {
              translatedSlug = serviceSlugMap[slug];
            } else if (language === 'de' && reverseServiceSlugMap[slug]) {
              translatedSlug = reverseServiceSlugMap[slug];
            }
            return `${config[language]}/${translatedSlug}`;
          }
        }
        return `${config[language]}${remainder}`;
      }
      return config[language];
    }
  }

  return `/${language}${pathWithoutLang}`;
}

export function getLanguageFromPath(pathname: string): Language {
  if (pathname.startsWith('/en')) return 'en';
  if (pathname.startsWith('/de')) return 'de';
  return 'de';
}

export function getPathWithoutLanguage(pathname: string): string {
  return pathname.replace(/^\/(de|en)/, '') || '/';
}

export function getAlternateUrls(pathname: string): { de: string; en: string } {
  const currentLang = getLanguageFromPath(pathname);
  const pathWithoutLang = getPathWithoutLanguage(pathname);
  
  return {
    de: getLocalizedPath(pathWithoutLang, 'de'),
    en: getLocalizedPath(pathWithoutLang, 'en'),
  };
}

export function getLocalizedHomePath(language: Language): string {
  return routeMapping.home[language];
}

export function getLocalizedContactPath(language: Language): string {
  return routeMapping.contact[language];
}

export function getLocalizedDistrictsPath(language: Language, slug?: string): string {
  const base = routeMapping.districts[language];
  return slug ? `${base}/${slug}` : base;
}

export function getLocalizedBundeslaenderPath(language: Language, slug?: string, citySlug?: string): string {
  const base = routeMapping.bundeslaender[language];
  if (!slug) return base;
  return citySlug ? `${base}/${slug}/${citySlug}` : `${base}/${slug}`;
}

export function getLocalizedServicesPath(language: Language): string {
  return routeMapping.services[language];
}

export function getLocalizedServicePath(serviceId: ServiceId, language: Language): string {
  const service = servicesData.find(s => s.id === serviceId);
  if (!service) {
    console.warn(`Service not found for id: ${serviceId}`);
    return routeMapping.services[language];
  }
  const slug = service.slugs[language];
  return `${routeMapping.services[language]}/${slug}`;
}
