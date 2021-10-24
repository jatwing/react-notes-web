import { call, put, take, all } from 'redux-saga/effects';
import { readDocuments } from 'src/lib/firebase';

import { projectsRead, projectsLocalized } from './slice';
import { resourcesAdded, languageChanged } from 'src/redux/i18n/slice';

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
  const [
    _,
    {
      payload: { t, l },
    },
  ] = yield all([take(projectsRead), take([resourcesAdded, languageChanged])]);
  yield call(workProjectsRead);
  yield put(projectsLocalized({ t, l }));
  // miss sth
  while (true) {
    yield take([resourcesAdded, languageChanged]);
    yield put(projectsLocalized({ t, l }));
  }
}
