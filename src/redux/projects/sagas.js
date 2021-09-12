import { takeLatest, call, put } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db, storage } from 'src/utils/firebase';
import {authorsFetchedRejected} from '../authors/sagas';
import { ref, getDownloadURL } from 'firebase/storage'

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

function* workProjectsFetched() {
  try {
    yield put(projectsFetchedPending());
    const projects  = yield call(fetchProjects);
    /**
     * to deal with the image url
     */
    for (let i = 0; i < projects.length; i++) {
      const imageRef = ref(storage, projects[i].avatar);
      const url = yield call(getDownloadURL, imageRef)
      projects[i].avatar = url;

      console.log(projects[i])
    }

    yield put(projectsFetchedFulfilled(projects));
  } catch (error) {
    yield put(projectsFetchedRejected(error));
  }
}

export function* watchProjectsFetched() {
  yield takeLatest(projectsFetched, workProjectsFetched);
}

/*

 similar to authors but require an image.

  const path ='images/jatwing-avatar.png'
  const imageRef = ref(storage, path);
  getDownloadURL(imageRef).then(
    url => {
      console.log(url)
    }
  ).catch(error => {
    console.log(error)
  })


  useEffect(() => {
 
 */
