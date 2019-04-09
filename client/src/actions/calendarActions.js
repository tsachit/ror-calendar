// import axios from "axios";

import { GET_SCHEDULES, SCHEDULE_CREATED, SCHEDULES_LOADING } from "./types";

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

// Get all Schedules
export const getSchedules = () => dispatch => {
  dispatch(setScheduleLoading());
  dispatch({
    type: GET_SCHEDULES,
    payload: []
  });
  // axios
  //   .get("/api/schedules")
  //   .then(res =>
  //     dispatch({
  //       type: GET_SCHEDULES,
  //       payload: res.data
  //     })
  //   )
  //   .catch(err =>
  //     dispatch({
  //       type: GET_SCHEDULES,
  //       payload: null
  //     })
  //   );
};

// Set loading state
export const setScheduleLoading = () => {
  return {
    type: SCHEDULES_LOADING
  };
};
