import React from 'react';
import { Provider } from 'react-redux';
import { useAuthor } from 'redux/author/hooks';
import { useNotifications } from 'redux/notifications/hooks';
import { useProject } from 'redux/project/hooks';
import { store } from 'redux/store';
import { useRankings } from 'redux/rankings/hooks'

const Test = (): JSX.Element => {
  const author = useAuthor();
  const notifications = useNotifications();
  const project = useProject();

  const rankings = useRankings();

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
