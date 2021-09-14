import { useDispatch, useSelector } from 'react-redux';
import { selectAuthors, selectStatus, selectError } from './slice';
import { authorsReadActions } from './sagas'


export const useAuthors = () => {
  const authors = useSelector(selectAuthors);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const isIdle = status === 'idle';
  const isLoading = status === 'loading';
  const isSucceed = status === 'succeeded';
  const isFailed = status === 'failed';


  if (isIdle) {
    /**
     * so the saga helper function needs to create 4 actions.
     */

    dispatch({ type: authorsReadActions.typePrefix  });

  }

  return { authors, isIdle, isLoading, isSucceed, isFailed, error };
};
