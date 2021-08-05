import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { EN_US_TRANSLATION } from './locales/en-us/translation';
import { ZH_TW_TRANSLATION } from './locales/zh-tw/translation';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      'en-US': {
        translation: EN_US_TRANSLATION,
      },
      'zh-TW': {
        translation: ZH_TW_TRANSLATION,
      },
    },
  });

export default i18n;
