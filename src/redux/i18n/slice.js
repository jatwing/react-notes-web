import { createAction, createSlice } from '@reduxjs/toolkit';

/** actions */
export const instanceInitialized = createAction('i18n/instanceInitialized');
export const resourcesAdded = createAction('i18n/resourcesAdded');
export const languageChanged = createAction('i18n/languageChanged');
export const localizationAccessible = createAction(
  'i18n/localizationAccessible'
);
export const translationAccessible = createAction('i18n/translationAccessible');

/** state */
const initialState = {
  t: null,
  l: null,
};

const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  /** reducer */
  extraReducers: {
    [translationAccessible]: (state, action) => {
      state.t = action.payload;
    },
    [localizationAccessible]: (state, action) => {
      state.l = action.payload;
    },
  },
});

export const i18nReducer = i18nSlice.reducer;

export const selectTranslation = (state) => state.i18n.t;
export const selectLocalization = (state) => state.i18n.l;
