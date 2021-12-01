import { buildDate, pageFileTree, readmeMarkdown } from 'lib/preval';
import React from 'react';
import { Provider } from 'react-redux';
import { useAuthor } from 'redux/author/hooks';
import { useNotifications } from 'redux/notifications/hooks';
import { usePages } from 'redux/pages/hooks';
import { useProject } from 'redux/project/hooks';
import { usePagesRankings  } from 'redux/rankings/hooks';
import { store } from 'redux/store';

console.log(buildDate);
//console.log(readmeMarkdown)
console.log(pageFileTree);

const Test = (): JSX.Element => {
  const author = useAuthor();
  const notifications = useNotifications();
  const project = useProject();
  const pages = usePages();
  const rankings = usePagesRankings();

  return <>{'test the hooks here'}</>;
};

export const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">{'test'}</header>
        <Test />
      </div>
    </Provider>
  );
};
