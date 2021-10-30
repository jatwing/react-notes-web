import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { authorRead, selectEntity, selectError, selectStatus } from './slice';

export const useAuthor = () => {
  const entity = useSelector(selectEntity);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const isIdle = status === 'idle';
  const isLoading = status === 'loading';
  const isSucceed = status === 'succeeded';
  const isFailed = status === 'failed';
  const dispatch = useDispatch();
  useEffect(() => {
    if (isIdle) {
      dispatch(authorRead());
    }
  }, []);
  return { entity, isIdle, isLoading, isSucceed, isFailed, error };
};
