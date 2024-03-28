import React, { Component } from "react";
import Experiences from "./experiencePage/experiences";

class ExperiencesPage extends Component {
  state = {};
  render() {
    return (
      <main id="experiencesPage" className="page">
        <h3>Experiences</h3>
        <Experiences />
      </main>
    );
  }
}

export default ExperiencesPage;
