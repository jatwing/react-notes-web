import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { rankingsRead } from './sagas';

/**
 * id can also be a valid entity,
 *
 * to solve this issue, the adpter id should be _id, 
 *
 * then id can be used as others, if it exists inside entity.
 *
 */



const rankingsAdapter = createEntityAdapter()

const initialState = rankingsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

const rankingsSlice = createSlice({
  name: 'rankings',
  initialState,
  reducers: {},
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
