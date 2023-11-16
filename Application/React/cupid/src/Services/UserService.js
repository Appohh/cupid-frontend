import axios from "axios";
import config from "../config/hostConfig";

function authenticateUser(Credentials) {
    return axios.post(`${config.hostname}/user/authenticate`, Credentials)
        .then(response => response)
        .catch(error => {
            console.error('Failed to authenticate user:', error);
            throw error; 
        });
}

function validateToken(Token) {
    return axios.post(`${config.hostname}/user/validateToken`, Token)
        .then(response => response)
        .catch(error => {
            console.error('Failed to validate token:', error);
            throw error; 
        });
}

function checkVerificationStatus(Token) {
    console.log("Token: ", Token);
    return axios.get(`${config.hostname}/user/verificationStatus/${Token}`)
    .then(response => response)
    .catch(error => {
        console.error('Failed to retrieve token status:', error);
        throw error; 
    });
}

function createToken(Email) {
    return axios.post(`${config.hostname}/user/createToken`, Email)
        .then(response => response)
        .catch(error => {
            console.error('Failed to create token:', error);
            throw error; 
        });
}


export default {
    authenticateUser,
    validateToken,
    checkVerificationStatus,
    createToken
}