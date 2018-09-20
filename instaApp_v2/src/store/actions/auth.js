import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './actionTypes';

export const authStartLoading = () => {
  return {
    type: AUTH_SET_TOKEN
  };
};

export const authStopLoading = () => {
  return {
    type: AUTH_REMOVE_TOKEN
  };
};