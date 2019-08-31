import React from 'react';
import './RecipeDetail.css';
import serving_size from './serving_size.png';
import timer from './timer.png';
import calories from './calories.png';
import macros from './macros.png';
import add from '../RecipesList/add.png';


class RecipeDetail extends React.Component {
  constructor(props){
    super(props);
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

  totalTime = () => {
    let {preparation_time_min, cooking_time_min} = this.state.recipe;
    if(!preparation_time_min) {
      preparation_time_min = 0;
    }

    if(!cooking_time_min) {
      cooking_time_min = 0;
    }

    if (preparation_time_min === 0 && cooking_time_min === 0){
      return <p>unknown</p>
    } else {
      return (
        <div>
          <p>{Number(preparation_time_min) + Number(cooking_time_min)} min</p>
          <p>Prep: {preparation_time_min}</p>
          <p>Cooking: {cooking_time_min}</p>
        </div>
      )
    }
  }

  getDirections = () => {
    const {directions} = this.state.recipe;
    if (Array.isArray(directions.direction)){
      const directionsList = directions.direction.map((step, i) => {
        return <li key={i}>Step {step.direction_number}: {step.direction_description}</li>
      })
      return directionsList;
    } else {
      return <li>Step {directions.direction.direction_number}: {directions.direction.direction_description}</li>
    }
  }
 
  getImage = () => {
    const {recipe_images} = this.state.recipe;
    if (!recipe_images) {
      return "https://www.medicalnewstoday.com/content//images/articles/324/324956/close-up-of-a-plate-of-food.jpg";
    } else if (Array.isArray(recipe_images.recipe_image)) {
      return recipe_images.recipe_image[0]
    } else {
      return recipe_images.recipe_image
    }
  }

  
  render(){
    const {recipe_name, recipe_description, serving_sizes, number_of_servings, ingredients} = this.state.recipe;
    let {preparation_time_min, cooking_time_min} = this.state.recipe;

    const ingredientList = ingredients.ingredient.map((ingred, i) => {
      return <li key={i}>{ingred.ingredient_description}</li>
    })
    
    const total_time = Number(preparation_time_min) + Number(cooking_time_min);

    return(
      <div className='recipe_wrapper'>
        <div className='img_bg'>
          <img className='recipe_img_big' src={this.getImage()} alt={recipe_name}/>
        </div>

        <div className='recipe_body'>
          <div className='recipe_info'>
            <button onClick={() => this.props.addRecipe(this.props.match.params.id)} className='add_recipe'><img src={add} alt='add to plan'/>Add</button>
            <p className='title recipe_name'>{recipe_name}</p>

            <hr></hr>

            <div className='icons_container'>
              <div>
                <img className='icon' src={serving_size} alt={`makes ${number_of_servings} servings`}/>
                <p className='sm_title'>Servings</p>
                <p>{number_of_servings}</p>
              </div>

              <div>
                <img className='icon' src={timer} alt={`total time is ${total_time} minutes`}/>
                <p className='sm_title'>Time</p>
                {this.totalTime()}
                {/* <p>Prep Time (min): {preparation_time_min}</p>
                <p>Cooking Time (min): {cooking_time_min}</p> */}
              </div>

              <div>
                <img className='icon' src={calories} alt={`${serving_sizes.serving.calories} calories`}/>
                <p className='sm_title'>Calories ({serving_sizes.serving.serving_size})</p>
                <p>{serving_sizes.serving.calories}</p>
              </div>

              <div>
                <img className='icon' src={macros} alt={'macros'}/>
                <p className='sm_title'>Macros</p>
                <ul>
                  <li>P: {serving_sizes.serving.protein}g</li>
                  <li>C: {serving_sizes.serving.carbohydrate}g</li>
                  <li>F: {serving_sizes.serving.fat}g</li>
                </ul>
              </div>
            </div>

            <hr></hr>

            <p className='italic recipe_desc'>{recipe_description}</p>

          </div>

          <div className='ingredient_list'>
            <p className='thick_border'><span className='bordered_title'>Ingredients</span></p>
            <ul>
              {ingredientList}
            </ul>
          </div>

          <div className='direction_list'>
            <p className='thick_border'><span className='bordered_title'>Directions</span></p>
            <ul>
              {this.getDirections()}
            </ul>
          </div>
        </div>

      </div>
    )
  }
}

export default RecipeDetail;