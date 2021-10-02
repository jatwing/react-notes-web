import { useDispatch, useSelector } from 'react-redux';

import { rankingsRead , selectEntities, selectError, selectStatus } from './slice';


export const useRankings = () => {
  const entities = useSelector(selectEntities);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const isIdle = status === 'idle';
  const isLoading = status === 'loading';
  const isSucceed = status === 'succeeded';
  const isFailed = status === 'failed';
  if (isIdle) {
    dispatch(rankingsRead());
  }
  return { entities, isIdle, isLoading, isSucceed, isFailed, error };
};
