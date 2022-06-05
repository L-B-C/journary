const express = require('express');
const router = express.Router();
const journeys = require('../controllers/journeysController');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateJourney, validateWaypoint } = require('../middleware');

router
  .route('/')
  .get(isLoggedIn, catchAsync(journeys.index))
  .post(isLoggedIn, validateWaypoint, validateJourney, catchAsync(journeys.createJourney));

router.get('/new', isLoggedIn, journeys.renderNewForm);

router.get('/search', isLoggedIn, catchAsync(journeys.findJourneyByDate));

router
  .route('/:id')
  .get(isLoggedIn, isAuthor, catchAsync(journeys.showJourney))
  .put(isLoggedIn, isAuthor, validateWaypoint, validateJourney, catchAsync(journeys.updateJourney))
  .delete(isLoggedIn, isAuthor, catchAsync(journeys.deleteJourney));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(journeys.renderEditForm));

module.exports = router;
