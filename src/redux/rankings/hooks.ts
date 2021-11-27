import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Ranking,
  rankingsRead,
  selectEntities,
  selectError,
  selectStatus,
} from './slice';

/**
 * TODO define a helper function to use the Ranking to sort
 *
 * for redux state, note thta immutability.
 */


export const useRankings = (): null | Ranking => {
  const entities = useSelector(selectEntities);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (status === 'idle' && !error) {
      dispatch(rankingsRead());
    }
  });
  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error])
  if (status !== 'settled' || error) {
    return null;
  }
  return entities;
};
