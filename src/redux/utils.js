import { createAction } from '@reduxjs/toolkit';

/**
 *   pending -> fulfilled -> settled 
 *
 *   TODO add the settled one, somehow spread the message
 *
 *   guess that it can guarantee the receiver can freely use the state
 */


export const createLifecycleActions = (typePrefix) => {
  const actionCreator = createAction(typePrefix);
  actionCreator.pending = createAction(typePrefix + '/pending', () => ({
    payload: undefined,
  }));
  actionCreator.fulfilled = createAction(
    typePrefix + '/fulfilled',
    (payload) => ({ payload })
  );
  actionCreator.rejected = createAction(typePrefix + '/rejected', (error) => ({
    error,
  }));

  actionCreator.settled = createAction(typePrefix + '/settled', (payload) => ({
    payload
  }))

  return actionCreator;
};
