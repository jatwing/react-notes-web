import { createAction } from '@reduxjs/toolkit';

export const createLifecycleActions = (typePrefix) => {
  const pending = createAction(
    typePrefix + '/pending',
    () => ({ payload: undefined })
  )
  const fulfilled = createAction(
    typePrefix + '/fulfilled',
    (payload) => ({ payload })
  )
  const rejected = createAction(
    typePrefix + '/rejected',
    (error) => ({ error })
  )
  return {
    typePrefix,
    pending,
    fulfilled,
    rejected
  }
}


/**
 *
 * create lifecycle-styled saga
 *
 * it is a concept of promise lifecylce from the createAsyncThunk.
 */






