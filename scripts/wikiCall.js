$(document).ready(function(){
  //code for making wiki call for animal breed 
  //(need to get breed data from specific pet petfinder object and set the wiki call as part of the success function)
  $(".breed").on("click", function() {
     var breedInfo = $("#breedCheck").val();
    // var url="http://en.wikipedia.org/w/api.php?action=parse&format=json&page=" + breedInfo +"&redirects&prop=text&callback=?";
    
    // //https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json
    // debugger;
    //$(".infoBox").empty();
    $("#wikiInfo").empty();

    // $.getJSON(url,function(data){
    //   wikiHTML = data.parse.text["*"];
    //   $wikiDOM = $("<p>"+wikiHTML+"</p>");
    //   $(".infoBox").append($wikiDOM);

    $.getJSON('http://en.wikipedia.org/w/api.php?action=parse&page=' + breedInfo +'&prop=text&format=json&callback=?', function(json) { 
      $("#wikiInfo").html(json.parse.text["*"]); 
      $("#wikiInfo").find("a:not(.references a)").attr("href", function(){ return "http://www.wikipedia.org" + $(this).attr("href");}); 
      $("#wikiInfo").find("a").attr("target", "_blank"); 
    });
  });
});
