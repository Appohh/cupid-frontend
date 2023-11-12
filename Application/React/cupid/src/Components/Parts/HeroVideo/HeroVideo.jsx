import videoSource from '../../../assets/videos/Cupid.mp4';
import'../HeroVideo/HeroVideo.css';


function HeroVideo() {

  return (
    <>
      <div className='hero-section'>
        <video autoPlay muted loop>
          <source src={videoSource} type="video/mp4" />
        </video>
        <div className='hero-cta'>
          <h1>Discover the one you always wanted</h1>
          <button className='btn'>Create a account</button>
        </div>
      </div>
    </>
  )
}

export default HeroVideo
