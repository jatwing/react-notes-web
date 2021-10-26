import { take, call, put, all } from 'redux-saga/effects';
import { readDocuments } from 'src/lib/firebase';

import { projectRead, projectLocalized } from './slice';
import { localizationAccessible } from 'src/redux/i18n/slice';

/** workers */
function* workProjectRead() {
  try {
    yield put(projectRead.pending());
    let entities = yield call(readDocuments('projects'));
    yield put(projectRead.fulfilled(entities[0]));
  } catch (error) {
    yield put(projectRead.rejected(error));
  }
}

/** watchers */
export function* watchProjectRead() {
  const [_, { payload: l }] = yield all([
    take(projectRead),
    take(localizationAccessible),
  ]);
  yield call(workProjectRead);
  yield put(projectLocalized(l));
  while (true) {
    const { payload: l } = yield take(localizationAccessible);
    yield put(projectLocalized(l));
  }
}
