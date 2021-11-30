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
export type I18n = i18n;

export const instanceInitialized: ActionCreatorWithPayload<I18n, string> =
  createAction<I18n, string>('i18n/instanceInitialized');

export const resourcesAdded: ActionCreatorWithPayload<I18n, string> =
  createAction<I18n, string>('i18n/resourcesAdded');

export const languageChanged: ActionCreatorWithPayload<I18n, string> =
  createAction<I18n, string>('i18n/languageChanged');

export const i18nAccessible: ActionCreatorWithPayload<I18n, string> =
  createAction<I18n, string>('i18n/i18nAccessible');

/** state */
type I18nState = {
  entity: null | I18n;
  status: string;
};

const initialState: I18nState = {
  entity: null,
  status: 'idle',
};

/** reducer */
const i18nSlice: Slice<I18nState, any, string> = createSlice({
  name: 'i18n',
  initialState,
  reducers: {},
  extraReducers: {
    [instanceInitialized.toString()]: (state, action) => {
      state.status = 'pending';
    },
    [i18nAccessible.toString()]: (state, action) => {
      state.status = 'fulfilled';
      state.entity = action.payload;
    },
  },
});

export const i18nReducer: Reducer<I18nState, AnyAction> = i18nSlice.reducer;

/** selectors */
export type Translate = TFunction;

export const selectTranslation = (state: RootState): null | Translate => {
  const i18n = state.i18n.entity;
  if (!i18n) {
    return null;
  }
  return i18n.t.bind(i18n);
};

export const selectFixedTranslation = (state: RootState): null | Translate => {
  const i18n = state.i18n.entity;
  if (!i18n) {
    return null;
  }
  return i18n.t.bind(i18n);
};

export type Localize = (texts: Record<string, string>) => string;

export const selectLocalization = (state: RootState): null | Localize => {
  const i18n = state.i18n.entity;
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
  const i18n = state.i18n.entity;
  if (!i18n) {
    return null;
  }
  return i18n.language;
};

export const selectSupportedLangauges = (
  state: RootState,
): null | ReadonlyArray<string> => {
  const i18n = state.i18n.entity;
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

export type ChangeLanguage = i18n['changeLanguage'];

export const selectLanguageChanged = (
  state: RootState,
): null | ChangeLanguage => {
  const i18n = state.i18n.entity;
  if (!i18n) {
    return null;
  }
  return i18n.changeLanguage.bind(i18n);
};
