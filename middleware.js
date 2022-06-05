const { journeySchema, waypointsSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Journey = require('./models/journeyModel');

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'You must be signed in first!');
    return res.redirect('/login');
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const journey = await Journey.findById(id);
  if (!journey.author.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to do that');
    return res.redirect(`/journeys`);
  }
  next();
};

module.exports.validateJourney = async (req, res, next) => {
  const { error } = journeySchema.validate(req.body.journey);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateWaypoint = (req, res, next) => {
  req.body.locations = Array.isArray(req.body.locations) ? req.body.locations : [req.body.locations];
  console.log(req.body.locations);
  const { error } = waypointsSchema.validate(req.body.locations);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
