import {
  ActionCreatorWithPayload,
  AnyAction,
  createAction,
  createEntityAdapter,
  createSlice,
  current,
  EntityAdapter,
  EntityId,
  EntitySelectors,
  EntityState,
  Reducer,
} from '@reduxjs/toolkit';
import { buildDate } from 'lib/preval';
import { Localize, Translate } from 'redux/i18n/slice';
import { RootState } from 'redux/store';
import {
  ActionWithPromiseStates,
  createActionWithPromiseStates,
} from 'redux/utils';

/** actions */
export const notificationsRead: ActionWithPromiseStates =
  createActionWithPromiseStates('notifications', 'notificationsRead');
export const notificationsInternationalized: ActionCreatorWithPayload<
  { t: Translate; l: Localize },
  string
> = createAction<{ t: Translate; l: Localize }, string>(
  'notifications/notificationsInternationalized',
);

/** state */
type NotificationDraft = {
  id: string;
  _content: string | Record<string, string>;
};

export type Notification = NotificationDraft & {
  content: null | string;
};

const notificationsAdapter: EntityAdapter<Notification> =
  createEntityAdapter<Notification>();

type NotificationsState = EntityState<Notification> & {
  status: string;
  error: null | string;
};

const initialState: NotificationsState = notificationsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

/** reducer */
const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: {
    [notificationsRead.pending.toString()]: (state) => {
      state.status = 'pending';
    },
    [notificationsRead.fulfilled.toString()]: (state, action) => {
      state.status = 'fulfilled';
      const entities = action.payload
        .filter(
          (entity: NotificationDraft) =>
            process.env.NODE_ENV === 'development' ||
            entity.id !== 'build_date',
        )
        .map((entity: NotificationDraft) => ({
          ...entity,
          content: null,
        }));
      notificationsAdapter.setMany(state, entities);
    },
    [notificationsRead.rejected.toString()]: (state, action) => {
      state.status = 'rejected';
      state.error = action.error;
    },
    [notificationsInternationalized.toString()]: (state, action) => {
      if (state.status !== 'fulfilled') {
        return;
      }
      state.status = 'settled';
      const { t, l } = action.payload;
      const entities = current(state).ids.map((id: EntityId) => {
        const entity = current(state).entities[id];
        if (!entity) {
          throw new Error('inexhaustive');
        }
        if (typeof entity._content === 'object') {
          return {
            ...entity,
            content: l(entity._content),
          };
        }
        if (entity.id === 'build_date') {
          return {
            ...entity,
            content: t('development_build_on_datetime', {
              value: buildDate,
            }),
          };
        }
        throw new Error('inexhaustive');
      });
      notificationsAdapter.setMany(state, entities);
    },
  },
});

export const notificationsReducer: Reducer<NotificationsState, AnyAction> =
  notificationsSlice.reducer;

/** selectors */
const notificationsSelectors: EntitySelectors<Notification, any> =
  notificationsAdapter.getSelectors(
    (state: RootState): EntityState<Notification> => state.notifications,
  );

export const selectEntities: (state: RootState) => ReadonlyArray<Notification> =
  notificationsSelectors.selectAll;

export const selectStatus = (state: RootState): string =>
  state.notifications.status;

export const selectError = (state: RootState): null | string =>
  state.notifications.error;
