import { SHOW_SNACKBAR, HIDE_SNACKBAR } from "../actions";

export const alertReducer = (state = { message: "" }, action) => {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return Object.assign({}, state, {
        message: action.message
      });
    case HIDE_SNACKBAR:
      return Object.assign({}, state, {
        message: ""
      });

    default:
      console.debug("alert reducer hit default", action.type);
      return state;
  }
};
