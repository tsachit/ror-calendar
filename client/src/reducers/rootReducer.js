import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import calendarReducer from "./calendarReducer";
import invitationReducer from "./invitationReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  calendar: calendarReducer,
  invitations: invitationReducer
});
