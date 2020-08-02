import React, { Component } from 'react';
import { authenticationService } from '../../services/authentication.service';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.handleChangeEmail = this.handleChange.bind(this, 'email');
    this.handleChangePassword = this.handleChange.bind(this, 'password');
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(keyName, e) {
    this.setState({ [keyName]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    this.login();
    // this.setState({ email: '', password: '' });
  }

  login() {
    authenticationService.login(this.state.email, this.state.password).then(
      (user) => {
        const { from } = this.props.location.state || {
          from: { pathname: '/' }
        };
        this.props.history.push(from);
      },
      (error) => {}
    );
  }

  render() {
    return (
      <div className='auth-wrapper'>
        <div className='auth-inner'>
          <form onSubmit={this.handleSubmit}>
            <h3>Sign In</h3>

            <div className='form-group'>
              <label>Email address</label>
              <input
                type='email'
                value={this.state.email}
                onChange={(e) => this.handleChange('email', e)}
                className='form-control'
                placeholder='Enter email'
              />
            </div>

            <div className='form-group'>
              <label>Password</label>
              <input
                type='password'
                value={this.state.password}
                onChange={(e) => this.handleChange('password', e)}
                className='form-control'
                placeholder='Enter password'
              />
            </div>

            <div className='form-group'>
              <div className='custom-control custom-checkbox'>
                <input type='checkbox' className='custom-control-input' id='customCheck1' />
                <label className='custom-control-label' htmlFor='customCheck1'>
                  Remember me
                </label>
              </div>
            </div>

            <button type='submit' className='btn btn-primary btn-block'>
              Submit
            </button>
            <p className='forgot-password text-right'>
              Forgot <a href='#'>password?</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
