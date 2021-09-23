import { useDispatch, useSelector } from 'react-redux';

import { ranksRead } from './sagas';
import { selectEntities, selectError, selectStatus } from './slice';

import { mySelect } from './slice'

export const useRanks = () => {
  const entities = useSelector(selectEntities);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const test = useSelector(mySelect)




  const isIdle = status === 'idle';
  const isLoading = status === 'loading';
  const isSucceed = status === 'succeeded';
  const isFailed = status === 'failed';

  console.log(status);

  if (isIdle) {
    dispatch(ranksRead());
  }

  if (isSucceed) {


  }


  console.log(test);


  return { entities, isIdle, isLoading, isSucceed, isFailed, error };
};
