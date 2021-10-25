import { call, put, take, all } from 'redux-saga/effects';
import { readDocuments } from 'src/lib/firebase';

import { projectsRead, projectsLocalized } from './slice';
import { resourcesAdded, languageChanged } from 'src/redux/i18n/slice';
import { watchEntitiesOperationWithLocalization } from 'src/redux/i18n/sagas';

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
  yield watchEntitiesOperationWithLocalization(
    projectsRead,
    workProjectsRead,
    projectsLocalized
  );
}
