angular.module('ClubCard.controllers', [])



.controller('HomeController', function($state ,$http) {
  var self = this

  this.name = 'Niallio'
  this.qrValue = 'testing'
  self.username = ''
  self.currentUser = {}

  self.login = function(){
     $http
      .get('http://ec0f06fc.ngrok.io/users/login/' + self.username)
      .then(function(response){

        self.currentUser.userName = response.data.user[0].userName
        self.currentUser.userId = response.data.user[0]._id
        localStorage.setItem('CCCUser', JSON.stringify(self.currentUser))
        $state.go('tab.home');
      });

  }
  self.checkCCCUser = function(){
    console.log('checking user')

    console.log(localStorage.getItem('CCCUser'))
    var user = JSON.parse(localStorage.getItem('CCCUser'))
    if(user != null){
      console.log('there is a user')
      self.currentUser = JSON.parse(localStorage.getItem('CCCUser'))
      $state.go('tab.home')

    } else {
      console.log('no currentUser')
    }

  }

})

.controller('ActivityController', function($http) {
  var self = this; 
  self.userActivity = {}
  self.userDetails = {}
  self.user = JSON.parse(localStorage.getItem('CCCUser'))

     $http
      .get('http://ec0f06fc.ngrok.io/users/' + self.user.userId )
      .then(function(response){
        self.userDetails = response.data.user
        self.userActivity = response.data.user.activity
        console.log(self.userDetails)
      });




})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('NearController', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
