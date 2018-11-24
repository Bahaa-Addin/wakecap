import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT } from '../actions';
import { getUser } from '../../helpers';

let user = getUser();
const initialState = user ? { login: true, user } : {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        login: false,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        login: true,
        user: action.user
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        login: false,
        error: action.error
      };
    case USER_LOGOUT:
      return {
        isLoading: false,
        login: false,
      };
    default:
      return state
  }
};

