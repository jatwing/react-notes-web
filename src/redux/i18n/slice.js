import { createAction } from '@reduxjs/toolkit';

/** actions */
export const instanceInitialized = createAction('i18n/instanceInitialized');
export const resourcesAdded = createAction('i18n/resourcesAdded');
export const languageChanged = createAction('i18n/languageChanged');
export const localizationAccessible = createAction(
  'i18n/localizationAccessible'
);
export const translationAccessible = createAction('i18n/translationAccessible');
