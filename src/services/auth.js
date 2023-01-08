import axiosInstance from 'utils/axios';
import getLocalStorage from 'utils/getLocalStorage';

const signup = async (data) => {
  const res = await axiosInstance.post('/signup', data);

  localStorage.setItem('token', res.data.auth_token);
  return res;
};

const login = async (data) => {
  const res = await axiosInstance.post('/auth/login', data);

  localStorage.setItem('token', res.data.auth_token);
  return res;
};

const guest = async () => {
  const res = await axiosInstance.post('/auth/login', {
    email: 'galihhp@rakamin.com',
    password: 'password',
  });

  localStorage.setItem('token', res.data.auth_token);

  return res;
};

export { signup, login, guest };
