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

var venue1 = new Venue({
  name: 'PHUK',
  openeingHours: {mon: '11pm - 3pm', tues: '11pm - 3pm', wed: 'CLOSED', thurs: '11pm - 3pm', fri: '11pm - 3pm', sat: '11pm - 6pm', sun: '11pm - 3pm'},
  offer: {offerDesc: 'BOGOF(50)', cost: 50},
  location: { lat: '54.968408', long: '-1.622741' }

})

venue1.save(function(err, venue) {
  if (err) console.log(err)
    console.log('venue1 Saved');
})

var venue2 = new Venue({
  name: 'Digital',
  openeingHours: {mon: '9pm - 6pm', tues: '11pm - 3pm', wed: 'CLOSED', thurs: 'CLOSED', fri: '11pm - 3pm', sat: '11pm - 6pm', sun: '11pm - 3pm'},
  offer: {offerDesc: 'Free Shot(30)', cost: 30},
  location: { lat: '54.967704', long: '-1.620528' }

})

venue2.save(function(err, venue) {
  if (err) console.log(err)
    console.log('venue2 Saved');
})

var venue3 = new Venue({
  name: 'Boulevard',
  openeingHours: {mon: 'CLOSED', tues: 'CLOSED', wed: 'CLOSED', thurs: 'CLOSED', fri: '11pm - 3pm', sat: '11pm - 6pm', sun: 'CLOSED'},
  offer: {offerDesc: 'Free Entry(30)', cost: 30},
  location: { lat: '54.970703', long: '-1.622844' }

})

venue3.save(function(err, venue) {
  if (err) console.log(err)
    console.log('venue3 Saved');
})


var user1 = new User({
  email: 'nj.wallace@outlook.com',
  userName: 'CrocoNiall',
  password: 'password',
  firstName: 'Niall',
  lastName: 'Wallace',
  DOB: 01/04/1992,
  

})

user1.save(function(err, user) {
  if (err) console.log(err)
    console.log('user1 Saved');
})

var user2 = new User({
  email: 'neil@wallace.com',
  userName: 'CrocoNeil',
  password: 'password',
  firstName: 'Neil',
  lastName: 'Wallace',
  DOB: 01/04/1992,
  

})

user2.save(function(err, user) {
  if (err) console.log(err)
    console.log('user2 Saved');
})


app.use(routes);

app.listen(3000);

