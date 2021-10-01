import { useDispatch, useSelector } from 'react-redux';
import { notificationsRead } from './slice';
import { selectEntities, selectError, selectStatus } from './slice';

export const useNotifications = () => {
  const entities = useSelector(selectEntities);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const isIdle = status === 'idle';
  const isLoading = status === 'loading';
  const isSucceed = status === 'succeeded';
  const isFailed = status === 'failed';
  if (isIdle) {
    dispatch(notificationsRead());
  }
  return { entities, isIdle, isLoading, isSucceed, isFailed, error };
};
