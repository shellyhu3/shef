import React from 'react';
import { withRouter } from 'react-router-dom';


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
        <main className="pa4 black-80">
          <form className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Login</legend>
              {this.state.errors ? <p className='error'>{this.state.errors.login}</p> : ''}
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                  onChange={this.onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="email" 
                  name="email-address"  
                  id="email-address"
                  autoComplete="on"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                  onChange={this.onPwChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="password" 
                  name="password"  
                  id="password"
                  autoComplete="off"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onLoginSubmit}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Login"
              />
            </div>
            <div className="lh-copy mt3">
              <p onClick={this.showRegister} className="f6 link dim black db nav_link">Register</p>
            </div>
          </form>
        </main>

      </div>
    )
  }
}

export default withRouter(Login);