import { call, put, take } from 'redux-saga/effects';
import { createLifecycleActions } from 'src/redux/utils';
import { readDocuments } from 'src/utils/firebase';

export const ranksRead = createLifecycleActions('ranks/ranksRead');

function* workRanksRead() {
  try {
    yield put(ranksRead.pending());
    const entities = yield call(readDocuments('ranks', true));
    yield put(ranksRead.fulfilled(entities));
  } catch (error) {
    yield put(ranksRead.rejected(error));
  }
}

export function* watchRanksRead() {
  yield take(ranksRead);
  yield call(workRanksRead);
}
