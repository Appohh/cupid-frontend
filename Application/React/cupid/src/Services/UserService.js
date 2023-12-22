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

function createUser(request) {
    return instance.post('/user/create', request)
        .then(response => response)
        .catch(error => {
            console.error('Failed to create user:', error);
            throw error;
        });
}


function authenticateUser(Credentials) {
    return nonAuthInstance.post(`/user/authenticate`, Credentials)
        .then(response => {
            return response;
        })
        .catch(error => {
            console.error('Failed to authenticate user:', error);
        });
}

function validateToken(Token) {
    return nonAuthInstance.post(`/user/validateToken`, Token)
        .then(response => response)
        .catch(error => {
            console.error('Failed to validate token:', error);
            throw error;
        });
}

function checkVerificationStatus(Token) {
    console.log("Token: ", Token);
    return nonAuthInstance.get(`/user/verificationStatus/${Token}`)
        .then(response => response)
        .catch(error => {
            console.error('Failed to retrieve token status:', error);
            throw error;
        });
}

function createToken(Email) {
    return nonAuthInstance.post(`/user/createToken`, Email)
        .then(response => response)
        .catch(error => {
            console.error('Failed to create token:', error);
            throw error;
        });
}

function getUserById(id) {
    return instance.get(`${config.hostname}/user/${id}`)
        .then(response => response)
        .catch(error => {
            console.error('Failed to retrieve user:', error);
            throw error;
        });
}

function userFilledPreferences(userId) {
    return instance.get(`${config.hostname}/user/validatePreference/${userId}`)
        .then(response => response)
        .catch(error => {
            console.error('Failed to retrieve user preferences:', error);
            throw error;
        });
}

function updateUserPreferences(updatePreferenceRequest) {
    return instance.post(`${config.hostname}/user/updatePreference`, updatePreferenceRequest)
        .then(response => response)
        .catch(error => {
            console.error('Failed to update user preferences:', error);
            throw error;
        });
}

function userFilledAppearance(userId) {
    return instance.get(`${config.hostname}/user/validateAppearance/${userId}`)
        .then(response => response)
        .catch(error => {
            console.error('Failed to retrieve user appearance:', error);
            throw error;
        });
}

function updateUserAppearance(updateAppearanceRequest) {
    return instance.post(`${config.hostname}/user/updateAppearance`, updateAppearanceRequest)
        .then(response => response)
        .catch(error => {
            console.error('Failed to update user appearance:', error);
            throw error;
        });
}


export default {
    createUser,
    authenticateUser,
    validateToken,
    checkVerificationStatus,
    createToken,
    getUserById,
    userFilledPreferences,
    updateUserPreferences,
    userFilledAppearance,
    updateUserAppearance,
}