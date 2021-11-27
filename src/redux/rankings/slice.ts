import {
  AnyAction,
  createEntityAdapter,
  createSlice,
  EntityAdapter,
  EntityState,
  Reducer,
  Slice,
} from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import {
  ActionWithPromiseStates,
  createActionWithPromiseStates,
} from 'redux/utils';

/** actions */
export const rankingsRead: ActionWithPromiseStates =
  createActionWithPromiseStates('rankings', 'rankingsRead');

/** state */
export type Ranking = any;

const rankingsAdapter: EntityAdapter<Ranking> = createEntityAdapter();

type RankingsState = EntityState<Ranking> & {
  status: string;
  error: null | string;
};

const initialState: RankingsState = rankingsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

const rankingsSlice: Slice<RankingsState, any, string> = createSlice({
  name: 'rankings',
  initialState,
  /** reducer */
  reducers: {},
  extraReducers: {
    [rankingsRead.pending.toString()]: (state) => {
      state.status = 'pending';
    },
    [rankingsRead.fulfilled.toString()]: (state, action) => {
      state.status = 'fulfilled';
      rankingsAdapter.setAll(state, action.payload);
    },
    [rankingsRead.rejected.toString()]: (state, action) => {
      state.status = 'rejected';
      state.error = action.error;
    },
  },
});

export const rankingsReducer: Reducer<RankingsState, AnyAction> =
  rankingsSlice.reducer;

/** selectors */
export const selectEntities = (state: RootState): null | Array<Ranking> =>
  state.rankings.entities;

export const selectStatus = (state: RootState): string => state.rankings.status;

export const selectError = (state: RootState): null | string =>
  state.rankings.error;
