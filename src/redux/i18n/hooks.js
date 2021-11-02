import { useSelector } from 'react-redux';

import { selectLocalization, selectTranslation } from './slice';

export const useTranslation = () => useSelector(selectTranslation);

export const useLocalization = () => useSelector(selectLocalization);
