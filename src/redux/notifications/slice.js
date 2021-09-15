import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { notificationsRead } from './sagas';

const notificationsAdapter = createEntityAdapter({
  selectId: (entity) => entity.name,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = notificationsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: {
    [notificationsRead.pending]: (state) => {
      state.status = 'loading';
    },
    [notificationsRead.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      notificationsAdapter.setAll(state, action.payload);
    },
    [notificationsRead.failed]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const notificationsReducer = notificationsSlice.reducer;

const notificationsSelectors = notificationsAdapter.getSelectors(
  (state) => state.notifications
);
export const selectEntities = notificationsSelectors.selectAll;
export const selectStatus = (state) => state.notifications.status;
export const selectError = (state) => state.notifications.error;
