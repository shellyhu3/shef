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
      <p className='title'>{name}</p>
      <p>Cal: {nutri.calories}, P: {nutri.protein}g, C: {nutri.carbohydrate}g, F: {nutri.fat}g</p>
    </div>
  )
}

export default RecipeCard;