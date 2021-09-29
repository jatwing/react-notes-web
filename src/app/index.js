import 'src/utils/i18next.js';
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
  useLocation,
} from 'react-router-dom';
import { Layout } from 'src/containers/layout';
import { DirectoryNode } from 'src/pages/directory-node';
import { FileNode } from 'src/pages/file-node';
import { store } from 'src/redux/store';
import { theme } from 'src/utils/mui';
import { routeChanged } from 'src/redux/router/slice' 

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

function usePageViews() {
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);

    store.dispatch(routeChanged.settled(location.pathname))
  }, [location]);
}


  /**
   * reference:  https://reactrouter.com/web/api/Hooks/uselocation
   *
   * TODO: the hierarchy should be: route - app (with the hook inside)
   * my code looks wired because containers are not well-defined
   */
export const Test = () => {
  // Switch ? App ? Page?
  usePageViews();
  const { t } = useTranslation();

  return (
    <Layout>
      <Switch>
        <Suspense fallback={t('loading')}>
          {directoryRoutes}
          {fileRoutes}
        </Suspense>
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
};

export const App = () => {
  //usePageViews();

  const { t } = useTranslation();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Test />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};
