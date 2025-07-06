import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enWelcome from '../locales/en/welcome.json';
import esWelcome from '../locales/es/welcome.json';

const resources = {
  en: {
    welcome: enWelcome,
  },
  es: {
    welcome: esWelcome,
  },
};

const initI18n = async () => {
  let savedLanguage = 'en'; // Default to English
  
  try {
    // You can implement AsyncStorage here later for language persistence
    // For now, we'll use device locale detection
    const locales = Localization.getLocales();
    const deviceLocale = locales[0]?.languageCode || 'en';
    const supportedLanguages = ['en', 'es'];
    
    if (supportedLanguages.includes(deviceLocale)) {
      savedLanguage = deviceLocale;
    }
  } catch (error) {
    console.log('Error detecting device locale:', error);
  }

  i18n
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v4',
      resources,
      lng: savedLanguage,
      fallbackLng: 'en',
      debug: __DEV__,
      
      interpolation: {
        escapeValue: false, // React already does escaping
      },
      
      react: {
        useSuspense: false,
      },
    });

  return i18n;
};

export default initI18n; 