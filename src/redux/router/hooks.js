import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { store } from 'src/redux/store';

import { routeChanged } from 'src/redux/router/slice';

export const usePageViews = () => {
  const location = useLocation();
  useEffect(() => {
    store.dispatch(routeChanged.settled(location.pathname));
  }, [location]);
};
