import { select, all, call, put, take } from 'redux-saga/effects';
import { readDocuments } from 'src/lib/firebase';
import { localizationAccessible } from 'src/redux/i18n/slice';

import { projectLocalized, projectRead } from './slice';
import { selectLocalization } from 'src/redux/i18n/slice';

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
  yield all([take(projectRead), take(localizationAccessible)]);
  yield call(workProjectRead);
  const l = yield select(selectLocalization);
  yield put(projectLocalized(l));
  while (true) {
    yield take(localizationAccessible);
    const l = yield select(selectLocalization);
    yield put(projectLocalized(l));
  }
}
