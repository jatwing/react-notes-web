import { takeLatest, call, put, all } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db, storage } from 'src/utils/firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { zipObject, zipWith } from 'lodash';

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

function* getEntityUrl(entity, key) {
  const imageRef = ref(storage, entity[key]);
  const url = yield call(getDownloadURL, imageRef);
  return {
    ...entity,
    [key]: url
  }
}

function* getEntityUrls(entity, keys) {
  const imageRefs = keys.map((key) => ref(storage, entity[key]));
  const descriptions = imageRefs.map((imageRef) =>
    call(getDownloadURL, imageRef)
  );
  const urls = yield all(descriptions);
  return {
    ...entity,
    ...zipObject(keys, urls)
  }
}

function* getEntitiesUrls(entities, keys) {
  const descriptions = entities.map(entity =>
    call(getEntityUrls, entity, keys)
  )
  const result = yield all(descriptions)
  return result;
}





function* workProjectsFetched() {
  try {
    yield put(projectsFetchedPending());
    const projects = yield call(fetchProjects);

    console.log('test getEntityUrl here');
    const result1 = yield* getEntityUrl(projects[0], 'avatar');
    console.log(result1);

    console.log('test getEntityUrls  here');
    const result2 = yield* getEntityUrls(projects[0], ['avatar', 'test']);
    console.log(result2);

    console.log('test getEntitiesUrls  here');
    const result3 = yield* getEntitiesUrls(projects, ['avatar', 'test']);
    console.log(result3)


/** Version 2
    const descriptions = projects.map((project) => {
      const imageRef = ref(storage, project.avatar);
      return call(getDownloadURL, imageRef);
    });
    const urls = yield all(descriptions);

    zipWith(projects, urls, (project, url) => {
      project.avatar = url;
    });
*/


    /*
      Version 1
    for (let i = 0; i < projects.length; i++) {
      const imageRef = ref(storage, projects[i].avatar);
      const url = yield call(getDownloadURL, imageRef)
      projects[i].avatar = url;

      console.log(projects[i])
    }
*/

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
