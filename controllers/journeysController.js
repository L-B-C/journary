const Journey = require('../models/journeyModel');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

module.exports.index = async (req, res) => {
  const journeys = await Journey.find({ author: req.user._id });
  res.render('journeys/index', { journeys });
};

module.exports.renderNewForm = (req, res) => {
  res.render('journeys/new');
};

module.exports.findJourneyByDate = async (req, res) => {
  const journeys = await Journey.find({ date: new Date(req.query.date).toISOString() });
  console.log(journeys);
  if (!journeys || journeys.length === 0) {
    req.flash('error', 'Cannot find journeys for that date!');
    return res.redirect('/journeys');
  }
  res.render('journeys/index', { journeys });
};

module.exports.createJourney = async (req, res, next) => {
  const journey = new Journey(req.body.journey);
  for (location of req.body.locations) {
    const geoData = await geocoder
      .forwardGeocode({
        query: location,
        limit: 1,
      })
      .send();
    journey.waypoints.push({ location: location, geometry: geoData.body.features[0].geometry });
  }
  req.body.journey.date = new Date(req.body.journey.date).toISOString();
  journey.author = req.user._id;
  await journey.save();
  console.log(journey);
  req.flash('success', 'Successfully made a new journey!');
  res.redirect(`/journeys/${journey._id}`);
};

module.exports.showJourney = async (req, res) => {
  const journey = await Journey.findById(req.params.id);
  if (!journey) {
    req.flash('error', 'Cannot find that journey!');
    return res.redirect('/journeys');
  }
  res.render('journeys/show', { journey });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const journey = await Journey.findById(id);
  if (!journey) {
    req.flash('error', 'Cannot find that journey!');
    return res.redirect('/journeys');
  }
  res.render('journeys/edit', { journey });
};

module.exports.updateJourney = async (req, res, next) => {
  let waypoints = [];
  for (location of req.body.locations) {
    const geoData = await geocoder
      .forwardGeocode({
        query: location,
        limit: 1,
      })
      .send();
    waypoints.push({ location: location, geometry: geoData.body.features[0].geometry });
  }
  req.body.journey.waypoints = waypoints;
  //Change input date from yyyy-mm-dd to ISO format
  req.body.journey.date = new Date(req.body.journey.date).toISOString();
  const { id } = req.params;
  const journey = await Journey.findByIdAndUpdate(id, { ...req.body.journey });
  console.log(journey);
  await journey.save();
  req.flash('success', 'Successfully updated journey!');
  res.redirect(`/journeys/${journey._id}`);
};

module.exports.deleteJourney = async (req, res) => {
  const { id } = req.params;
  await Journey.findByIdAndDelete(id);
  req.flash('success', 'Successfully deleted journey');
  res.redirect('/journeys');
};
