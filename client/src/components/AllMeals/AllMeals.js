import React from 'react';
import Meal from './../Meal/Meal';
import './AllMeals.css'

const AllMeals = ({meals, onDelete}) => {
  return(
    <div className='meal_list'>
      <p className='sm_title'>Monday</p>
      {meals.map(meal => {
        const {id, day_of_wk, time_of_day, name, calories, protein, fat, carbohydrate, recipe_id} = meal;
        if (day_of_wk==='Monday') {
          return <Meal 
          key = {id}
          id = {id}
          day_of_wk = {day_of_wk}
          time_of_day = {time_of_day}
          name = {name}
          calories = {calories}
          protein = {protein}
          fat = {fat}
          carbohydrate = {carbohydrate}
          recipe_id = {recipe_id}
          onDelete = {onDelete}
          />
        } else {
          return null;
        }
      })}

      <p className='sm_title'>Tuesday</p>
      {meals.map(meal => {
        const {id, day_of_wk, time_of_day, name, calories, protein, fat, carbohydrate, recipe_id} = meal;
        if (day_of_wk==='Tuesday') {
          return <Meal 
          key = {id}
          id = {id}
          day_of_wk = {day_of_wk}
          time_of_day = {time_of_day}
          name = {name}
          calories = {calories}
          protein = {protein}
          fat = {fat}
          carbohydrate = {carbohydrate}
          recipe_id = {recipe_id}
          onDelete = {onDelete}
          />
        } else {
          return null;
        }
      })}

      <p className='sm_title'>Wednesday</p>
      {meals.map(meal => {
        const {id, day_of_wk, time_of_day, name, calories, protein, fat, carbohydrate, recipe_id} = meal;
        if (day_of_wk==='Wednesday') {
          return <Meal 
          key = {id}
          id = {id}
          day_of_wk = {day_of_wk}
          time_of_day = {time_of_day}
          name = {name}
          calories = {calories}
          protein = {protein}
          fat = {fat}
          carbohydrate = {carbohydrate}
          recipe_id = {recipe_id}
          onDelete = {onDelete}
          />
        } else {
          return null;
        }
      })}

      <p className='sm_title'>Thursday</p>
      {meals.map(meal => {
        const {id, day_of_wk, time_of_day, name, calories, protein, fat, carbohydrate, recipe_id} = meal;
        if (day_of_wk==='Thursday') {
          return <Meal 
          key = {id}
          id = {id}
          day_of_wk = {day_of_wk}
          time_of_day = {time_of_day}
          name = {name}
          calories = {calories}
          protein = {protein}
          fat = {fat}
          carbohydrate = {carbohydrate}
          recipe_id = {recipe_id}
          onDelete = {onDelete}
          />
        } else {
          return null;
        }
      })}

      <p className='sm_title'>Friday</p>
      {meals.map(meal => {
        const {id, day_of_wk, time_of_day, name, calories, protein, fat, carbohydrate, recipe_id} = meal;
        if (day_of_wk==='Friday') {
          return <Meal 
          key = {id}
          id = {id}
          day_of_wk = {day_of_wk}
          time_of_day = {time_of_day}
          name = {name}
          calories = {calories}
          protein = {protein}
          fat = {fat}
          carbohydrate = {carbohydrate}
          recipe_id = {recipe_id}
          onDelete = {onDelete}
          />
        } else {
          return null;
        }
      })}

      <p className='sm_title'>Saturday</p>
      {meals.map(meal => {
        const {id, day_of_wk, time_of_day, name, calories, protein, fat, carbohydrate, recipe_id} = meal;
        if (day_of_wk==='Saturday') {
          return <Meal 
          key = {id}
          id = {id}
          day_of_wk = {day_of_wk}
          time_of_day = {time_of_day}
          name = {name}
          calories = {calories}
          protein = {protein}
          fat = {fat}
          carbohydrate = {carbohydrate}
          recipe_id = {recipe_id}
          onDelete = {onDelete}
          />
        } else {
          return null;
        }
      })}

      <p className='sm_title'>Sunday</p>
      {meals.map(meal => {
        const {id, day_of_wk, time_of_day, name, calories, protein, fat, carbohydrate, recipe_id} = meal;
        if (day_of_wk==='Sunday') {
          return <Meal 
          key = {id}
          id = {id}
          day_of_wk = {day_of_wk}
          time_of_day = {time_of_day}
          name = {name}
          calories = {calories}
          protein = {protein}
          fat = {fat}
          carbohydrate = {carbohydrate}
          recipe_id = {recipe_id}
          onDelete = {onDelete}
          />
        } else {
          return null;
        }
      })}
    </div>
  )
}

export default AllMeals;