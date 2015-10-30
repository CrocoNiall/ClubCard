var self = this;
var offerButton = $('#creditNotification')
var captureIndicator = $('#captureIndicator')

$('#qr-canvas').WebCodeCam({
  ReadQRCode: true, 
  ReadBarecode: true, 
  width: 600,
  height: 450,
  videoSource: {  
          id: true,  
          maxWidth: 800, 
          maxHeight: 650 
  },
  flipVertical: false,  
  flipHorizontal: false, 
  zoom: -1, 
  beep: "js/beep.mp3", 
  autoBrightnessValue: false, 
  brightness: 0, 
  grayScale: true, 
  contrast: 0, 
  threshold: 0, 
  sharpness: [], 

  resultFunction: function(resText, lastImageSrc) {

    //GOOD SCAN - GET CURRENT USER FROM LOCAL STORAGE
    //          - CREDIT ACCOUNT
    //          - CAPTURE ALERT(GREEN)
  var currentVenueId = localStorage.getItem('CCVMVid')
  creditAccount(resText, currentVenueId)
  captureAlert('green')

  },
  getUserMediaError: function() {

  },
  cameraError: function(error) {
    //BAD SCAN - CAPTURE ALERT(RED)
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



