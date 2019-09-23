import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import 'tachyons';
import RecipesMain from './containers/RecipesMain/RecipesMain';
import Home from './components/Home/Home';
import MealPlans from './containers/MealPlans/MealPlans';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import search_icon from './search_icon.png';
import login_icon from './user.png';
import plan_icon from './plan_icon.png';
import logout_icon from './logout.png';

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
            <li><Link to='/' className='name'>Shef</Link></li>
            {this.state.isLoggedIn ? 
              <div>
                <li className='links_logged_in'>
                  <Link to='/recipes' className='nav_link'>recipes</Link>
                  <Link to='/plan' className='nav_link'>meal plan</Link>
                  <p onClick={this.logout} className='nav_link'>logout</p>
                </li>
                <li className='links_logged_in_mobile'>
                  <Link to='/recipes' className='nav_link'><img src={search_icon} alt='search recipes'/></Link>
                  <Link to='/plan' className='nav_link'><img src={plan_icon} alt='your meal plan'/></Link>
                  <p onClick={this.logout} className='nav_link'><img src={logout_icon} alt='logout'/></p>
                </li>
              </div>
              : 
              <div>
                <li className='links_logged_out'>              
                  <Link to='/recipes' className='nav_link'>recipes</Link>
                  <Link to='/login' className='nav_link'>login</Link>
                </li>
                <li className='links_logged_out_mobile'>              
                  <Link to='/recipes' className='nav_link'><img src={search_icon} alt='search recipes'/></Link>
                  <Link to='/login' className='nav_link'><img src={login_icon} alt='login'/></Link>
                </li>

              </div>
            }
          </ul>
        </nav>
        <Route path = '/' exact component={Home} />
        <Route path = '/recipes' render={(props) => <RecipesMain {...props} user={this.state.user} isLoggedIn={this.state.isLoggedIn} />} />
        <PrivateRoute path = '/plan' component={MealPlans} />
        <Route path = '/login' render={() => <Login loadUser = {this.loadUser} />}/>
        <Route path = '/register' render={() => <Register loadUser = {this.loadUser} />}/>
      </div>
    );
  }
}

export default withRouter(App);
