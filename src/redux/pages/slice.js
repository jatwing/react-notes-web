import { createSlice } from '@reduxjs/toolkit';
import { pageItemTree, traverse } from 'src/lib/pages';
import { rankingsRead } from 'src/redux/rankings/slice';
import { resourcesAdded } from 'src/redux/i18n/slice';
import { routeChanged } from 'src/redux/router/slice';

/** state */
const initialState = {
  data: pageItemTree
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  /** reducer */
  extraReducers: {
    [rankingsRead.settled]: (state, action) => {
      const sort = action.payload;
      traverse(state.data, (node) => {
        if (node.children) {
          sort(node.children, node.url, 'url');
        }
      });
    },
    [resourcesAdded.settled]: (state, action) => {
      const t = action.payload;
      traverse(state.data, (node) => {
        node.name = t(node.filename);
      });
    },
    [routeChanged.settled]: (state, action) => {
      const route = action.payload;
      traverse(state.data, (node) => {
        node.isSelected = false;
        if (node.url === '/') {
          node.isSelected = true;
          return;
        }
        const regex = new RegExp(`^${node.url}(/([^/])+)*$`);
        if (regex.test(route)) {
          node.isSelected = true;
        }
      });
    },
  },
});

export const pagesReducer = pagesSlice.reducer;

/** selectors */
export const selectData = (state) => state.pages.data;
