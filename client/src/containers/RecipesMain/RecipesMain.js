import React from 'react';
import { withRouter } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import RecipesList from '../../components/RecipesList/RecipesList';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';


class RecipesMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchField: '',
      recipes:[],
      loading: false
    }
  }

  componentDidMount() {
    console.log('Recipes Main mounted')
  }

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
    this.setState({loading: true})
    this.callBackendAPI(this.state.searchField)
      .then(resp => {
        this.setState({recipes: resp.recipes.recipe})
        this.setState({loading: false})
      })
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div className='container'>
        <p className='title'>Recipes</p>
        <SearchBar searchField={this.state.searchField} onInputChange={this.onInputChange} onSearchSubmit={this.onSearchSubmit}/>
        <ErrorBoundary>
          <RecipesList pathMatch={this.props.match} recipes={this.state.recipes} loading={this.state.loading}/>
        </ErrorBoundary>
      </div>
    )
  }
}

export default withRouter(RecipesMain);