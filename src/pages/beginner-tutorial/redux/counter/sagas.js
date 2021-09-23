import { call, delay, put, takeEvery } from 'redux-saga/effects';

import { COUNTER_VALUE_INCREASED_ASYNC, valueIncreased } from './actions';

export function* watchCounterValueIncreasedAsync() {
  yield takeEvery(
    COUNTER_VALUE_INCREASED_ASYNC,
    workCounterValueIncreasedAsync
  );
}

function* workCounterValueIncreasedAsync() {
  yield delay(1000);
  yield put(valueIncreased());

  /**
   * try to mock the try catch form inside the document
   *
   * delay is too simple
   */
}
