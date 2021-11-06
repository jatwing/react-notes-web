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
  /** translation defaults */
  interpolation: {
    escapeValue: false,
  },
  /** react i18next */
  react: {
    bindI18nStore: 'added',
    useSuspense: false,
  },
};

const callback = async (error) => {
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
  store.dispatch(resourcesAdded(i18n));
};


i18n.on('initialized', () => {
  store.dispatch(instanceInitialized(i18n));
});

i18n.on('languageChanged', () => {
  store.dispatch(languageChanged(i18n));
});

i18n.use(LanguageDetector).use(initReactI18next).init(options, callback);

export default i18n;
