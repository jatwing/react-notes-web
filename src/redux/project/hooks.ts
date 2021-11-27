import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Project,
  projectRead,
  selectEntity,
  selectError,
  selectStatus,
} from './slice';

export const useProject = (): null | Project => {
  const entity = useSelector(selectEntity);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  /* eslint-disable react-hooks/exhaustive-deps */
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
  if (status !== 'settled' || error) {
    return null;
  }
  return entity;
};
