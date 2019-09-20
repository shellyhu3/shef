import React from 'react';
import { Route, Link } from 'react-router-dom';
import RecipeCard from '../RecipeCard/RecipeCard';
import RecipeDetail from '../RecipeDetail/RecipeDetail';
import Steps from '../Steps/Steps';
import './RecipesList.css';

const RecipesList = ({recipes, pathMatch, loading}) => {
  if (loading) {
    return (
      <div className='loading'>
        <p>loading...</p>
        <Route path = {`${pathMatch.url}/:id`} render={(props) => <RecipeDetail {...props} />}/>
      </div>
    )
  }

  if (recipes.length === 0) {
    return (
      <div>
        <Steps />
        <Route path = {`${pathMatch.url}/:id`} render={(props) => <RecipeDetail {...props} />}/>
      </div>
    )
  } else if (!recipes.length) {
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