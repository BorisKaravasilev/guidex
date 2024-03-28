import React from 'react';

const ExperienceLocation = ({ experience }) => {
	var gMapsAPIKey = '';

	if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
		// dev code
		gMapsAPIKey = '';
	} else {
		// production code
		gMapsAPIKey = '';
	}

	return (
		<section id="experienceLocation">
			<div className="container">
				<div className="row">
					<div className="col-lg-6">
						<div className="row no-gutters">
							<h4>Location</h4>
							<hr />
						</div>
						<div id="meetingRow" className="row no-gutters">
							<i className="fa fa-map-marker" aria-hidden="true" />
							<h5>Meeting Point:</h5>
						</div>
						<div className="row no-gutters">
							<span>{experience.meetingPoint}</span>
						</div>
						<div id="descriptionRow" className="row no-gutters">
							<i className="fa fa-flag-checkered" aria-hidden="true" />
							<h5>Finish:</h5>
						</div>
						<div className="row no-gutters">
							<span>{experience.finish}</span>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="mapouter embed-responsive embed-responsive-16by9">
							<div className="gmap_canvas">
								<iframe
									title="Experience introduction"
									id="gmap_canvas"
									src={
										'https://www.google.com/maps/embed/v1/place?key=' +
										gMapsAPIKey +
										'&q=' +
										encodeURI(
											experience.location ? experience.location : 'Brno'
										)
									}
									frameBorder="0"
									scrolling="no"
									marginHeight="0"
									marginWidth="0"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ExperienceLocation;
