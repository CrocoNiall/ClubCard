var Venue = require('../models/Venue.js');

// GET
function getAll(request, response) {
  Venue.find(function(error, venues) {
    if(error) response.json({message: 'Could not find any venues'});

    response.json({venues: venues});
  }).select('-__v');
}


// POST CREATE
function createVenue(request, response) {
  console.log('in POST');
  console.log('body:',request.body);

  var venue = new Venue(request.body);
  venue.save(function(error) {
    if(error) response.json({messsage: 'Could not ceate venue b/c:' + error});

    response.json({venue: venue});
  });
}

//GET DELETE
function getVenue(request, response) {
  var id = request.params.id;

  Venue.findById({_id: id}, function(error, venue) {
    if(error) response.json({message: 'Could not find venue b/c:' + error});

    response.json({venue: venue});
  }).select('-__v');
}


function removeVenue(request, response) {
  var id = request.params.id;

  Venue.remove({_id: id}, function(error) {
    if(error) response.json({message: 'Could not delete venue b/c:' + error});

    response.json({message: 'venue successfully deleted'});
  }).select('-__v');
}

module.exports = {
  getAll: getAll,
  createVenue: createVenue,
  getVenue: getVenue,
  removeVenue: removeVenue

}