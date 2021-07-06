import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Layout from './layout';
import { getSubtrees, getNodes } from 'utils/directory-tree';
import routes from 'config/routes';
import ParentNodePage from 'pages/parent-node-page';
import LeafNodePage from 'pages/leaf-page';
import Theme from './theme';

const subtrees = getSubtrees(routes.map((route) => route.path));

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

const leafRoutes = routes.map((route) => {
  const nodes = getNodes(route.path);
  return {
    exact: true,
    path: route.path,
    render: () => (
      <LeafNodePage
        component={route.component}
        title={nodes[nodes.length - 1]}
      />
    ),
    key: route.path,
  };
});

const App = () => {
  return (
    <Theme>
      <Router>
        <Layout>
          <Switch>
            {leafRoutes.map((route) => (
              <Route {...route} />
            ))}
            {parentRoutes.map((route) => (
              <Route {...route} />
            ))}
            <Redirect to="/" />
          </Switch>
        </Layout>
      </Router>
    </Theme>
  );
};

export default App;
