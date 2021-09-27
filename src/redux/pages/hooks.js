import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useRankingSort } from 'src/redux/rankings/hooks';

import {
  pagesSelected,
  pagesSorted,
  pagesTranslated,
  selectData,
} from './slice';


/**
 * should it aware of the translated file loaded????
 * i18n/18nResourcesAdded/fulfilled
 */

export const usePagesTranslated = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  dispatch(pagesTranslated(t));
};

/**
 * it should be aware of ranking fetched
 *
 */


export const usePagesSorted = () => {
  const sort = useRankingSort();
  const dispatch = useDispatch();
  dispatch(pagesSorted(sort));
};

export const usePagesSelected = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  dispatch(pagesSelected(location.pathname));
};

export const usePages = () => {
  console.log('### use pages')


  /**
   * todo 
   *
   * CHANGE HERE
   *
   */

  usePagesTranslated();
  // usePagesSorted();
  usePagesSelected();
  return useSelector(selectData);
};
