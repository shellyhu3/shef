import React from 'react';

import './RecipeCard.css';

const RecipeCard = ({name, desc, img, nutri}) => {
  if (!img) {
    img = "https://www.medicalnewstoday.com/content//images/articles/324/324956/close-up-of-a-plate-of-food.jpg";
  }
  return(
    // <div className='card'>
    //   <img src = "https://images.pexels.com/photos/1667580/pexels-photo-1667580.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="food"/>
    //   <p className='title'>name</p>
    //   <p>Cal: 500, Protein: 25g, Carbs: 40g, Fat: 10g</p>
    // </div>
    <div className='card'>
      <img className='recipe_img' src = {img} alt={desc}/>
      <p className='title'>{name}</p>
      <p>Cal: {nutri.calories}, P: {nutri.protein}g, C: {nutri.carbohydrate}g, F: {nutri.fat}g</p>
    </div>
  )
}

export default RecipeCard;