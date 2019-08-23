import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import RecipesMain from './containers/RecipesMain/RecipesMain';

import './App.css';

function Home() {
  return (
  <div className='container'>
    <h2>Home</h2>
  </div>
  );
}


function Login() {
  return (
    <div className='container'>
      <h2>Log In</h2>
    </div>
    );
}

class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <nav>
              <ul>
                <li className='name'>Shef</li>
                <li className='links'>
                  <Link to='/'>Home</Link>
                  <Link to='/recipes'>Recipes</Link>
                  <Link to='/login'>Login</Link>
                </li>
              </ul>
            </nav>
            <Route path = '/' exact component={Home}/>
            <Route path = '/recipes' component={RecipesMain}/>
            <Route path = '/login' component={Login}/>
          </div>
        </Router>
    );
  }
}

export default App;
