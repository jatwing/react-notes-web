import { createAction } from '@reduxjs/toolkit';

export const createLifecycleActions = (typePrefix) => {
  const actionCreator = createAction(typePrefix);
  actionCreator.pending = createAction(
    typePrefix + '/pending',
    () => ({ payload: undefined })
  )
  actionCreator.fulfilled = createAction(
    typePrefix + '/fulfilled',
    (payload) => ({ payload })
  )
  actionCreator.rejected = createAction(
    typePrefix + '/rejected',
    (error) => ({ error })
  )
  return actionCreator;
}


