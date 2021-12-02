import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import { call, put, select, take } from 'redux-saga/effects';

import {
  pagesRankingsRead,
  columnsRankingsRead,
  selectEntities,
} from './slice';
import { ActionWithPromiseStates } from 'redux/utils';

import { Sort, getSortation } from './utils';

/** workers */
export function* workRankingsRead(
  rankingsRead: ActionWithPromiseStates,
  category: string,
): SagaIterator {
  try {
    yield put(rankingsRead.pending());
    const response = yield call(() =>
      axios.get(`${process.env.REACT_APP_API_URL}/rankings/${category}`),
    );
    yield put(rankingsRead.fulfilled(response.data));
    const rankings = yield select(selectEntities(category));
    yield put(rankingsRead.settled(getSortation(rankings, category)));
  } catch (error) {
    if (error instanceof Error) {
      yield put(rankingsRead.rejected(error.toString()));
    }
  }
}

/** watchers */
export function* watchPagesRankingsRead(): SagaIterator {
  yield take(pagesRankingsRead);
  yield call(workRankingsRead, pagesRankingsRead, 'pages');
}

export function* watchColumnsRankingsRead(): SagaIterator {
  yield take(columnsRankingsRead);
  yield call(workRankingsRead, columnsRankingsRead, 'columns');
}
