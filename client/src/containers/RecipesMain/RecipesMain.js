import React from 'react';
import { withRouter } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import RecipesList from '../../components/RecipesList/RecipesList';


class RecipesMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: '',
      recipes:[]
    }
  }

  // componentDidMount() {
  //   this.callBackendAPI()
  //     .then(resp => {
  //       this.setState({recipes: resp})
  //       console.log(resp.recipes)
  //     })
  //     .catch(err => console.log(err));
  // }

  callBackendAPI = async (search) => {
    const response = await fetch(`/recipes/${search}`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  onInputChange = (event) => {
    this.setState({searchField: event.target.value});
  }

  onSearchSubmit = () => {
    this.callBackendAPI(this.state.searchField)
      .then(resp => {
        this.setState({recipes: resp.recipes.recipe})
      })
      .catch(err => console.log(err));
  }

  addRecipe = (recipe_id) => {
    if (this.props.isLoggedIn) {
      console.log('logged in', recipe_id)
      fetch('http://localhost:8000/meals', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          user_id: this.props.user.id,
          foods_id: recipe_id
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
        })
    } else{
      this.props.history.push('/login');
    }
  }

  render() {
    return(
      <div className='container'>
       <p className='title'>Recipes</p>
       <SearchBar searchField={this.state.searchField} onInputChange={this.onInputChange} onSearchSubmit={this.onSearchSubmit}/>
       <RecipesList pathMatch={this.props.match} recipes={this.state.recipes} addRecipe={this.addRecipe}/>
    </div>
    )
  }
}

export default withRouter(RecipesMain);