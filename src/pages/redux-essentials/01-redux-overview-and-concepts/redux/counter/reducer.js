import {
  COUNTER_VALUE_DECREASED,
  COUNTER_VALUE_INCREASED,
  COUNTER_VALUE_INCREASED_ASYNC_FULFILLED,
  COUNTER_VALUE_INCREASED_ASYNC_PENDING,
  COUNTER_VALUE_INCREASED_ASYNC_REJECTED,
  COUNTER_VALUE_INCREASED_BY_AMOUNT,
} from './actions';

export const counterReducer = (state, action) => {
  switch (action.type) {
    case COUNTER_VALUE_INCREASED: {
      return {
        ...state,
        counter: {
          ...state.counter,
          value: state.counter.value + 1,
        },
      };
    }
    case COUNTER_VALUE_DECREASED: {
      return {
        ...state,
        counter: {
          ...state.counter,
          value: state.counter.value - 1,
        },
      };
    }
    case COUNTER_VALUE_INCREASED_BY_AMOUNT: {
      return {
        ...state,
        counter: {
          ...state.counter,
          value: state.counter.value + action.payload,
        },
      };
    }
    case COUNTER_VALUE_INCREASED_ASYNC_PENDING: {
      return {
        ...state,
        counter: {
          ...state.counter,
          status: 'pending',
        },
      };
    }
    case COUNTER_VALUE_INCREASED_ASYNC_FULFILLED: {
      return {
        ...state,
        counter: {
          ...state.counter,
          value: state.counter.value + action.payload.data,
          status: 'fulfilled',
        },
      };
    }
    case COUNTER_VALUE_INCREASED_ASYNC_REJECTED: {
      console.log(action.error);
      return {
        ...state,
        counter: {
          ...state.counter,
          status: 'rejected',
        },
      };
    }
    default: {
      return state;
    }
  }
};
