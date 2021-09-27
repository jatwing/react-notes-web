import { createSlice } from '@reduxjs/toolkit';
import { pageItems, traverse } from 'src/utils/page-urls';
import { rankingsRead } from 'src/redux/rankings/sagas'

import { getRankingSort } from 'src/redux/rankings/utils';


const initialState = {
  data: pageItems,

  happy: false,
  arr: []
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    pagesTranslated: {
      reducer: (state, action) => {
        const t = action.payload;
        traverse(state.data, (node) => {
          node.name = t(node.filename);
        });
      },
    },

    pagesSorted: {
      reducer: (state, action) => {
        const sort = action.payload;
        traverse(state.data, (node) => {
          if (node.children) {
            sort(node.children, node.url, 'url');
          }
        });
      },
    },
    pagesSelected: {
      reducer: (state, action) => {
        const url = action.payload;
        traverse(state.data, (node) => {
          if (node.url === '/') {
            node.isSelected = true;
            return;
          }
          const regex = new RegExp(`^${node.url}(/([^/])+)*$`);
          if (regex.test(url)) {
            node.isSelected = true;
            return;
          }
          node.isSelected = false;
        });
      },
    },
  },
  extraReducers: {
    /** sort pages */
    [rankingsRead.fulfilled]: (state, action) => {
      const sort = getRankingSort(action.payload);
        traverse(state.data, (node) => {
          if (node.children) {
            sort(node.children, node.url, 'url');
          }
        });
    },

  }

});

export const { pagesTranslated, pagesSorted, pagesSelected } =
  pagesSlice.actions;

export const pagesReducer = pagesSlice.reducer;

export const selectData = (state) => state.pages.data;
