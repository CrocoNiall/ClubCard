var User = require('../models/User')
var Venue = require('../models/Venue')

function addCredit(request, response) {
  var userId = request.params.user_id
  var venueId = request.params.venue_id

  User.findById({_id: userId}, function(error, user) {
    if(error) response.json({message: 'Could not find user b/c:' + error});

    Venue.findById({_id: venueId}, function(error, venue) {
      if(error) response.json({message: 'Could not find venue b/c:' + error});

      var userActivityObj = {
        venueId: venue._id,
        venue: venue.name,
        date: Number(new Date()),
        credit: request.body.credit
      }       

      var venueActivityObj = {
        userId: user._id,
        name: user.firstName + user.lastName,
        dateTime: Number(new Date())
      }



      if (request.body.action == 'credit'){
      var newCredit = parseInt(user.credit) + parseInt(request.body.credit)
      user.credit = newCredit

      } else if (request.body.action == 'charge'){
      var newCredit = parseInt(user.credit) - parseInt(request.body.credit)
      user.credit = newCredit

      } else {
        
      }


      user.activity.push(userActivityObj)
      venue.activity.push(venueActivityObj)

      user.save(function(error) {
      if(error) response.json({messsage: 'Could not update user b/c:' + error});  

      });

      venue.save(function(error) {
      if(error) response.json({messsage: 'Could not update venue b/c:' + error});  

      });

      response.json({ message: 'records successfully updated' });

        }).select('-__v');
      }).select('-__v');


}

module.exports = {
  addCredit: addCredit
}