import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';

import { authorRead } from './slice';

/** workers */
function* workAuthorRead(): SagaIterator {
  try {
    yield put(authorRead.pending());
    const response = yield call(() =>
      axios.get(process.env.REACT_APP_API_URL + '/author'),
    );
    yield put(authorRead.fulfilled(response.data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(authorRead.rejected(error.toString()));
    }
  }
}

/** watchers */
export function* watchAuthorRead(): SagaIterator {
  yield take(authorRead);
  yield call(workAuthorRead);
}
