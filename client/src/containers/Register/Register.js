import React from 'react';
import { withRouter } from 'react-router-dom';
import '../Login/Login.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      pw: '',
      errors: {}
    }
  }

  componentDidMount() {
    if (localStorage.getItem('jwt_token')) {
      this.props.history.push('/');
    }
  }

  onFNChange = (event) => {
    this.setState({first_name: event.target.value})
  }
  
  onLNChange = (event) => {
    this.setState({last_name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPwChange = (event) => {
    this.setState({pw: event.target.value})
  }

  onRegisterSubmit = (event) => {
    event.preventDefault();
    const {first_name, last_name, email, pw} = this.state;
    fetch('http://localhost:8000/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        email: email,
        pw: pw
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
          this.props.history.push('/plan');
        } else {
          this.setState({errors: data});
        }
      })
      .catch(err => console.log('error', err))
  }

  showLogin = () => {
    this.props.history.push('/login');
  }

  render(){
    return (
      <div className='container'>
        <main>
          <p className='gradient_title title'>Register</p>
          <form>
            {this.state.errors ? <p className='error'>{this.state.errors.register}</p> : ''}
            <div>
              <label className='sm_title' htmlFor='first-name'>First Name</label>
              {this.state.errors ? <p className='error'>{this.state.errors.first_name}</p> : ''}
              <input 
                onChange={this.onFNChange}
                type='text' 
                name='first-name'  
                autoComplete='on'
                />
            </div>
            <div>
              <label className='sm_title' htmlFor='last-name'>Last Name</label>
              {this.state.errors ? <p className='error'>{this.state.errors.last_name}</p> : ''}
              <input 
                onChange={this.onLNChange}
                type='text' 
                name='last-name'  
                autoComplete='on'
              />
            </div>
            <div>
              <label className='sm_title' htmlFor='email-address'>Email</label>
              {this.state.errors ? <p className='error'>{this.state.errors.email}</p> : ''}
              <input 
                onChange={this.onEmailChange}
                type='email' 
                name='email-address'  
                autoComplete='on'
              />
            </div>
            <div>
              <label className='sm_title' htmlFor='password'>Password</label>
              {this.state.errors ? <p className='error'>{this.state.errors.pw}</p> : ''}
              <input 
                onChange={this.onPwChange}
                type='password' 
                name='password'  
                autoComplete='off'
              />
            </div>
            <button className='submit_btn' onClick={this.onRegisterSubmit}>Register</button>
            <p onClick={this.showLogin} className='sm_title nav_link'>Login</p>
          </form>
        </main>

      </div>
    )
  }
}

export default withRouter(Register);