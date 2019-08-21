import React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import RecipesList from '../../components/RecipesList/RecipesList';

class RecipesMain extends React.Component {
  constructor() {
    super();
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
    console.log(this.state.searchField);
    this.callBackendAPI(this.state.searchField)
      .then(resp => {
        this.setState({recipes: resp.recipes.recipe})
        console.log(resp.recipes.recipe)
      })
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div>
       <h1>Recipes</h1>
       <SearchBar searchField={this.state.searchField} onInputChange={this.onInputChange} onSearchSubmit={this.onSearchSubmit}/>
       <RecipesList recipes={this.state.recipes}/>
    </div>
    )
  }
}

export default RecipesMain;