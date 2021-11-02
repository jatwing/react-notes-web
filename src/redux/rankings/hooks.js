import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  rankingsRead,
  selectEntities,
  selectError,
  selectStatus,
} from './slice';

export const useRankings = () => {
  const entities = useSelector(selectEntities);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === 'idle') {
      dispatch(rankingsRead());
    }
  }, []);
  if (error) {
    console.error(error);
  }
  const isAvailable = status === 'settled';
  return { entities, isAvailable };
};
