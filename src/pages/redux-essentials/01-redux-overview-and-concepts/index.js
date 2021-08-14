import { Provider } from 'react-redux';
import { store } from './store';
import { Counter } from './counter';

const ReduxOverviewAndConcepts = () => {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
};

export default ReduxOverviewAndConcepts;
