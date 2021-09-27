import 'src/utils/i18next.js';
import './styles.css'

import {  ThemeProvider } from '@mui/material/styles';
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

import { Layout } from 'src/containers/layout';
import { theme } from 'src/utils/mui'


const directoryNodes = [];
const fileNodes = [];

const directoryRoutes = directoryNodes.map((node) => (
  <Route
    exact={true}
    path={node.url}
    render={() => <DirectoryNode node={node} />}
    key={node.url}
  />
));


/**
 * no longer have dir node, should be renamed to page.
 */
const fileRoutes = fileNodes.map((node) => (
  <Route
    exact={true}
    path={node.url}
    render={() => <FileNode node={node} />}
    key={node.url}
  />
));

/**
 * the new app, using the theme-provider
 * with the new package name
 */

export const App = () => {
  const { t } = useTranslation();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </Provider>
  );
};
