import {
  GET_SCHEDULES,
  GET_SCHEDULE,
  SCHEDULES_LOADING
} from "../actions/types";

const initialState = {
  schedules: [],
  schedule: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SCHEDULES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_SCHEDULES:
      return {
        ...state,
        schedules: action.payload,
        loading: false
      };
    case GET_SCHEDULE:
      return {
        ...state,
        schedule: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
