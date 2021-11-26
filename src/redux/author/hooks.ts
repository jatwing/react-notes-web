import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Author,
  authorRead,
  selectEntity,
  selectError,
  selectStatus,
} from './slice';

export const useAuthor = (): null | Author => {
  const entity = useSelector(selectEntity);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (status === 'idle' && !error) {
      dispatch(authorRead());
    }
  }, []);
  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);
  if (status !== 'fulfilled' || error) {
    return null;
  }
  return entity;
};
