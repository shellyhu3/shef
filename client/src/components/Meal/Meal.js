import React from 'react';

const Meal = ({id, day_of_wk, time_of_day, name, calories, protein, fat, carbohydrate, onDelete}) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>{name}</th>
            <th>{calories} Cals</th>
            <th>P: {protein}g</th>
            <th>F: {fat}g</th>
            <th>C: {carbohydrate}g</th>
            <th>{day_of_wk}</th>
            <th>{time_of_day}</th>
            <th><button onClick={()=>onDelete(id)}>Delete</button></th>
          </tr>
        </thead>
      </table>

    </div>
  )
}

export default Meal;