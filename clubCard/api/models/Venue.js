var mongoose = require('mongoose');
var VenueSchema = mongoose.Schema({
  name: String,
  openeingHours: {'mon': String, 'tues': String, 'wed': String,'thurs': String, 'fri': String, 'sat': String, 'sun': String},
  offer: {'offerDesc': String, 'cost': Number},
  location: { 'lat': String, 'long': String },
  activity: []
})

module.exports = mongoose.model('Venue', VenueSchema)