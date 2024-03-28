import React, { Component } from 'react';
import ExperienceProfile from './experiencePage/experienceProfile';
import GuidePreview from './experiencePage/guidePreview';
import ExperienceLocation from './experiencePage/experienceLocation';
import ExperienceAvailability from './experiencePage/experienceAvailability';
import { db } from '../../firebase';
import firebase from 'firebase/app';
import 'firebase/storage';
import * as routes from '../../constants/routes';
import $ from 'jquery';

class ExperiencePage extends Component {
  state = {
    experience: {},
    experienceID: '',
    guide: {
      fullName: '-',
      introduction: 'Introduction coming soon.'
    },
    profileImage: null
  };

  async componentDidMount() {
    setTimeout(() => $('.alert').addClass('show'), 1500);

    const experienceRef = db
      .collection('experiences')
      .doc(this.props.match.params.id);

    const experienceResult = await experienceRef.get();

    // Check if experience with this ID exists
    if (!experienceResult.exists) {
      this.props.history.push(routes.NOT_FOUND);
      return;
    }

    console.log("After 'exists' check log!");

    const guideID = experienceResult.data().guideID;
    let guideRef = null;

    if (guideID != null && guideID != '') {
      guideRef = db.collection('users').doc(guideID);

      const profileImage = await firebase
        .storage()
        .ref()
        .child('guides/' + guideID + '/profile.jpg')
        .getDownloadURL()
        .catch(function(error) {
          console.log(error.code);
          return null;
        });

      this.setState({ profileImage });
    }

    experienceRef.onSnapshot(async doc => {
      const dbExperience = doc.data();

      if (dbExperience.images != null) {
        for (let i = 0; i < dbExperience.images.length; i++) {
          const imageURL = await firebase
            .storage()
            .ref()
            .child('experiences/' + doc.id + '/' + dbExperience.images[i])
            .getDownloadURL()
            .catch(function(error) {
              console.log(error.code);
            });

          dbExperience.images[i] = imageURL;
        }
      }

      this.setState({ experience: dbExperience, experienceID: doc.id });
    });

    if (guideID != null && guideID != '') {
      guideRef.onSnapshot(doc => {
        if (doc.exists) {
          const dbGuide = doc.data();
          this.setState({ guide: dbGuide });
        }
      });
    }
  }

  render() {
    const { experience, experienceID, guide, profileImage } = this.state;

    return (
      <main id="experiencePage" className="page">
        <div
          className="alert alert-success fade m-0 p-1 text-center"
          role="alert"
        >
          Because this is one of our first experiences, we will appreciate if
          you tell your friends about us and give us feedback!{' '}
          <span role="img" aria-label="Megaphone">
            📣
          </span>
        </div>
        <ExperienceProfile experience={experience} guide={guide} />
        <GuidePreview guide={guide} profileImage={profileImage} />
        <ExperienceLocation experience={experience} />
        <ExperienceAvailability
          history={this.props.history}
          experience={experience}
          experienceID={experienceID}
        />
      </main>
    );
  }
}

export default ExperiencePage;
