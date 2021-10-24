import { resourcesAdded, languageChanged } from '/slice';

/** watchers */
export function* watchEntitesLocalization(localizationAction) {
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
    {
      payload: { t, l },
    },
  ] = yield all([
    take(operationAction),
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
