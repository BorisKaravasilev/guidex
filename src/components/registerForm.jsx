import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import { db } from '../firebase';
import firebase from 'firebase/app';
import { Link } from 'react-router-dom';

class RegisterForm extends Form {
  state = {
    data: { email: '', password: '', passwordConfirmation: '', fullName: '' },
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
      .label('Password'),
    passwordConfirmation: Joi.any()
      .valid(Joi.ref('password'))
      .label('Password Confirmation')
      .options({ language: { any: { allowOnly: 'must match "Password"' } } }),
    fullName: Joi.string()
      .required()
      .label('Name')
  };

  doSubmit = event => {
    // Call the server

    const { history } = this.props;
    const { email, password, fullName } = this.state.data;

    auth
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        //console.log('Registered', authUser.user.uid);
        history.push(routes.HOME);

        db.collection('users')
          .doc()
          .set({
            uid: authUser.user.uid,
            fullName: fullName,
            email: email,
            registrationDate: firebase.firestore.FieldValue.serverTimestamp()
          })
          .then(function() {
            //console.log('User added to database!');
          })
          .catch(function(error) {
            //console.error('Error adding user to database: ', error);
            console.log(error);
            this.setState({ firebaseError: error });
          });

        sendVerification();
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
          {this.renderInput(
            'passwordConfirmation',
            'Password Confirmation',
            'password'
          )}
          {this.renderInput('fullName', 'Full name')}
          <div className="row">
            <div className="col-sm-4">{this.renderButton('Register')}</div>
            <div id="logInCol" className="col-sm-8">
              <span id="logInLink">
                <Link to={routes.LOG_IN}>Already have an account?</Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function sendVerification() {
  let user = firebase.auth().currentUser;

  user
    .sendEmailVerification()
    .then(function() {
      // Email sent
      console.log('Verification mail sent.');
    })
    .catch(function(error) {
      // Error occured
      console.log('Error occured while sending verification mail.');
    });
}

export default RegisterForm;
