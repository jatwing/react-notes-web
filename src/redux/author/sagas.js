import axios from 'axios';
import { call, put, take } from 'redux-saga/effects';

import { authorRead } from './slice';

/** workers */
function* workAuthorRead() {
  try {
    yield put(authorRead.pending());
    const response = yield call(() =>
      axios.get(process.env.REACT_APP_API_URL + '/author')
    );
    yield put(authorRead.fulfilled(response.data));
  } catch (error) {
    yield put(authorRead.rejected(error.toString()));
  }
}

/** watchers */
export function* watchAuthorRead() {
  yield take(authorRead);
  yield call(workAuthorRead);
}
