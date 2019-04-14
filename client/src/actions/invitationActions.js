import axios from "axios";
import { apiVersionURI } from "../utils/helper";

import { GET_GUESTS, GET_ERRORS } from "./types";

// Get all Guests
export const getGuests = scheduleID => dispatch => {
  axios
    .get(`${apiVersionURI}/schedules/${scheduleID}/guests`)
    .then(res =>
      dispatch({
        type: GET_GUESTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_GUESTS,
        payload: []
      })
    );
};

// Add a Guest
export const addGuest = (
  scheduleID,
  invitationData,
  addGuestToList
) => dispatch => {
  axios
    .post(`${apiVersionURI}/schedules/${scheduleID}/invite`, invitationData)
    .then(res => addGuestToList(res.data))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
