import { pagesLocalized } from './slice';
import { watchEntitesLocalization } from 'src/redux/i18n/sagas';

/** watchers */
export function* watchPagesLocalized() {
  yield watchEntitesLocalization(pagesLocalized);
}
