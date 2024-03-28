import React, { Component } from 'react';
import profileImagePlaceholder from './profilePlaceholder.jpg';

class GuidePreview extends Component {
  render() {
    const { guide, profileImage } = this.props;

    return (
      <section id="guidePreview">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div id="profileImageRow" className="row">
                <img
                  id="profileImage"
                  src={profileImage ? profileImage : profileImagePlaceholder}
                  alt="Guide profile"
                />
              </div>
              <div id="profileNameRow" className="row">
                <h5>{guide.fullName}</h5>
              </div>
            </div>
            <div id="introductionCol" className="col-md-9">
              <div id="introductionBlock">
                <div className="row no-gutters">
                  <h4>Guide introduction</h4>
                </div>
                <div className="row no-gutters">
                  <p>{guide.introduction}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default GuidePreview;
