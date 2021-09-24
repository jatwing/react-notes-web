import { call, put, take } from 'redux-saga/effects';
import { createLifecycleActions } from 'src/redux/utils';
import { readDocuments } from 'src/utils/firebase';

export const rankingsRead = createLifecycleActions('rankings/rankingsRead');

function* workRankingsRead() {
  try {
    yield put(rankingsRead.pending());
    const entities = yield call(readDocuments('rankings', true));
    const newEntities = entities.map((entity) => {
      const newEntity = {};
      Object.keys(entity).forEach((key) => {
        const newKey =
          typeof key === 'string' || key instanceof String
            ? key?.replaceAll('\\', '/')
            : key;
        const value = entity[key];
        const newValue =
          typeof value === 'string' || value instanceof String
            ? value.replaceAll('\\', '/')
            : value;
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
