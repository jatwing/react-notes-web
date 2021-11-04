import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { authorRead, selectEntity, selectError, selectStatus } from './slice';

export const useAuthor = () => {
  const entity = useSelector(selectEntity);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === 'idle') {
      dispatch(authorRead());
    }
  });
  if (error) {
    console.error(error);
    return;
  }
  const isAvailable = status === 'fulfilled';
  return { entity, isAvailable };
};
