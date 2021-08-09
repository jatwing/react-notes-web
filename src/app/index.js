import 'src/utils/i18n.js';

import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { FileNode, DirectoryNode } from 'src/pages';

import { Layout } from './layout';
import { Theme } from './theme';

import { directoryNodes, fileNodes } from 'src/utils';

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
