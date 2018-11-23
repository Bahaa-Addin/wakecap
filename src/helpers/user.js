export const setUser = ({id, name}) => {
  localStorage.setItem('user', JSON.stringify({id, name}));
  localStorage.setItem('login', true);
};

export const getUser = () => JSON.parse(localStorage.getItem('user'));

export const removeUser = () => {
  localStorage.removeItem('user');
  localStorage.setItem('login', false);
};

export const setToken = (token) => {
  localStorage.setItem('token', JSON.stringify(token))
};

export const getToken = () => JSON.parse(localStorage.getItem('token'));

export const removeToken = () => localStorage.removeItem('token');
