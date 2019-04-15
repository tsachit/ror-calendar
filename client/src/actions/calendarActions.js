import axios from "axios";
import { apiVersionURI } from "../utils/helper";

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_SCHEDULE,
  GET_SCHEDULES,
  SCHEDULES_LOADING,
  SUCCESS_NOTIFICATION
} from "./types";

// Get all Schedules
export const getSchedules = () => dispatch => {
  dispatch(setScheduleLoading());
  axios
    .get(`${apiVersionURI}/schedules`)
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

// Get Schedule
export const getSchedule = (id, history = false) => dispatch => {
  dispatch(clearErrors());
  let url = `${apiVersionURI}/schedules/${id}`;
  // to access edit page
  if (history) {
    url += "/edit";
  }
  axios
    .get(url)
    .then(res =>
      dispatch({
        type: GET_SCHEDULE,
        payload: res.data
      })
    )
    .catch(err => {
      if (history) {
        return history.push("/not-found");
      } else {
        dispatch({
          type: GET_SCHEDULE,
          payload: null
        });
      }
    });
};

// Create Schedule
export const createSchedule = (
  scheduleData,
  addEventCallback,
  closePopupCallback
) => dispatch => {
  axios
    .post(`${apiVersionURI}/schedules`, scheduleData)
    .then(res => closePopupCallback(addEventCallback(res.data)))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Update Schedule
export const updateSchedule = (id, scheduleData, history) => dispatch => {
  axios
    .put(`${apiVersionURI}/schedules/${id}`, scheduleData)
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Schedule
export const deleteSchedule = (id, history) => dispatch => {
  axios
    .delete(`${apiVersionURI}/schedules/${id}`)
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Schedule
export const getScheduleFromToken = (token, history) => dispatch => {
  dispatch(setScheduleLoading());
  axios
    .get(`${apiVersionURI}/schedules/${token}/see-invitation`)
    .then(res =>
      dispatch({
        type: GET_SCHEDULE,
        payload: res.data
      })
    )
    .catch(err => {
      if (history) {
        return history.push("/not-found");
      } else {
        dispatch({
          type: GET_SCHEDULE,
          payload: null
        });
      }
    });
};

// Respond(accept or reject) the invitation
export const respondToInvitation = (token, action, history) => dispatch => {
  dispatch(setScheduleLoading());
  axios
    .put(`${apiVersionURI}/schedules/${token}/invitation/${action}`)
    .then(res => {
      history.push(`/register`);
      dispatch({
        type: SUCCESS_NOTIFICATION,
        payload:
          "You have successfully responded to the event. You can also connect with our system."
      });
    })
    .catch(err =>
      dispatch({
        type: GET_SCHEDULE,
        payload: null
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
