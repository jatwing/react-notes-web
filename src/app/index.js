import 'src/utils/i18next.js';
import './styles.css'

import { createTheme, ThemeProvider } from '@mui/material/styles';
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

import { Layout } from 'src/containers/layout';
import { Theme } from './theme';

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
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: /** 露草色 */ '#3d87c3',
    },
    secondary: {
      main: /** 木賊色 */ '#40684f',
    },
    error: {
      main: /** 茜色 */ '#b13546',
    },
    warning: {
      main: /** 躑躅色 */ '#dc4473',
    },
    info: {
      main: /** 向日葵色 */ '#ffba20',
    },
    success: {
      main: /** 菫色 */ '#654e99',
    },
  },
  typography: {
    fontFamilies: {
      serif: '"Roboto Slab", "serif"',
      sansSerif: '"Roboto", "Helvetica", "Arial", sans-serif',
      monospace: '"Roboto Mono", monospace',
    },
  },

});

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
