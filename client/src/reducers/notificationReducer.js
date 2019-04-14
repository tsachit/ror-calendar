import {
  SUCCESS_NOTIFICATION,
  ERROR_NOTIFICATION,
  CLEAR_NOTIFICATIONS
} from "../actions/types";

const initialState = {
  display: false,
  type: "success",
  message: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_NOTIFICATION:
      return {
        display: true,
        type: "success",
        message: action.payload
      };
    case ERROR_NOTIFICATION:
      return {
        display: true,
        type: "danger",
        message: action.payload
      };
    case CLEAR_NOTIFICATIONS:
      return {
        ...state
      };
    default:
      return state;
  }
}
