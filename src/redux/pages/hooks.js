import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useRankings } from 'src/redux/rankings/hooks';
import { store } from 'src/redux/store';

import {
  routeChanged,
  selectAdjacentPages,
  selectMatchedPage,
  selectPages,
  selectSelectedPages,
} from './slice';

export const usePages = () => {
  useRankings();
  return useSelector(selectPages);
};

export const useMatchedPage = () => useSelector(selectMatchedPage);

export const useSelectedPages = () => useSelector(selectSelectedPages);

export const useAdjacentPages = () => useSelector(selectAdjacentPages);

export const usePageViews = () => {
  const location = useLocation();
  const matchedPage = useMatchedPage();
  useEffect(() => {
    store.dispatch(routeChanged(location.pathname));
  }, [location]);
  useEffect(() => {
    //   document.title = matchedPage?.name ?? '';
  }, [matchedPage]);
};
