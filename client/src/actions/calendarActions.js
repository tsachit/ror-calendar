import axios from "axios";

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_SCHEDULES,
  SCHEDULES_LOADING
} from "./types";

// Get all Schedules
export const getSchedules = () => dispatch => {
  dispatch(setScheduleLoading());
  axios
    .get("/schedules")
    .then(res =>
      dispatch({
        type: GET_SCHEDULES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SCHEDULES,
        payload: []
      })
    );
};

// Create Schedule
export const createSchedule = (
  scheduleData,
  addEventCallback,
  closePopupCallback
) => dispatch => {
  axios
    .post("/schedules", scheduleData)
    .then(res => closePopupCallback(addEventCallback(res.data)))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setScheduleLoading = () => {
  return {
    type: SCHEDULES_LOADING
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
