import isEmpty from "../validation/is-empty";

import { SET_CURRENT_USER, AUTH_LOADING, AUTH_LOADED } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true
      };
    case AUTH_LOADED:
      return {
        ...state,
        loading: false
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
