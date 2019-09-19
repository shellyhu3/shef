import React from 'react';
import './Meal.css';

const Meal = ({id, day_of_wk, time_of_day, name, calories, protein, fat, carbohydrate, recipe_id, onDelete}) => {
  return (
    <div className='meal_item'>

      <p className='meal_time'>{time_of_day}</p>
      <p className='meal_name'><a href={`/recipes/${recipe_id}`}>{name}</a></p>
      <p className='button_wrapper'><button className='button' onClick={()=>onDelete(id)}>Delete</button></p>
      <p className='sm_scr'>Cals: {calories}</p>
      <p className='sm_scr'>P: {protein}g</p>
      <p className='sm_scr'>F: {fat}g</p>
      <p className='sm_scr'>C: {carbohydrate}g</p>

      <p className='big_scr'>Calories: {calories}</p>
      <p className='big_scr'>Protein: {protein}g</p>
      <p className='big_scr'>Fat: {fat}g</p>
      <p className='big_scr'>Carbs: {carbohydrate}g</p>


    </div>
  )
}

export default Meal;