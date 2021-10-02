import 'src/lib/i18next.js';
import './styles.css';
import { ThemeProvider } from '@mui/material/styles';
import { Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Page } from 'src/containers/page';
import { store } from 'src/redux/store';
import { theme } from 'src/lib/mui';
import { usePageViews } from 'src/redux/router/hooks';
import { pageItemsUrls } from 'src/lib/pages';
import { CssBaseline } from '@mui/material';

export const PageSwitch = () => {
  usePageViews();
  const { t } = useTranslation();
  return (
    <Page>
      <Switch>
        <Suspense fallback={t('loading')}>
          {pageItemsUrls.map((url) => (
            <Route
              exact={true}
              path={url}
              component={lazy(() => import(`src/pages${url}/index.js`))}
              key={url}
            />
          ))}
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
        <CssBaseline />
        <Router>
          <PageSwitch />
        </Router>
      </ThemeProvider>
    </Provider>
  );
};
