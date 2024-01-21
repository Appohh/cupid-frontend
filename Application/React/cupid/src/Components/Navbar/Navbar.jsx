import { useContext } from 'react'
import { Context } from '../../App.jsx'
import CustomLink from '../Mechanism/DynamicNavLinks.jsx'
import { useJwt } from "react-jwt";

const Navbar = () => {
  const context = useContext(Context)
  const [loggedIn, setloggedIn] = [context.loggedUser, context.setLoggedUser]

  const token = localStorage.getItem('jwt')
  const { decodedToken, isExpired } = useJwt(token || "");

  return (
    <nav className='nav'>
      <ul>
        {loggedIn ? (
          <>
            <CustomLink to="/foryou" icon="fa fa-car">For You</CustomLink>
            <CustomLink to="/matches" icon="fa fa-car">Matches</CustomLink>
            {decodedToken?.roles && decodedToken.roles.includes(2) && (
              <>
                <h3 className='nav-text'>Admin tools</h3>
                <CustomLink to="/dashboard" icon="fa fa-car">Analytics</CustomLink>
              </>
            )}
          </>
        ) : (
          <>
            <CustomLink to="/" icon="fa fa-car">Home</CustomLink>
          </>
        )}
      </ul>


    </nav>
  )
}



export default Navbar;

