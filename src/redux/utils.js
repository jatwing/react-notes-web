import { createAction } from '@reduxjs/toolkit';

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
