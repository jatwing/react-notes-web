import { call, put, take, all, takeEvery } from 'redux-saga/effects';
import { readDocuments } from 'src/lib/firebase';

import { projectsRead } from './slice';
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

export function* test() {
  yield put(projectsRead.settled('test2'));
}

/** watchers */
export function* watchProjectsRead() {
  const [
    _,
    {
      payload: { t, l },
    },
  ] = yield all([
    take(projectsRead),
    take([resourcesAdded.settled, languageChanged.settled]),
  ]);
  yield call(workProjectsRead);
  yield put(projectsRead.settled({ t, l }));
  while (true) {
    yield take([resourcesAdded.settled, languageChanged.settled]);
    yield put(projectsRead.settled({ t, l }));
  }
}
