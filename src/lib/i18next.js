import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { readDocuments } from 'src/lib/firebase';
import {
  instanceInitialized,
  languageChanged,
  resourcesAdded,
} from 'src/redux/i18n/slice';
import { store } from 'src/redux/store';

/** configurations */
const languages = ['en-US', 'zh-TW'];
const namespaces = ['translation'];

// TODO delete this section
const resources = {
  'en-US': {
    translation: {
      error: 'Error!',
      loading: 'Loading...',
    },
  },
};

/** initialization */
const options = {
  /** logging */
  debug: process.env.NODE_ENV === 'development',
  /** languages */
  supportedLngs: languages,
  fallbackLng: 'en-US',
  load: 'currentOnly',
  /** namespaces */
  ns: namespaces,
  defaultNS: 'translation',
  fallbackNS: 'translation',
  /** resources */
  resources,
  /** translation defaults */
  interpolation: {
    escapeValue: false,
  },
};

const callback = async (error, t) => {
  if (error) {
    console.error(error);
  }
  for (const language of languages) {
    for (const namespace of namespaces) {
      const resources = await readDocuments(
        `translations/${language}/${namespace}`
      )();
      if (!resources) {
        continue;
      }
      i18n.addResources(language, namespace, resources[0]);
    }
  }
  store.dispatch(resourcesAdded(i18n.t.bind(i18n)));
};

const localize = (i18n) => (texts) => {
  if (!texts) {
    return '';
  }
  return texts?.[i18n.language] || texts?.[i18n.options.fallbackLng] || '';
};

i18n.on('initialized', () => {
  store.dispatch(instanceInitialized(localize(i18n)));
});

i18n.on('languageChanged', () => {
  store.dispatch(
    languageChanged({
      t: i18n.t.bind(i18n),
      l: localize(i18n),
    })
  );
});

i18n.use(LanguageDetector).use(initReactI18next).init(options, callback);

export default i18n;
