import React, { Component } from 'react';
import { EXP_CTA_TEXT } from './../../../constants/general';
import Card from '../../common/card';
import { trimText } from '../../../utils/trimText';
import { db } from '../../../firebase';
import firebase from 'firebase/app';
import 'firebase/storage';
import expImagePlaceholder from '../../../img/exp-placeholder.png';

class Experiences extends Component {
  state = {
    experiences: [],
    currentPage: 1,
    pageSize: 6,
    descriptionLength: 80
  };

  componentDidMount() {
    const experiencesRef = db.collection('experiences');

    experiencesRef.onSnapshot(async snapshot => {
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

      this.setState({ experiences: dbExperiences });
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.experiences.map(e => (
            <div key={e.id} className="col-xl-4 col-md-6">
              <Card
                id={e.id}
                image={e.image}
                title={e.title}
                description={trimText(e.description)}
                ctaText={EXP_CTA_TEXT}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Experiences;
