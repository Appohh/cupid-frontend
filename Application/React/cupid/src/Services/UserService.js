import axios from 'axios';
import config from '../config/hostConfig';

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


export default {
    createUser,
    authenticateUser,
    validateToken,
    checkVerificationStatus,
    createToken,
    getUserById
}