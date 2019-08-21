import React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import ShowRecipes from '../../components/ShowRecipes/ShowRecipes';

class Recipes extends React.Component {
  constructor() {
    super();
    this.state = {
      searchField: '',
      data: null
    }
  }

  componentDidMount() {
    this.callBackendAPI()
      .then(resp => console.log(resp))
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
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
  }

  render() {
    return(
      <div>
       <h1>Recipes</h1>
       <SearchBar searchField={this.state.searchField} onInputChange={this.onInputChange} onSearchSubmit={this.onSearchSubmit}/>
       <ShowRecipes />
    </div>
    )
  }
}

export default Recipes;