angular.module('ClubCard.controllers', [])

.controller('HomeController', function($state ,$http) {
  var self = this

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

    }else{
      console.log('no currentUser')
    }
  }

})

.controller('ActivityController', function($http) {
  var self = this; 
  self.userActivity = {}
  self.userDetails = {}
  self.user = JSON.parse(localStorage.getItem('CCCUser'))
  getActvity()

  function getActvity(){
   $http
    .get('http://ec0f06fc.ngrok.io/users/' + self.user.userId )
    .then(function(response){
      self.userDetails = response.data.user
      self.userActivity = response.data.user.activity
      // console.log(self.userDetails)
      // console.log(self.userActivity)
      // console.log(response)
    });
  }

  self.getClass = function(transaction){
    return (transaction.action === 'charge') ? 'badge-assertive' : 'badge-calm'
  }

  self.getActvity = function(){
    $http
    .get('http://ec0f06fc.ngrok.io/users/' + self.user.userId )
    .then(function(response){
      self.userDetails = response.data.user
      self.userActivity = response.data.user.activity

    })
    }

})




.controller('NearController', function($http) {
  var self = this;
  self.venues = []

  $http
  .get('http://ec0f06fc.ngrok.io/venues' )
  .then(function(response){
    self.venues = response.data.venues
    console.log('populated venues')
    console.log(response)
    iterateOverMarkers()

  });

  var mapOptions = {
      zoom: 4,
      center: new google.maps.LatLng(25,80),
      mapTypeId: google.maps.MapTypeId.TERRAIN
  }

  self.map = new google.maps.Map(document.getElementById('map'), mapOptions);

  self.markers = [];
  
  var infoWindow = new google.maps.InfoWindow();
  
  var createMarker = function (info){
      
      var marker = new google.maps.Marker({
          map: self.map,
          position: new google.maps.LatLng(info.info.lat, info.info.long),
          title: info.name,
          offer: info.offer,
          hours: info.hours
      });
      console.log(marker)
      marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
      
      google.maps.event.addListener(marker, 'click', function(){

        var customMarker = '<h3>' + marker.title +' - '+ marker.offer.text + '</h3>' 
           customMarker += '<ul>' 
           customMarker += '<li> Monday: ' + marker.hours.mon + '</li>'
           customMarker += '<li> Tuesday: ' + marker.hours.tues + '</li>'
           customMarker += '<li> Wednesday: ' + marker.hours.wed + '</li>'
           customMarker += '<li> Thursday: ' + marker.hours.thurs + '</li>'
           customMarker += '<li> Friday: ' + marker.hours.fri + '</li>'
           customMarker += '<li> Saturday: ' + marker.hours.sat + '</li>'
           customMarker += '<li> Sunday: ' + marker.hours.sun + '</li>'
           customMarker += '</ul>' 

          infoWindow.setContent(customMarker);
          infoWindow.open(self.map, marker);
      });
      console.log(marker)
      self.markers.push(marker);
      
  }  

  var iterateOverMarkers = function(){
  
  for (i = 0; i < self.venues.length; i++){
    console.log('for loop')
      var venueObj = {
        info: {lat: self.venues[i].location.lat, long: self.venues[i].location.long},
        name: self.venues[i].name,
        hours: self.venues[i].openeingHours,
        offer: { text: self.venues[i].offer.offerDesc, cost: self.venues[i].offer.cost }
      }

      createMarker(venueObj);
    }
  }

  self.openInfoWindow = function(e, selectedMarker){

      e.preventDefault();
      google.maps.event.trigger(selectedMarker, 'click');
  }

});
