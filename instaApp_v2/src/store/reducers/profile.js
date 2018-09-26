import * as types from '../actions/actionTypes';

const initialState = {
  profileInfo: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PROFILE_INFO:
      return {
        ...state,
        profileInfo: action.payload
      };
  
    default:
      return state;
  }
};

export default reducer;