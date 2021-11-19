import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { createLifecycleActions } from 'src/redux/utils';

/** actions */
export const rankingsRead = createLifecycleActions('rankings', 'rankingsRead');

/** state */
const rankingsAdapter = createEntityAdapter();

const initialState = rankingsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

const rankingsSlice = createSlice({
  name: 'rankings',
  initialState,
  /** reducer */
  extraReducers: {
    [rankingsRead.pending]: (state) => {
      state.status = 'pending';
    },
    [rankingsRead.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      rankingsAdapter.setAll(state, action.payload);
    },
    [rankingsRead.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.error;
    },
  },
});

export const rankingsReducer = rankingsSlice.reducer;

/** selectors */
export const selectEntities = (state) => state.rankings.entities;
export const selectStatus = (state) => state.rankings.status;
export const selectError = (state) => state.rankings.error;
