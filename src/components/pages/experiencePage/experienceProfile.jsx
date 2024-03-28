import React from 'react';
import expImgPlaceholder from '../../../img/exp-placeholder.png';

const ExperienceProfile = ({ experience, guide }) => {
  return (
    <section id="experienceProfile">
      <div className="container">
        <div className="row">
          <div id="details" className="col-lg-6">
            <div className="row">
              <h3>{experience.title}</h3>
            </div>
            <div id="detailsRow">
              <div className="row">
                <div className="icon">
                  <i className="fa fa-user" aria-hidden="true" />
                </div>
                <div className="titleCol">
                  <h4>Your guide:</h4>
                </div>
                <div className="infoCol">
                  <span className="info">{guide.fullName}</span>
                </div>
              </div>
              <div className="row">
                <div className="icon">
                  <i className="fa fa-language" aria-hidden="true" />
                </div>
                <div className="titleCol">
                  <h4>Language:</h4>
                </div>
                <div className="infoCol">
                  <span className="info">{experience.language}</span>
                </div>
              </div>
              <div className="row">
                <div className="icon">
                  <i className="fa fa-clock-o" aria-hidden="true" />
                </div>
                <div className="titleCol">
                  <h4>Duration: </h4>
                </div>
                <div className="infoCol">
                  <span className="info">{experience.duration}</span>
                </div>
              </div>
              <div className="row">
                <div className="icon">
                  <i className="fa fa-money" aria-hidden="true" />
                </div>
                <div className="titleCol">
                  <h4>Price: </h4>
                </div>
                <div className="infoCol">
                  <span className="info">{experience.price}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div
              id="expProfileSlider"
              className="carousel slide"
              data-ride="carousel"
              data-interval="false"
            >
              <div className="carousel-inner">
                {/* Prints the first image */}
                <div className="carousel-item active">
                  {experience.videoID !== null && experience.videoID !== '' ? (
                    getVideo(experience.videoID)
                  ) : experience.images !== null &&
                    experience.images.length > 0 ? (
                    <img
                      className="img-fluid"
                      src={experience.images[0]}
                      alt="Experience"
                    />
                  ) : (
                    <img
                      className="img-fluid"
                      src={expImgPlaceholder}
                      alt="placeholder"
                    />
                  )}
                </div>

                {/* Prints the rest of the images */}
                {experience.videoID != null &&
                experience.videoID !== '' &&
                experience.images != null
                  ? // Show images from index 0
                    experience.images.map(img => (
                      <div key={img} className="carousel-item">
                        <img className="img-fluid" src={img} alt="Experience" />
                      </div>
                    ))
                  : experience.images != null && experience.images.length > 1
                  ? // Show images from index 1
                    experience.images.map(img =>
                      experience.images.indexOf(img) !== 0 ? (
                        <div key={img} className="carousel-item">
                          <img
                            className="img-fluid"
                            src={img}
                            alt="Experience"
                          />
                        </div>
                      ) : null
                    )
                  : null}

                <a
                  className="carousel-control-prev"
                  href="#expProfileSlider"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#expProfileSlider"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div id="descriptionRow" className="row no-gutters">
          <div className="col-12 p-0">
            <div className="row no-gutters">
              <h4>Description</h4>
            </div>
            <div className="row no-gutters">
              <p className="m-0">{experience.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function getVideo(videoID) {
  return (
    <div className="embed-responsive embed-responsive-16by9">
      <iframe
        title="Experience video"
        className="embed-responsive-item"
        src={
          'https://www.youtube.com/embed/' + videoID + '?rel=0&amp;showinfo=0'
        }
        allowFullScreen
      />
    </div>
  );
}

export default ExperienceProfile;
