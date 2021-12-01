import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Ranking,
  pagesRankingsRead,
  selectPagesEntities,
  selectPagesError,
  selectPagesStatus,
} from './slice';

/**
 * TODO define a helper function to use the Ranking to sort
 *
 * for redux state, note thta immutability.
 */

export const usePagesRankings = (): null | ReadonlyArray<Ranking> => {
  const entities = useSelector(selectPagesEntities);

  // directly get sort here

  const status = useSelector(selectPagesStatus);
  const error = useSelector(selectPagesError);
  const dispatch = useDispatch();
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (status === 'idle' && !error) {
      dispatch(pagesRankingsRead());
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
  return entities;
};
