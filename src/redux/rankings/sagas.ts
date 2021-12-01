import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import { call, put, select, take } from 'redux-saga/effects';

import {
  pagesRankingsRead,
  selectPagesEntities,
  columnsRankingsRead,
  selectColumnsEntities,
} from './slice';

import { Sort, getSortation } from './utils';

/** workers */

// finally we need to combine them;
//
// need the actionCreator and the category

export function* workPagesRankingsRead(): SagaIterator {
  try {
    yield put(pagesRankingsRead.pending());
    const response = yield call(() =>
      axios.get(process.env.REACT_APP_API_URL + '/rankings/pages'),
    );
    yield put(pagesRankingsRead.fulfilled(response.data));

    const rankings = yield select(selectPagesEntities);
    
 //   const sort = getSortation(rankings, 'pages');

    yield put(pagesRankingsRead.settled(getSortation(rankings, 'pages')))

  } catch (error) {
    if (error instanceof Error) {
      yield put(pagesRankingsRead.rejected(error.toString()));
    }
  }
}

export function* workColumnsRankingsRead(): SagaIterator {
  try {
    yield put(columnsRankingsRead.pending());
    const response = yield call(() =>
      axios.get(process.env.REACT_APP_API_URL + '/rankings/columns'),
    );
    yield put(columnsRankingsRead.fulfilled(response.data));
    // prepare sort function here or not ?
  } catch (error) {
    if (error instanceof Error) {
      yield put(columnsRankingsRead.rejected(error.toString()));
    }
  }
}

/** watchers */
export function* watchPagesRankingsRead(): SagaIterator {
  yield take(pagesRankingsRead);

  // use common worker, need to provide ,
  //    - category name: pages
  //    - action name : pagesRankingsRead

  yield call(workPagesRankingsRead);
}

export function* watchColumnsRankingsRead(): SagaIterator {
  yield take(columnsRankingsRead);
  yield call(workColumnsRankingsRead);
}
