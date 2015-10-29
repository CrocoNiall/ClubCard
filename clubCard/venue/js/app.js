$( document ).ready(function() {
    console.log( "App.js ready!" );

    getConfigDetails();
    setEventListeners();
    if(!localStorage.getItem('CCVMVid')) {
      toggleSlide()
      $('#configOuterContainer').slideDown()
    } else {
      getCurrentVenueObj()
    }

});

var capture = $('#captureOuterContainer')
var config = $('#configOuterContainer')
var dash = $('#dashboardOuterContainer')
var currentVenue = ''
var venueObj = {}
var coordinates = []

function getCurrentVenueObj(){

  $.ajax({
  url: "http://localhost:3000/venues/" + localStorage.getItem('CCVMVid'),
  context: document.body
  }).done(function(response) {
    venueObj = response
    console.log(venueObj)
    $('#currentVenueName').html(response.venue.name)
    $('#activity').html('')
    for(i=0; i< response.venue.activity.length; i++){
      user = response.venue.activity[i]
      $('#activity').append('<span>' + user.action + ' || ' + user.name + '</span><br>' + user.dateTime + '<br><br>')
    }
  });


}


function getConfigDetails(){
  var venueSelect = $('#venueSelect')
  $.ajax({
  url: "http://localhost:3000/venues",
  context: document.body
  }).done(function(response) {

    for(i=0; i < response.venues.length; i++){
      element = '<option value=' + response.venues[i]._id + '>' + response.venues[i].name + '</option>'
      venueSelect.prepend(element)

    }
  });

}

function setEventListeners(){
  $('#venueSelect').on('change', function(){
    currentVenue = this.value
    updateVenueSelection(this.value)
  })

  $('.venueLi').on('click', function(){
    toggleSlide(this.dataset.page)
    getCurrentVenueObj()
  })

}

function updateVenueSelection(id){
  $.ajax({
  url: "http://localhost:3000/venues/" + id,
  context: document.body
  }).done(function(response) {
    console.log(response)

    storeCurrentVenue(response.venue._id)
      $('#venueId').html(response.venue._id)
      $('#venueName').html(response.venue.name)
      $('#hours').html('Hours: ')
      $('#mon').html('Mon ' +response.venue.openeingHours.mon)
      $('#tue').html('Tue ' +response.venue.openeingHours.tues)
      $('#wed').html('Wed ' +response.venue.openeingHours.wed)
      $('#thurs').html('Thu ' +response.venue.openeingHours.thurs)
      $('#fri').html('Fri ' +response.venue.openeingHours.fri)
      $('#sat').html('Sat ' +response.venue.openeingHours.sat)
      $('#sun').html('Sun ' +response.venue.openeingHours.sun)

      coordinates = [parseFloat(response.venue.location.lat), parseFloat(response.venue.location.long)]
      venueName = response.venue.name
      console.log(coordinates)
    
  });
}


function storeCurrentVenue(id){
  localStorage.setItem('CCVMVid', id)
  currentVenue = id
}

function toggleSlide(div){

  capture.slideUp()
  config.slideUp()
  dash.slideUp()
  if(div){
    $('#'+div).slideDown()
  }
  initMap()
}

function initMap() {
  id = localStorage.getItem('CCVMVid')
    $.ajax({
  url: "http://localhost:3000/venues/" + id ,
  context: document.body
  }).done(function(response) {

      var myLatLng = {lat: parseFloat(response.venue.location.lat), lng: parseFloat(response.venue.location.long)};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: myLatLng
      });

      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'myLatLng'
      });
  });
    }
