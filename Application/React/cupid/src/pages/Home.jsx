import { useContext, useEffect, useState } from 'react'
import HeroVideo from '../Components/Parts/HeroVideo/HeroVideo.jsx';
import Testimonials from '../Components/Parts/Testimonials/Testimonials.jsx';
import { SetError, ShowError } from '../Services/ErrorService.jsx';
import { Context } from '../App.jsx';
import { useNavigate } from 'react-router-dom';

function Home() {

  const { setErrorPopUp } = useContext(Context);
  const navigate = useNavigate();

  function error() {
    setErrorPopUp({
      title: "oops",
      message: "hey",
      color: "red"
    })
    navigate('/foryou')
  }


  return (
    <>
      <HeroVideo />
      <Testimonials />
      <button onClick={() => { error() }}>Error</button>
    </>
  )
}

export default Home
