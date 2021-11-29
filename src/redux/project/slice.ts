import {
  ActionCreatorWithPayload,
  AnyAction,
  createAction,
  createSlice,
  Reducer,
  Slice,
} from '@reduxjs/toolkit';
import { i18n } from 'i18next';
import { Localize } from 'redux/i18n/slice';
import { RootState } from 'redux/store';
import {
  ActionWithPromiseStates,
  createActionWithPromiseStates,
} from 'redux/utils';

/** actions */
export const projectRead: ActionWithPromiseStates =
  createActionWithPromiseStates('project', 'projectRead');
export const projectInternationalized: ActionCreatorWithPayload<
  Localize,
  string
> = createAction<Localize, string>('project/projectLocalized');

/** state */
export type Project = Record<string, string | Record<string, string>>;

type ProjectState = {
  entity: null | Project;
  status: string;
  error: null | string;
};

const initialState: ProjectState = {
  entity: null,
  status: 'idle',
  error: null,
};

/** reducer */
const projectSlice: Slice<ProjectState, any, string> = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: {
    [projectRead.pending.toString()]: (state) => {
      state.status = 'pending';
    },
    [projectRead.fulfilled.toString()]: (state, action) => {
      state.status = 'fulfilled';
      state.entity = action.payload;
    },
    [projectRead.rejected.toString()]: (state, action) => {
      state.status = 'rejected';
      state.error = action.error;
    },
    [projectInternationalized.toString()]: (state, action) => {
      if (state.status !== 'fulfilled') {
        return;
      }
      state.status = 'settled';
      const l = action.payload;
      if (!state.entity || !l) {
        return;
      }
      state.entity.name = l(state.entity._name);
      state.entity.copyright = l(state.entity._copyright);
    },
  },
});

export const projectReducer: Reducer<ProjectState, AnyAction> =
  projectSlice.reducer;

/** selectors */
export const selectEntity = (state: RootState): null | Project =>
  state.project.entity;

export const selectStatus = (state: RootState): string => state.project.status;

export const selectError = (state: RootState): null | string =>
  state.project.error;
