import { call, put, take } from 'redux-saga/effects';
import { createLifecycleActions } from 'src/redux/utils';
import { readDocuments } from 'src/utils/firebase';

export const rankingsRead = createLifecycleActions('rankings/rankingsRead');

function* workRankingsRead() {
  try {
    yield put(rankingsRead.pending());

    /* raw data  **/

    const entities = yield call(readDocuments('rankings', true));

    const slashUnescape = (value) =>
      typeof value === 'string' || value instanceof String
        ? value.replaceAll('\\', '/')
        : value;
    const newEntities = entities.map((entity) => {
      const newEntity = {};
      Object.keys(entity).forEach((key) => {
        const newKey = slashUnescape(key)
        const newValue = slashUnescape(entity[key])
        newEntity[newKey] = newValue;
      });
      return newEntity;
    });

    yield put(rankingsRead.fulfilled(newEntities));
  } catch (error) {
    yield put(rankingsRead.rejected(error));
  }
}

export function* watchRankingsRead() {
  yield take(rankingsRead);
  yield call(workRankingsRead);
}
