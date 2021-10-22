import { createSlice } from '@reduxjs/toolkit';
import { pageItemTree, traverse } from 'src/lib/pages';
import { resourcesAdded } from 'src/redux/i18n/slice';
import { rankingsRead } from 'src/redux/rankings/slice';
import { routeChanged } from 'src/redux/router/slice';

/** not immutable */
const getInitialState = (pageItemTree) => {
  const ids = [];
  const entities = {};
  traverse(pageItemTree, (node) => {
    ids.push(node.url);
    entities[node.url] = node;
  });
  return {
    ids,
    entities,
    status: 'init'
  };
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState: getInitialState(pageItemTree),
  /** reducer */
  extraReducers: {
    [rankingsRead.settled]: (state, action) => {
      const sort = action.payload;
      Object.values(state.entities).forEach((entity) => {
        if (entity.children) {
          sort(entity.children, entity.url, 'url');
        }
      });
      state.status = 'sorted';
    },
    [resourcesAdded.settled]: (state, action) => {
      const t = action.payload;
      Object.values(state.entities).forEach((entity) => {
        entity.name = t(entity.filename.replaceAll('-', '_'))
      })
      state.status = 'tran';
    },

    /*
    [routeChanged.settled]: (state, action) => {
      const route = action.payload;
      traverse(state.pages, (node) => {
        node.isSelected = false;
        if (node.url === '/') {
          node.isSelected = true;
          return;
        }
        const regex = new RegExp(`^${node.url}(/([^/])+)*$`);
        if (regex.test(route)) {
          node.isSelected = true;
        }
        if (node.url === route) {
          state.page = node;
        }
      });
    },
    */
  },
});

export const pagesReducer = pagesSlice.reducer;

/** selectors */
export const selectPages = (state) => state.pages.entities['/'];
export const selectPage = (state) => state.pages.entities[0];
export const selectStatus = (state) => state.pages.status;
