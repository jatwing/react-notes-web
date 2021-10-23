import { createSlice } from '@reduxjs/toolkit';
import { pageItemTree, traverse } from 'src/lib/pages';
import { resourcesAdded } from 'src/redux/i18n/slice';
import { rankingsRead } from 'src/redux/rankings/slice';
import { routeChanged } from 'src/redux/router/slice';

/** state */
const initialState = {
  entities: pageItemTree,
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  /** reducer */
  extraReducers: {
    [rankingsRead.settled]: (state, action) => {
      const sort = action.payload;
      traverse(state.entities, (node) => {
        if (node.children) {
          sort(node.children, node.url, 'url');
        }
      });
    },

    // TODO to use the function t
    [resourcesAdded.settled]: (state, action) => {
      const { t } = action.payload;
      traverse(state.entities, (node) => {
        node.name = t(node.filename.replaceAll('-', '_'));
      });
    },


    [routeChanged.settled]: (state, action) => {
      traverse(state.entities, (node) => {
        const route = action.payload
        node.isMatched = node.url === route;
        node.isSelected =
          node.url === '/' ||
          new RegExp(`^${node.url}(/([^/])+)*$`).test(route);
      });
    },
  },
});

export const pagesReducer = pagesSlice.reducer;

/** selectors */
export const selectPages = (state) => state.pages.entities;

export const selectMatchedPage = (state) => {
  let matchedPage = null;
  traverse(state.pages.entities, (node) => {
    if (node.isMatched) {
      matchedPage = node;
    }
  });
  return matchedPage;
};

export const selectSelectedPages = (state) => {
  const selectedPages = [];
  traverse(state.pages.entities, (node) => {
    if (node.isSelected) {
      selectedPages.push(node);
    }
  });
  return selectedPages;
};
