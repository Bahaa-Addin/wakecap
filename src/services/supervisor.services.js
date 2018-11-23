import axios from "axios";
import {rootUrl} from "../constants";
import {authHeader} from "../helpers";

const fetchSupervisors = (params) => {
  let url = `${rootUrl}/api/supervisors`;
  if (params) {
    const requestParams = Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&');

    url += `?${requestParams}`;
  }

  const requestOptions = {
    url,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader()
    },
    withCredentials: true,
  };

  return axios(requestOptions)
    .then(response =>  response.data)
    .catch(error => Promise.reject(error));
};

export const supervisorServices = {
  fetchSupervisors
};
