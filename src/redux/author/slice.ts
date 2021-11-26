import { AnyAction, createSlice, Reducer, Slice } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { ActionWithPromiseStates } from 'redux/utils';

/** actions */
export const authorRead: ActionWithPromiseStates = createLifecycleActions(
  'author',
  'authorRead',
);

/** state */
export type Author = Record<string, string | Record<string, string>>;

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
