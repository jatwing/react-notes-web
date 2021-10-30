import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  notificationsRead,
  selectEntities,
  selectError,
  selectStatus,
} from './slice';

export const useNotifications = () => {
  const entities = useSelector(selectEntities);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const isIdle = status === 'idle';
  const isLoading = status === 'loading';
  const isSucceed = status === 'succeeded';
  const isFailed = status === 'failed';
  const dispatch = useDispatch();
  useEffect(() => {
    if (isIdle) {
      dispatch(notificationsRead());
    }
  }, []);
  return { entities, isIdle, isLoading, isSucceed, isFailed, error };
};
