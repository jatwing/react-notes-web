import { Fallback } from 'containers/fallback';
import { Page } from 'containers/page';
import { pageItemUrls } from 'lib/pages';
import * as React from 'react';
import { createElement } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { useDocumentTitle, usePageViews } from 'redux/pages/hooks';
import { store } from 'redux/store';

export const PageRoutes = (): JSX.Element => {
  usePageViews();
  useDocumentTitle();
  return (
    <Page>
      <Routes>
        {pageItemUrls.map((url) => (
          <Route
            path={url}
            element={
              <React.Suspense fallback={<Fallback />}>
                {createElement(
                  React.lazy(() => import(`pages/${url.slice(1)}`)),
                )}
              </React.Suspense>
            }
            key={url}
          />
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Page>
  );
};

export const App = (): JSX.Element => (
  <Provider store={store}>
    <Router>
      <PageRoutes />
    </Router>
  </Provider>
);
