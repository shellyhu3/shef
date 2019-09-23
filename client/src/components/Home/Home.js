import React from 'react';
import Steps from '../Steps/Steps'
import './Home.css'
import { Parallax } from 'react-scroll-parallax';
import cookbook from './cookbook.jpg';
// import pancakes from './pancakes.jpg';
import cooking from './cooking.jpg';

const Home = () => {
  return (
    <div className='home_container'>
      {/* <div className='parallax'>
        <div className='parallax_group_bottom'>
          <div className='bg_img parallax_layer'></div>
          <div className='parallax_txt parallax_layer'>
            <p className='welcome'>meal prep made simple</p>
          </div>
        </div>
        <div className='parallax_group_top'>
          <div className='solid_bg'>
            <Steps />
          </div>
          <p>Home!!!!!!!!!!!!!</p>
        </div>
      </div> */}

      

      <div>
        <div className='bg_img'>
          <Parallax y={[-150, 10]}>
            <p className='welcome'>meal prep made simple</p>
          </Parallax>
        </div>
      </div>
      <div className='solid_bg'>
        <Steps />
      </div>
      <div className='bg_img2'>
        <div className='grid_img'>
          <img src={cookbook} alt='cookbook'/>
          <div className='grid_txt'>
            <p>recipes</p>
            <a className='grid_btn' href='/recipes'>go</a>
          </div>
        </div>
        <div className='grid_img'>
          <img src={cooking} alt='meal prep'/>
          <div className='grid_txt'>
            <p>meal plan</p>
            <a className='grid_btn' href='/plan'>go</a>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Home;