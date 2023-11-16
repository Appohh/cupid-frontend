import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import succes from '../assets/images/succes-nobg.gif';
import error from '../assets/images/error-nobg.gif';
import UserService from '../Services/UserService';  

function Verify() {
  const { token } = useParams();
  const [verified, setVerified] = useState(false);


  useEffect(() => {

    const tokenObject = {
      token: token,
    };

    UserService.validateToken(tokenObject)
      .then(response => {
        console.log(response);
        setVerified(true);
      })
      .catch(error => {
        setVerified(false);
      });
  }, [token]);

  return (
    <section className="section-blank verify-screen">
      <img src={verified ? succes : error} alt={verified ? 'success' : 'error'} />
      {verified ? (
        <h1>Success! Your email has been verified.</h1>
      ) : (
        <h1>Sorry, your email verification failed.</h1>
      )}
    </section>
  );
}

export default Verify;
