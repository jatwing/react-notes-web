import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { ranksRead } from './sagas';

const initialState = {
  entities: {},
  status: 'idle',
  error: null,
}

const ranksSlice = createSlice({
  name: 'ranks',
  initialState,
  reducers: {},
  extraReducers: {
    [ranksRead.pending]: (state) => {
      state.status = 'loading';
    },
    [ranksRead.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      action.payload.forEach(entity => {
        const { id, ...newEntity } = entity;
        state.entities[id.replaceAll('\\', '/')] = newEntity;
      })
    },
    [ranksRead.failed]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const ranksReducer = ranksSlice.reducer;

export const selectEntities = (state) => state.ranks.entities;
export const selectStatus = (state) => state.ranks.status;
export const selectError = (state) => state.ranks.error;

