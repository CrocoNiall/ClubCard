var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'); //parses information from POST
    // methodOverride = require('method-override'); //used to manipulate POST

var venueController = require('../controllers/venueContoller.js')
var userController = require('../controllers/userController.js')


router.route('/venues')
  .get(venueController.getAll)
  .post(venueController.createVenue)

router.route('/venues/:id')
  .get(venueController.getVenue)
  .delete(venueController.removeVenue)





router.route('/users')
  .get(userController.getAll)
  .post(userController.createUser)

router.route('/users/:id')
  .get(userController.getUser)
  .delete(userController.removeUser)


  
module.exports = router