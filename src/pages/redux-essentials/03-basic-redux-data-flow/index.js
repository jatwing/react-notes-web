import React from 'react';
import { Provider } from 'react-redux';

import store from './redux/store';
import { SocialMediaFeed } from './view/social-media-feed';

const BasicReduxDataFlow = () => {
  return (
    <Provider store={store}>
      <SocialMediaFeed />
    </Provider>
  );
};

export default BasicReduxDataFlow;
