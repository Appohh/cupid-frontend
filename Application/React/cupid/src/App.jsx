import Home from './pages/Home'
import Register from './pages/Register'
import ForYou from './pages/ForYou'
import Matches from './pages/Matches'
import Verify from './pages/Verify'
import { Routes, Route } from 'react-router-dom';
import { createContext, useState } from 'react'


import './App.css'
import Sidebar from './Components/Sidebar/Sidebar';

export const Context = createContext();

function App() {
  const [loggedUser, setLoggedUser] = useState(null);


  return (
    <>
      <Context.Provider value={[loggedUser, setLoggedUser]}>
        <div className='mainwrap'>
          <Sidebar />
          <div className='content'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='register' element={<Register />} />
              <Route path="/foryou" element={<ForYou />} />
              <Route path="/matches" element={<Matches />} />
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
