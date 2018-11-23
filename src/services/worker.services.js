import axios from "axios";
import {rootUrl} from "../constants";
import {authHeader} from "../helpers";

const fetchWorkers = (params) => {
  let url = `${rootUrl}/api/workers`;
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

export const workerServices = {
  fetchWorkers
};
