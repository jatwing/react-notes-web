import 'src/utils/i18n.js';

import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { LeafNodePage } from 'src/pages/file-node';
import { ParentNodePage, DirectoryNode } from 'src/pages/directory-node';

import { Layout } from './layout';
import { Theme } from './theme';

import {
  traverse,
  directoryNodes,
  fileNodes,
  fileRoutes,
} from 'src/utils/file-system';
import { pageTree } from 'src/utils';

const directoryProps = directoryNodes.map((node) => ({
  exact: true,
  path: node.url,
  render: () => <DirectoryNode node={node} />,
  key: node.url,
}));

const fileProps = fileNodes.map((node) => {
  /**
   * [Module methods](https://webpack.js.org/api/module-methods/)
   * the import() must contain at least some information about where the module
   * is located.
   */
  const component = lazy(() => import(`src/pages/${node.route}/index.js`));
  return {
    exact: true,
    path: '/' + node.route,
    render: () => <LeafNodePage component={component} title="dasdasd" />,
    key: node.url,
  };
});

const App = () => {
  const { t } = useTranslation();
  return (
    <Theme>
      <Router>
        <Layout>
          <Switch>
            <Suspense fallback={t('loading')}>
              {[...directoryProps, ...fileProps].map((props) => (
                <Route {...props} />
              ))}
            </Suspense>
            <Redirect to="/" />
          </Switch>
        </Layout>
      </Router>
    </Theme>
  );
};

export { App };
