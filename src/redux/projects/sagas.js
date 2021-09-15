import { takeLatest, call, put, all } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db, getEntitiesUrls} from 'src/utils/firebase';
import { createLifecycleActions } from 'src/redux/utils'
import { readDocuments } from 'src/utils/firebase'

export const projectsRead = createLifecycleActions('projects/projectsRead');

function* workProjectsRead() {
  try {
    yield put(projectsRead.pending());
    let projects = yield call(readDocuments, 'projects');
    projects = yield* getEntitiesUrls(projects, ['avatar']);
    yield put(projectsRead.fulfilled(projects));
  } catch (error) {
    yield put(projectsRead.rejected(error));
  }
}

export function* watchProjectsRead() {
  yield takeLatest(projectsRead, workProjectsRead);
}

