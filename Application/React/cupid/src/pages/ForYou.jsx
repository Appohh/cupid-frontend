import { Context } from '../App.jsx';
import { useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import UserService from '../Services/UserService.js'
import ForYouService from '../Services/ForYouService.js'
import { useState } from 'react';
import Deck from '../Components/Deck/Deck.jsx';

function ForYou() {

  const { loggedUser, setErrorPopUp } = useContext(Context);
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const [profileFinished, setProfileFinished] = useState(false)
  const [potentialMatches, setPotentialMatches] = useState([])

  useEffect(() => {
    Promise.all([
      UserService.userFilledPreferences(loggedUser?.id),
      UserService.userFilledAppearance(loggedUser?.id)
    ]).then(([preferenceData, appearanceData]) => {
      console.log("preferenceData", preferenceData);
      console.log("appearanceData", appearanceData);
      //if appearance and preferences are filled
      if (preferenceData.data && appearanceData.data) {
        setProfileFinished(true);
        //get for you list
        ForYouService.getForYouList(loggedUser.id).then((response) => {
          console.log("foryou", response);
          setPotentialMatches(response.data)
        }).catch((error) => {
          console.log("error", error);
        });

      }
    }).catch((error) => {
      console.log("error", error);
    });
  }, [loggedUser?.id]);

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


  if (profileFinished === false) {
    return (
      <>
        <div className="foryou-content">
          <div className='profile-locked'>
            <i className="fa fa-lock fa-5x" aria-hidden="true"></i>
            <h1>Complete your profile to see your potential matches</h1>
            <div style={{ display: 'flex', gap: '28px' }}>
              <button className='btn' onClick={() => navigate("/preferences")}>Preferences</button>
              <button className='btn' onClick={() => navigate("/appearance")}>Appearance</button>
            </div>

          </div>
          <div className="profile-card" >
            <div className="profile-img" style={{ backgroundImage: "url('https://i.pinimg.com/736x/14/1c/51/141c51b21f63f58d4c2550b8d27109e1.jpg')" }}></div>
            <div className="profile-info">
              <h2 className="name">John, 21</h2>
              <p className="work">Traveler</p>
              <p className="location">5km away</p>
              <p className="bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae ligula euismod, aliquam nunc id, aliquet nunc.</p>
            </div>
          </div>
        </div>

      </>
    );
  }

  if (profileFinished === true) {
    return (
      <>
        <div className="foryou-content">
          <Deck cards={potentialMatches} userId={loggedUser.id} />
        </div>
      </>
    );
  }
}

export default ForYou;

