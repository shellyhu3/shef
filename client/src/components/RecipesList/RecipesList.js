import React from 'react';
import RecipeCard from './RecipeCard/RecipeCard';
import './RecipesList.css';

const RecipesList = ({recipes}) => {
  return(
    <div className='cardContainer'>
      {recipes.map(recipe => {
        const {recipe_id, recipe_name, recipe_description, recipe_image, recipe_url, recipe_nutrition} = recipe
        return (
          <RecipeCard
            key = {recipe_id}
            name = {recipe_name}
            desc = {recipe_description}
            img = {recipe_image}
            url = {recipe_url}
            nutri = {recipe_nutrition}
          />
        )
      })}
      {/* <RecipeCard/>
      <RecipeCard/>
      <RecipeCard/>
      <RecipeCard/>
      <RecipeCard/> */}
    </div>
  )
}

export default RecipesList;