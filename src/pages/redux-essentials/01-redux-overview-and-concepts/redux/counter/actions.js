import { fetchCount } from '../../api/counter';
import { selectCounterStatus } from './selectors';

export const COUNTER_VALUE_INCREASED = 'counter/valueIncreased';
export const COUNTER_VALUE_DECREASED = 'counter/valueDecreased';
export const COUNTER_VALUE_INCREASED_BY_AMOUNT =
  'counter/valueIncreasedByAmount';
export const COUNTER_VALUE_INCREASED_ASYNC_PENDING =
  'counter/valueIncreasedAsync/pending';
export const COUNTER_VALUE_INCREASED_ASYNC_FULFILLED =
  'counter/valueIncreasedAsync/fulfilled';
export const COUNTER_VALUE_INCREASED_ASYNC_REJECTED =
  'counter/valueIncreasedAsync/rejected';

/** action creators */
export const valueIncreased = () => ({ type: COUNTER_VALUE_INCREASED });

export const valueDecreased = () => ({ type: COUNTER_VALUE_DECREASED });

export const valueIncreasedByAmount = (amount) => ({
  type: COUNTER_VALUE_INCREASED_BY_AMOUNT,
  payload: amount,
});

export const valueIncreasedAsyncPending = () => ({
  type: COUNTER_VALUE_INCREASED_ASYNC_PENDING,
});

export const valueIncreasedAsyncFulfilled = (promise) => ({
  type: COUNTER_VALUE_INCREASED_ASYNC_FULFILLED,
  payload: promise,
});

export const valueIncreasedAsyncRejected = (error) => ({
  type: COUNTER_VALUE_INCREASED_ASYNC_REJECTED,
  error: error.toString(),
});

export const valueIncreasedAsync = (amount) => async (dispatch, getState) => {
  const status = selectCounterStatus(getState());
  if (status === 'pending') {
    return;
  }
  dispatch(valueIncreasedAsyncPending());
  try {
    const response = await fetchCount(amount);
    dispatch(valueIncreasedAsyncFulfilled(response));
  } catch (error) {
    dispatch(valueIncreasedAsyncRejected(error));
  }
};
