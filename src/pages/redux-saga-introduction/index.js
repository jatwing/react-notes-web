import {Provider } from 'react-redux'

import { store } from './redux/store'
import { Counter } from './view/counter';

const ReduxSagaBeginnerTutorial = () => {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  )
}


export default ReduxSagaBeginnerTutorial;


