import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'redux/store';

const Test = (): JSX.Element => {
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
