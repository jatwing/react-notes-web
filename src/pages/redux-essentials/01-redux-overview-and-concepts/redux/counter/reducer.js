import {
  decrementType,
  incrementAsyncFulfilledType,
  incrementAsyncPendingType,
  incrementAsyncRejectedType,
  incrementByAmountType,
  incrementType,
} from './actions';

export const counterReducer = (state, action) => {
  switch (action.type) {
    case incrementType: {
      return {
        ...state,
        counter: {
          ...state.counter,
          value: state.counter.value + 1,
        },
      };
    }
    case decrementType: {
      return {
        ...state,
        counter: {
          ...state.counter,
          value: state.counter.value - 1,
        },
      };
    }
    case incrementByAmountType: {
      return {
        ...state,
        counter: {
          ...state.counter,
          value: state.counter.value + action.payload,
        },
      };
    }
    case incrementAsyncPendingType: {
      return {
        ...state,
        counter: {
          ...state.counter,
          status: 'pending',
        },
      };
    }
    case incrementAsyncFulfilledType: {
      return {
        ...state,
        counter: {
          ...state.counter,
          value: state.counter.value + action.payload.data,
          status: 'fulfilled',
        },
      };
    }
    case incrementAsyncRejectedType: {
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
