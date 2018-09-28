import * as types from '../actions/actionTypes';

const initialState = {
  accountInfo: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ACCOUNT_INFO:
      return {
        ...state,
        accountInfo: action.payload
      };
  
    default:
      return state;
  }
};

export default reducer;