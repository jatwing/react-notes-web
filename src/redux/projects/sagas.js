import { take, call, put, all  } from 'redux-saga/effects';
import { readDocuments } from 'src/lib/firebase';

import { projectsRead, projectsLocalized  } from './slice';
import { localizationAccessible } from 'src/redux/i18n/slice'

/** workers */
function* workProjectsRead() {
  try {
    yield put(projectsRead.pending());
    let entities = yield call(readDocuments('projects'));
    yield put(projectsRead.fulfilled(entities));
  } catch (error) {
    yield put(projectsRead.rejected(error));
  }
}

/** watchers */
export function* watchProjectsRead() {
  const [_, { payload: l }] = yield all([
    take(projectsRead),
    take(localizationAccessible)
  ])
  yield call(workProjectsRead);
  yield put(projectsLocalized(l));
  while (true) {
    const { payload: l }  = yield take(localizationAccessible);
    yield put(projectsLocalized(l));
  }
}

