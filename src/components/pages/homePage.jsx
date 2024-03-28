import React, { Component } from 'react';
import Welcome from './homePage/welcome';
import FeaturedExperiences from './homePage/featuredExperiences';
import Testimonials from './homePage/testimonials';

class HomePage extends Component {
  state = {};
  render() {
    return (
      <main className="page">
        <Welcome />
        <FeaturedExperiences />
        <Testimonials />
      </main>
    );
  }
}

export default HomePage;
