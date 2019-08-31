import React from 'react';
import { withRouter } from 'react-router-dom';

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
        if (data.id) {
          this.props.loadUser(data);
          this.props.history.goBack();
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
        <main className="pa4 black-80">
          <form className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f4 fw6 ph0 mh0">Register</legend>
              {this.state.errors ? <p className='error'>{this.state.errors.register}</p> : ''}
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="first-name">First Name</label>
                <input 
                  onChange={this.onFNChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="text" 
                  name="first-name"  
                  autoComplete="on"
                  />
                {this.state.errors ? <p className='error'>{this.state.errors.first_name}</p> : ''}
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="last-name">Last Name</label>
                <input 
                  onChange={this.onLNChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="text" 
                  name="last-name"  
                  autoComplete="on"
                />
                {this.state.errors ? <p className='error'>{this.state.errors.last_name}</p> : ''}
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                  onChange={this.onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="email" 
                  name="email-address"  
                  autoComplete="on"
                />
                {this.state.errors ? <p className='error'>{this.state.errors.email}</p> : ''}
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                  onChange={this.onPwChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="password" 
                  name="password"  
                  autoComplete="off"
                />
                {this.state.errors ? <p className='error'>{this.state.errors.pw}</p> : ''}
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onRegisterSubmit}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Register"
              />
            </div>
            <div className="lh-copy mt3">
              <p onClick={this.showLogin} className="f6 link dim black db nav_link">Login</p>
            </div>
          </form>
        </main>

      </div>
    )
  }
}

export default withRouter(Register);