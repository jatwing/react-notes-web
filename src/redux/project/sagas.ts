import axios from 'axios';
import { localizationAccessible, selectLocalization } from 'redux/i18n/slice';
import { SagaIterator } from 'redux-saga';
import { all, call, put, select, take } from 'redux-saga/effects';

import { projectLocalized, projectRead } from './slice';

/** workers */
function* workProjectRead(): SagaIterator {
  try {
    yield put(projectRead.pending());
    const response = yield call(() =>
      axios.get(process.env.REACT_APP_API_URL + '/project'),
    );
    yield put(projectRead.fulfilled(response.data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(projectRead.rejected(error.toString()));
    }
  }
}

/** watchers */
export function* watchProjectRead(): SagaIterator {
  yield all([take(projectRead), take(localizationAccessible)]);
  yield call(workProjectRead);
  const l = yield select(selectLocalization);
  yield put(projectLocalized(l));
  while (true) {
    yield take(localizationAccessible);
    const l = yield select(selectLocalization);
    yield put(projectLocalized(l));
  }
}
