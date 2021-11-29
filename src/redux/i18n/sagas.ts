import { SagaIterator } from 'redux-saga';
import { put, take } from 'redux-saga/effects';

import {
  i18nAccessible,
  instanceInitialized,
  languageChanged,
  resourcesAdded,
} from './slice';

/** watchers */
export function* watchI18nAccessible(): SagaIterator {
  yield take(instanceInitialized);
  const { payload } = yield take(resourcesAdded);
  yield put(i18nAccessible(payload));
  while (true) {
    const { payload } = yield take(languageChanged);
    yield put(i18nAccessible(payload));
  }
}
