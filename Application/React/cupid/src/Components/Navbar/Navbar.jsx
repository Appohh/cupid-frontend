import { useContext } from 'react'
import { Context } from '../../App.jsx'
import CustomLink from '../Mechanism/DynamicNavLinks.jsx'

const Navbar = () => {
  const context = useContext(Context)
  const [loggedIn, setloggedIn] = [context.loggedUser, context.setLoggedUser]


  return (
    <nav className='nav'>
      <ul>
        {loggedIn ? (
          <>
            <CustomLink to="/foryou" icon="fa fa-car">For You</CustomLink>
            <CustomLink to="/matches" icon="fa fa-car">Matches</CustomLink>
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

