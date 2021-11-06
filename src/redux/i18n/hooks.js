import { useSelector } from 'react-redux';

import {
  selectLocalization,
  selectTranslation,
  selectLanguage,
  selectLangauges,
  selectLanguageChanged,
} from './slice';

export const useTranslation = () => useSelector(selectTranslation);

export const useLocalization = () => useSelector(selectLocalization);

export const useLanguageSwitcher = () => {
  const language = useSelector(selectLanguage);
  const languages = useSelector(selectLangauges);
  const changeLanguage = useSelector(selectLanguageChanged);
  return {
    language,
    languages,
    changeLanguage,
  };
};
