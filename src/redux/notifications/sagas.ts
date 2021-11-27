import axios from 'axios';
import { selectTranslation, translationAccessible } from 'redux/i18n/slice';
import { SagaIterator } from 'redux-saga';
import { all, call, put, select, take } from 'redux-saga/effects';

import { notificationsRead, notificationsTranslated } from './slice';

/** workers */
function* workNotificationsRead(): SagaIterator {
  try {
    yield put(notificationsRead.pending());
    const response = yield call(() =>
      axios.get(process.env.REACT_APP_API_URL + '/notifications'),
    );
    yield put(notificationsRead.fulfilled(response.data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(notificationsRead.rejected(error.toString()));
    }
  }
}

/** watchers */
export function* watchNotificationsRead(): SagaIterator {
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
