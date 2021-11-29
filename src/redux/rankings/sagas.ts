import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import { call, put, select, take } from 'redux-saga/effects';

import { rankingsRead, selectEntities } from './slice';

/**
 * FIXME sort function should be more specific
 *
 * to use in redux, it should return an array
 */
export const getRankingSort = (entities: any) => {
  const sort = (
    unrankedArray: any,
    rankingId: string,
    criterialProperty: null | string,
  ) => {
    if (!entities || !(rankingId in entities)) {
      return unrankedArray;
    }
    const getRanking = (element: any) => {
      const criterion = criterialProperty
        ? element[criterialProperty]
        : element;
      if (!criterion || !(criterion in entities[rankingId]['ranking'])) {
        return Number.MAX_VALUE;
      }
      const ranking = entities[rankingId]['ranking'][criterion];
      if (isNaN(ranking)) {
        return Number.MAX_VALUE;
      }
      return ranking;
    };
    unrankedArray.sort((a: any, b: any) => getRanking(a) - getRanking(b));
  };
  return sort;
};

/** workers */
function* workRankingsRead(): SagaIterator {
  try {
    yield put(rankingsRead.pending());
    const response = yield call(() =>
      axios.get(process.env.REACT_APP_API_URL + '/rankings'),
    );
    yield put(rankingsRead.fulfilled(response.data));
    const statefulEntities = yield select(selectEntities);
    const sort = getRankingSort(statefulEntities);
    yield put(rankingsRead.settled(sort));
  } catch (error) {
    if (error instanceof Error) {
      yield put(rankingsRead.rejected(error.toString()));
    }
  }
}

/** watchers */
export function* watchRankingsRead() {
  yield take(rankingsRead);
  yield call(workRankingsRead);
}
