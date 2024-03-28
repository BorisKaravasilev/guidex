import React, { Component } from 'react';
import { Link as ScrollLink } from 'react-scroll';

class Welcome extends Component {
  state = {};
  render() {
    return (
      <section id="welcome">
        <div className="container">
          <div className="row">
            <div id="welcomeTextCol" className="col-md-6">
              <h3>Let's experience!</h3>
              <p>
                Meet new people and experience something awesome! Experiences
                organised by you, for you!
              </p>

              <ScrollLink
                to="featuredExperiences"
                smooth={true}
                offset={0}
                duration={700}
              >
                <button className="btn btn-danger">Learn more!</button>
              </ScrollLink>
            </div>

            <div className="col-md-6">
              <div
                id="welcome-video"
                className="embed-responsive embed-responsive-16by9"
              >
                <iframe
                  title="Intro video"
                  className="embed-responsive-item"
                  src="https://www.youtube.com/embed/O-M3niQ-w7w?rel=0&amp;showinfo=0"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Welcome;
