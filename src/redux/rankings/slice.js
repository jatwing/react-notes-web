import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { createLifecycleActions } from 'src/redux/utils';

export const rankingsRead = createLifecycleActions('rankings', 'rankingsRead');



const rankingsAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
  sortComparer: (a, b) => a._id.localeCompare(b._id)
})

const initialState = rankingsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

const rankingsSlice = createSlice({
  name: 'rankings',
  initialState,
  extraReducers: {
    [rankingsRead.pending]: (state) => {
      state.status = 'loading';
    },
    [rankingsRead.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      rankingsAdapter.setAll(state, action.payload)
    },
    [rankingsRead.failed]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const rankingsReducer = rankingsSlice.reducer;

export const selectEntities = (state) => state.rankings.entities;
export const selectStatus = (state) => state.rankings.status;
export const selectError = (state) => state.rankings.error;
