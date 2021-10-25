import { instanceInitialized, resourcesAdded, languageChanged } from './slice';
import { call, put, take, all } from 'redux-saga/effects';

/**
 * old functions are just acceptable, conside new requirements.
 * 1. divide t and l, so the entities sagas can choose t, l or both.
 * 2. split their logic instead of combining them,
 *    the helper functions are NOT very helpful.
 *
 * some ideas:
 * 0. assume we do know the configs of i18n.
 * 1. l takes instanceInitialized first then take every languageChanged,
 *    it may put 'localizationAccessible'.
 * 2. t takes resourcesAdded first then take every languageChanged,
 *    it may put 'translationAccessible'.
 * 3. task of this file should be sending reliable messages
 *    about t and l, to the entities outside.
 */

/** watchers */
export function* watchEntitesLocalization(localizationAction) {
  const {
    payload: { t, l },
  } = yield take([resourcesAdded, languageChanged]);

  while (true) {
    const {
      payload: { t, l },
    } = yield take([resourcesAdded, languageChanged]);
    yield put(localizationAction({ t, l }));
  }
}

export function* watchEntitiesOperationWithLocalization(
  operationAction,
  operationWorker,
  localizationAction
) {
  const [
    _,
    // __,
    {
      payload: { t, l },
    },
  ] = yield all([
    take(operationAction),
    // take(instanceInitialized),
    take([resourcesAdded, languageChanged]),
  ]);
  yield call(operationWorker);
  yield put(localizationAction({ t, l }));
  while (true) {
    const {
      payload: { t, l },
    } = yield take([resourcesAdded, languageChanged]);
    yield put(localizationAction({ t, l }));
  }
}
