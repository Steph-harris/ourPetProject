$(document).ready(function(){
  var dateYr = new Date();

  document.querySelector("#copyBtm").innerHTML = "<h4>© "+dateYr.getFullYear()+"</h4><h4><a href='https://stephs-portfolio.herokuapp.com' target='_blank'> Stephanie Harris</a></h4>";
  // $("#copyBtm").text();
//   var startPos;
//   var geoSuccess = function(position) {
//     startPos = position;
//     document.getElementById('startLat').innerHTML = startPos.coords.latitude;
//     document.getElementById('startLon').innerHTML = startPos.coords.longitude;
//   };
//   navigator.geolocation.getCurrentPosition(geoSuccess);
// };

//   navigator.geolocation.getCurrentPosition(success);

// function success(position) {
//      var lat = position.coords.latitude;
//      var long = position.coords.longitude;

//      console.log(lat + "," + long);
// }

//   function initMap() {
//   var map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: -34.397, lng: 150.644},
//     zoom: 6
//   });
//   var infoWindow = new google.maps.InfoWindow({map: map});

//   // Try HTML5 geolocation.
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       };

//       infoWindow.setPosition(pos);
//       infoWindow.setContent('Location found.');
//       map.setCenter(pos);
//     }, function() {
//       handleLocationError(true, infoWindow, map.getCenter());
//     });
//   } else {
//     // Browser doesn't support Geolocation
//     handleLocationError(false, infoWindow, map.getCenter());
//   }
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(browserHasGeolocation ?
//                         'Error: The Geolocation service failed.' :
//                         'Error: Your browser doesn\'t support geolocation.');
// }
});

// key:AIzaSyDTguX07H3EnUy9qDGO4NfK-yto3gpMtMk
