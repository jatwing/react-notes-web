import { useDispatch, useSelector } from 'react-redux';

import { ranksRead } from './sagas';
import { selectEntities, selectError, selectStatus } from './slice';

const useRanks = () => {
  const entities = useSelector(selectEntities);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const isIdle = status === 'idle';
  const isLoading = status === 'loading';
  const isSucceed = status === 'succeeded';
  const isFailed = status === 'failed';

  if (isIdle) {
    dispatch(ranksRead());
  }

  return { entities, isIdle, isLoading, isSucceed, isFailed, error };
};

export const useRankSorter = () => {
  const { entities, isSucceed } = useRanks()

  const sort = (array, id) => {
    if (!isSucceed || !(id in entities)) {
      return array;
    }
    const getRank = (element) => {
      if (!(element in entities[id])) {
        return Number.MAX_VALUE;
      }
      const rank = entities[id][element];
      if (isNaN(rank)) {
        return Number.MAX_VALUE;
      }
      return rank;
    }
    array.sort((a, b) => (getRank(a) - getRank(b)))
  }

  return { sort } ;
}

