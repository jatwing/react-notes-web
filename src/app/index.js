import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Layout from './layout';
import { getSubtrees } from 'utils/directory-tree';
import routes from 'config/routes';
import ParentNode from 'pages/parent-node';
import Theme from './theme';

const subtrees = getSubtrees(routes.map((route) => route.path));

const parentRoutes = subtrees
  .filter((subtree) => subtree.children.length > 0)
  .map((subtree) => {
    return {
      exact: true,
      path: subtree.path,
      render: () => <ParentNode subtree={subtree} subtrees={subtrees} />,
      key: subtree.path,
    };
  });

const leafRoutes = routes.map((route) => ({
  exact: true,
  path: route.path,
  component: route.component,
  key: route.path,
}));

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
