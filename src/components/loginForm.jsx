import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { withRouter, Link } from 'react-router-dom';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

class LoginForm extends Form {
  state = {
    data: { email: '', password: '' },
    errors: {},
    firebaseError: ''
  };

  schema = {
    email: Joi.string()
      .required()
      .email({ minDomainAtoms: 2 })
      .label('Email'),
    password: Joi.string()
      .required()
      .min(6)
      .label('Password')
  };

  doSubmit = () => {
    // Call the server

    const { history } = this.props;
    const { email, password } = this.state.data;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        history.goBack();
      })
      .catch(error => {
        this.setState({ firebaseError: error });
      });
  };

  render() {
    return (
      <div className="container-fluid">
        <span className="alert-danger">{this.state.firebaseError.message}</span>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('email', 'Email')}
          {this.renderInput('password', 'Password', 'password')}
          <div className="row">
            <div className="col-sm-4">{this.renderButton('Log in')}</div>
            <div id="registerCol" className="col-sm-8">
              <span id="registerLink">
                <Link to={routes.SIGN_UP}>Don't have account?</Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
