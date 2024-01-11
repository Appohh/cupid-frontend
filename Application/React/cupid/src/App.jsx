import Home from './pages/Home'
import Register from './pages/Register'
import ForYou from './pages/ForYou'
import Matches from './pages/Matches'
import Verify from './pages/Verify'
import { Routes, Route } from 'react-router-dom';
import { createContext, useState } from 'react'


import './App.css'
import Sidebar from './Components/Sidebar/Sidebar';
import ErrorPopUp from './Components/Mechanism/ErrorPopUp';
import Preferences from './pages/Preferences'
import Appearance from './pages/Appearance'
import AccountFinish from './pages/AccountFinish'

export const Context = createContext();

function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [errorPopUp, setErrorPopUp] = useState({
    title: '',
    message: '',
    color: '',
    location: '',
  });
  const [sendNotification, setSendNotification] = useState({
    receiverId: null,
    message: '',
  });

  const contextValue = {
    loggedUser,
    setLoggedUser,
    errorPopUp,
    setErrorPopUp,
    sendNotification,
    setSendNotification,
  };


  return (
    <>
      <Context.Provider value={contextValue}>
        <div className='mainwrap'>
          <Sidebar />
          <div className='error-container'>
            <ErrorPopUp />
          </div>
          <div className='content'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='register' element={<Register />} />
              <Route path='preferences' element={<Preferences />} />
              <Route path='appearance' element={<Appearance />} />
              <Route path="/foryou" element={<ForYou />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/foryoulock" element={<AccountFinish />} />
              <Route path="verify/:token" element={<Verify />} />
            </Routes>
          </div>
          {/* <div className='footer'> </div> */}
        </div>
      </Context.Provider>

    </>
  )
}

export default App
