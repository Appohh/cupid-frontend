import { useJwt } from "react-jwt";

const getDecodedToken = (token) => {
    const { decodedToken, isExpired } = useJwt(token);
    return decodedToken;
};

const isTokenExpired = (token) => {

};

export default {
    getDecodedToken,
    isTokenExpired
};
