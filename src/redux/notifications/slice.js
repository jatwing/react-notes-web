import {
  createEntityAdapter,
  createSlice,
  createAction,
} from '@reduxjs/toolkit';
import { buildTime } from 'src/lib/preval';
import { createLifecycleActions } from 'src/redux/utils';

/** actions */
export const notificationsRead = createLifecycleActions(
  'notifications',
  'notificationsRead'
);
export const notificationsLocalized = createAction(
  'notifications/notificationsLocalized'
);

/** state */
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
  /** reducer */
  extraReducers: {
    [notificationsRead.pending]: (state) => {
      state.status = 'loading';
    },
    [notificationsRead.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      notificationsAdapter.setMany(state, action.payload);
    },
    [notificationsRead.failed]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [notificationsLocalized]: (state, action) => {
      if (process.env.NODE_ENV !== 'development') {
        return;
      }
      const { t } = action.payload;
      const entity = {
        name: 'build_date',
        content: t('development_build_at_time_on_date', {
          time: buildTime.toTimeString(),
          date: buildTime.toDateString(),
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
