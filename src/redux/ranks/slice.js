import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { ranksRead } from './sagas';


const ranksAdapter = createEntityAdapter();

const initialState = ranksAdapter.getInitialState({
  status: 'idle',
  error: null,
});

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
      ranksAdapter.setAll(state, action.payload)
    },
    [ranksRead.failed]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const ranksReducer = ranksSlice.reducer;
export const ranksSelectors = ranksAdapter.getSelectors(state => state.ranks);
export const selectEntities = ranksSelectors.selectEntities;



export const selectStatus = (state) => state.ranks.status;
export const selectError = (state) => state.ranks.error;


export const mySelect = (state) => state.ranks;

