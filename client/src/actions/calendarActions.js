import axios from "axios";

import { GET_ERRORS } from "./types";

// Create Schedule
export const createSchedule = (scheduleData, history) => dispatch => {
  return history.push("/schedules");
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
