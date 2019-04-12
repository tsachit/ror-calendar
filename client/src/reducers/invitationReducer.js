import { GET_GUESTS, INVITATION_LOADING } from "../actions/types";

const initialState = {
  guests: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INVITATION_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_GUESTS:
      return {
        ...state,
        guests: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
