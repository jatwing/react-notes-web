import { fetchCount } from './api';
import { selectCounterStatus } from './selectors';

export const incrementType = 'counter/increment';
export const decrementType = 'counter/decrement';
export const incrementByAmountType = 'counter/incrementByAmount';
export const incrementAsyncPendingType = 'counter/incrementAsync/pending';
export const incrementAsyncFulfilledType = 'counter/incrementAsync/fulfilled';
export const incrementAsyncRejectedType = 'counter/incrementAsync/rejected';

/** action creators */
export const createIncrement = () => ({ type: incrementType });

export const createDecrement = () => ({ type: decrementType });

export const createIncrementByAmount = (amount) => ({
  type: incrementByAmountType,
  payload: amount,
});

export const createIncrementAsyncPending = () => ({
  type: incrementAsyncPendingType,
});

export const createIncrementAsyncFulfilled = (promise) => ({
  type: incrementAsyncFulfilledType,
  payload: promise,
});

export const createIncrementAsyncRejected = (error) => ({
  type: incrementAsyncRejectedType,
  error: error.toString(),
});

export const createIncrementAsync = (amount) => async (dispatch, getState) => {
  const status = selectCounterStatus(getState());
  if (status === 'pending') {
    return;
  }
  dispatch(createIncrementAsyncPending());
  try {
    const response = await fetchCount(amount);
    dispatch(createIncrementAsyncFulfilled(response));
  } catch (error) {
    dispatch(createIncrementAsyncRejected(error));
  }
};
