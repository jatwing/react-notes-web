import { takeLatest, call, put, all } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db, getEntitiesUrls} from 'src/utils/firebase';

export const projectsFetched = createAction('projects/projectsFetched');
export const projectsFetchedPending = createAction(
  'projects/projectsFetched/pending'
);
export const projectsFetchedFulfilled = createAction(
  'projects/projectsFetched/fulfilled'
);
export const projectsFetchedRejected = createAction(
  'projects/projectsFetched/rejected',
  (error) => ({ error })
);

const fetchProjects = async () => {
  const col = collection(db, 'projects');
  const snapshot = await getDocs(col);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/**
 * if we create a template
 *
 * the yield* line
 *
 * is not very general.
 */


function* workProjectsFetched() {
  try {
    yield put(projectsFetchedPending());
    let projects = yield call(fetchProjects);
    projects = yield* getEntitiesUrls(projects, ['avatar']);
    yield put(projectsFetchedFulfilled(projects));
  } catch (error) {
    yield put(projectsFetchedRejected(error));
  }
}

export function* watchProjectsFetched() {
  yield takeLatest(projectsFetched, workProjectsFetched);
}

