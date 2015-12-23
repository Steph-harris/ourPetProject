$(document).ready(function(){
  //initialize semantic dropdown
  $('.ui.dropdown').dropdown();
  $('.here').on("click",function(){
    for(var i=0; i<window.pets.length; i++){
      var newDiv = $("<option>").text(window.pets[i]["$t"]);
      $(".menu").append(newDiv);
    } 
  });


  $("#breedCheck").focus(function(){
    var petFAPI = "https://api.petfinder.com/breed.list?"
    var petFAPIParam = {
      key: "311acd0ca6ee16428a93eb5dafe77634",
      animal: "dog", //make a select button so user can choose this
      format: "json"
    }

    // 
  });
});

    //$.ajax({     
    //   type:"GET",
    //   url: petFAPI + $.param(petFAPIParam),
    //   success: function(response){
    //     var breeds = response.petfinder.breeds.breed;
    //     for(i=0; i<breeds.length; i++){
    //       var lstItm = breeds[i]['$t'];
    //       //add class item to each and append to .menu
    //       function newList(lstItm){debugger;
    //         var newDiv =("<div>").addClass("item")
    //           .text(lstItm);
    //         $(".menu").append(newDiv);

    //         return newDiv;
    //       }

    //     }
    //   }
    // });