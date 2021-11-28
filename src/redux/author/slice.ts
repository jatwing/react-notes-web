import { AnyAction, createSlice, Reducer, Slice } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import {
  ActionWithPromiseStates,
  createActionWithPromiseStates,
} from 'redux/utils';

/** actions */
export const authorRead: ActionWithPromiseStates =
  createActionWithPromiseStates('author', 'authorRead');

/** state */
export type Author = {
  email: string;
  id: string;
  slack: string;
  stack_overflow: string;
};

type AuthorState = {
  entity: null | Author;
  status: string;
  error: null | string;
};

const initialState: AuthorState = {
  entity: null,
  status: 'idle',
  error: null,
};

/** reducer */
const authorSlice: Slice<AuthorState, any, string> = createSlice({
  name: 'author',
  initialState,
  reducers: {},
  extraReducers: {
    [authorRead.pending.toString()]: (state) => {
      state.status = 'pending';
    },
    [authorRead.fulfilled.toString()]: (state, action) => {
      state.status = 'fulfilled';
      state.entity = action.payload;
    },
    [authorRead.rejected.toString()]: (state, action) => {
      state.status = 'rejected';
      state.error = action.error;
    },
  },
});

export const authorReducer: Reducer<AuthorState, AnyAction> =
  authorSlice.reducer;

/** selectors */
export const selectEntity = (state: RootState): null | Author =>
  state.author.entity;

export const selectStatus = (state: RootState): string => state.author.status;

export const selectError = (state: RootState): null | string =>
  state.author.error;
