import {
  incrementType,
  decrementType,
  incrementByAmountType,
} from './counter-actions';

export const counterReducer = (state, action) => {
  switch (action.type) {
    case incrementType: {
      return {
        ...state,
        counter: {
          value: state.counter.value + 1,
        },
      };
    }
    case decrementType: {
      return {
        ...state,
        counter: {
          value: state.counter.value - 1,
        },
      };
    }
    case incrementByAmountType: {
      return {
        ...state,
        counter: {
          value: state.counter.value + action.payload,
        },
      };
    }
    default: {
      return state;
    }
  }
};
