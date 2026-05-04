/**
 * IndexNow Protocol Implementation
 * 
 * IndexNow allows instant notification to search engines (Bing, Yandex, DuckDuckGo, etc.)
 * when content is created, updated, or deleted - without waiting for crawlers.
 * 
 * Supported engines: Bing, Yandex, DuckDuckGo, Naver, Seznam.cz, Yep
 * Note: Google does NOT support IndexNow (use Google Indexing API separately)
 */

export const INDEXNOW_CONFIG = {
  apiKey: '4360887d417651be8e892bc97ab0625dce0349081491ae37c119b83258d0df32',
  host: 'transraum.com',
  keyLocation: 'https://transraum.com/4360887d417651be8e892bc97ab0625dce0349081491ae37c119b83258d0df32.txt',
  endpoint: 'https://api.indexnow.org/indexnow',
  // Alternative Bing-specific endpoint: 'https://www.bing.com/indexnow'
};

interface IndexNowResponse {
  success: boolean;
  status: number;
  message: string;
}

/**
 * Submit a single URL to IndexNow
 */
export async function submitUrlToIndexNow(url: string): Promise<IndexNowResponse> {
  try {
    const payload = {
      host: INDEXNOW_CONFIG.host,
      key: INDEXNOW_CONFIG.apiKey,
      keyLocation: INDEXNOW_CONFIG.keyLocation,
      urlList: [url],
    };

    const response = await fetch(INDEXNOW_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Transraum-IndexNow/1.0',
      },
      body: JSON.stringify(payload),
    });

    const statusMessages: Record<number, string> = {
      200: 'URL successfully submitted to all search engines',
      202: 'URL received, key validation pending',
      400: 'Bad request - invalid URL format',
      403: 'Forbidden - API key validation failed',
      422: 'Unprocessable - URL does not match host',
      429: 'Too many requests - rate limit exceeded',
    };

    return {
      success: response.status === 200 || response.status === 202,
      status: response.status,
      message: statusMessages[response.status] || `Unexpected status: ${response.status}`,
    };
  } catch (error) {
    console.error('IndexNow submission error:', error);
    return {
      success: false,
      status: 502,
      message: error instanceof Error ? error.message : 'Network error - failed to reach IndexNow API',
    };
  }
}

/**
 * Submit multiple URLs to IndexNow (max 10,000 per request)
 */
export async function submitUrlsToIndexNow(urls: string[]): Promise<IndexNowResponse> {
  try {
    // IndexNow supports up to 10,000 URLs per request
    if (urls.length > 10000) {
      console.warn(`IndexNow: Truncating ${urls.length} URLs to 10,000 (max limit)`);
      urls = urls.slice(0, 10000);
    }

    const payload = {
      host: INDEXNOW_CONFIG.host,
      key: INDEXNOW_CONFIG.apiKey,
      keyLocation: INDEXNOW_CONFIG.keyLocation,
      urlList: urls,
    };

    const response = await fetch(INDEXNOW_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Transraum-IndexNow/1.0',
      },
      body: JSON.stringify(payload),
    });

    const statusMessages: Record<number, string> = {
      200: `${urls.length} URLs successfully submitted to all search engines`,
      202: `${urls.length} URLs received, key validation pending`,
      400: 'Bad request - invalid URL format',
      403: 'Forbidden - API key validation failed',
      422: 'Unprocessable - URLs do not match host',
      429: 'Too many requests - rate limit exceeded',
    };

    return {
      success: response.status === 200 || response.status === 202,
      status: response.status,
      message: statusMessages[response.status] || `Unexpected status: ${response.status}`,
    };
  } catch (error) {
    console.error('IndexNow batch submission error:', error);
    return {
      success: false,
      status: 502,
      message: error instanceof Error ? error.message : 'Network error - failed to reach IndexNow API',
    };
  }
}

/**
 * Submit entire sitemap to IndexNow
 * Useful for initial submission or major site updates
 */
export async function submitSitemapToIndexNow(): Promise<IndexNowResponse> {
  const baseUrl = `https://${INDEXNOW_CONFIG.host}`;
  
  // Core pages
  const coreUrls = [
    `${baseUrl}/`,
    `${baseUrl}/en`,
    `${baseUrl}/leistungen`,
    `${baseUrl}/en/services`,
    `${baseUrl}/bezirke`,
    `${baseUrl}/en/districts`,
    `${baseUrl}/bundeslaender`,
    `${baseUrl}/en/federal-states`,
    `${baseUrl}/faq`,
    `${baseUrl}/en/faq`,
    `${baseUrl}/kontakt`,
    `${baseUrl}/en/contact`,
  ];

  // Service pages (17 services x 2 languages = 34 URLs)
  const serviceUrls = [
    // German services
    `${baseUrl}/leistungen/wohnungsraeumungen`,
    `${baseUrl}/leistungen/haushaltsaufloesungen`,
    `${baseUrl}/leistungen/kellerraeumungen`,
    `${baseUrl}/leistungen/dachbodenraeumungen`,
    `${baseUrl}/leistungen/geschaeftsraeumungen`,
    `${baseUrl}/leistungen/messieraeumungen`,
    `${baseUrl}/leistungen/sperrmullabholung`,
    `${baseUrl}/leistungen/umzugsservice`,
    `${baseUrl}/leistungen/garageraeumungen`,
    `${baseUrl}/leistungen/buroaufloesungen`,
    `${baseUrl}/leistungen/verlassenschaftsraeumungen`,
    `${baseUrl}/leistungen/containerservice`,
    `${baseUrl}/leistungen/erbstuecksankauf`,
    `${baseUrl}/leistungen/goldankauf`,
    `${baseUrl}/leistungen/teppichankauf`,
    `${baseUrl}/leistungen/bilderankauf`,
    `${baseUrl}/leistungen/antikwarenankauf`,
    // English services
    `${baseUrl}/en/services/apartment-clearing`,
    `${baseUrl}/en/services/estate-clearing`,
    `${baseUrl}/en/services/basement-clearing`,
    `${baseUrl}/en/services/attic-clearing`,
    `${baseUrl}/en/services/office-clearing`,
    `${baseUrl}/en/services/hoarding-clearing`,
    `${baseUrl}/en/services/bulky-waste-collection`,
    `${baseUrl}/en/services/moving-service`,
    `${baseUrl}/en/services/garage-clearing`,
    `${baseUrl}/en/services/office-dissolution`,
    `${baseUrl}/en/services/probate-estate-clearing`,
    `${baseUrl}/en/services/container-service`,
    `${baseUrl}/en/services/heirloom-purchase`,
    `${baseUrl}/en/services/gold-purchase`,
    `${baseUrl}/en/services/carpet-purchase`,
    `${baseUrl}/en/services/painting-purchase`,
    `${baseUrl}/en/services/antiques-purchase`,
  ];

  // Top priority district pages (most searched)
  const districtUrls = [
    `${baseUrl}/bezirke/1010-wien-innere-stadt`,
    `${baseUrl}/bezirke/1020-wien-leopoldstadt`,
    `${baseUrl}/bezirke/1030-wien-landstrasse`,
    `${baseUrl}/bezirke/1040-wien-wieden`,
    `${baseUrl}/bezirke/1050-wien-margareten`,
    `${baseUrl}/bezirke/1060-wien-mariahilf`,
    `${baseUrl}/bezirke/1070-wien-neubau`,
    `${baseUrl}/bezirke/1080-wien-josefstadt`,
    `${baseUrl}/bezirke/1090-wien-alsergrund`,
    `${baseUrl}/bezirke/1100-wien-favoriten`,
  ];

  // Federal states (9 states x 2 languages = 18 URLs)
  const stateUrls = [
    // German states
    `${baseUrl}/bundeslaender/wien`,
    `${baseUrl}/bundeslaender/niederoesterreich`,
    `${baseUrl}/bundeslaender/oberoesterreich`,
    `${baseUrl}/bundeslaender/steiermark`,
    `${baseUrl}/bundeslaender/salzburg`,
    `${baseUrl}/bundeslaender/tirol`,
    `${baseUrl}/bundeslaender/kaernten`,
    `${baseUrl}/bundeslaender/vorarlberg`,
    `${baseUrl}/bundeslaender/burgenland`,
    // English states
    `${baseUrl}/en/federal-states/vienna`,
    `${baseUrl}/en/federal-states/lower-austria`,
    `${baseUrl}/en/federal-states/upper-austria`,
    `${baseUrl}/en/federal-states/styria`,
    `${baseUrl}/en/federal-states/salzburg`,
    `${baseUrl}/en/federal-states/tyrol`,
    `${baseUrl}/en/federal-states/carinthia`,
    `${baseUrl}/en/federal-states/vorarlberg`,
    `${baseUrl}/en/federal-states/burgenland`,
  ];

  // Top priority service+region combinations
  const topServiceRegionUrls = [
    // Wohnungsräumung + Top districts
    `${baseUrl}/leistungen/wohnungsraeumungen/bezirk/innere-stadt`,
    `${baseUrl}/leistungen/wohnungsraeumungen/bezirk/leopoldstadt`,
    `${baseUrl}/leistungen/wohnungsraeumungen/bezirk/landstrasse`,
    // Haushaltsauflösung + Top districts
    `${baseUrl}/leistungen/haushaltsaufloesungen/bezirk/innere-stadt`,
    `${baseUrl}/leistungen/haushaltsaufloesungen/bezirk/leopoldstadt`,
    // Kellerräumung + Top states
    `${baseUrl}/leistungen/kellerraeumungen/bundesland/niederoesterreich`,
    `${baseUrl}/leistungen/kellerraeumungen/bundesland/oberoesterreich`,
  ];

  const allUrls = [
    ...coreUrls,
    ...serviceUrls,
    ...districtUrls,
    ...stateUrls,
    ...topServiceRegionUrls,
  ];

  console.log(`IndexNow: Submitting ${allUrls.length} priority URLs to search engines...`);

  return await submitUrlsToIndexNow(allUrls);
}

/**
 * Utility: Log IndexNow response
 */
export function logIndexNowResponse(response: IndexNowResponse, context: string = '') {
  const emoji = response.success ? '✅' : '❌';
  const prefix = context ? `${context}: ` : '';
  
  console.log(`${emoji} IndexNow ${prefix}${response.message} (Status: ${response.status})`);
  
  return response;
}
