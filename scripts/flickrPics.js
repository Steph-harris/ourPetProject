$(document).ready(function(){
  var flickrApiUrl = "https://crossorigin.me/https://api.flickr.com/services/rest/?";
  var flickrApiParams = {
    api_key: "53f3ad616d891ed27a09c64d67ff8ec5",
    text: "dog",
    per_page: 5,
    method: "flickr.photos.search",
    format: "json",
    nojsoncallback: 1,
  }
      
  $.ajax({
    type: "GET",
    url: flickrApiUrl + $.param(flickrApiParams),
    success: function(response){
      var flickrPetPics = response.photos.photo
      for(i=0; i<flickrPetPics.length; i++)
      {
        console.log(flickrPetPics[i].id);
      }
    }
  });

  // var flickPicUrl = "https://farm" + photoInfo.farm + ".staticflickr.com/"
  // flickPicUrl += photoInfo.server + "/" + photoInfo.id + "_" + photoInfo.secret
  // flickPicUrl += "_m.jpg"
  $.ajax();
});
