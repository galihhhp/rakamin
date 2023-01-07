import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://todo-api-18-140-52-65.rakamin.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
