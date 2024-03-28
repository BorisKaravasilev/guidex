import React, { Component } from 'react';
import RegisterForm from './../registerForm';
import { withRouter } from 'react-router-dom';

class RegistrationPage extends Component {
  state = {};

  render() {
    return (
      <main id="registrationPage" className="page">
        <div className="container">
          <h3>Registration</h3>
          <RegisterForm history={this.props.history} />
        </div>
      </main>
    );
  }
}

export default withRouter(RegistrationPage);
