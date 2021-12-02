import axios from 'axios';
import { SagaIterator } from 'redux-saga';
import { call, put, select, take } from 'redux-saga/effects';

import {
  Category,
  columnsRankingsRead,
  pagesRankingsRead,
  rankingsReadActions,
  selectEntities,
} from './slice';
import { getSortation } from './utils';

/** workers */
export function* workRankingsRead(category: Category): SagaIterator {
  const rankingsRead = rankingsReadActions[category];
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
export function* watchColumnsRankingsRead(): SagaIterator {
  yield take(columnsRankingsRead);
  yield call(workRankingsRead, 'columns');
}

export function* watchPagesRankingsRead(): SagaIterator {
  yield take(pagesRankingsRead);
  yield call(workRankingsRead, 'pages');
}
