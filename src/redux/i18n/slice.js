import { createLifecycleActions } from 'src/redux/utils';

/** actions */
export const instanceInitialized = createLifecycleActions(
  'i18n',
  'instanceInitialized'
);
export const resourcesAdded = createLifecycleActions('i18n', 'resourcesAdded');
export const languageChanged = createLifecycleActions(
  'i18n',
  'languageChanged'
);
