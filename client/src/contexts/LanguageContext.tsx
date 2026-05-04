import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { translations, type Language } from '@/lib/i18n';
import { getLanguageFromPath } from '@/lib/urlMapping';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.de;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const urlLanguage = getLanguageFromPath(location);
  // Always default to 'de' — German is the primary language
  const [language, setLanguageState] = useState<Language>(urlLanguage || 'de');

  useEffect(() => {
    const detectedLanguage = getLanguageFromPath(location);
    // Only update if URL explicitly contains /en or /de prefix
    const hasExplicitLang = location.startsWith('/en') || location.startsWith('/de');
    const newLang: Language = hasExplicitLang ? detectedLanguage : 'de';
    if (newLang !== language) {
      setLanguageState(newLang);
    }
  }, [location]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
