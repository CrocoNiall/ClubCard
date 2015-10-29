var self = this;
var offerButton = $('#creditNotification')
var captureIndicator = $('#captureIndicator')

$('#qr-canvas').WebCodeCam({
  ReadQRCode: true, // false or true
  ReadBarecode: true, // false or true
  width: 600,
  height: 450,
  videoSource: {  
          id: true,      //default Videosource
          maxWidth: 800, //max Videosource resolution width
          maxHeight: 650 //max Videosource resolution height
  },
  flipVertical: false,  // false or true
  flipHorizontal: false,  // false or true
  zoom: -1, // if zoom = -1, auto zoom for optimal resolution else int
  beep: "js/beep.mp3", // string, audio file location
  autoBrightnessValue: false, // functional when value autoBrightnessValue is int
  brightness: 0, // int 
  grayScale: true, // false or true
  contrast: 0, // int 
  threshold: 0, // int 
  sharpness: [], //or matrix, example for sharpness ->  [0, -1, 0, -1, 5, -1, 0, -1, 0]

  resultFunction: function(resText, lastImageSrc) {
  // alert(resText);
  // '5631f87ef88a34814459dccd'
  var currentVenueId = localStorage.getItem('CCVMVid')
  console.log(localStorage.getItem('CCVMVid'))
  self.creditAccount(resText, currentVenueId)
  captureAlert('green')
  },
  getUserMediaError: function() {

  },
  cameraError: function(error) {
  captureAlert('red')
  }
});


function creditAccount(userId, venueId){
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/venues/" + venueId + "/users/" + userId,
    data: { credit: 10, action: 'credit'}
  })
  .done(function( response ) {
    self.lookupBalance(userId, venueId)
  });
}

function lookupBalance(userId, venueId){
  console.log('looking up balance ....')
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/query_credit/venues/" + venueId + "/users/" + userId,
  })
  .done(function( response ) {
    // console.log(response.sufficiantCredit)
    if (response.sufficiantCredit === true) { 
        console.log('user has enought points')
        offerButton.slideDown()
        offerButton.on('click', function(){
            self.claimOffer(userId, venueId, response.points)
        })
    }
  });
}

function claimOffer(userId, venueId, points){
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/venues/" + venueId + "/users/" + userId,
    data: { credit: points, action: 'charge'}
  })
    .done(function( response ) {
      console.log('user has been charged')
      offerButton.slideUp()
  });
}

function captureAlert(color){
  captureIndicator.css({'background-color': color})
  setTimeout(function(){ 
    captureIndicator.css({'background-color': 'black'})
  }, 200);

}



