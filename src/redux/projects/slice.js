import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { createLifecycleActions } from 'src/redux/utils';

/** actions */
export const projectsRead = createLifecycleActions('projects', 'projectsRead');

/** state */
const projectsAdapter = createEntityAdapter({
  selectId: (entity) => entity.name,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = projectsAdapter.getInitialState({
  status: 'idle',
  error: null,
});

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  /** reducer */
  extraReducers: {
    [projectsRead.pending]: (state) => {
      state.status = 'loading';
    },
    [projectsRead.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      projectsAdapter.setAll(state, action.payload);
    },
    [projectsRead.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const projectsReducer = projectsSlice.reducer;

/** selectors */
const projectsSelectors = projectsAdapter.getSelectors(
  (state) => state.projects
);
export const selectEntities = projectsSelectors.selectAll;
export const selectStatus = (state) => state.projects.status;
export const selectError = (state) => state.projects.error;
