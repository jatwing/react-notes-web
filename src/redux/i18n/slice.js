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
  isLocalizationAccessible: false,
  isTranslationAccessible: false,
};

const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  /** reducer */
  extraReducers: {
    [localizationAccessible]: () => {
      state.isLocalizationAccessible = true;
    },
    [translationAccessible]: () => {
      state.isTranslationAccessible = true;
    },
  },
});

export const selectIsTranslationAccessible = (state) =>
  state.isTranslationAccessible;
export const selectIsLocalizationAccessible = (state) =>
  state.isLocalizationAccessible;
