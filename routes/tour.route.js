const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tour.controller');

router.route('/tour/trending').get(tourController.getTourView)
router.route('/tour/cheapest').get(tourController.getTourCheapest)
router.route('/')
    .get(tourController.getTour)
    .post(tourController.createTour)
router.route('/:id')
    .get(tourController.getTourDetailsById)
router.route('/tour/:id').patch(tourController.updateTourById)

module.exports = router;