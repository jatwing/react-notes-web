import 'src/utils/i18n.js';

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
import { directoryNodes, fileNodes } from 'src/utils/file-system';
import { Layout, Layout2 } from './layout';
import { Theme } from './theme';

import { createTheme, ThemeProvider } from '@mui/material/styles';

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

/** TODO delete */
export const App2 = () => {
  const { t } = useTranslation();
  return (
    <Provider store={store}>
      <Theme>
        <Router>
          <Layout2>
            <Switch>
              <Suspense fallback={t('loading')}>
                {directoryRoutes}
                {fileRoutes}
              </Suspense>
              <Redirect to="/" />
            </Switch>
          </Layout2>
        </Router>
      </Theme>
    </Provider>
  );
};

/**
 * the new app, using the theme-provider
 * with the new package name
 */
const theme = createTheme({});

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
