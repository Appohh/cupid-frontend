import axios from "axios";

const hostname = 'http://localhost:8080'

function authenticateUser(Credentials) {
    return axios.post(`${hostname}/user/authenticate`, Credentials)
        .then(response => response)
        .catch(error => {
            console.error('Failed to authenticate user:', error);
            throw error; 
        });
}



export default {
    authenticateUser
}