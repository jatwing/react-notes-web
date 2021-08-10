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

const App = () => {
  const { t } = useTranslation();
  return (
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
  );
};

export { App };
