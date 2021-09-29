import { createAction } from '@reduxjs/toolkit';

/**
 *   pending -> fulfilled -> settled
 *
 *   TODO add the settled one, somehow spread the message
 *
 *   guess that it can guarantee the receiver can freely use the state
 */

export const createLifecycleActions = (domain, event) => {
  const actionCreator = createAction(`${domain}/${event}`);
  actionCreator.pending = createAction(`${domain}/${event}/pending`, () => ({
    payload: undefined,
  }));
  actionCreator.fulfilled = createAction(
    `${domain}/${event}/fulfilled`,
    (payload) => ({ payload })
  );
  actionCreator.rejected = createAction(
    `${domain}/${event}/rejected`,
    (error) => ({
      error,
    })
  );
  actionCreator.settled = createAction(
    `${domain}/${event}/settled`,
    (payload) => ({
      payload,
    })
  );

  return actionCreator;
};
