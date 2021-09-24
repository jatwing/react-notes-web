import { createSlice } from '@reduxjs/toolkit';

import { rankingsRead } from './sagas';

const initialState = {
  entities: {},
  status: 'idle',
  error: null,
};

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
      action.payload.forEach((entity) => {
        const { id, ...newEntity } = entity;
        state.entities[id] = newEntity;
      });
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
