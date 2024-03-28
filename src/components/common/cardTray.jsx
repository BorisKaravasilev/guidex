import React from 'react';
import Card from './card';
import { trimText } from '../../utils/trimText';

const CardTray = ({ items, ctaText = 'See item' }) => {
  return (
    <div className="container">
      <div className="row">
        {items.map(i => (
          <div key={i.id} className="col-xl-4 col-md-6">
            <Card
              id={i.id}
              image={i.image}
              title={i.title}
              description={trimText(i.description)}
              ctaText={ctaText}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardTray;
