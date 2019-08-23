import React from 'react';
import './RecipeDetail.css';
import serving_size from './serving_size.png';
import timer from './timer.png';
import calories from './calories.png';

class RecipeDetail extends React.Component {
  constructor(){
    super();
    this.state = {
      recipe: {
        recipe_name: '',
        recipe_description: '', 
        recipe_image: '', 
        serving_sizes: {
          serving: {}
        }, 
        preparation_time_min: 0, 
        cooking_time_min: 0, 
        number_of_servings: 0, 
        ingredients: {
          ingredient: []
        }, 
        directions: {
          direction: []
        }
      }
    }
  }

  componentDidMount() {
    console.log('print',this.props.match.params.id, this.state.recipe);
    const search_id = this.props.match.params.id;
    this.callBackendAPI(search_id)
    .then(resp => {
      this.setState({recipe: resp.recipe})
      console.log('heres the recipe', resp.recipe)
    })
    .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const search_id = this.props.match.params.id;
      this.callBackendAPI(search_id)
      .then(resp => {
        this.setState({recipe: resp.recipe})
        console.log('heres the recipe', resp.recipe)
      })
      .catch(err => console.log(err));
      }
  }

  callBackendAPI = async (recipe_id) => {
    const response = await fetch(`/recipe/${recipe_id}`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  
  render(){
    const {recipe_name, recipe_description, serving_sizes, number_of_servings, ingredients, directions} = this.state.recipe;

    let {recipe_image, preparation_time_min, cooking_time_min} = this.state.recipe;

    const ingredientList = ingredients.ingredient.map((ingred, i) => {
      return <li key={i}>{ingred.food_name} ({ingred.ingredient_description})</li>
    })

    const directionList = directions.direction.map((step, i) => {
      return <li key={i}>Step {step.direction_number}: {step.direction_description}</li>
    })
    
    if (!recipe_image) {
      recipe_image = "https://www.medicalnewstoday.com/content//images/articles/324/324956/close-up-of-a-plate-of-food.jpg";
    }

    if(!preparation_time_min) {
      preparation_time_min = 0;
    }

    if(!cooking_time_min) {
      cooking_time_min = 0;
    }

    let total_time;
    if (preparation_time_min === 0 && cooking_time_min === 0){
      total_time = 'unknown';
    } else {
      total_time = Number(preparation_time_min) + Number(cooking_time_min);
    }

    return(
      <div className='recipe_wrapper'>
        <div>
          <img className='recipe_img_big' src={recipe_image} alt={recipe_name}/>
        </div>

        <div className='recipe_body'>
          <div className='recipe_info'>
            <p className='title'>{recipe_name}</p>

            <hr></hr>

            <div className='icons_container'>
              <div>
                <img className='icon' src={serving_size} alt={`makes ${number_of_servings} servings`}/>
                <p>{number_of_servings} servings</p>
              </div>

              <div>
                <img className='icon' src={timer} alt={`total time is ${total_time} minutes`}/>
                <p>{total_time}</p>
                <p>Prep Time (min): {preparation_time_min}</p>
                <p>Cooking Time (min): {cooking_time_min}</p>
              </div>

              <div>
                <img className='icon' src={calories} alt={`${serving_sizes.serving.calories}`}/>
                <p>{serving_sizes.serving.calories}</p>
                <p>Nutrition Facts (per {serving_sizes.serving.serving_size}):</p>
                <ul>
                  <li>Protein: {serving_sizes.serving.protein}g</li>
                  <li>Carbs: {serving_sizes.serving.carbohydrate}g</li>
                  <li>Fat: {serving_sizes.serving.fat}g</li>
                </ul>
              </div>
            </div>

            <hr></hr>

            <p className='italic'>{recipe_description}</p>

          </div>

          <div className='ingredient_list'>
            <p className='bordered_title'>Ingredients</p>
            <ul>
              {ingredientList}
            </ul>
          </div>

          <div className='direction_list'>
            <p className='bordered_title'>Directions</p>
            <ul>
              {directionList}
            </ul>
          </div>
        </div>

      </div>
    )
  }
}

export default RecipeDetail;