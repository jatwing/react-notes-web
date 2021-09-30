import { useTranslation } from 'react-i18next';
import { languages } from 'src/lib/i18next'

/**
 * TODO maybe
 * re-rewrite t() and l()
 * to prevent re-rendering 
 */




export const useLocalization = () => {
  const { i18n } = useTranslation();
  const localize = (object) => {
    if (!object || !i18n || !('language' in i18n)) {
      return '';
    }
    if (i18n.language in object) {
      return object[i18n.language];
    }
    const fallbackLanguage = languages[0];
    if (fallbackLanguage in object) {
      return object[fallbackLanguage];
    }
    return '';
  };
  return localize;
};
