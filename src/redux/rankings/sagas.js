import axios from 'axios';
import { call, put, select, take } from 'redux-saga/effects';

import { rankingsRead, selectEntities } from './slice';

export const getRankingSort = (entities) => {
  const sort = (unrankedArray, rankingId, criterialProperty = null) => {
    if (!entities || !(rankingId in entities)) {
      return unrankedArray;
    }
    const getRanking = (element) => {
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
    unrankedArray.sort((a, b) => getRanking(a) - getRanking(b));
  };
  return sort;
};

/** workers */
function* workRankingsRead() {
  try {
    yield put(rankingsRead.pending());
    const response = yield call(() =>
      axios.get(process.env.REACT_APP_API_URL + '/rankings')
    );
    yield put(rankingsRead.fulfilled(response.data));
    const statefulEntities = yield select(selectEntities);
    const sort = getRankingSort(statefulEntities);
    yield put(rankingsRead.settled(sort));
  } catch (error) {
    yield put(rankingsRead.rejected(error));
  }
}

/** watchers */
export function* watchRankingsRead() {
  yield take(rankingsRead);
  yield call(workRankingsRead);
}
