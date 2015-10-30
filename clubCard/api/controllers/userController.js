var User = require('../models/User.js')

// GET
function getAll(request, response) {
  User.find(function(error, users) {
    if(error) response.json({message: 'Could not find any users'});

    response.json({users: users});
  }).select('-__v');
}


// POST CREATE USER
function createUser(request, response) {
  console.log('in POST');
  console.log('body:', request.body);

  var user = new User(request.body);
  user.save(function(error) {
    if(error) response.json({messsage: 'Could not ceate user b/c:' + error});

    response.json({user: user});
  });
}

//GET USER
function getUser(request, response) {
  var id = request.params.id;

  User.findById({_id: id}, function(error, user) {
    if(error) response.json({message: 'Could not find user b/c:' + error});

    response.json({user: user});
  }).select('-__v');
}

function getUserByUsername(request, response) {
  var paramsUsername = request.params.username;

  User.find({userName: paramsUsername}, function(error, user) {
    if(error) response.json({message: 'Could not find user b/c:' + error});

    response.json({user: user});
  }).select('-__v');
}
//DELETE USER
function removeUser(request, response) {
  var id = request.params.id;

  User.remove({_id: id}, function(error) {
    if(error) response.json({message: 'Could not delete user b/c:' + error});

    response.json({message: 'user successfully deleted'});
  }).select('-__v');
}


module.exports = {
  getAll: getAll,
  createUser: createUser,
  getUser: getUser,
  removeUser: removeUser,
  getUserByUsername: getUserByUsername

}