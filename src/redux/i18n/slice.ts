import {
  ActionCreatorWithPayload,
  createAction,
  createSlice,
} from '@reduxjs/toolkit';
import { i18n, TFunction } from 'i18next';
import { RootState } from 'redux/store';

/** actions */
export const instanceInitialized: ActionCreatorWithPayload<i18n, string> =
  createAction<i18n>('i18n/instanceInitialized');
export const resourcesAdded = createAction<i18n>('i18n/resourcesAdded');
export const languageChanged = createAction<i18n>('i18n/languageChanged');
export const localizationAccessible = createAction<i18n>(
  'i18n/localizationAccessible',
);

export const translationAccessible = createAction<i18n>(
  'i18n/translationAccessible',
);

/** state */
interface i18nState {
  instance: null | i18n;
}
const initialState: i18nState = {
  instance: null,
};

/** reducer */
const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  reducers: {},
  extraReducers: {
    [translationAccessible.toString()]: (state, action) => {
      state.instance = action.payload;
    },
    [localizationAccessible.toString()]: (state, action) => {
      state.instance = action.payload;
    },
  },
});
export const i18nReducer = i18nSlice.reducer;

/** selectors */
export const selectTranslation = (state: RootState): null | TFunction => {
  const i18n = state.i18n.instance;
  if (!i18n) {
    return null;
  }
  return i18n.t.bind(i18n);
};
export const selectFixedTranslation = (state: RootState): null | TFunction => {
  const i18n = state.i18n.instance;
  if (!i18n) {
    return null;
  }
  return i18n.getFixedT.bind(i18n);
};
export const selectLocalization = (state: RootState) => (texts: any) => {
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
