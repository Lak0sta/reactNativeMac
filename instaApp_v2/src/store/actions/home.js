import axios from '../../plugins/axios';
import * as types from './actionTypes';
import { api } from '../../modules/api';
import { uiStartLoading, uiStopLoading } from './index';


export const setAccountPlan = () => async dispatch => {
  try {
    dispatch(uiStartLoading());
    const { data } = await axios.get(api.account.currentPlan());
    dispatch({
      type: types.SET_CURRENT_ACCOUNT_PLAN,
      payload: data
    });
    dispatch(uiStopLoading());
  } catch (error) {
    dispatch(uiStopLoading());
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
