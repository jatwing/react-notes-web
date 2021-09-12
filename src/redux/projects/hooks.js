
import { useDispatch, useSelector } from 'react-redux';
import { selectProjects, selectStatus, selectError } from './slice';
import { projectsFetched  } from './sagas'

export const useProjects = () => {
  const projects = useSelector(selectProjects);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const isIdle = status === 'idle';
  const isLoading = status === 'loading';
  const isSucceed = status === 'succeeded';
  const isFailed = status === 'failed';

  if (isIdle) {
    dispatch(projectsFetched());
  }

  return { projects, isIdle, isLoading, isSucceed, isFailed, error };
};
