import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Layout } from './layout';
import { getRoutes, getSubtrees, getNodes, pageFiles } from 'utils';
import { ParentNodePage, LeafNodePage } from 'pages';
import { Theme } from './theme';
import 'utils/i18n.js';

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
  const component = lazy(() => import(`pages/${pageRoute}/index.js`));
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
              {[...parentRoutes, ...leafRoutes]
                .concat(leafRoutes)
                .map((route) => (
                  <Route {...route} />
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
