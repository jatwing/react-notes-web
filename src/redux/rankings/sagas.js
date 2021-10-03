import { call, put, select, take } from 'redux-saga/effects';
import { readDocuments } from 'src/lib/firebase';

import { rankingsRead, selectEntities } from './slice';

export const getRankingSort = (entities) => {
  const sort = (unrankedArray, rankingsId, criterialProperty = null) => {
    if (!entities || !(rankingsId in entities)) {
      return unrankedArray;
    }
    const getRanking = (element) => {
      const criterion = criterialProperty
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

/** workers */
function* workRankingsRead() {
  try {
    yield put(rankingsRead.pending());
    const rawEntities = yield call(readDocuments('rankings'));
    const slashUnescape = (value) =>
      typeof value === 'string' || value instanceof String
        ? value.replaceAll('\\', '/')
        : value;
    const processedEntities = rawEntities.map((rawEntity) => {
      const processedEntity = {};
      Object.keys(rawEntity).forEach((key) => {
        processedEntity[slashUnescape(key)] = slashUnescape(rawEntity[key]);
      });
      return processedEntity;
    });
    yield put(rankingsRead.fulfilled(processedEntities));
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
