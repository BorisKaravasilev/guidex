import React, { Component } from 'react';
import { auth } from '../../../firebase/firebase';
import { Link } from 'react-router-dom';
import * as routes from '../../../constants/routes';
import { db, firebase } from '../../../firebase';
import fb from 'firebase/app';

class ExperienceAvailability extends Component {
  state = {
    userID: '',
    admin: false,
    users: null
  };

  async componentDidMount() {
    let user = fb.auth().currentUser;
    if (user != null) user.reload();

    firebase.auth.onAuthStateChanged(async authUser => {
      if (authUser) {
        const usersRef = db.collection('users');
        const currentUserRef = usersRef.where('uid', '==', authUser.uid);
        const currentUser = await currentUserRef.get();
        const users = await usersRef.get();

        this.setState({
          userID: currentUser.docs[0].id,
          admin: currentUser.docs[0].data().admin,
          users: users
        });
      }
    });
  }

  render() {
    const { experience: exp, experienceID: expID } = this.props;
    const { userID } = this.state;

    let oldDate = false;
    let capacityFull = false;
    let thisUserBooked = false;
    let newestDates;

    // Makes copy of the array
    if (exp.dates) newestDates = [...exp.dates];
    else newestDates = [];

    if (newestDates != null && newestDates.length > 0) {
      newestDates = newestDates.slice(
        newestDates.length - 4,
        newestDates.length
      );
    }

    return (
      <section id="experienceAvailability">
        <div className="container">
          <h4>Availability</h4>
          {newestDates ? (
            newestDates.length > 0 ? (
              newestDates.map(date => (
                <div
                  key={newestDates.indexOf(date)}
                  className="row dateBox shadow"
                >
                  <div className="col">
                    <div className="row no-gutters">
                      {/* Date and time column */}
                      <div id="dateTimeInfoCol" className="col-md">
                        <div id="dateRow" className="row no-gutters">
                          <div id="dateCol" className="col col-md-auto">
                            <i
                              id="dateIcon"
                              className="fa fa-calendar-check-o"
                              aria-hidden="true"
                            />
                            <h5>
                              {date.date.toDate().getDate()}.
                              {date.date.toDate().getMonth() +
                                1 /* getMonth return 0 - 11 */}
                              .{date.date.toDate().getFullYear()}
                            </h5>
                          </div>
                          <div id="timeCol" className="col-sm-6">
                            <i
                              id="timeIcon"
                              className="fa fa-clock-o"
                              aria-hidden="true"
                            />
                            <h5>
                              {date.date.toDate().getHours()}:
                              {(date.date.toDate().getMinutes() < 10
                                ? '0'
                                : '') + date.date.toDate().getMinutes()}{' '}
                              (
                              <span id="ampmTime">
                                {formatAMPM(date.date.toDate())}
                              </span>
                              )
                            </h5>
                          </div>
                        </div>
                      </div>

                      {/* Buttons column */}
                      <div id="buttonsCol" className="col-md-auto p-0">
                        {(oldDate = date.date.toDate().getTime() < Date.now())}
                        {
                          (capacityFull =
                            date.maxRegistrations == null
                              ? false
                              : date.registeredUsers.length >=
                                date.maxRegistrations)
                        }
                        {
                          (thisUserBooked = date.registeredUsers.includes(
                            this.state.userID
                          ))
                        }

                        {auth.currentUser ? (
                          <div className="row no-gutters p-0">
                            <div id="likeBtnCol" className="col-sm">
                              {getLikeButton(
                                this.props.history,
                                !oldDate,
                                date,
                                userID,
                                expID,
                                exp
                              )}
                            </div>
                            <div id="regBtnCol" className="col-sm">
                              {getRegButton(
                                this.props.history,
                                !oldDate && (!capacityFull || thisUserBooked),
                                date,
                                userID,
                                expID,
                                exp
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="row no-gutters p-0">
                            <div className="col">
                              <Link to={routes.LOG_IN}>
                                <button
                                  id="logInToViewBtn"
                                  type="button"
                                  className="btn btn-outline-primary"
                                >
                                  {oldDate
                                    ? 'Log in, to view date details'
                                    : 'Log in, to book a ticket'}
                                </button>
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Registered users info for admins */}
                    {this.state.admin ? (
                      <React.Fragment>
                        <div className="row no-gutters">
                          <button
                            id="viewDetailsBtn"
                            className="btn btn-primary"
                            type="button"
                            data-toggle="collapse"
                            data-target={'#details' + newestDates.indexOf(date)}
                            aria-expanded="false"
                            aria-controls={
                              'details' + newestDates.indexOf(date)
                            }
                          >
                            View user info
                          </button>
                        </div>
                        <div
                          className="row no-gutters usersInfo collapse"
                          id={'details' + newestDates.indexOf(date)}
                        >
                          <div className="col-md">
                            <span role="img" aria-label="Thumb">
                              👍
                            </span>
                            <b>Liked users</b>

                            {printUsers(
                              date.likedUsers,
                              this.state.users,
                              'warning'
                            )}
                          </div>

                          <div className="col-md">
                            <span role="img" aria-label="Checkmark">
                              ✅
                            </span>
                            <b> Booked users</b>

                            {printUsers(
                              date.registeredUsers,
                              this.state.users,
                              'success'
                            )}
                          </div>
                        </div>
                      </React.Fragment>
                    ) : null}
                  </div>
                </div>
              ))
            ) : null
          ) : (
            <p>No dates available at the moment.</p>
          )}
        </div>
      </section>
    );
  }
}

function getLikeButton(history, enabled, date, userID, expID, exp) {
  return getButton(
    'likeButton',
    date.likedUsers.length,
    'Liked!',
    'Like!',
    'btn-outline-warning',
    'btn-outline-warning',
    date.likedUsers.includes(userID),
    enabled,
    () =>
      updateDate(
        history,
        expID,
        exp.dates,
        exp.dates.indexOf(date),
        userID,
        'likedUsers'
      )
  );
}

function getRegButton(history, enabled, date, userID, expID, exp) {
  return getButton(
    'regButton',
    date.registeredUsers.length +
      (date.maxRegistrations != null ? '/' + date.maxRegistrations : ''),
    'Date booked!',
    date.registeredUsers.length <
      (date.maxRegistrations != null ? date.maxRegistrations : Infinity)
      ? 'Book a ticket!'
      : 'Full capacity',
    'btn-outline-success',
    'btn-outline-primary',
    date.registeredUsers.includes(userID),
    enabled,
    () =>
      updateDate(
        history,
        expID,
        exp.dates,
        exp.dates.indexOf(date),
        userID,
        'registeredUsers'
      )
  );
}

function getButton(
  id,
  badgeText,
  enLabel,
  disLabel,
  enClass,
  disClass,
  active,
  enabled,
  onClickFn
) {
  return (
    <button
      disabled={!enabled}
      id={id}
      type="button"
      className={active ? 'btn ' + enClass + ' active' : 'btn ' + disClass}
      onClick={onClickFn}
    >
      <span className="badge badge-dark mr-2">{badgeText}</span>
      {active ? enLabel : disLabel}
    </button>
  );
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function updateDate(history, experienceID, dates, dateIndex, userID, dateProp) {
  let user = fb.auth().currentUser;
  /*
  if (user != null) {
    if (!user.emailVerified) {
      history.push(routes.VERIFICATION);
      return;
    }
  }
*/
  const userIdIndex = dates[dateIndex][dateProp].indexOf(userID);
  if (userIdIndex > -1) {
    //if (dateProp === 'likedUsers') // Temporary disabled date unregistration
    dates[dateIndex][dateProp].splice(userIdIndex, 1);
  } else {
    dates[dateIndex][dateProp].push(userID);
  }

  db.collection('experiences')
    .doc(experienceID)
    .update({
      dates: dates
    })
    .then(function() {
      //console.log('Date LIKED!');
    })
    .catch(function(error) {
      console.error('Error updating values in database: ', error);
      history.push(routes.VERIFICATION);
    });
}

function printUsers(regedUsers, users, bootstrapClass) {
  let usersCount = 0;
  let result = (
    <div className="table-responsive">
      <table className={'table table-striped table-' + bootstrapClass}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>e-mail</th>
          </tr>
        </thead>
        <tbody>
          {users.docs.map(doc =>
            regedUsers.includes(doc.id) ? (
              <tr key={doc.id}>
                <th scope="row">{++usersCount}</th>
                <td>{doc.data().fullName}</td>
                <td>{doc.data().email ? doc.data().email : '---'}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );

  return result;
}

export default ExperienceAvailability;
