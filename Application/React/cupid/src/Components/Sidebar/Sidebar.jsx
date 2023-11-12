import Navbar from '../Navbar/Navbar.jsx';
import Logo from '../../assets/images/logo.webp'
import LoginPopup from '../LoginPopup/LoginPopup'
import { useContext, useState } from 'react'
import { Context } from '../../App.jsx'



const Sidebar = ({ }) => {
  const [loggedUser, setLoggedUser] = useContext(Context)
  const [userInfoDropped, setUserInfoDropped] = useState(false)
  const [loginPopupDropped, setLoginPopupDropped] = useState(false)
  console.log("user:", loggedUser)
  function toggleLoginPopup() {
    setLoginPopupDropped(!loginPopupDropped)
  }

  function dropUserInfo() {
    const dropdown = document.getElementById('user-actions')
    const dropdownIcon = document.getElementById('userDropIcon')

    if (userInfoDropped) {
      dropdown.style.display = "none"
      dropdownIcon.style.transform = "rotate(90deg)"
      setUserInfoDropped(false)
    } else {
      dropdown.style.display = "block"
      dropdownIcon.style.transform = "rotate(0deg)"
      setUserInfoDropped(true)
    }
  }

  return (
    <div className='side'>
       {loginPopupDropped && ( <LoginPopup onClose={toggleLoginPopup} /> ) }
      <div className='side-logo'>
        <img src={Logo} alt="logo" height="40px" />
      </div>

      <div className='side-user-info'>
        {loggedUser ? (
          <>
            <div className='user-dropdown-head'>
              <img src={Logo} alt="user-pic" height="35px" width="50px" />
              <h2 onClick={dropUserInfo}>Adrian Grace <i id='userDropIcon' className='fa fa-chevron-circle-down' aria-hidden="true"></i></h2>
            </div>
            <ul id='user-actions'>
              <h3>My account</h3>
              <h3>Preferences</h3>
              <h3 onClick={() => setLoggedUser(null)} >Logout</h3>
            </ul>
          </>
        ) : (
          <button onClick={() => setLoginPopupDropped(!loginPopupDropped)} className='btn'>Login</button>
        )}
      </div>

      <Navbar />

      {loggedUser && (

        <div className='side-frequent-chats'>

        </div>

      )}
    </div>
  );
};

export default Sidebar;