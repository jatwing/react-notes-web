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
  instance: null,
};

const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  /** reducer */
  extraReducers: {
    [translationAccessible]: (state, action) => {
      state.instance = action.payload;
    },
    [localizationAccessible]: (state, action) => {
      state.instance = action.payload;
    },
  },
});

export const i18nReducer = i18nSlice.reducer;

export const selectTranslation = (state) => {
  const i18n = state.i18n.instance;
  if (!i18n) {
    return null;
  }
  return i18n.t.bind(i18n);
};

export const selectFixedTranslation = (state) => {
  const i18n = state.i18n.instance;
  if (!i18n) {
    return null;
  }
  return i18n.getFixedT.bind(i18n);
};

export const selectLocalization = (state) => (texts) => {
  const i18n = state.i18n.instance;
  if (!texts || !i18n) {
    return '';
  }
  return texts[i18n.language] || texts[i18n.options.fallbackLng] || '';
};

export const selectLanguage = (state) => {
  const i18n = state.i18n.instance;
  if (!i18n) {
    return null;
  }
  return i18n.language;
};

export const selectSupportedLangauges = (state) => {
  const i18n = state.i18n.instance;
  if (!i18n) {
    return null;
  }
  const supportedLanguages = i18n.options.supportedLngs;
  if (process.env.NODE_ENV === 'development') {
    return supportedLanguages;
  }
  return supportedLanguages.filter((language) => language !== 'cimode');
};

export const selectLanguageChanged = (state) => {
  const i18n = state.i18n.instance;
  if (!i18n) {
    return null;
  }
  return i18n.changeLanguage.bind(i18n);
};
