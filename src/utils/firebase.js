import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyDQnSWZ4LZTKuDDDnpFPm1tPM1jKnwgS8k',
  authDomain: 'another-test-c97b5.firebaseapp.com',
  projectId: 'another-test-c97b5',
  storageBucket: 'another-test-c97b5.appspot.com',
  messagingSenderId: '609235501673',
  appId: '1:609235501673:web:3cb75ee497a335e11e18f8',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function getDocuments(db) {
  const col = collection(db, 'blogs');
  const snapshot = await getDocs(col);
  const list = snapshot.docs.map((doc) => doc.data());
  return list;
}
