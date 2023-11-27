import React from 'react';
import { useJwt } from "react-jwt";
import { useNavigate } from 'react-router-dom';

let token = null;

const ValidateJwt = ({ jwt }) => {
  token = jwt;
  const { decodedToken, isExpired } = useJwt(token);
  const navigate = useNavigate();

  if (!token) {
    // Handle case when there is no JWT in local storage
    // Do something
    return <div>No JWT found</div>;
  }

  if (isExpired) {
    // Handle case when JWT is expired
    // Do something
    return <div>JWT is expired</div>;
  }

  if (!decodedToken) {
    // Handle case when JWT is invalid
    // Do something
    return <div>Invalid JWT</div>;
  }

  // Handle case when JWT is correct
  // Do something
  return <div>ValidateJwt</div>;
}

export default ValidateJwt;
