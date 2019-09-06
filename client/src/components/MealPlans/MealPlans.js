import React from 'react';

const MealPlan = () => {
  const user = localStorage.getItem('user');

  return (
    <div className='container'>
      meal plans {user}!!!!!!!!!!!!!
    </div>
  )
}

export default MealPlan;