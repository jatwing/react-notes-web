import {
  createAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { buildDate } from 'src/lib/preval';
import { createLifecycleActions } from 'src/redux/utils';

/** actions */
export const notificationsRead = createLifecycleActions(
  'notifications',
  'notificationsRead'
);
export const notificationsTranslated = createAction(
  'notifications/notificationsTranslated'
);

/** state */
const notificationsAdapter = createEntityAdapter();

const initialState = notificationsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  /** reducer */
  extraReducers: {
    [notificationsRead.pending]: (state) => {
      state.status = 'pending';
    },
    [notificationsRead.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      notificationsAdapter.setMany(state, action.payload);
    },
    [notificationsRead.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.error;
    },
    [notificationsTranslated]: (state, action) => {
      if (state.status !== 'fulfilled') {
        return;
      }
      state.status = 'settled';
      if (process.env.NODE_ENV !== 'development') {
        return;
      }
      const t = action.payload;
      const entity = {
        id: 'build_date',
        content: t('development_build_on_datetime', {
          // val: buildDate
          val: new Date(Date.UTC(2012, 11, 20, 3, 0, 0)),
          formatParams: {
            val: {
              dateStyle: 'short',
              timeStyle: 'short',
            },
          },
        }),
      };
      notificationsAdapter.setOne(state, entity);
    },
  },
});

export const notificationsReducer = notificationsSlice.reducer;

/** selectors */
const notificationsSelectors = notificationsAdapter.getSelectors(
  (state) => state.notifications
);
export const selectEntities = notificationsSelectors.selectAll;
export const selectStatus = (state) => state.notifications.status;
export const selectError = (state) => state.notifications.error;
