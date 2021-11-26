import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app';
import 'lib/i18next'

/* eslint-disable import/no-named-as-default-member */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
