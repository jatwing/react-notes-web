import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './layout';
import { getSubtrees } from 'utils/directory-tree';
import routes from 'config/routes';
import ParentNode from 'pages/parent-node';

const subtrees = getSubtrees(routes.map((route) => route.path));

const parentNodeRoutes = subtrees.map((subtree) => {
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
    <Router>
      <Layout>
        <Switch>
          {parentNodeRoutes.map((route) => (
            <Route {...route} />
          ))}
          {leafRoutes.map((route) => (
            <Route {...route} />
          ))}
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
