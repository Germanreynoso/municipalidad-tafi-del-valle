import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonES from './locales/es/common.json';
import homeES from './locales/es/home.json';
import tourismES from './locales/es/tourism.json';
import municipalityES from './locales/es/municipality.json';
import commonEN from './locales/en/common.json';
import homeEN from './locales/en/home.json';
import tourismEN from './locales/en/tourism.json';
import municipalityEN from './locales/en/municipality.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        common: commonES,
        home: homeES,
        tourism: tourismES,
        municipality: municipalityES,
      },
      en: {
        common: commonEN,
        home: homeEN,
        tourism: tourismEN,
        municipality: municipalityEN,
      },
    },
    fallbackLng: 'es',
    ns: ['common', 'home', 'tourism', 'municipality'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
