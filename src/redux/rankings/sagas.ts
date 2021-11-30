import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import { call, put, select, take } from 'redux-saga/effects';

import { rankingsRead, selectEntities } from './slice';

/**
 * FIXME sort function should be more specific
 *
 * to use in redux, it should return an array
 */

// page hook: use ranking of pages, even page saga
//
// dispatch action ranking read (type = pages)
//
// this saga take the action
//
// base on the type string call different rankings api
//
// 1. base on the type, dispatch different actions with different payload (rankings)
//
// 2. diapatch only one ????


// another usage is that
//
// i simply want to sort the footer column title
//
// use ranking of footer
//
// need to provide some hooks to do that in hooks.ts



/** workers */
function* workRankingsRead(): SagaIterator {
  try {
    yield put(rankingsRead.pending());
    const response = yield call(() =>
      axios.get(process.env.REACT_APP_API_URL + '/rankings'),
    );
    yield put(rankingsRead.fulfilled(response.data));
    const statefulEntities = yield select(selectEntities);
   // const sort = getRankingSort(statefulEntities);
    const sort = null;
    yield put(rankingsRead.settled(sort));
  } catch (error) {
    if (error instanceof Error) {
      yield put(rankingsRead.rejected(error.toString()));
    }
  }
}

/** watchers */
export function* watchRankingsRead() {
  yield take(rankingsRead);
  yield call(workRankingsRead);
}
