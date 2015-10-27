var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'); //parses information from POST
    // methodOverride = require('method-override'); //used to manipulate POST

var venueController = require('../controllers/venueContoller.js')
var userController = require('../controllers/userController.js')
var staticController = require('../controllers/staticController.js')

//VENUE ROUTES
router.route('/venues')
  .get(venueController.getAll)
  .post(venueController.createVenue)

router.route('/venues/:id')
  .get(venueController.getVenue)
  .delete(venueController.removeVenue)

//USER ROUTES
router.route('/users')
  .get(userController.getAll)
  .post(userController.createUser)

router.route('/users/:id')
  .get(userController.getUser)
  .delete(userController.removeUser)

//STATIC ROUTES
//ammend credit to user, log activity in use and venue activity
router.route('/venues/:venue_id/users/:user_id')
  .post(staticController.addCredit)

//queries user and venue to establish if user is eligable to claim offer
router.route('/query_credit/venues/:venue_id/users/:user_id')
  .post(staticController.checkPoints)

module.exports = router