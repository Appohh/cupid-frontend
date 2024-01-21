import Navbar from '../Navbar/Navbar.jsx'
import Logo from '../../assets/images/Logo-Cupid-FINAL.png'
import LoginPopup from '../LoginPopup/LoginPopup'
import { useContext, useState } from 'react'
import { Context } from '../../App.jsx'
import { useJwt } from "react-jwt";
import UserService from '../../Services/UserService.js'
import { set } from 'react-hook-form'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomLink from '../Mechanism/DynamicNavLinks.jsx'
import NotificationComponent from '../Notification/NotificationComponent.jsx'
import { ToastContainer } from 'react-toastify'

const Sidebar = ({ }) => {
  const { loggedUser, setLoggedUser, setErrorPopUp } = useContext(Context)
  const [userInfoDropped, setUserInfoDropped] = useState(false)
  const [loginPopupDropped, setLoginPopupDropped] = useState(false)

  const [loggedin, setLoggedin] = useState(false)

  const token = localStorage.getItem('jwt')

  
  const { decodedToken, isExpired } = useJwt(token || "");
  const navigate = useNavigate();

  console.log("decodedToken:", decodedToken)
  

  useEffect(() => {
    if (decodedToken) {

      if (isExpired) {
        setLoggedUser(null);
        localStorage.removeItem('jwt');
        const error = {
          title: "Login expired",
          message: "Please login again",
          color: "#ff3f4c",
          location: "/"
        }
        navigate("/", { state: { error } });
        return;
      }

      const userId = decodedToken?.userId;
      if (userId) {
        UserService.getUserById(userId)
          .then(data => {
            if (data && data.data) {
              console.log('User fetched:', data);
              setLoggedUser(data.data);
              setLoggedin(true);
            } else {
              console.error('Unexpected data format:', data);
              setLoggedin(false);
              setLoggedUser(null);
            }
          })
          .catch(error => {
            console.error('Failed to fetch user:', error);
            setLoggedin(false);
            setLoggedUser(null);
          });
      }
    } else {
      setLoggedin(false);
      setLoggedUser(null);
    }
  }, [decodedToken, setLoggedUser]);

  console.log("user:", loggedUser)



  function logOut() {
    localStorage.removeItem('jwt')
    setLoggedUser(null)
    setLoggedin(false)
    navigate('/')
  }

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
      {loginPopupDropped && (<LoginPopup onClose={toggleLoginPopup} />)}
      <div className='side-logo'>
        <img src={Logo} alt="logo" height="128px" style={{ width: '19vw', maxWidth: '270px' }} />
      </div>

      <div className='side-user-info'>
        {loggedin ? (
          <>
            <div className='user-dropdown-head'>
              <img src={`src/assets/uploaded-images/${loggedUser.pimage}`} alt="user-pic" height="35px" width="50px" />
              <h2 onClick={dropUserInfo}>{loggedUser?.fname + " " + loggedUser?.lname} <i id='userDropIcon' className='fa fa-chevron-circle-down' aria-hidden="true"></i></h2>
            </div>
            <ul id='user-actions'>
              <CustomLink to="/profile">Profile</CustomLink>
              <CustomLink to="/preferences">Preferences</CustomLink>
              <CustomLink to="/appearance">Appearance</CustomLink>
              <h3 onClick={logOut} >Logout</h3>
            </ul>
            <NotificationComponent />
            <ToastContainer />
          </>
        ) : (
          <button onClick={() => setLoginPopupDropped(!loginPopupDropped)} className='btn'>Login</button>
        )}
      </div>

      <Navbar />

      {loggedin && (

        <div className='side-frequent-chats'>

        </div>

      )}
    </div>
  );
};

export default Sidebar;