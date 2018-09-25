import {
  AUTH_SET_TOKEN,
  AUTH_REMOVE_TOKEN
} from '../actions/actionTypes';

const initialState = {
  auth: {
    token: null,
    expires_at: null
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SET_TOKEN:
      return {
        ...state,
        auth: action.payload
      };

    case AUTH_REMOVE_TOKEN:
      return {
        ...state,
        token: null,
        expiryDate: null
      };
  
    default:
      return state;
  }
};

export default reducer;