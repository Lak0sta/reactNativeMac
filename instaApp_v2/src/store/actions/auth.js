import { AsyncStorage } from 'react-native';
import axios from '../../plugins/axios';
import * as types from './actionTypes';
import { api } from '../../modules/api';
import startMainTabs from '../../screens/MainTabs/MainTabs';
import App from '../../../App';
import { uiStartLoading, uiStopLoading } from './index';


export const tryAuth = (authData, authMode) => async dispatch => {
  if (authMode === 'signup') {
    signUp(authData);
  } else {
    logIn(dispatch, authData);
  }
};

const signUp = async payload => {
  try {
    dispatch(uiStartLoading());
    await axios.post(api.auth.signUp(), payload);
    alert('Your request was successfully sent, please check you email for account activation')
    dispatch(uiStopLoading());
  } catch (err) {
    if (err.response.status === 400) {
      alert('Something went wrong with data, check input fields');
    } else {
      alert('Something wnet wrong, please try again');
    }
  }
};

const logIn = async (dispatch, payload) => {
  try {
    dispatch(uiStartLoading());
    const { data } = await axios.post(api.auth.login(), payload);
    await AsyncStorage.setItem('at', data.token);
    dispatch({
      type: types.AUTH_SET_TOKEN,
      payload: data
    });
    startMainTabs();
    dispatch(uiStopLoading());
  } catch(err) {
    if (err.response.status === 400) {
      alert(`${err.response.data.errors[0].message}`)
    } else if (err.response.status === 500) {
      alert('Something went wrong, please try again!')
    } else {
      alert('Unauthorized, please, login again');
    }
  }
};

export const logOut = () => async dispatch => {
  await AsyncStorage.removeItem('at');
  dispatch({
    type: types.AUTH_REMOVE_TOKEN
  });
  App();
};
