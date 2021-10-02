import { call, put, take } from 'redux-saga/effects';
import { readDocuments, readEntitiesUrls } from 'src/lib/firebase';

import { projectsRead } from './slice';

/** workers */
function* workProjectsRead() {
  try {
    yield put(projectsRead.pending());
    let entities = yield call(readDocuments('projects'));
    entities = yield* readEntitiesUrls(entities, ['avatar']);
    yield put(projectsRead.fulfilled(entities));
  } catch (error) {
    yield put(projectsRead.rejected(error));
  }
}

/** watchers */
export function* watchProjectsRead() {
  yield take(projectsRead);
  yield call(workProjectsRead);
}
