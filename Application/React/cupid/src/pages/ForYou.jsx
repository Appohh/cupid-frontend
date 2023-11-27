import ValidateJwt from "../Components/Mechanism/ValidateJwt";
import { Context } from '../App.jsx';
import { useContext} from 'react'

function ForYou() {
  const token = localStorage.getItem('jwt');
  const context = useContext(Context);
  const [errorPopUp, setErrorPopUp] = [context.errorPopUp, context.setErrorPopUp]

  console.log(context)



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