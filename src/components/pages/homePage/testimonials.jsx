import React, { Component } from 'react';
import profileImagePlaceholder from './testimonialCard';
import { db } from '../../../firebase';
import firebase from 'firebase/app';
import 'firebase/storage';
import TestimonialCard from './testimonialCard';

class Testimonials extends Component {
  state = {
    testimonials: []
  };

  componentDidMount() {
    const testimonialsRef = db.collection('testimonials');

    testimonialsRef.onSnapshot(async snapshot => {
      const dbTestimonials = [];

      snapshot.docs.forEach(doc => {
        const { fullName, testimonial, profileImageID } = doc.data();

        dbTestimonials.push({
          id: doc.id,
          fullName: fullName,
          testimonial: testimonial,
          profileImageID: profileImageID
        });
      });

      for (const testimonial of dbTestimonials) {
        if (!testimonial.profileImageID) {
          testimonial.profileImage = profileImagePlaceholder;
          continue;
        }

        const storageProfileImage = await firebase
          .storage()
          .ref()
          .child('testimonials/' + testimonial.profileImageID)
          .getDownloadURL()
          .catch(function(error) {
            console.log(error.code);
          });

        testimonial.profileImage = storageProfileImage;
      }

      this.setState({ testimonials: dbTestimonials });
    });
  }

  render() {
    const { testimonials } = this.state;

    return (
      <section id="testimonials" className="testimonials">
        <div className="container">
          <div
            id="testimonialsCarousel"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner m-auto" style={{ width: '90%' }}>
              {testimonials.map(t => (
                <div
                  key={t.id}
                  className={
                    testimonials.indexOf(t) === 0
                      ? 'carousel-item active'
                      : 'carousel-item'
                  }
                >
                  <TestimonialCard
                    name={t.fullName}
                    testimonial={t.testimonial}
                    image={t.profileImage}
                  />
                </div>
              ))}
            </div>

            <a
              className="carousel-control-prev"
              href="#testimonialsCarousel"
              role="button"
              data-slide="prev"
              style={{ width: '5%' }}
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#testimonialsCarousel"
              role="button"
              data-slide="next"
              style={{ width: '5%' }}
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </section>
    );
  }
}

export default Testimonials;
