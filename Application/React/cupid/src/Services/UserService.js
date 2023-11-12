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

export default {
    authenticateUser
}