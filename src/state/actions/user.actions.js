import { userServices } from '../../services';
import {setUser, removeUser, setToken, removeToken} from '../../helpers';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGOUT = 'USER_LOGOUT';

const login = ({email, password}) => {
  const request = () => ({ type: USER_LOGIN_REQUEST});
  const success = (user) => ({ type: USER_LOGIN_SUCCESS, user });
  const failure = (error) => ({ type: USER_LOGIN_FAILURE, error });

  return (dispatch) => {
    dispatch(request());

    userServices.login({email, password})
      .then(
        user => {
          dispatch(success(user));
          const {id, name, token} = user;

          setUser({id, name});
          setToken(token);
        },
        error => {
          dispatch(failure(error));
          removeUser();
        }
      )
      .catch(error => {
        dispatch(failure(error));
        removeUser();
      })
  };
};

const logout = () => {
  removeUser();
  removeToken();
  return { type: USER_LOGOUT };
};

export const userActions = {
  login,
  logout
};
