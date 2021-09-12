import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {
  projectsFetchedPending,
  projectsFetchedFulfilled,
  projectsFetchedRejected,
} from './sagas';

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
  reducers: {},
  extraReducers: {
    [projectsFetchedPending]: (state, action) => {
      state.status = 'loading';
    },
    [projectsFetchedFulfilled]: (state, action) => {
      state.status = 'succeeded';
      projectsAdapter.setAll(state, action.payload);
    },
    [projectsFetchedRejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const projectsReducer = projectsSlice.reducer;

const projectsSelector = projectsAdapter.getSelectors((state) => state.projects);

export const selectProjects = projectsSelector.selectAll;
export const selectStatus = (state) => state.projects.status;
export const selectError = (state) => state.projects.error;
