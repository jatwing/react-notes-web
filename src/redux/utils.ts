import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
  createAction,
} from '@reduxjs/toolkit';

export type ActionWithPromiseStates = ActionCreatorWithoutPayload<string> & {
  pending: ActionCreatorWithoutPayload<string>;
  fulfilled: ActionCreatorWithPayload<any, string>;
  rejected: ActionCreatorWithPayload<string, string>;
  settled: ActionCreatorWithoutPayload<string>;
};

export const createActionWithPromiseStates = (
  domain: string,
  event: string,
): ActionWithPromiseStates =>
  Object.assign(createAction<void, string>(`${domain}/${event}`), {
    pending: createAction<void, string>(`${domain}/${event}/pending`),
    fulfilled: createAction<any, string>(`${domain}/${event}/fulfilled`),
    rejected: createAction<string, string>(`${domain}/${event}/rejected`),
    settled: createAction<void, string>(`${domain}/${event}/settled`),
  });
