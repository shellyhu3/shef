import React from 'react';
import { Route, Link } from 'react-router-dom';
import RecipeCard from '../RecipeCard/RecipeCard';
import RecipeDetail from '../RecipeDetail/RecipeDetail';
import search from './search.png';
import add from './add.png';
import cook from './cook.png';

import './RecipesList.css';

const RecipesList = ({recipes, pathMatch, addRecipe}) => {
  if (recipes.length === 0){
    return (
      <div className='card_container_blank'>
        <div>
          <p className='med_title bold'>Step 1</p>
          <img className='big_icon' src={search} alt='step 1: search recipes'/>
          <p className='med_title bold'>Search</p>
        </div>

        <div>
          <p className='med_title bold'>Step 2</p>
          <img className='big_icon' src={add} alt='step 2: meal plan'/>
          <p className='med_title bold'>Plan</p>
        </div>

        <div>
          <p className='med_title bold'>Step 3</p>
          <img className='big_icon' src={cook} alt='step 4: cook and enjoy'/>
          <p className='med_title bold'>Meal Prep</p>
        </div>

        <Route path = {`${pathMatch.url}/:id`} render={(props) => <RecipeDetail {...props} addRecipe={addRecipe} />}/>
        {/* <Route path = {`${pathMatch.url}/:id`} component={RecipeDetail}/> */}

      </div>
    )
  } else if (!recipes.length){
    recipes = [recipes];
  }

  return(
    <div className='card_container'>
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

      <Route path = {`${pathMatch.url}/:id`} component={RecipeDetail}/>

    </div>
  )
}

export default RecipesList;