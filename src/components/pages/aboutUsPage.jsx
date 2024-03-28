import React, { Component } from 'react';
import borisProfile from '../../img/aboutUs/boris-profile-img.jpg';
import jakubProfile from '../../img/aboutUs/jakub-profile-img.jpg';

class AboutUsPage extends Component {
  state = {};
  render() {
    return (
      <main id="aboutUsPage" className="page">
        <section id="aboutUs">
          <h3>About Us</h3>
          <p>
            The main idea of this project is to help people, that are looking to
            experience something awesome and meet new friends. On the other hand
            we give opportunity to people that are social and love organising
            events to practice foreign laguages, do what they love and make some
            money along the way. Isn't it a great concept? We are working hard
            to bring new experiences and functions ASAP!
          </p>
        </section>

        <section id="coFounders">
          <h4>Co-founders</h4>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-6">
                <div className="row">
                  <div className="col-md-6">
                    <img src={borisProfile} alt="" className="img-fluid" />
                  </div>
                  <div className="col-md-6">
                    <a
                      href="https://www.facebook.com/boris.karavasilev.7"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h5>Boris Karavasilev</h5>
                    </a>
                    <h6>Platform development</h6>
                    <p>
                      Hi! I am Boris! I am an super energetic, optimistic and
                      active person. In the past I have worked on my robots,
                      apps and{' '}
                      <a
                        href="https://www.karavasilev.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        more
                      </a>{' '}
                      different projects. Now I am focusing my energy on
                      entrepreneurial things that can positively affect others.
                      For example by developing this platform.
                    </p>
                    <br />
                    <p>
                      <b>e-mail: </b>
                      <a href="mailto:karavasilev.boris@gmail.com">
                        karavasilev.boris@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="row">
                  <div className="col-md-6">
                    <img src={jakubProfile} alt="" className="img-fluid" />
                  </div>
                  <div className="col-md-6">
                    <a
                      href="https://www.facebook.com/kaaapodelatuti"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h5>Jakub Henni</h5>
                    </a>
                    <h6>Experience organization</h6>
                    <p>
                      Hello, my name is Jakub! I am studying international
                      relations in Brno. I am interested in startups and I have
                      actually worked in one. Now I have decided to make my own
                      idea become a reality. I live in Brno and I know how
                      amazing it can be. I would like to share this with other
                      people and show them, what you can experience here.
                    </p>
                    <br />
                    <p>
                      <b>e-mail: </b>
                      <a href="mailto:henni.j@icloud.com">henni.j@icloud.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default AboutUsPage;
