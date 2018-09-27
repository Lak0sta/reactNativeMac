import axios from 'axios';
import * as types from './actionTypes';
import { api } from '../../modules/api';
import { uiStartLoading, uiStopLoading } from './index';


export const setAccountInfo = () => async dispatch => {
  try {
    dispatch(uiStartLoading());
    const { data } = await axios.get(api.account.info());
    dispatch({
      type: types.SET_ACCOUNT_INFO,
      payload: data
    });
    dispatch(uiStopLoading());
  } catch (error) {
    console.log(error.response)
  }
};

export const updateAccountPassword = (payload) => async dispatch => {
  try {
    dispatch(uiStartLoading());
    await axios.put(api.account.updatePassword(), payload);
    dispatch(uiStopLoading());
    alert('Your password was successfully changed!')
  } catch (error) {
    alert('Something went wrong, please, try again');
  }
};
