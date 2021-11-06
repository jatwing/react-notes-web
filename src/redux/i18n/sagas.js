import { put, take } from 'redux-saga/effects';

import {
  instanceInitialized,
  languageChanged,
  localizationAccessible,
  resourcesAdded,
  translationAccessible,
} from './slice';

/** watchers */
export function* watchTranslationAccessible() {
  yield take(instanceInitialized);
  const { payload } = yield take(resourcesAdded);
  yield put(translationAccessible(payload));
  while (true) {
    const { payload } = yield take(languageChanged);
    yield put(translationAccessible(payload));
  }
}

export function* watchLocalizationAccessible() {
  const { payload } = yield take(instanceInitialized);
  yield put(localizationAccessible(payload));
  while (true) {
    const { payload } = yield take(languageChanged);
    yield put(localizationAccessible(payload));
  }
}
