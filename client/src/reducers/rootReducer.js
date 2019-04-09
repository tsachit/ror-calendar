import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import calendarReducer from "./calendarReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  calendar: calendarReducer
});
