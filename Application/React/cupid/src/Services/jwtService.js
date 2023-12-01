import { useJwt } from "react-jwt";

// Function to get the decoded token
const getDecodedToken = (token) => {
    const { decodedToken, isExpired } = useJwt(token);
    return decodedToken;
};

// Function to check if the token is expired or not
const isTokenExpired = (token) => {

};

export default {
    getDecodedToken,
    isTokenExpired
};
