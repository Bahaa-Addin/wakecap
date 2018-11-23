import {
  FETCH_WORKERS_REQUEST,
  FETCH_WORKERS_SUCCESS,
  FETCH_WORKERS_FAILURE
} from "../actions";

const INITIAL_STATE = {
  data: [],
  error: null,
  isLoading: false,
};

export const workerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_WORKERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_WORKERS_SUCCESS:
      return {
        ...state,
        data: action.workers,
        isLoading: false,
      };
    case FETCH_WORKERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:

      return state;
  }
};
