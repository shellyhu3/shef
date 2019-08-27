import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import 'tachyons';
import RecipesMain from './containers/RecipesMain/RecipesMain';
import Home from './components/Home/Home';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';

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

  loadUser = (data) => {
    const {id, first_name, last_name, email, joined_at, updated_at} = data;
    this.setState({user: {
        id: id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        joined: joined_at,
        updated: updated_at
      }, isLoggedIn: true})
  }

  logout = () => {
    this.setState(initialState);
    this.props.history.push('/');
  }


  render() {
    return (
      <div>
        <nav>
          <ul>
            <li className='name'>Shef</li>
            <li className='links'>
              <Link to='/' className='nav_link'>Home</Link>
              <Link to='/recipes' className='nav_link'>Recipes</Link>
              {this.state.isLoggedIn ? 
                <p onClick={this.logout} className='nav_link'>Logout</p>
                : <Link to='/login' className='nav_link'>Login</Link>
              }
            </li>
          </ul>
        </nav>
        <Route path = '/' exact render={() => <Home user={this.state.user}/>}/>
        <Route path = '/recipes' component={RecipesMain}/>
        <Route path = '/login' render={() => <Login loadUser = {this.loadUser} />}/>
        <Route path = '/register' render={() => <Register loadUser = {this.loadUser} />}/>
      </div>
    );
  }
}

export default withRouter(App);
