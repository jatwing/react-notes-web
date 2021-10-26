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
  const { payload: t } = yield take(resourcesAdded);
  yield put(translationAccessible(t));
  while (true) {
    const {
      payload: { t },
    } = yield take(languageChanged);
    yield put(translationAccessible(t));
  }
}

export function* watchLocalizationAccessible() {
  const { payload: l } = yield take(instanceInitialized);
  yield put(localizationAccessible(l));
  while (true) {
    const {
      payload: { l },
    } = yield take(languageChanged);
    yield put(localizationAccessible(l));
  }
}
