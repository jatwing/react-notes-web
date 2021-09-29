import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { createLifecycleActions } from 'src/redux/utils';

/** actions */
export const authorsRead = createLifecycleActions('authors', 'authorsRead');

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
    [authorsRead.pending]: (state) => {
      state.status = 'loading';
    },
    [authorsRead.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      authorsAdapter.setAll(state, action.payload);
    },
    [authorsRead.failed]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const authorsReducer = authorsSlice.reducer;

const authorsSelectors = authorsAdapter.getSelectors((state) => state.authors);
export const selectEntities = authorsSelectors.selectAll;
export const selectStatus = (state) => state.authors.status;
export const selectError = (state) => state.authors.error;
