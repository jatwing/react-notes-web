import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { client } from '../../api/client';
import { selectAllNotifications } from './selectors';

/** notifications slice */
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  /** thunk arguments */
  async (_, { getState }) => {
    /**
     * temp deal with the undefined
     * how to avoid it from the beginning ?
     */
    const allNotifications = selectAllNotifications(getState()) || [];
    const [latestNotification] = allNotifications;
    const latestTimestamp = latestNotification ? latestNotification?.date : '';

    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    );
    return response.notifications;
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    allNotificationsRead: (state, action) => {
      state.forEach((notification) => {
        notification.read = true;
      });
    },
  },
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      state.forEach((notification) => {
        notification.isNew = !notification.read;
      });
      state.push(...action.payload);
      // Sort with newest first
      state.sort((a, b) => b.date.localeCompare(a.date));
    },
  },
});

export const notificationsReducer = notificationsSlice.reducer;

export const { allNotificationsRead } = notificationsSlice.actions;
