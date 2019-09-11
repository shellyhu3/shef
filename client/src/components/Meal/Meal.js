import React from 'react';

const Meal = ({id, day_of_wk, time_of_day, name, calories, protein, fat, carbohydrate}) => {
  return (
    <div>
      <p>{id}</p>
      <p>Name: {name}</p>
      <p>Day of Week: {day_of_wk}</p>
      <p>Time of Day: {time_of_day}</p>
      <p>Calories: {calories}</p>
      <p>Protien: {protein}</p>
      <p>Fat: {fat}</p>
      <p> Carbs: {carbohydrate}</p>
    </div>
  )
}

export default Meal;