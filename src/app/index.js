import 'src/utils/i18n.js';

import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { LeafNodePage, ParentNodePage } from 'src/pages';
import { getNodes, getRoutes, getSubtrees, pageFiles } from 'src/utils';

import { Layout } from './layout';
import { Theme } from './theme';

const routes = getRoutes(pageFiles);
const subtrees = getSubtrees(routes.map((route) => '/' + route));

const parentRoutes = subtrees
  .filter((subtree) => subtree.children.length > 0)
  .map((subtree) => {
    return {
      exact: true,
      path: subtree.path,
      render: () => (
        <ParentNodePage
          subtree={subtree}
          subtrees={subtrees}
          title={subtree.parent}
        />
      ),
      key: subtree.path,
    };
  });

const leafRoutes = routes.map((pageRoute) => {
  /**
   * [Module methods](https://webpack.js.org/api/module-methods/)
   * the import() must contain at least some information about where the module
   * is located.
   */
  const component = lazy(() => import(`src/pages/${pageRoute}/index.js`));
  const path = '/' + pageRoute;
  const nodes = getNodes(path);
  return {
    exact: true,
    path: path,
    render: () => (
      <LeafNodePage component={component} title={nodes[nodes.length - 1]} />
    ),
    key: path,
  };
});

const App = () => {
  return (
    <Theme>
      <Router>
        <Layout>
          <Switch>
            <Suspense fallback="">
              {[...parentRoutes, ...leafRoutes].map((route) => (
                <Route {...route} key={route} />
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
