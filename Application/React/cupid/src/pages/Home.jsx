import { useContext, useEffect, useState } from 'react'
import HeroVideo from '../Components/Parts/HeroVideo/HeroVideo.jsx';
import Testimonials from '../Components/Parts/Testimonials/Testimonials.jsx';
import { Context } from '../App.jsx';
import { useNavigate } from 'react-router-dom';

function Home() {

  const { errorPopUp, setErrorPopUp } = useContext(Context);
  const navigate = useNavigate();
  console.log(errorPopUp)
  function error() {
    setErrorPopUp({
      title: "oops",
      message: "hey",
      color: "red",
      show: true
    })
    navigate('/foryou')
  }

  function cancel() {
    if (errorPopUp.show) {
      setErrorPopUp({
        title: "",
        message: "",
        color: "",
        show: false
      })
    }
  }



  return (
    <>
      <HeroVideo />
      <Testimonials />
      <button onClick={error}>Error</button>
    </>
  )
}

export default Home
