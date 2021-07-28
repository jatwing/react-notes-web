import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Layout from './layout';
import { getSubtrees, getNodes } from 'utils/directory-tree';
import pageRoutes from 'config/routes';
import project from 'config/project';
import ParentNodePage from 'pages/parent-node-page';
import LeafNodePage from 'pages/leaf-page';
import Theme from './theme';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';


import { useEffect } from 'react'
import  {useCreatingAuthentication} from 'hooks'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: project.api,
});

const subtrees = getSubtrees(pageRoutes.map((route) => '/' + route));

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

const leafRoutes = pageRoutes.map((pageRoute) => {
  /**
   * [Module methods](https://webpack.js.org/api/module-methods/)
   * the import() must contain at least some information
   * about where the module is located.
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
        <ApolloProvider client={client}>
          <Layout>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                {leafRoutes.map((route) => (
                  <Route {...route} />
                ))}
                {parentRoutes.map((route) => (
                  <Route {...route} />
                ))}
                <Redirect to="/" />
              </Switch>
            </Suspense>
          </Layout>
        </ApolloProvider>
      </Router>
    </Theme>
  );
};

export default App;
