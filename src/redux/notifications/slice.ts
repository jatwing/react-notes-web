import {
  ActionCreatorWithPayload,
  AnyAction,
  createAction,
  createEntityAdapter,
  createSlice,
  EntityAdapter,
  EntitySelectors,
  EntityState,
  Reducer,
  current
} from '@reduxjs/toolkit';
import { buildDate } from 'lib/preval';
import { Localize, Translate } from 'redux/i18n/slice';
import { store, RootState } from 'redux/store';
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
export type Notification = {
  id: string;
  _content: Record<string, string>;
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

      /**
       * maybe save to state.source
       *
       *
       * use the adpter after the translation.
       * 
       *
       * drawback: can not change to cimode for testing
       *
       */


      notificationsAdapter.setMany(state, action.payload);
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

      console.log(current(state))


      // FIXME
      if (process.env.NODE_ENV !== 'development') {
        return;
      }

      const entity = {
        id: 'build_date',
        // FIXME, it requires t and l functions.
        content: 'TODO fix the i18next config settings error',
        test: '31123',
        /*
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
        */
      };
      //    notificationsAdapter.setOne(state, entity);
    },
  },
});

export const notificationsReducer: Reducer<NotificationsState, AnyAction> =
  notificationsSlice.reducer;
