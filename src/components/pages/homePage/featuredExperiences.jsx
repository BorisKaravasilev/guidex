import React, { Component } from 'react';
import { EXP_CTA_TEXT } from '../../../constants/general';
import CardTray from '../../common/cardTray';
import { db } from '../../../firebase';
import firebase from 'firebase/app';
import 'firebase/storage';
import expImagePlaceholder from '../../../img/exp-placeholder.png';
import { Link } from 'react-router-dom';

class FeaturedExperiences extends Component {
  state = {
    featuredExperiences: []
  };

  async componentDidMount() {
    const experiencesRef = db.collection('experiences');
    const filteredExperiencesRef = experiencesRef.where('featured', '==', true);

    filteredExperiencesRef.onSnapshot(async snapshot => {
      const dbExperiences = [];

      snapshot.docs.forEach(doc => {
        const { images, title, description } = doc.data();

        dbExperiences.push({
          id: doc.id,
          image: images ? (images.length > 0 ? images[0] : null) : null,
          title: title ? title : 'New experience',
          description: description
            ? description
            : 'This experiences description is coming soon!'
        });
      });

      for (const experience of dbExperiences) {
        if (!experience.image) {
          experience.image = expImagePlaceholder;
          continue;
        }

        const featuredImage = await firebase
          .storage()
          .ref()
          .child('experiences/' + experience.id + '/' + experience.image)
          .getDownloadURL()
          .catch(function(error) {
            console.log(error.code);
          });

        experience.image = featuredImage;
      }

      this.setState({ featuredExperiences: dbExperiences });
    });
  }

  render() {
    return (
      <section id="featuredExperiences">
        <div className="container">
          <h2>Newest experiences!</h2>
          <p>
            The selection of our experiences is growing! Watch out for new
            opportunities so you don't miss something interesting. Would you
            like, to become a guide and see your own experience here? Just send
            us a mail or contact us on facebook.
          </p>
          <CardTray
            items={this.state.featuredExperiences}
            ctaText={EXP_CTA_TEXT}
          />

          <Link
            id="see-all-btn"
            to={'/experiences'}
            className="btn btn-outline-light mt-3"
          >
            See all experiences
          </Link>
        </div>
      </section>
    );
  }
}

export default FeaturedExperiences;
