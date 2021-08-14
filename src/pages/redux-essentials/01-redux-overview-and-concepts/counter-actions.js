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
