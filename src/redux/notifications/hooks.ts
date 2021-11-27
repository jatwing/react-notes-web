import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Notification,
  notificationsRead,
  selectEntities,
  selectError,
  selectStatus,
} from './slice';

export const useNotifications = (): null | Array<Notification> => {
  const entities = useSelector(selectEntities);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (status === 'idle' && !error) {
      dispatch(notificationsRead());
    }
  }, []);
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
