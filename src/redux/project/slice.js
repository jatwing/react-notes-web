import { createAction, createSlice } from '@reduxjs/toolkit';
import { createLifecycleActions } from 'src/redux/utils';

/** actions */
export const projectRead = createLifecycleActions('project', 'projectRead');
export const projectLocalized = createAction('project/projectLocalized');

/** state */
const initialState = {
  entity: null,
  status: 'idle',
  error: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  /** reducer */
  extraReducers: {
    [projectRead.pending]: (state) => {
      state.status = 'pending';
    },
    [projectRead.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.entity = action.payload;
    },
    [projectRead.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.error;
    },
    [projectLocalized]: (state, action) => {
      if (state.status !== 'fulfilled') {
        return;
      }
      state.status = 'settled';
      const l = action.payload;
      state.entity.name = l(state.entity._name);
      state.entity.copyright = l(state.entity._copyright);
    },
  },
});

export const projectReducer = projectSlice.reducer;

/** selectors */
export const selectEntity = (state) => state.project.entity;
export const selectStatus = (state) => state.project.status;
export const selectError = (state) => state.project.error;
