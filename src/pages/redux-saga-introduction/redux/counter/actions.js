export const COUNTER_VALUE_INCREASED = 'counter/valueIncreased';
export const COUNTER_VALUE_DECREASED = 'counter/valueDecreased';
export const COUNTER_VALUE_INCREASED_BY_AMOUNT =
  'counter/valueIncreasedByAmount';
export const COUNTER_VALUE_INCREASED_ASYNC =
  'counter/valueIncreasedAsync';
export const COUNTER_VALUE_INCREASED_ASYNC_PENDING =
  'counter/valueIncreasedAsync/pending';
export const COUNTER_VALUE_INCREASED_ASYNC_FULFILLED =
  'counter/valueIncreasedAsync/fulfilled';
export const COUNTER_VALUE_INCREASED_ASYNC_REJECTED =
  'counter/valueIncreasedAsync/rejected';

export const valueIncreased = () => ({ type: COUNTER_VALUE_INCREASED });
export const valueDecreased = () => ({ type: COUNTER_VALUE_DECREASED });
export const valueIncreasedByAmount = (payload) => ({
  type: COUNTER_VALUE_INCREASED_BY_AMOUNT,
  payload,
});
export const valueIncreasedAsync = () => ({
  type: COUNTER_VALUE_INCREASED_ASYNC,
});
export const valueIncreasedAsyncPending = (payload) => ({
  type: COUNTER_VALUE_INCREASED_ASYNC_PENDING,
  payload,
});
export const valueIncreasedAsyncSucceeded = (payload) => ({
  type: COUNTER_VALUE_INCREASED_ASYNC_FULFILLED,
  payload,
});
export const valueIncreasedAsyncFailed = (error) => ({
  type: COUNTER_VALUE_INCREASED_ASYNC_REJECTED,
});

