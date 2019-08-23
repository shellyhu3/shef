import React from 'react';
import { Route, Link } from 'react-router-dom';

import RecipeCard from './RecipeCard/RecipeCard';
import RecipeDetail from './RecipeDetail/RecipeDetail';


import './RecipesList.css';

const RecipesList = ({recipes, pathMatch}) => {
  return(
    <div className='cardContainer'>
      {recipes.map(recipe => {
        const {recipe_id, recipe_name, recipe_description, recipe_image, recipe_nutrition} = recipe
        return (
          <Link to = {`${pathMatch.url}/${recipe_id}`} key = {recipe_id}>
            <RecipeCard
              name = {recipe_name}
              desc = {recipe_description}
              img = {recipe_image}
              nutri = {recipe_nutrition}
            />
          </Link>
        )
      })}


      {/* <Link to = {`${pathMatch.url}/${id}`}>
        <RecipeCard/>
      </Link>

      <RecipeCard/>
      <RecipeCard/>
      <RecipeCard/>
      <RecipeCard/> */}


      <Route path = {`${pathMatch.url}/:id`} component={RecipeDetail}/>


    </div>
  )
}

export default RecipesList;