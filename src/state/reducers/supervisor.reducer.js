import {
  FETCH_SUPERVISOR_REQUEST,
  FETCH_SUPERVISOR_SUCCESS,
  FETCH_SUPERVISOR_FAILURE
} from "../actions";

const INITIAL_STATE = {
  data: [],
  error: null,
  isLoading: false,
};

export const supervisorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SUPERVISOR_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_SUPERVISOR_SUCCESS:
      return {
        ...state,
        data: action.supervisors,
        isLoading: false,
      };
    case FETCH_SUPERVISOR_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:

      return state;
  }
};
