import { useDispatch, useSelector } from 'react-redux';
import { selectEntities, selectStatus, selectError } from './slice';
import { authorsRead } from './sagas'

export const useAuthors = () => {
  const entities  = useSelector(selectEntities);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const isIdle = status === 'idle';
  const isLoading = status === 'loading';
  const isSucceed = status === 'succeeded';
  const isFailed = status === 'failed';

  if (isIdle) {
    dispatch(authorsRead());
  }

  return { entities, isIdle, isLoading, isSucceed, isFailed, error };
};
