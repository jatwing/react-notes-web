import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { buildTimeString } from 'src/lib/preval';
import { resourcesAdded } from 'src/redux/i18n/slice';
import { createLifecycleActions } from 'src/redux/utils';

/** actions */
export const notificationsRead = createLifecycleActions(
  'notifications',
  'notificationsRead'
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
    [resourcesAdded.settled]: (state, action) => {
      if (process.env.NODE_ENV !== 'development') {
        return;
      }
      const t = action.payload;
      const buildTime = new Date(JSON.parse(buildTimeString));
      const entity = {
        name: 'build_date',
        content: t('development_build_at_time_on_date', {
          time: buildTime.toTimeString(),
          date: buildTime.toDateString(),
        }),
      };
      notificationsAdapter.addOne(state, entity);
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
