import React, { Component } from 'react';
import Footer from './components/footer';

// Firebase
import { firebase } from './firebase';

// Routing
import { Route, Redirect } from 'react-router-dom';
import * as routes from './constants/routes';
import { AnimatedSwitch } from 'react-router-transition';

// My components
import NavBar from './components/navBar';
import HomePage from './components/pages/homePage';
import ExperiencesPage from './components/pages/experiencesPage';
import NotFoundPage from './components/pages/notFoundPage';
import TermsOfServicePage from './components/pages/termsOfServicePage';
import PrivacyPolicyPage from './components/pages/privacyPolicy';
import AboutUsPage from './components/pages/aboutUsPage';
import RegistrationPage from './components/pages/registrationPage';
import LoginPage from './components/pages/loginPage';
import ExperiencePage from './components/pages/experiencePage';
import Verification from './components/pages/verificationPage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  render() {
    return (
      <div className="App">
        <NavBar authUser={this.state.authUser} />

        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 1 }}
          atActive={{ opacity: 1 }}
          className="switch-wrapper"
        >
          <Route path={routes.VERIFICATION} component={Verification} />
          <Route path={routes.EXPERIENCES_ID} component={ExperiencePage} />
          <Route path={routes.EXPERIENCES} component={ExperiencesPage} />
          <Route path={routes.ABOUT_US} component={AboutUsPage} />
          <Route
            path={routes.SIGN_UP}
            render={props => <RegistrationPage {...props} />}
          />
          <Route path={routes.LOG_IN} component={LoginPage} />
          <Route path={routes.NOT_FOUND} component={NotFoundPage} />
          <Route path={routes.TERMS} component={TermsOfServicePage} />
          <Route path={routes.PRIVACY} component={PrivacyPolicyPage} />
          <Redirect from={routes.LANDING} exact to="/home" />
          <Route path={routes.HOME} component={HomePage} />
          <Redirect to={routes.NOT_FOUND} />
        </AnimatedSwitch>

        <Footer />
      </div>
    );
  }
}

export default App;
