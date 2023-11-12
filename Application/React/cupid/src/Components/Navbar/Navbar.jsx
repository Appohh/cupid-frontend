import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { useContext } from 'react'
import { Context } from '../../App.jsx'

const Navbar = () => {

  const [loggedIn, setloggedIn] = useContext(Context)


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

function CustomLink({ to, children, icon, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname })
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        <i className={icon}></i>
        {children}
      </Link>
    </li>
  )
}

export default Navbar;

