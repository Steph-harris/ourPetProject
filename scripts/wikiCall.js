$(document).ready(function(){
  //code for making wiki call for animal breed 
  //(need to get breed data from specific pet petfinder object and set the wiki call as part of the success function)
  $(".breed").on("click", function() {
    var breedInfo = $("#breedCheck").text();
    var wikipediaUrl = "https://crossorigin.me/https://en.wikipedia.org/w/api.php?action=opensearch&";
      wikipediaUrl += "search="+ breedInfo + "&format=json";
        
    $.ajax({
      type:"GET",
      url:wikipediaUrl,
       success: function (response){
       $("#wikiInfo").html(response[2][0]);
      }
    });
  });
});
