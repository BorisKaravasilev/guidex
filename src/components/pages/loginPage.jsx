import React, { Component } from "react";
import LoginForm from "./../loginForm";

class LoginPage extends Component {
  state = {};
  render() {
    return (
      <main id="loginPage" className="page">
        <div className="container">
          <h3>Log in</h3>
          <LoginForm />
        </div>
      </main>
    );
  }
}

export default LoginPage;
