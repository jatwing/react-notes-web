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
    if (status === 'idle') {
      dispatch(notificationsRead());
    }
  }, []);
  if (error) {
    console.error(error);
    return;
  }
  const areAvailable = status === 'settled';
  return { entities, areAvailable };
};
