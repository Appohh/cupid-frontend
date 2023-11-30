import { useContext, useEffect, useState } from 'react'
import HeroVideo from '../Components/Parts/HeroVideo/HeroVideo.jsx';
import Testimonials from '../Components/Parts/Testimonials/Testimonials.jsx';
import { Context } from '../App.jsx';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Home() {
  const { setErrorPopUp } = useContext(Context);
  const navigate = useNavigate();
  const currentLocation = useLocation();

  function error() {
    const error = {
      title: "oops",
      message: "hey",
      color: "#ff3f4c",
      location: "/foryou"
    }
    navigate("/foryou", { state: { error } });
  }

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



  return (
    <>
      <HeroVideo />
      <Testimonials />
      <button onClick={error}>Error</button>
    </>
  )
}

export default Home
