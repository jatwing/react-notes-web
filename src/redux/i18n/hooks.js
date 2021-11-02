import { selectTranslation, selectLocalization } from './slice';
import { useSelector } from 'react-redux';

export const useTranslation = () => useSelector(selectTranslation);

export const useLocalization = () => useSelector(selectLocalization);
