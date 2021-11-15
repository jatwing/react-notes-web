import axios from 'axios';
import { all, call, put, select, take } from 'redux-saga/effects';
import {
  localizationAccessible,
  selectLocalization,
} from 'src/redux/i18n/slice';

import { projectLocalized, projectRead } from './slice';

/** workers */
function* workProjectRead() {
  try {
    yield put(projectRead.pending());
    const response = yield call(() =>
      axios.get(process.env.REACT_APP_API_URL + '/project')
    );
    yield put(projectRead.fulfilled(response.data));
  } catch (error) {
    yield put(projectRead.rejected(error));
  }
}

/** watchers */
export function* watchProjectRead() {
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
