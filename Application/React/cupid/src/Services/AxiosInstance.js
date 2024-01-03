import axios from 'axios';
import config from '../config/hostConfig';
import { isExpired } from 'react-jwt';

const instance = axios.create({
    baseURL: config.hostname,
});

instance.interceptors.request.use(
    function (config) {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (isExpired(localStorage.getItem('jwt'))) {
      localStorage.removeItem('jwt');
      window.location.href = '/';
      return Promise.reject(error);
      }
    }
  );

const nonAuthInstance = axios.create({
    baseURL: config.hostname,
});

const getAuthToken = () => {
    if(!localStorage.getItem("jwt")) {
        console.log("No JWT token found");
        return;
    }
    return localStorage.getItem("jwt");
};

export { instance, nonAuthInstance };
