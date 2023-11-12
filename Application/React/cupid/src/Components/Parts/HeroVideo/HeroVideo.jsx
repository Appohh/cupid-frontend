import videoSource from '../../../assets/videos/Cupid.mp4';
import'../HeroVideo/HeroVideo.css';
import { useNavigate } from 'react-router-dom';


function HeroVideo() {
  const navigate = useNavigate();


  return (
    <>
      <div className='hero-section'>
        <video autoPlay muted loop>
          <source src={videoSource} type="video/mp4" />
        </video>
        <div className='hero-cta'>
          <h1>Discover the one you always wanted</h1>
          <button className='btn' onClick={() => {navigate("/register")}}>Create a account</button>
        </div>
      </div>
    </>
  )
}

export default HeroVideo
