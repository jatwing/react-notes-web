import 'src/lib/i18next.js';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomePage } from 'src/containers/home-page';
import { PageContainer } from 'src/containers/page-container';
import { theme } from 'src/lib/mui';
import { pageItemUrls } from 'src/lib/pages';
import { usePageViews } from 'src/redux/pages/hooks';
import { store } from 'src/redux/store';

export const PageSwitch = () => {
  usePageViews();
  return (
    <PageContainer>
      <Switch>
        <Suspense fallback={'TODO use skeleton'}>
          {pageItemUrls.map((url) => (
            <Route
              exact={true}
              path={url}
              component={lazy(() => import(`src/pages${url}/index.js`))}
              key={url}
            />
          ))}
          <Route path="/" component={HomePage} />
        </Suspense>
      </Switch>
    </PageContainer>
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
