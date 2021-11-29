import { useSelector } from 'react-redux';

import {
  ChangeLanguage,
  Localize,
  selectFixedTranslation,
  selectLanguage,
  selectLanguageChanged,
  selectLocalization,
  selectSupportedLangauges,
  selectTranslation,
  Translate,
} from './slice';

export const useTranslation = (): null | Translate =>
  useSelector(selectTranslation);

export const useLocalization = (): null | Localize =>
  useSelector(selectLocalization);

export const useLanguageSwitcher = (): {
  language: null | string;
  supportedLanguages: null | ReadonlyArray<string>;
  changeLanguage: null | ChangeLanguage;
  fixedT: null | Translate;
} => {
  const language = useSelector(selectLanguage);
  const supportedLanguages = useSelector(selectSupportedLangauges);
  const changeLanguage = useSelector(selectLanguageChanged);
  const fixedT = useSelector(selectFixedTranslation);
  return {
    language,
    supportedLanguages,
    changeLanguage,
    fixedT,
  };
};
