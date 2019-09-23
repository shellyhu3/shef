import React from 'react';
import { withRouter } from 'react-router-dom';
import './Login.css';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginEmail: '',
      loginPw: '',
      errors: {}
    }
  }

  componentDidMount() {
    if (localStorage.getItem('jwt_token')) {
      this.props.history.push('/');
    }
  }

  onEmailChange = (event) => {
    this.setState({loginEmail: event.target.value})
  }

  onPwChange = (event) => {
    this.setState({loginPw: event.target.value})
  }

  onLoginSubmit = (event) => {
    event.preventDefault();
    const {loginEmail, loginPw} = this.state;
    fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: loginEmail,
        pw: loginPw
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.user) {
          const token = data.token;
          localStorage.setItem('jwt_token', token);
          localStorage.setItem('user', data.user.first_name);
          localStorage.setItem('id', data.user.id);
          this.props.loadUser(data.user);
          this.props.history.push('/plans');
          // this.props.history.goBack();
        } else {
          this.setState({errors: data})
        }
      })
      .catch(err => console.log('error', err))
  }

  showRegister = () => {
    this.props.history.push('/register');
  }

  render(){
    return (
      <div className='container'>        
        <main>
          <p className='gradient_title title'>Login</p>
          <form>
            {this.state.errors ? <p className='error'>{this.state.errors.login}</p> : ''}
            <div>
              <label className='sm_title' htmlFor='email-address'>Email</label>
              <input 
                onChange={this.onEmailChange}
                type='email' 
                name='email-address'
                autoComplete='on'
              />
            </div>
            <div>
              <label className='sm_title' htmlFor='password'>Password</label>
              <input 
                onChange={this.onPwChange}
                type='password' 
                name='password'  
                autoComplete='off'
              />
            </div>
            <button className='submit_btn' onClick={this.onLoginSubmit}>Login</button>
            <p onClick={this.showRegister} className='sm_title nav_link'>Register</p>
          </form>
        </main>

      </div>
    )
  }
}

export default withRouter(Login);