import axios from 'axios';
import instance, { InitOptions } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import {
  instanceInitialized,
  languageChanged,
  resourcesAdded,
} from 'redux/i18n/slice';
import { store } from 'redux/store';

/** initialization */
const options: InitOptions = {
  /** logging */
  debug: process.env.NODE_ENV === 'development',
  /** languages */
  supportedLngs: ['en-US', 'zh-TW'],
  fallbackLng: 'en-US',
  load: 'currentOnly',
  /** namespaces */
  ns: ['translation'],
  defaultNS: 'translation',
  fallbackNS: 'translation',
  /** resources */
  resources: {},
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

const callback = async (error: any): Promise<void> => {
  if (error) {
    console.error(error);
  }
  try {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + '/translations',
    );
    response?.data?.forEach(
      (translation: {
        language: string;
        namespace: string;
        resources: ReadonlyArray<string>;
      }) => {
        instance.addResources(
          translation.language,
          translation.namespace,
          translation.resources,
        );
      },
    );
    store.dispatch(resourcesAdded(instance));
  } catch (error) {
    console.error(error);
  }
};

instance.on('initialized', () => {
  store.dispatch(instanceInitialized(instance));
});

instance.on('languageChanged', () => {
  store.dispatch(languageChanged(instance));
});

/* eslint-disable import/no-named-as-default-member */
instance.use(LanguageDetector).use(initReactI18next).init(options, callback);

export default instance;
