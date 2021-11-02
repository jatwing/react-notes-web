import { createSlice } from '@reduxjs/toolkit';
import { createLifecycleActions } from 'src/redux/utils';

/** actions */
export const authorRead = createLifecycleActions('author', 'authorRead');

/** state */
const initialState = {
  entity: null,
  status: 'idle',
  error: null,
};

const authorSlice = createSlice({
  name: 'author',
  initialState,
  /** reducer */
  extraReducers: {
    [authorRead.pending]: (state) => {
      state.status = 'pending';
    },
    [authorRead.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.entity = action.payload;
    },
    [authorRead.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.error.message;
    },
  },
});

export const authorReducer = authorSlice.reducer;

/** selectors */
export const selectEntity = (state) => state.author.entity;
export const selectStatus = (state) => state.author.status;
export const selectError = (state) => state.author.error;
