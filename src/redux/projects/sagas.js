import { call, put, take } from 'redux-saga/effects';
import { createLifecycleActions } from 'src/redux/utils';
import { readDocuments, readEntitiesUrls } from 'src/utils/firebase';

export const projectsRead = createLifecycleActions('projects/projectsRead');

function* workProjectsRead() {
  try {
    yield put(projectsRead.pending());
    let entities = yield call(readDocuments('projects', true));
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
