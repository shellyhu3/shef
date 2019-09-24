import React from 'react';
// import ReactDOM from 'react-dom'
import { Route, Link } from 'react-router-dom';
import RecipeCard from '../RecipeCard/RecipeCard';
import RecipeDetail from '../../containers/RecipeDetail/RecipeDetail';
import Steps from '../Steps/Steps';
import './RecipesList.css';

class RecipesList extends React.Component{
  constructor(props){
    super(props);
    this.horizontalScroll = React.createRef();
  }

  componentDidUpdate(){
    if(this.props.resetScroll){
      if(this.horizontalScroll){
        if(this.horizontalScroll.current) {
          this.horizontalScroll.current.scrollLeft=0;
        }
      }
    }
  }


  render() {
    const {pathMatch, loading, nextPg} = this.props;
    let {recipes} = this.props;

    if (loading) {
      return (
        <div className='loading'>
          <p>loading...</p>
          <Route path = {`${pathMatch.url}/:id`} render={(props) => <RecipeDetail {...props} />}/>
        </div>
      )
    } else if (!recipes || recipes.length === 0) {
      return (
        <div>
          {!recipes
            ? <p className='error center'>no recipes found</p>
            : ''
          }
          <div className='steps_container'>
            <Steps />
          </div>
          <Route path = {`${pathMatch.url}/:id`} render={(props) => <RecipeDetail {...props} />}/>
        </div>
      )
    } else if (!recipes.length) {
      recipes = [recipes];

      return(
        <div className='card_container' ref={this.horizontalScroll}>
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
          {recipes.length === 20
            ? <button className='next_btn' onClick={nextPg}>More</button>
            : ''
          }

          <Route path = {`${pathMatch.url}/:id`} component={RecipeDetail}/>

        </div>
      )
    }
  }
}

export default RecipesList;