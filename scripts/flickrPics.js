$(document).ready(function(){
  var flickrApiUrl = "https://crossorigin.me/https://api.flickr.com/services/rest/?";
  var flickrApiParams = {
    api_key: "53f3ad616d891ed27a09c64d67ff8ec5",
    text: $("breedCheck").val() || "dog",
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
      for(i=0; i<flickrPetPics.length; i++){
        var newSlide = makeFlickrCarousel(flickrPetPics[i]);
               
        $('.carousel-item').first().addClass('active');
        $('#flickrPic').carousel();
        $("#flickrPic").append(newSlide);
      }
    }
  });

  function makeFlickrCarousel(photoInfo){
    var flickPicUrl = "https://farm" + photoInfo.farm + ".staticflickr.com/"
    flickPicUrl += photoInfo.server + "/" + photoInfo.id + "_" + photoInfo.secret
    flickPicUrl += "_q.jpg";

    //Build carousel pieces
    var newItem = $("<a>").addClass("carousel-item")
    var flickrImg = $("<img>").attr("src", flickPicUrl)

    newItem.append(flickrImg)

    return newItem;
  }
});
