import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { store } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { useRankings } from 'src/redux/rankings/hooks';
import {
  selectPages,
  selectMatchedPage,
  selectSelectedPages,
  routeChanged,
} from './slice';

export const usePages = () => {
  useRankings();
  return useSelector(selectPages);
};

export const useMatchedPage = () => useSelector(selectMatchedPage);

export const useSelectedPages = () => useSelector(selectSelectedPages);

export const usePageViews = () => {
  const location = useLocation();
  useEffect(() => {
    store.dispatch(routeChanged(location.pathname));
  }, [location]);
};
