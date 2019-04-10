import { GET_SCHEDULES, SCHEDULES_LOADING } from "../actions/types";

const initialState = {
  schedules: [],
  schedule: {},
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
    default:
      return state;
  }
}
