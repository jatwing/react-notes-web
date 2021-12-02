import { AnyAction, createSlice, Reducer, Slice } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import {
  ActionWithPromiseStates,
  createActionWithPromiseStates,
} from 'redux/utils';
import { Sort } from './utils';

/** actions */
export const pagesRankingsRead: ActionWithPromiseStates =
  createActionWithPromiseStates('rankings', 'pagesRankingsRead');

export const columnsRankingsRead: ActionWithPromiseStates =
  createActionWithPromiseStates('rankings', 'columnsRankingsRead');

/** state */
export type Ranking = {
  id: string;
  category: string;
  data: Record<string, number>;
};

type RankingsState = {
  pages: {
    entities: null | Array<Ranking>;
    sort: null | Sort;
    status: string;
    error: null | string;
  };
  columns: {
    entities: null | Array<Ranking>;
    sort: null | Sort;
    status: string;
    error: null | string;
  };
};

const initialState: RankingsState = {
  pages: {
    entities: null,
    sort: null,
    status: 'idle',
    error: null,
  },
  columns: {
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
  },
});

export const rankingsReducer: Reducer<RankingsState, AnyAction> =
  rankingsSlice.reducer;

/** selectors */
export const selectEntities =
  (category: string) =>
  (state: RootState): null | ReadonlyArray<Ranking>  => {
    switch (category) {
      case 'pages':
      case 'columns':
        return state.rankings[category].entities;
      default:
        throw new Error('unreachable');
    }
  };

export const selectSortation =
  (category: string) =>
  (state: RootState): null | Sort  => {
    switch (category) {
      case 'pages':
      case 'columns':
        return state.rankings[category].sort;
      default:
        throw new Error('unreachable');
    }
  };

export const selectStatus =
  (category: string) =>
  (state: RootState): string  => {
    switch (category) {
      case 'pages':
      case 'columns':
        return state.rankings[category].status;
      default:
        throw new Error('unreachable');
    }
  };

export const selectError =
  (category: string) =>
  (state: RootState): null | string  => {
    switch (category) {
      case 'pages':
      case 'columns':
        return state.rankings[category].error;
      default:
        throw new Error('unreachable');
    }
  };

