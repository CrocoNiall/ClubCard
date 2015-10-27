var express     = require('express');
var path        = require('path');
var cors        = require('cors');
var logger      = require('morgan');
var bodyParser  = require('body-parser');
var app         = express();
var mongoose    = require('mongoose');

mongoose.connect('mongodb://localhost:27017/club-card')
var routes      = require('./config/routes');

app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var Venue = require('./models/Venue.js');
var User = require('./models/User.js');

// var venue1 = new Venue({
//   name: 'POWERHOUSE',
//   openeingHours: {mon: '11pm - 3pm', tues: '11pm - 3pm', wed: 'CLOSED', thurs: '11pm - 3pm', fri: '11pm - 3pm', sat: '11pm - 6pm', sun: '11pm - 3pm'},
//   offer: {offerDesc: 'BOGOF', cost: 10},

// })

// venue1.save(function(err, venue) {
//   if (err) console.log(err)
//     console.log('venue1 Saved');
// })


// var user1 = new User({
//   email: 'nj.wallace@outlook.com',
//   userName: 'CrocoNiall',
//   password: 'password',
//   firstName: 'Niall',
//   lastName: 'Wallace',
//   DOB: 01/04/1992,
  

// })

// user1.save(function(err, user) {
//   if (err) console.log(err)
//     console.log('user1 Saved');
// })



// var UserScema   = mongoose.Scheme({
//   email: String,
//   userName: String, 
//   password: String, 
//   firstName: String, 
//   lastName: String,
//   DOB: Date, 
//   activity: [],
//   credit: Number

// });

// var VenueSchema = mongoose.Schema({
//   name: String,
//   openeingHours: {'mon': String, 'tues': String, 'wed': String,'thurs': String, 'fri': String, 'sat': String, 'sun': String},
//   offer: {'offerDesc': String, 'cost': Number},
//   location: { 'lat': String, 'long': String },
//   activity: []
// })






app.use(routes);

app.listen(3000);

