import { createAction, createSlice } from '@reduxjs/toolkit';
import { pageItemTree, traverse } from 'src/lib/pages';
import { rankingsRead } from 'src/redux/rankings/slice';

/** actions */
export const pagesTranslated = createAction('pages/pagesTranslated');
export const routeChanged = createAction('pages/routerChanged');

/** state */
const initialState = {
  entities: pageItemTree,
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  /** reducer */
  extraReducers: {
    [pagesTranslated]: (state, action) => {
      const t = action.payload;
      traverse(state.entities, (node) => {
        if (node.filename === 'pages') {
          node.name = t('home');
          return;
        }
        node.name = t(node.filename.replaceAll('-', '_'));
      });
    },
    [rankingsRead.settled]: (state, action) => {
      const sort = action.payload;
      traverse(state.entities, (node) => {
        if (node.children) {
          sort(node.children, node.url, 'url');
        }
      });
    },
    [routeChanged]: (state, action) => {
      traverse(state.entities, (node) => {
        const route = action.payload;
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

export const selectAdjacentPages = (state) => {
  let previousPage = null;
  let nextPage = null;
  let isMatched = false;
  traverse(state.pages.entities, (node) => {
    if (node.type !== 'item' && node.url !== '/') {
      return;
    }
    if (isMatched && nextPage) {
      return;
    }
    if (isMatched) {
      nextPage = node;
      return;
    }
    if (node.isMatched) {
      isMatched = true;
    } else {
      previousPage = node;
    }
  });
  return [previousPage, nextPage];
};
