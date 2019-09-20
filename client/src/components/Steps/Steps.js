import React from 'react';
import search from './search.png';
import add from './add.png';
import cook from './cook.png';
import './Steps.css';

const Steps = () => {
    return (
      <div className='card_container_blank'>
        <div className='med_opacity'>
          <p className='med_title bold'>Step 1</p>
          <img className='big_icon' src={search} alt='step 1: search recipes'/>
          <p className='med_title bold'>Search</p>
        </div>

        <div className='med_opacity'>
          <p className='med_title bold'>Step 2</p>
          <img className='big_icon' src={add} alt='step 2: meal plan'/>
          <p className='med_title bold'>Plan</p>
        </div>

        <div className='med_opacity'>
          <p className='med_title bold'>Step 3</p>
          <img className='big_icon' src={cook} alt='step 4: cook and enjoy'/>
          <p className='med_title bold'>Meal Prep</p>
        </div>
      </div>
    )

}

export default Steps;