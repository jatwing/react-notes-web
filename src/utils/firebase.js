import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore/lite';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { zipObject } from 'lodash';
import { all, call } from 'redux-saga/effects';

/** initialization */
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

/** firestore helper functions */
export const readDocuments = (collectionName) => async () => {
  const col = collection(db, collectionName);
  const snapshot = await getDocs(col);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/** storage helper functions */
export function* readEntityUrl(entity, key) {
  const imageRef = ref(storage, entity[key]);
  const url = yield call(getDownloadURL, imageRef);
  return {
    ...entity,
    [key]: url,
  };
}

export function* readEntityUrls(entity, keys) {
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

export function* readEntitiesUrls(entities, keys) {
  const descriptions = entities.map((entity) =>
    call(readEntityUrls, entity, keys)
  );
  return yield all(descriptions);
}
