import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Ranking,
  pagesRankingsRead,
  columnsRankingsRead,
  selectSortation,
  selectError,
  selectStatus,
  getCategoryRankingsRead,
  Category,
} from './slice';
import { Sort } from './utils';

export const useRankings = (category: Category): null | Sort => {
  const sort = useSelector(selectSortation(category));
  const status = useSelector(selectStatus(category));
  const error = useSelector(selectError(category));
  const dispatch = useDispatch();
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (status === 'idle' && !error) {
      dispatch(getCategoryRankingsRead(category)());
    }
  });
  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);
  if (status !== 'settled' || error) {
    return null;
  }
  return sort;
};
