import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { projectRead, selectEntity, selectError, selectStatus } from './slice';

export const useProject = () => {
  const entity = useSelector(selectEntity);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === 'idle' && !error) {
      dispatch(projectRead());
    }
  }, []);
  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);
  const isAvailable = status === 'settled' && !error;
  return { entity, isAvailable };
};
