import ValidateJwt from "../Components/Mechanism/ValidateJwt";
import { Context } from '../App.jsx';
import { useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function ForYou() {
  const token = localStorage.getItem('jwt');

  const { errorPopUp, setErrorPopUp } = useContext(Context);
  const navigate = useNavigate();
  console.log(errorPopUp)

  function error() {
    setErrorPopUp({
      title: "oops",
      message: "hey",
      color: "red",
      show: true
    })
    navigate('/foryou')
  }

  function cancel() {
    if (errorPopUp.show) {
      setErrorPopUp({
        title: "",
        message: "",
        color: "",
        show: false
      })
      console.log("cancel", errorPopUp)
    }
  }

  



  return (
    <>
      <h1>For You</h1>
      {token ? (
        <p>Token: {token}</p>
      ) : (
        <p>Token not found</p>
      )}
      <ValidateJwt jwt={token} />
    </>
  );
}

export default ForYou;