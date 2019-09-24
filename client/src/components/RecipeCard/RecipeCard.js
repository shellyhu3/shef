import React from 'react';
import meal_prep from './meal_prep.jpeg'

import './RecipeCard.css';

const RecipeCard = ({name, desc, img, nutri}) => {
  if (!img) {
    img = meal_prep;
  }
  return(
    <div className='card'>
      <img className='recipe_img' src = {img} alt={desc}/>
      <p className='card_title'>{name}</p>
      <p>Cal: {Math.round(nutri.calories)}</p>
      <p>P: {Math.round(nutri.protein)}g | C: {Math.round(nutri.carbohydrate)}g | F: {Math.round(nutri.fat)}g</p>
    </div>
  )
}

export default RecipeCard;