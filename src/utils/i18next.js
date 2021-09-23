import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { readDocuments } from 'src/utils/firebase';

const languages = ['en-US', 'zh-TW']
const namespaces = ['translation']
const resources = {
  'en-US': {
    'translation': {
      'error': 'Error!',
      'loading': 'Loading...'
    }
  }
};

const options = {
  /** logging */
  debug: process.env.NODE_ENV === 'development',
  /** languages */
  supportedLngs: languages,
  fallbackLng: languages[0],
  load: 'currentOnly',
  /** namespaces */
  ns: namespaces,
  defaultNS: namespaces[0],
  fallbackNS: namespaces[0],
  /** resources */
  resources,
  /** translation defaults */
  interpolation: {
    escapeValue: false,
  },
  /** react i18next */
  react: {
    bindI18nStore: 'added',
    useSuspense: false,
  },
}

const callback = async (error, t) => {
  !!error && console.error(error);
  for (const language of languages) {
    for (const namespace of namespaces) {
      const resources = await readDocuments(
        `translations/${language}/${namespace}`
      )();
      i18n.addResources(language, namespace, resources[0]);
    }
  }
};

i18n.use(LanguageDetector).use(initReactI18next).init(options, callback);

export default i18n;
