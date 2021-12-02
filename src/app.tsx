import * as React from 'react';
import { createElement } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { Fallback } from 'containers/fallback';
import { Page } from 'containers/page';
import { pageItemUrls } from 'lib/pages';
import { useDocumentTitle, usePageViews } from 'redux/pages/hooks';
import { store } from 'redux/store';
import Index from 'pages';


// huh, slice 1 for the lazy load, know the basic location
//
// another question is that what should a relative url lool like
//
// we have  /  and /apple/banana now,
//
// @see https://webmasters.stackexchange.com/questions/56840/what-is-the-purpose-of-leading-slash-in-html-urls/56844


export const PageRoutes = (): JSX.Element => {
  return (
    <Page>
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense fallback={<Fallback />}>
              {createElement(React.lazy(() => import('pages')))}
            </React.Suspense>
          }
          key="/"
        />
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
