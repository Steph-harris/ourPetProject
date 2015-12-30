$(document).ready(function(){
  var flickrApiUrl = "https://crossorigin.me/https://api.flickr.com/services/rest/?";
  var flickrApiParams = {
    api_key: "53f3ad616d891ed27a09c64d67ff8ec5",
    text: $("selectBreed").text() || "pets",
    per_page: 25,
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
        
        //debugger;       
        $('.item').first().addClass('active');
        $(".flickrItem").append(newSlide);
      }
    }
  });

  function makeFlickrCarousel(photoInfo){
    var flickPicUrl = "https://farm" + photoInfo.farm + ".staticflickr.com/"
    flickPicUrl += photoInfo.server + "/" + photoInfo.id + "_" + photoInfo.secret
    flickPicUrl += ".jpg";

    //Build carousel pieces
    var newItem = $("<a>").addClass("item")
    var flickrImg = $("<img>").attr("src", flickPicUrl)

    newItem.append(flickrImg)

    return newItem;
  }
});

//Petfinder info: 
//API Key
// e8128b543b65df38c67f40a9935f53fb
// API Secret
// 6e90af750530db275a45e35bdcb4e317
