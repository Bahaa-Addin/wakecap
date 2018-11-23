import {getToken, getUser} from "./user";

export const authHeader = () => {
  // return authorization header with jwt token
  const user = getUser();
  const token = getToken();

  if (user && token) {
    return { 'Authorization': 'Bearer ' + token };
  } else {
    return {};
  }
};
