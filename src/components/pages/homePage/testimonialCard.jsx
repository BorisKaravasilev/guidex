import React from 'react';
import profilePhoto from './profilePlaceholder.jpg';

const TestimonialCard = ({ name, testimonial, image = profilePhoto }) => {
  return (
    <div className="container m-0 p-0">
      <div className="row m-0">
        <div id="profile" className="com-sm p-3">
          <div className="row m-0">
            <img
              src={image}
              alt=""
              className="m-auto"
              style={{ width: 'auto', height: '80px', borderRadius: '50%' }}
            />
          </div>
          <div className="row m-0">
            <h5 className="m-0 mt-2">{name}</h5>
          </div>
        </div>
        <div className="col-sm d-flex">
          <p className="align-self-center">{testimonial}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
