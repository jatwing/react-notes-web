import { PageItemNode } from 'lib/pages';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
// import { useRankings } from 'redux/rankings/hooks';
import { store } from 'redux/store';

import {
  routeChanged,
  selectAdjacentPages,
  selectMatchedPage,
  selectPages,
  selectSelectedPages,
  selectStatus,
} from './slice';

export const usePages = (): null | PageItemNode => {
  const entities = useSelector(selectPages);
  const status = useSelector(selectStatus);
  /**
   * try to do that in sagas.
   */
  //useRankings();
  if (status !== 'settled') {
    return null;
  }
  return entities;
};

export const useMatchedPage = (): null | PageItemNode =>
  useSelector(selectMatchedPage);

export const useSelectedPages = (): ReadonlyArray<PageItemNode> =>
  useSelector(selectSelectedPages);

export const useAdjacentPages = (): ReadonlyArray<null | PageItemNode> =>
  useSelector(selectAdjacentPages);

export const usePageViews = (): void => {
  const location = useLocation();
  useEffect(() => {
    store.dispatch(routeChanged(location.pathname));
  }, [location]);
};

export const useDocumentTitle = (): void => {
  const matchedPage = useMatchedPage();
  /**
   * FIXME the type in slice is wrong.
   */

  // document.title = matchedPage?.name ?? '';
};
