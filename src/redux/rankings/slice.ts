import { AnyAction, createSlice, Reducer, Slice } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import {
  ActionWithPromiseStates,
  createActionWithPromiseStates,
} from 'redux/utils';

import { Sort } from './utils';

/** actions */
export type Category = 'columns' | 'pages';

export const columnsRankingsRead: ActionWithPromiseStates =
  createActionWithPromiseStates('rankings', 'columnsRankingsRead');

export const pagesRankingsRead: ActionWithPromiseStates =
  createActionWithPromiseStates('rankings', 'pagesRankingsRead');

export const rankingsReadActions: Record<Category, ActionWithPromiseStates> = {
  columns: columnsRankingsRead,
  pages: pagesRankingsRead,
};

/** state */
export type Ranking = {
  id: string;
  category: Category;
  data: Record<string, number>;
};

type RankingsState = Record<
  Category,
  {
    entities: null | Array<Ranking>;
    sort: null | Sort;
    status: string;
    error: null | string;
  }
>;

const initialState: RankingsState = {
  columns: {
    entities: null,
    sort: null,
    status: 'idle',
    error: null,
  },
  pages: {
    entities: null,
    sort: null,
    status: 'idle',
    error: null,
  },
};

/** reducer */
const rankingsSlice: Slice<RankingsState, any, string> = createSlice({
  name: 'rankings',
  initialState,
  reducers: {},
  extraReducers: {
    [columnsRankingsRead.pending.toString()]: (state) => {
      state.columns.status = 'pending';
    },
    [columnsRankingsRead.fulfilled.toString()]: (state, action) => {
      state.columns.status = 'fulfilled';
      state.columns.entities = action.payload;
    },
    [columnsRankingsRead.rejected.toString()]: (state, action) => {
      state.columns.status = 'rejected';
      state.columns.error = action.payload;
    },
    [columnsRankingsRead.settled.toString()]: (state, action) => {
      state.columns.status = 'settled';
      state.columns.sort = action.payload;
    },
    [pagesRankingsRead.pending.toString()]: (state) => {
      state.pages.status = 'pending';
    },
    [pagesRankingsRead.fulfilled.toString()]: (state, action) => {
      state.pages.status = 'fulfilled';
      state.pages.entities = action.payload;
    },
    [pagesRankingsRead.rejected.toString()]: (state, action) => {
      state.pages.status = 'rejected';
      state.pages.error = action.payload;
    },
    [pagesRankingsRead.settled.toString()]: (state, action) => {
      state.pages.status = 'settled';
      state.pages.sort = action.payload;
    },
  },
});

export const rankingsReducer: Reducer<RankingsState, AnyAction> =
  rankingsSlice.reducer;

/** selectors */
export const selectEntities =
  (category: Category) =>
  (state: RootState): null | ReadonlyArray<Ranking> =>
    state.rankings[category].entities;

export const selectSortation =
  (category: Category) =>
  (state: RootState): null | Sort =>
    state.rankings[category].sort;

export const selectStatus =
  (category: Category) =>
  (state: RootState): string =>
    state.rankings[category].status;

export const selectError =
  (category: Category) =>
  (state: RootState): null | string =>
    state.rankings[category].error;
