/** bundling */
import { add } from './math';
import { lazy, Suspense } from 'react';
import ErrorBoundary from './error-boundary';
const bundling = () => {
  console.log(add(16, 26));
};

/** code splitting */
const codeSplitting = () => {
  import('./math').then((math) => {
    console.log(math.add(16, 26));
    return math.add(1, 2);
  });
};

/** React.lazy */
const OtherComponent = lazy(() => import('./other-component'));
const AnotherComponent = lazy(() => import('./another-component'));
const MyComponent = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
        <AnotherComponent />
      </Suspense>
    </ErrorBoundary>
  );
};

/** named exports */
const UsedComponent = lazy(() => import('./used-component'));
const NamedExports = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <UsedComponent />
      </Suspense>
    </ErrorBoundary>
  );
};

const CodeSplitting = () => {
  bundling();
  codeSplitting();
  return (
    <>
      <MyComponent />
      <NamedExports />
    </>
  );
};

export default CodeSplitting;
