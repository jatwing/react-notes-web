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
  const dispatch = useDispatch();
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
  const areAvailable = status === 'settled' && !error;
  return { entities, areAvailable };
};
