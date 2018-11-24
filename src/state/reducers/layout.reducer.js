import {
  TOGGLE_SIDENAV,
  SET_SIDENAV_OPEN,
} from "../actions";

const INITIAL_STATE = {
  sidenavOpen: true
};

export const layoutReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_SIDENAV:
      return {
        ...state,
        sidenavOpen: !state.sidenavOpen
      };

    case SET_SIDENAV_OPEN:
      return {
        ...state,
        sidenavOpen: action.payload
      };

    default:
      return state;
  }
};

