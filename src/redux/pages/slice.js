import { createAction, createSlice } from '@reduxjs/toolkit';
import { pageItemTree, traverse } from 'src/lib/pages';
import { rankingsRead } from 'src/redux/rankings/slice';

/** actions */
export const routeChanged = createAction('pages/routerChanged');
export const pagesTranslated = createAction('pages/pagesTranslated');

/** state */
const initialState = {
  entities: pageItemTree,
  status: 'fulfilled',
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  /** reducer */
  extraReducers: {
    [pagesTranslated]: (state, action) => {
      state.status = 'settled';
      const t = action.payload;
      traverse(state.entities, (node) => {
        if (node.url === '/') {
          node.name = t('home');
        } else {
          node.name = t(node.filename.replaceAll('-', '_'));
        }
      });
    },
    [rankingsRead.settled]: (state, action) => {
      const sort = action.payload;
      traverse(state.entities, (node) => {
        if (node.children) {
          /**
           * TODO do not this, so many useless calls.
           */
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

export const selectStatus = (state) => state.pages.status;

export const selectMatchedPage = (state) => {
  let matchedPage = null;
  traverse(
    state.pages.entities,
    (node) => {
      if (node.isMatched) {
        matchedPage = node;
        return false;
      }
    },
    true
  );
  return matchedPage;
};

export const selectSelectedPages = (state) => {
  const selectedPages = [];
  traverse(state.pages.entities, (node) => {
    if (node.isSelected) {
      selectedPages.push(node);
    } else {
      return false;
    }
  });
  return selectedPages;
};

export const selectAdjacentPages = (state) => {
  let previousPage = null;
  let matchedPage = null;
  let nextPage = null;
  traverse(
    state.pages.entities,
    (node) => {
      if (node.type !== 'item' && node.url !== '/') {
        return;
      }
      if (matchedPage) {
        nextPage = node;
        return false;
      }
      if (node.isMatched) {
        matchedPage = node;
      } else {
        previousPage = node;
      }
    },
    true
  );
  return [previousPage, nextPage];
};
