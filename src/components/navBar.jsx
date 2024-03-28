import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { db } from '../firebase';
import * as routes from '../constants/routes';

class NavBar extends Component {
  state = {
    fullName: ''
  };

  async componentDidUpdate() {
    if (!this.props.authUser) return;

    const userResult = await db
      .collection('users')
      .where('uid', '==', this.props.authUser.uid)
      .get();

    userResult.docs.forEach(doc => {
      this.setState({ fullName: doc.data().fullName });
    });
  }

  render() {
    const { authUser } = this.props;

    return (
      <React.Fragment>
        <nav id="navBar" className="navbar navbar-expand-lg navbar-light">
          <NavLink to={routes.LANDING} className="navbar-brand">
            <header>
              <h1>Guidex</h1>
              <h2>Experiences by you, for you!</h2>
            </header>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            MENU
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav ml-auto">
              <NavLink to={routes.HOME} className="nav-item nav-link">
                Home
              </NavLink>
              <NavLink to={routes.EXPERIENCES} className="nav-item nav-link">
                Experiences
              </NavLink>
              <NavLink to={routes.ABOUT_US} className="nav-item nav-link">
                About us
              </NavLink>
              {authUser ? (
                <span id="username" className="nav-item nav-link">
                  {this.state.fullName}
                </span>
              ) : (
                <NavLink to={routes.SIGN_UP} className="nav-item nav-link">
                  Sign up
                </NavLink>
              )}
              {authUser ? (
                <button
                  id="btn-log-in"
                  className="btn btn-outline-light ml-2 btn-sm nav-item m-auto"
                  onClick={() => auth.signOut()}
                >
                  Log out
                </button>
              ) : (
                <NavLink to={routes.LOG_IN} className="m-auto">
                  <button
                    id="btn-log-in"
                    className="btn btn-outline-light ml-2 btn-sm nav-item"
                  >
                    Log in
                  </button>
                </NavLink>
              )}
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
