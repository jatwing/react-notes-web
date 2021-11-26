import {
  createAction,
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from '@reduxjs/toolkit';

type ActionWtihPromiseStates = ActionCreatorWithoutPayload<string> & {
  pending: ActionCreatorWithoutPayload<string>;
  fulfilled: ActionCreatorWithPayload<any, string>;
  rejected: ActionCreatorWithPayload<any, string>;
  settled: ActionCreatorWithoutPayload<string>;
};

export const createActionWithPromiseStates = (
  domain: string,
  event: string,
): ActionWtihPromiseStates =>
  Object.assign(createAction<void, string>(`${domain}/${event}`), {
    pending: createAction<void, string>(`${domain}/${event}/pending`),
    fulfilled: createAction<any, string>(`${domain}/${event}/fulfilled`),
    rejected: createAction<any, string>(`${domain}/${event}/rejected`),
    settled: createAction<void, string>(`${domain}/${event}/settled`),
  });
