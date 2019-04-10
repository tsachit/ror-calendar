import axios from "axios";

import {
  GET_ERRORS,
  GET_SCHEDULES,
  SCHEDULE_CREATED,
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
export const createSchedule = (scheduleData, history) => dispatch => {
  dispatch({
    type: SCHEDULE_CREATED,
    payload: scheduleData
  });
  // axios
  //   .post("/api/schedules", scheduleData)
  //   .then(res => history.push("/schedules"))
  //   .catch(err =>
  //     dispatch({
  //       type: GET_ERRORS,
  //       payload: err.response.data
  //     })
  //   );
};

// Set loading state
export const setScheduleLoading = () => {
  return {
    type: SCHEDULES_LOADING
  };
};
