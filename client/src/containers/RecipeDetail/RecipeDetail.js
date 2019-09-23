import React from 'react';
import './RecipeDetail.css';
import serving_size from './serving_size.png';
import timer from './timer.png';
import calories from './calories.png';
import macros from './macros.png';
import meal_prep from '../../components/RecipeCard/meal_prep.jpeg'

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
      },
      errors: {},
      success: '',
      day_of_wk: 'Monday',
      time_of_day: 'Breakfast'
    }
  }

  componentDidMount() {
    const search_id = this.props.match.params.id;
    this.callBackendAPI(search_id)
    .then(resp => {
      this.setState({recipe: resp.recipe})
    })
    .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const search_id = this.props.match.params.id;
      this.callBackendAPI(search_id)
      .then(resp => {
        this.setState({errors: {}});
        this.setState({success: ''});
        this.setState({recipe: resp.recipe})
      })
      .catch(err => console.log(err));
      }
  }

  callBackendAPI = async (recipe_id) => {
    const response = await fetch(`/api/recipe/${recipe_id}`);
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
      return meal_prep;
    } else if (Array.isArray(recipe_images.recipe_image)) {
      return recipe_images.recipe_image[0]
    } else {
      return recipe_images.recipe_image
    }
  }

  handleDayChange = (event) => {
    this.setState({day_of_wk: event.target.value})
  }

  handleTimeChange = (event) => {
    this.setState({time_of_day: event.target.value})
  }

  addRecipe = () => {
    console.log('clicked')
    this.setState({errors: {}});
    this.setState({success: ''});
    const {recipe_id, recipe_name, serving_sizes} = this.state.recipe;
    const {calories, protein, carbohydrate, fat} = serving_sizes.serving;
    const ingredients = this.state.recipe.ingredients.ingredient.map(ingred=> {
      return(ingred.food_name);
    });
    if (localStorage.getItem('jwt_token')) {
      fetch('/api/meals', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          user_id: localStorage.getItem('id'),
          recipe_id: recipe_id,
          name: recipe_name,
          cals: calories,
          protein: protein,
          carbs: carbohydrate,
          fat: fat,
          ingredients: ingredients,
          day_of_wk: this.state.day_of_wk,
          time_of_day: this.state.time_of_day
        })
      })
        .then(response => response.json())
        .then(data => {
          if(!data.id){
            this.setState({errors: data})
          } else {
            this.setState({success: 'recipe successfully added'})
          }
        })
    } else{
      this.props.history.push('/login');
    }
  }

  
  render(){
    const {recipe_name, recipe_description, serving_sizes, number_of_servings, ingredients} = this.state.recipe;
    let {preparation_time_min, cooking_time_min} = this.state.recipe;

    const ingredientList = ingredients.ingredient.map((ingred, i) => {
      return <li key={i}>{ingred.ingredient_description}</li>
    })
    
    const total_time = Number(preparation_time_min) + Number(cooking_time_min);

    const cals = serving_sizes.serving.calories;
    const protein = serving_sizes.serving.protein;
    const carbs = serving_sizes.serving.carbohydrate;
    const fat = serving_sizes.serving.fat;

    return(
      <div className='recipe_wrapper'>
        <div className='img_bg'>
          <img className='recipe_img_big' src={this.getImage()} alt={recipe_name}/>
        </div>

        <div className='recipe_body'>
          <div className='recipe_info'>
            <p className='title recipe_name'>{recipe_name}</p>
            <div className='add_recipe'>
              <select defaultValue={this.state.day_of_wk} onChange={this.handleDayChange}>
                <option value="Monday">M</option>
                <option value="Tuesday">T</option>
                <option value="Wednesday">W</option>
                <option value="Thursday">Th</option>
                <option value="Friday">F</option>
                <option value="Saturday">Sa</option>
                <option value="Sunday">Su</option>
              </select>
              <select defaultValue={this.state.time_of_day} onChange={this.handleTimeChange}>
                <option value="Breakfast">Breakfast</option>
                <option value="Snack 1">Snack 1</option>
                <option value="Lunch">Lunch</option>
                <option value="Snack 2">Snack 2</option>
                <option value="Dinner">Dinner</option>
              </select>
              <button className='button' onClick={this.addRecipe}>Add</button>
            </div>
            {this.state.errors ? <p className='error'>{this.state.errors.meal}</p> : ''}
            {this.state.success ? <p className='success'>{this.state.success}</p> : ''}
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
                <img className='icon' src={calories} alt={`${cals} calories`}/>
                <p className='sm_title'>Calories ({serving_sizes.serving.serving_size})</p>
                <p>{cals}</p>
              </div>

              <div>
                <img className='icon' src={macros} alt={'macros'}/>
                <p className='sm_title'>Macros</p>
                <ul>
                  <li>P: {protein}g</li>
                  <li>C: {carbs}g</li>
                  <li>F: {fat}g</li>
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