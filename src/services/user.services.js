import axios from "axios";
import { rootUrl } from "../constants";

const login = ({email, password}) => {
  const requestOptions = {
    url: `${rootUrl}/auth/login`,
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
    data: JSON.stringify({email, password})
  };

  return axios(requestOptions)
    .then(response => {
      const {user, access_token} = response.data;
      return {...user, token: access_token};
    })
    .catch(error => {
      return Promise.reject(error);
    });

};

export const userServices = {
  login
};