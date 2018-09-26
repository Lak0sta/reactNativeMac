import axios from 'axios';
import * as types from './actionTypes';
import { api } from '../../modules/api';


export const setProfileInfo = () => async dispatch => {
  try {
    const { data } = await axios.get(api.profile.info());
    dispatch({
      type: types.SET_PROFILE_INFO,
      payload: data
    });
  } catch (error) {
    console.log(error.response)
  }
};
