$(document).ready(function(){
  //code for making wiki call for animal breed (need to get breed from specific pet petfinder object)
  $(".breed").on("click", function() {
    var breedInfo = $("#breedCheck").val();
    var url="http://en.wikipedia.org/w/api.php?action=parse&format=json&page=" + breedInfo +"&redirects&prop=text&callback=?";
    debugger;
    $(".infoBox").empty();

    $.getJSON(url,function(data){
      wikiHTML = data.parse.text["*"];
      $wikiDOM = $("<p>"+wikiHTML+"</p>");
      $(".infoBox").append($wikiDOM);
    });
  });
  // $.ajax({
  //   type:"GET",
  //   url: 
  //   success: {}
  //   error: 
  // });
});