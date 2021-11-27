import { i18n, TFunction } from 'i18next';
import { useSelector } from 'react-redux';

import {
  LFunction,
  selectFixedTranslation,
  selectLanguage,
  selectLanguageChanged,
  selectLocalization,
  selectSupportedLangauges,
  selectTranslation,
} from './slice';

export const useTranslation = (): null | TFunction =>
  useSelector(selectTranslation);

export const useLocalization = (): null | LFunction =>
  useSelector(selectLocalization);

export const useLanguageSwitcher = (): {
  language: null | string;
  supportedLanguages: null | ReadonlyArray<string>;
  changeLanguage: null | i18n['changeLanguage'];
  fixedT: null | TFunction;
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
