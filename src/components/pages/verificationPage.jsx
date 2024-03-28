import React, { Component } from 'react';
import firebase from 'firebase/app';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';

class VerificationPage extends Component {
  state = {
    sent: false
  };

  render() {
    let user = firebase.auth().currentUser;
    let emailId;
    let emailVerified;

    if (user != null) {
      emailId = user.email;
      emailVerified = user.emailVerified;
    }

    return (
      <main id="verificationPage" className="page">
        {emailVerified ? (
          <React.Fragment>
            <h3>Your email is verified!</h3>
            <p>
              You can book a ticket for a{' '}
              <Link to="/experiences">experience</Link> now.
            </p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h3>Verify your email</h3>
            <p>
              To book tickets, you first neeed to verify your email. If you need
              to resend the verification link to your email address, please
              click the button below.
            </p>
            <div className="row p-2">
              <button
                id="btn-resend"
                className="btn btn-success m-4 btn-sm m-auto"
                onClick={() => sendVerification(this.props.history, user)}
              >
                Send verification mail
              </button>
            </div>

            <div className="row">
              <button
                id="btn-resend"
                className="btn btn-outline-primary m-4 btn-sm m-auto"
                onClick={() => goBack(this.props.history)}
              >
                Back to experience
              </button>
            </div>
            <span id="mail-result" className="alert-success" />
          </React.Fragment>
        )}
      </main>
    );
  }
}

function sendVerification(history, user) {
  if (user) {
    user
      .sendEmailVerification()
      .then(function() {
        // Email sent
        console.log('mail sent.');
        history.push(routes.EXPERIENCES);
      })
      .catch(function(error) {
        // Error occured
        return false;
      });
  }
}

function goBack(history) {
  history.goBack();
}

export default VerificationPage;
