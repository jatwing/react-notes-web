import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  pagesTranslated,
  pagesSorted,
  pagesSelected,
  selectData,
} from './slice';
import { useRankingSort } from 'src/redux/rankings/hooks';
import { useLocation } from 'react-router-dom';

export const usePagesTranslated = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  dispatch(pagesTranslated(t));
};

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
  usePagesTranslated();
  usePagesSorted();
  usePagesSelected();
  return useSelector(selectData);
};
