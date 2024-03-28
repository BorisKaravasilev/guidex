import React from 'react';
import { Link } from 'react-router-dom';
import imageSrc from '../../img/exp-placeholder.png';

const Card = ({ id, image = imageSrc, title, description, ctaText }) => {
  return (
    <div
      className="card text-left shadow"
      style={{ marginTop: 15, marginBottom: 15 }}
    >
      <img className="card-img-top" src={image} alt="Experience" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <Link to={'/experiences/' + id} className="btn btn-primary">
          {ctaText}
        </Link>
      </div>
    </div>
  );
};

export default Card;
