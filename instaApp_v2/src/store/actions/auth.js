import { AsyncStorage } from 'react-native';
import axios from 'axios';
import * as types from './actionTypes';
import { api } from '../../modules/api';
import startMainTabs from '../../screens/MainTabs/MainTabs';


export const tryAuth = (authData, authMode) => async dispatch => {
  if (authMode === 'signup') {
    signUp(authData);
  } else {
    logIn(dispatch, authData);
  }
};

const signUp = async payload => {
  try {
    await axios.post(api.auth.signUp(), payload);
    alert('Your request was successfully sent, please check you email for account activation')
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
    const { data } = await axios.post(api.auth.login(), payload);
    await AsyncStorage.setItem('at', data.token);
    dispatch({
      type: types.AUTH_SET_TOKEN,
      payload: data
    });
    startMainTabs();
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
