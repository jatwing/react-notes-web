import {
  ActionCreatorWithPayload,
  AnyAction,
  createAction,
  createSlice,
  Reducer,
  Slice,
  current,
} from '@reduxjs/toolkit';
import { PageItemNode, pageItemTree, traverse } from 'lib/pages';
import { Translate } from 'redux/i18n/slice';
import { pagesRankingsRead } from 'redux/rankings/slice';
import { RootState } from 'redux/store';

/** actions */
export const routeChanged: ActionCreatorWithPayload<string, string> =
  createAction<string, string>('pages/routerChanged');
export const pagesInternationalized: ActionCreatorWithPayload<
  Translate,
  string
> = createAction<Translate, string>('pages/pagesInternationalized');

/** state */
type PagesState = {
  entities: PageItemNode;
  status: string;
};

const initialState: PagesState = {
  entities: pageItemTree,
  status: 'fulfilled',
};

/** reducer */
const pagesSlice: Slice<PagesState, any, string> = createSlice({
  name: 'pages',
  initialState,
  reducers: {},
  extraReducers: {
    [pagesInternationalized.toString()]: (state, action) => {
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
    [pagesRankingsRead.settled.toString()]: (state, action) => {
      const sort = action.payload;
      traverse(state.entities, (node) => {
        if (node.children) {
          node.children = sort(node.children, node.url);
        }
      });
    },
    [routeChanged.toString()]: (state, action) => {
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

export const pagesReducer: Reducer<PagesState, AnyAction> = pagesSlice.reducer;

/** selectors */
export const selectPages = (state: RootState): PageItemNode =>
  state.pages.entities;

export const selectStatus = (state: RootState): string => state.pages.status;

export const selectMatchedPage = (state: RootState): null | PageItemNode => {
  let matchedPage = null;
  traverse(
    state.pages.entities,
    (node) => {
      if (node.isMatched) {
        matchedPage = node;
        return false;
      }
    },
    true,
  );
  return matchedPage;
};

export const selectSelectedPages = (
  state: RootState,
): ReadonlyArray<PageItemNode> => {
  const selectedPages: Array<PageItemNode> = [];
  traverse(state.pages.entities, (node) => {
    if (node.isSelected) {
      selectedPages.push(node);
    } else {
      return false;
    }
  });
  return selectedPages;
};

export const selectAdjacentPages = (
  state: RootState,
): ReadonlyArray<null | PageItemNode> => {
  let previousPage = null;
  let matchedPage: null | PageItemNode = null;
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
    true,
  );
  return [previousPage, nextPage];
};
