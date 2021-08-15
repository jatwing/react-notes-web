export const incrementType = 'counter/increment';
export const decrementType = 'counter/decrement';
export const incrementByAmountType = 'counter/incrementByAmount';

/** actions */
export const increment = { type: incrementType };
export const decrement = { type: decrementType };

/** action creators */
export const createIncrementByAmount = (amount) => ({
  type: incrementByAmountType,
  payload: amount,
});

/** reducers */
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
