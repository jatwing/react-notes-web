import { createSlice } from '@reduxjs/toolkit';
import { pageItems, traverse } from 'src/utils/page-urls';

const initialState = {
  data: pageItems,
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
});

export const { pagesTranslated, pagesSorted, pagesSelected } =
  pagesSlice.actions;

export const pagesReducer = pagesSlice.reducer;

export const selectData = (state) => state.pages.data;
