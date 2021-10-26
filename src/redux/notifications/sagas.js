import { take, call, put, all } from 'redux-saga/effects';
import { readDocuments } from 'src/lib/firebase';

import { notificationsRead, notificationsTranslated } from './slice';
import { translationAccessible  } from 'src/redux/i18n/slice'

/** workers */
function* workNotificationsRead() {
  try {
    yield put(notificationsRead.pending());
    const entities = yield call(readDocuments('notifications'));
    yield put(notificationsRead.fulfilled(entities));
  } catch (error) {
    yield put(notificationsRead.rejected(error));
  }
}

/** watchers */
export function* watchNotificationsRead() {
  console.log('adadsasd')
  const [_, { payload: t }] = yield all([
    take(notificationsRead),
    take(translationAccessible)
  ])
  console.log('dasdas')
  console.log(t)
  yield call(workNotificationsRead);
  yield put(notificationsTranslated(t));
  while (true) {
    const { payload : t } = yield take(translationAccessible);
  console.log(t)
    yield put(notificationsTranslated(t));
  }

}

