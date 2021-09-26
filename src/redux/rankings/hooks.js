import { useDispatch, useSelector } from 'react-redux';

import { rankingsRead } from './sagas';
import { selectEntities, selectError, selectStatus } from './slice';

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

export const useRankingSort = () => {
  const { entities, isSucceed } = useRankings();
  const sort = (unrankedArray, rankingsId, criterialProperty = null) => {
    if (!isSucceed || !(rankingsId in entities)) {
      return unrankedArray;
    }
    const getRanking = (element) => {
      const criterion = !!criterialProperty
        ? element[criterialProperty]
        : element;
      if (!criterion || !(criterion in entities[rankingsId])) {
        return Number.MAX_VALUE;
      }
      const ranking = entities[rankingsId][criterion];
      if (isNaN(ranking)) {
        return Number.MAX_VALUE;
      }
      return ranking;
    };
    unrankedArray.sort((a, b) => getRanking(a) - getRanking(b));
  };
  return sort;
};
