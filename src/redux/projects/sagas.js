import { call, put, take } from 'redux-saga/effects';
import { readDocuments, readEntitiesUrls } from 'src/utils/firebase';
import { projectsRead } from './slice';

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

export function* watchProjectsRead() {
  yield take(projectsRead);
  yield call(workProjectsRead);
}
