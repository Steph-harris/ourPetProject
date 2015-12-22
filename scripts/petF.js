$(document).ready(function(){
  $("#breedCheck").focus(function(){
    var petFAPI = "https://api.petfinder.com/breed.list?"
    var petFAPIParam = {
      key: "311acd0ca6ee16428a93eb5dafe77634",
      animal: "dog", //make a select button so user can choose this
      format: "json"
    }

    $.ajax({     
      type:"GET",
      url: petFAPI + $.param(petFAPIParam),
      success: function(response){
        var breeds = response.petfinder.breeds.breed;
        for(i=0; i<breeds.length; i++){
          console.log(breeds[i]['$t'])
        }
      }
    });
  });
});