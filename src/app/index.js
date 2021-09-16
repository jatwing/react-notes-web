import 'src/utils/i18n.js';

import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { DirectoryNode } from 'src/pages/directory-node';
import { FileNode } from 'src/pages/file-node';
import { store } from 'src/redux/store';
import { directoryNodes, fileNodes } from 'src/utils/file-system';

import { Layout } from './layout';
import { Theme } from './theme';

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

export const App = () => {
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
