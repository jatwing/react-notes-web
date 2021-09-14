import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
  authorsReadActions  
} from './sagas';

const authorsAdapter = createEntityAdapter({
  selectId: (entity) => entity.name,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = authorsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {},
  extraReducers: {
    [authorsReadActions.pending]: (state, action) => {
      state.status = 'loading';
    },
    [authorsReadActions.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      authorsAdapter.setAll(state, action.payload);
    },
    [authorsReadActions.failed]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  },
});

export const authorsReducer = authorsSlice.reducer;


const authorsSelector = authorsAdapter.getSelectors((state) => state.authors);
export const selectAuthors = authorsSelector.selectAll;
export const selectStatus = (state) => state.authors.status;
export const selectError = (state) => state.authors.error;
