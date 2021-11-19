import { useSelector } from 'react-redux';

import {
  selectFixedTranslation,
  selectLanguage,
  selectLanguageChanged,
  selectLocalization,
  selectSupportedLangauges,
  selectTranslation,
} from './slice';

export const useTranslation = () => useSelector(selectTranslation);

export const useLocalization = () => useSelector(selectLocalization);

export const useLanguageSwitcher = () => {
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
