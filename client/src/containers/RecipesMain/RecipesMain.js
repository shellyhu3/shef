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
      page: 0,
      loading: false,
      resetScroll: false
    }
  }

  callBackendAPI = async (search, pg) => {
    const response = await fetch(`/api/recipes/${search}/${pg}`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  onInputChange = (event) => {
    this.setState({searchField: event.target.value});
    this.setState({resetScroll: false});
  }

  onSearchSubmit = () => {
    this.setState({loading: true})
    this.setState({page: 0})
    this.callBackendAPI(this.state.searchField, 0)
      .then(resp => {
        this.setState({recipes: resp.recipes.recipe})
        this.setState({loading: false})
        this.setState({resetScroll: true})
      })
      .catch(err => console.log(err));
  }

  nextPage = () => {
    this.setState({loading: true});
    this.setState({page: this.state.page+1})
    this.callBackendAPI(this.state.searchField, this.state.page+1)
      .then(resp => {
        this.setState({recipes: resp.recipes.recipe})
        this.setState({loading: false})
        this.setState({resetScroll: true})
      })
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div className='container'>
        <p className='title gradient_title'>Recipes</p>
        <SearchBar 
          searchField={this.state.searchField} 
          onInputChange={this.onInputChange} 
          onSearchSubmit={this.onSearchSubmit}
        />
        <ErrorBoundary>
          <RecipesList 
            pathMatch={this.props.match} 
            recipes={this.state.recipes} 
            loading={this.state.loading} 
            nextPg={this.nextPage}
            resetScroll={this.state.resetScroll}
          />
        </ErrorBoundary>
      </div>
    )
  }
}

export default withRouter(RecipesMain);