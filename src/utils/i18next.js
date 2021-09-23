import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { readDocuments } from 'src/utils/firebase';

const options = {
  /** logging */
  debug: process.env.NODE_ENV === 'development',
  /** resources */
  resources: {
    'en-US': {
      translation: {
        'error': 'Error!',
        'loading': 'Loading...'
      }
    }
  },
  /** languages */
  fallbackLng: 'en-US',
  supportedLngs: ['en-US', 'zh-TW'],
  load: 'currentOnly',
  /** namespaces */
  ns: ['translation'],
  defaultNS: 'translation',
  fallbackNS: 'translation',
  /** translation defaults */
  interpolation: {
    escapeValue: false,
  },
  /** react i18next */
  react: {
    bindI18nStore: 'added',
  },
};

const callback = async (error, t) => {
  !!error && console.error(error);
  for (const language of options.supportedLngs) {
    for (const namespace of options.ns) {
      const resources = await readDocuments(
        `translations/${language}/${namespace}`
      )();
      i18n.addResources(language, namespace, resources[0]);
    }
  }
};

i18n.use(LanguageDetector).use(initReactI18next).init(options, callback);

export default i18n;
