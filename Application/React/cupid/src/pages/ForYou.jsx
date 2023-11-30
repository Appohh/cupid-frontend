import ValidateJwt from "../Components/Mechanism/ValidateJwt";
import { Context } from '../App.jsx';
import { useContext, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

function ForYou() {
  const token = localStorage.getItem('jwt');

  const { setErrorPopUp } = useContext(Context);
  const navigate = useNavigate();
  const currentLocation = useLocation();

//check for incoming errors
  useEffect(() => {
    if (currentLocation.state && currentLocation.state.error) {
      const { title, message, color, location } = currentLocation.state.error;
      setErrorPopUp({
        title,
        message,
        color,
        location,
      });
    }
  }, [currentLocation.state]);


  
  function error() {
    const error = {
      title: "oops",
      message: "hey",
      color: "#ff3f4c",
      location: "/"
    }
    navigate("/", { state: { error } });
  }


  return (
    <>
      <h1>For You</h1>
      {token ? (
        <p>Token: {token}</p>
      ) : (
        <p>Token not found</p>
      )}
      <button onClick={error}>hi</button>
    </>
  );
}

export default ForYou;