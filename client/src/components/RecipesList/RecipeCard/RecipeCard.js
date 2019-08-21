import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({name, desc, img, url, nutri}) => {
  if (!img) {
    img = "https://www.medicalnewstoday.com/content//images/articles/324/324956/close-up-of-a-plate-of-food.jpg";
  }
  return(
    // <div className='card'>
    //   <img src = "https://www.medicalnewstoday.com/content//images/articles/324/324956/close-up-of-a-plate-of-food.jpg" alt="food"/>
    //   <h1>name</h1>
    // </div>
    <div className='card'>
      <img src = {img} alt="food"/>
      <h1>{name}</h1>
      <p>Cal: {nutri.calories}, Protein: {nutri.protein}g, Carbs: {nutri.carbohydrate}g, Fat: {nutri.fat}g</p>
    </div>
  )
}

export default RecipeCard;