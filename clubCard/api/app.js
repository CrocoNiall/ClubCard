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
//   name: 'PHUK',
//   openeingHours: {mon: '11pm - 3pm', tues: '11pm - 3pm', wed: 'CLOSED', thurs: '11pm - 3pm', fri: '11pm - 3pm', sat: '11pm - 6pm', sun: '11pm - 3pm'},
//   offer: {offerDesc: 'BOGOF', cost: 50},
//   location: { lat: '54.979996', long: '-1.60' }

// })

// venue1.save(function(err, venue) {
//   if (err) console.log(err)
//     console.log('venue1 Saved');
// })

// var venue2 = new Venue({
//   name: 'Digital',
//   openeingHours: {mon: '9pm - 6pm', tues: '11pm - 3pm', wed: 'CLOSED', thurs: 'CLOSED', fri: '11pm - 3pm', sat: '11pm - 6pm', sun: '11pm - 3pm'},
//   offer: {offerDesc: 'Free Shot', cost: 30},
//   location: { lat: '54.979996', long: '-1.70' }

// })

// venue2.save(function(err, venue) {
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



app.use(routes);

app.listen(3000);

