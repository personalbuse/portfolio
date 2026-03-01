import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import es from '../i18n/es.json';
import en from '../i18n/en.json';

const translations = { es, en };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem('portfolio-lang');
    if (saved && (saved === 'es' || saved === 'en')) return saved;
    // Default to Spanish
    return 'es';
  });

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang);
    localStorage.setItem('portfolio-lang', lang);
    document.documentElement.lang = lang;
  }, []);

  // Set html lang attribute on mount
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // t() helper: access nested keys like 'about.title'
  const t = useCallback((key) => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
      if (result === undefined) return key;
      result = result[k];
    }
    return result !== undefined ? result : key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
