import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { routeChanged } from 'src/redux/router/slice';
import { store } from 'src/redux/store';

export const usePageViews = () => {
  const location = useLocation();
  useEffect(() => {
    store.dispatch(routeChanged.settled(location.pathname));
  }, [location]);
};
