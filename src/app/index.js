import 'src/utils/i18n.js';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { DirectoryNode, FileNode } from 'src/pages';
import { directoryNodes, fileNodes } from 'src/utils';

import { Layout } from './layout';
import { Theme } from './theme';

import { Provider } from 'react-redux'
import { store } from 'src/redux/store'
import { authorsFetched } from 'src/redux/authors/sagas'

const directoryRoutes = directoryNodes.map((node) => (
  <Route
    exact={true}
    path={node.url}
    render={() => <DirectoryNode node={node} />}
    key={node.url}
  />
));

const fileRoutes = fileNodes.map((node) => (
  <Route
    exact={true}
    path={node.url}
    render={() => <FileNode node={node} />}
    key={node.url}
  />
));


/**
 * dispatch the action only once.
 *
 *
 * can we do lazy dispatching?
 *
 */
store.dispatch(authorsFetched());




const App = () => {
  const { t } = useTranslation();
  return (
    <Provider store={store}>
    <Theme>
      <Router>
        <Layout>
          <Switch>
            <Suspense fallback={t('loading')}>
              {directoryRoutes}
              {fileRoutes}
            </Suspense>
            <Redirect to="/" />
          </Switch>
        </Layout>
      </Router>
    </Theme>
    </Provider>
  );
};

export { App };
