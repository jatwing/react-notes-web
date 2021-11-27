import {
  ActionCreatorWithPayload,
  AnyAction,
  createAction,
  createSlice,
  Reducer,
  Slice,
} from '@reduxjs/toolkit';
import { i18n, TFunction } from 'i18next';
import { RootState } from 'redux/store';

/** actions */
export const instanceInitialized: ActionCreatorWithPayload<i18n, string> =
  createAction<i18n, string>('i18n/instanceInitialized');

export const resourcesAdded: ActionCreatorWithPayload<i18n, string> =
  createAction<i18n, string>('i18n/resourcesAdded');

export const languageChanged: ActionCreatorWithPayload<i18n, string> =
  createAction<i18n, string>('i18n/languageChanged');

export const localizationAccessible: ActionCreatorWithPayload<i18n, string> =
  createAction<i18n, string>('i18n/localizationAccessible');

export const translationAccessible: ActionCreatorWithPayload<i18n, string> =
  createAction<i18n, string>('i18n/translationAccessible');

/** state */
type I18nState = {
  instance: null | i18n;
};

const initialState: I18nState = {
  instance: null,
};

/** reducer */
const i18nSlice: Slice<I18nState, any, string> = createSlice({
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

export const i18nReducer: Reducer<I18nState, AnyAction> = i18nSlice.reducer;

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

export type LFunction = (texts: Record<string, string>) => string;

export const selectLocalization = (state: RootState): null | LFunction => {
  const i18n = state.i18n.instance;
  if (!i18n) {
    return null;
  }
  return (texts) => {
    if (i18n.language in texts) {
      return texts[i18n.language];
    }
    if ((i18n.options.fallbackLng as string) in texts) {
      return texts[i18n.options.fallbackLng as string];
    }
    return '';
  };
};

export const selectLanguage = (state: RootState): null | string => {
  const i18n = state.i18n.instance;
  if (!i18n) {
    return null;
  }
  return i18n.language;
};

export const selectSupportedLangauges = (
  state: RootState,
): null | ReadonlyArray<string> => {
  const i18n = state.i18n.instance;
  if (!i18n) {
    return null;
  }
  const supportedLanguages = i18n.options.supportedLngs;
  if (!supportedLanguages) {
    return null;
  }
  if (process.env.NODE_ENV === 'development') {
    return supportedLanguages;
  }
  return supportedLanguages.filter((language: string) => language !== 'cimode');
};

export const selectLanguageChanged = (
  state: RootState,
): null | i18n['changeLanguage'] => {
  const i18n = state.i18n.instance;
  if (!i18n) {
    return null;
  }
  return i18n.changeLanguage.bind(i18n);
};
