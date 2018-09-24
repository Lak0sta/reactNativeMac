import axios from 'axios';
import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './actionTypes';
import { api } from '../../modules/api';


export const tryAuth = (authData, authMode) => async dispatch => {
  const { data } = await axios.post(api.auth.login(), authData);
  console.log(data);

  // if (token) {
  //   // Dispatch an action saying FB login is done
  //   dispatch({
  //     type: types.FACEBOOK_LOGIN_SUCCESS,
  //     payload: token
  //   })
  // } else {
  //   // Start up FB Login process
  //   doFacebookLogin(dispatch);
  // }
};

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