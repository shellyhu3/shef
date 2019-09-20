import React from 'react';
import Steps from '../Steps/Steps'
import './Home.css'

const Home = () => {
  return (
    <div className='home_container'>
      <div className='parallax'>
        <div className='parallax_group_bottom'>
          <div className='bg_img parallax_layer'></div>
          <div className='parallax_txt parallax_layer'>
            <p className='welcome'>meal prep made simple</p>
          </div>
        </div>
        <div className='parallax_group_top'>
          <div className="solid_bg">
            <Steps />
          </div>
          <p>Home!!!!!!!!!!!!!</p>
        </div>
      </div>


    </div>
  )
}

export default Home;