import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useRankings,  useRankingSort } from 'src/redux/rankings/hooks';


import {
  pagesSelected,
  selectData,
} from './slice';


/**
 * should it aware of the translated file loaded????
 * i18n/18nResourcesAdded/settled
 */



export const usePagesSelected = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  dispatch(pagesSelected(location.pathname));
};

export const usePages = () => {
  useRankings();
  usePagesSelected();
  return useSelector(selectData);
};
