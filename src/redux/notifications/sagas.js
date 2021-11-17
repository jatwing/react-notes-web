import axios from 'axios';
import { all, call, put, select, take } from 'redux-saga/effects';
import { selectTranslation, translationAccessible } from 'src/redux/i18n/slice';

import { notificationsRead, notificationsTranslated } from './slice';

/** workers */
function* workNotificationsRead() {
  try {
    yield put(notificationsRead.pending());
    const response = yield call(() =>
      axios.get(process.env.REACT_APP_API_URL + '/notifications')
    );
    yield put(notificationsRead.fulfilled(response.data));
  } catch (error) {
    yield put(notificationsRead.rejected(error.toString()));
  }
}

/** watchers */
export function* watchNotificationsRead() {
  yield all([take(notificationsRead), take(translationAccessible)]);
  yield call(workNotificationsRead);
  const t = yield select(selectTranslation);
  yield put(notificationsTranslated(t));
  while (true) {
    yield take(translationAccessible);
    const t = yield select(selectTranslation);
    yield put(notificationsTranslated(t));
  }
}
