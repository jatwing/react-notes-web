import { createStore, applyMiddleware  } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { counterReducer } from './counter/reducer'
import { helloSaga } from './hello/sagas'
import { watchCounterValueIncreasedAsync   } from './counter/sagas'


const initialState = {
  counter: {
    value: 0,
    status: '',
  }
}


const sagaMiddleware = createSagaMiddleware() 

const composedEnhancer = composeWithDevTools(applyMiddleware(sagaMiddleware));

export const store = createStore(counterReducer, initialState, composedEnhancer);

sagaMiddleware.run(helloSaga);
sagaMiddleware.run(watchCounterValueIncreasedAsync);

