import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, AUTH_LOADING } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  dispatch(setAuthLoading());
  axios
    .post("/auth/register", userData)
    .then(res => {
      history.push("/login");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Confirm Register User
export const confirmRegistration = (registrationToken, history) => {
  axios
    .get(`/auth/confirmation/${registrationToken}`)
    .then(res => history.push("/login"))
    .catch(err => history.push("/not-found"));
};

// Login User
export const loginUser = userData => dispatch => {
  axios
    .post("/auth/login", userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to localStorage
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for further requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// Set loading state
export const setAuthLoading = () => {
  return {
    type: AUTH_LOADING
  };
};
