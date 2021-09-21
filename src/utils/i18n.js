import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { EN_US_TRANSLATION } from './locales/en-us/translation';
import { ZH_TW_TRANSLATION } from './locales/zh-tw/translation';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns: ['common'],
    defaultNS: 'common',

    debug: process.env.NODE_ENV === 'development',
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


// @check:     https://www.i18next.com/overview/api#addresource

const r = {
  'test': 'Test Hello World'
}
i18n.addResources('en-US', 'common',  r)


// test pass , 2 problems remain
//
// 1. overwrite and fallback for the local file
//
// 2. can we add them by async function and where should we do that?



export default i18n;
