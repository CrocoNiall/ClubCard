var mongoose    = require('mongoose');
var UserSchema   = mongoose.Schema({
  email: String,
  userName: String, 
  password: String, 
  firstName: String, 
  lastName: String,
  DOB: Date, 
  activity: [],
  credit: {type: Number, default: 0}

});

module.exports = mongoose.model('User', UserSchema);