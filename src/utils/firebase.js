import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { zipObject } from 'lodash';
import { call, all } from 'redux-saga/effects';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

export function* getEntityUrl(entity, key) {
  const imageRef = ref(storage, entity[key]);
  const url = yield call(getDownloadURL, imageRef);
  return {
    ...entity,
    [key]: url,
  };
}

export function* getEntityUrls(entity, keys) {
  const imageRefs = keys.map((key) => ref(storage, entity[key]));
  const descriptions = imageRefs.map((imageRef) =>
    call(getDownloadURL, imageRef)
  );
  const urls = yield all(descriptions);
  return {
    ...entity,
    ...zipObject(keys, urls),
  };
}

export function* getEntitiesUrls(entities, keys) {
  const descriptions = entities.map((entity) =>
    call(getEntityUrls, entity, keys)
  );
  return yield all(descriptions);
}
