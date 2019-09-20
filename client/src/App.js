import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import 'tachyons';
import RecipesMain from './containers/RecipesMain/RecipesMain';
import Home from './components/Home/Home';
import MealPlans from './containers/MealPlans/MealPlans';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


import './App.css';

const initialState = {
  isLoggedIn: false,
  user: {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    joined: '',
    updated: ''
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    const jwt = this.getJwt();
    if(jwt) {
      this.setState({isLoggedIn: true})
      console.log('is logged in') 
    } else {
    console.log('not logged in')
    }
  }

  getJwt = () => {
    return localStorage.getItem('jwt_token');
  }

  loadUser = (data) => {
    const {id, first_name, last_name, email, joined_at, updated_at} = data;
    this.setState({
      user: {
        id: id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        joined: joined_at,
        updated: updated_at
      }, 
      isLoggedIn: true})
  }

  logout = () => {
    this.setState(initialState);
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <nav>
          <ul>
            <li className='name'>Shef</li>
            {this.state.isLoggedIn ? 
              <li className='links_logged_in'>
                <Link to='/' className='nav_link'>Home</Link>
                <Link to='/recipes' className='nav_link'>Recipes</Link>
                <Link to='/plans' className='nav_link'>Meal Plans</Link>
                <p onClick={this.logout} className='nav_link'>Logout</p>
              </li>
              : 
              <li className='links_logged_out'>              
                <Link to='/' className='nav_link'>Home</Link>
                <Link to='/recipes' className='nav_link'>Recipes</Link>
                <Link to='/login' className='nav_link'>Login</Link>
              </li>
            }
          </ul>
        </nav>
        <Route path = '/' exact component={Home} />
        <Route path = '/recipes' render={(props) => <RecipesMain {...props} user={this.state.user} isLoggedIn={this.state.isLoggedIn} />} />
        <PrivateRoute path = '/plans' component={MealPlans} />
        <Route path = '/login' render={() => <Login loadUser = {this.loadUser} />}/>
        <Route path = '/register' render={() => <Register loadUser = {this.loadUser} />}/>
      </div>
    );
  }
}

export default withRouter(App);
