import React, { Component } from "react";

class NotFoundPage extends Component {
  state = {};
  render() {
    return (
      <main id="notFoundPage" className="page">
        <h3>Page not found.</h3>
        <p>You have probably entered an invalid URL.</p>
      </main>
    );
  }
}

export default NotFoundPage;
