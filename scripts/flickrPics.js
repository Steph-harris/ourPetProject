$(document).ready(function(){
  var flickrApiUrl = "https://api.flickr.com/services/rest/?";
  var flickrApiParams = {
    api_key: "53f3ad616d891ed27a09c64d67ff8ec5",
    per_page: 5,
    method: "flickr.photos.search",
    format: "json",
    nojsoncallback: 1,
  }
      
  $.ajax({
    type: "GET",
    url: flickrApiUrl + $.param(flickrApiParams),
    success: flickrSuccess(){
      alert("grabbed")
    }
  });
});