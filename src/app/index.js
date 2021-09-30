import 'src/lib/i18next.js';
import './styles.css';

import { ThemeProvider } from '@mui/material/styles';
import { useEffect,Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Page } from 'src/containers/page';
import { DirectoryNode } from 'src/pages/directory-node';
import { FileNode } from 'src/pages/file-node';
import { store } from 'src/redux/store';
import { theme } from 'src/lib/mui';

import { usePageViews } from 'src/redux/router/hooks'


const directoryNodes = [];
const fileNodes = [];

// it should render a Page component.
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



export const PageSwitch  = () => {
  usePageViews();
  const { t } = useTranslation();
  return (
    <Page>
      <Switch>
        <Suspense fallback={t('loading')}>
          {directoryRoutes}
          {fileRoutes}
        </Suspense>
        <Redirect to="/" />
      </Switch>
    </Page>
  );
};

export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <PageSwitch />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};
