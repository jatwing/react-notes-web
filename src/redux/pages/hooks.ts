import { PageItemNode } from 'lib/pages';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { store } from 'redux/store';

import {
  selectAdjacentPages,
  selectMatchedPage,
  selectPages,
  selectSelectedPages,
  selectStatus,
  urlChanged,
} from './slice';

export const usePages = (): null | PageItemNode => {
  const entities = useSelector(selectPages);
  const status = useSelector(selectStatus);
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
    store.dispatch(urlChanged(location.pathname));
  }, [location]);
};

export const useDocumentTitle = (): void => {
  const matchedPage = useMatchedPage();
  useEffect(() => {
    if (!matchedPage) {
      return;
    }
    document.title = matchedPage.name;
  }, [matchedPage]);
};
