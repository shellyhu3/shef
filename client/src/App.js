import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import RecipesMain from './containers/RecipesMain/RecipesMain';

import './App.css';

function Home() {
  return <h2>Home</h2>;
}


function Login() {
  return <h2>Log In</h2>;
}

class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <nav>
              <ul>
                <li className='title'>Shef</li>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/recipes'>Recipes</Link></li>
                <li><Link to='/login'>Login</Link></li>
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
