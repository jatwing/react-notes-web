import { instanceInitialized, resourcesAdded, languageChanged } from './slice';
import { call, put, take, all } from 'redux-saga/effects';

/** watchers */
export function* watchEntitesLocalization(localizationAction) {
  const  {
    payload: { t, l }
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
    __,
    {
      payload: { t, l },
    },
  ] = yield all([
    take(operationAction),
    take(instanceInitialized),
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
