$(document).ready(function(){
  $('#clickMe').on("click",function(){debugger;
    //4 different outcomes(one for blank, and 3 for the animal types)
    var animal = $("#animal option:selected").text()
    if(animal === "Choose an animal"){
      alert("please choose an animal first");
      return;
    } 
    else if (animal === "Dog"){
      for(var i=0; i<window.pets.dog.length; i++){
        var newDiv = $("<option>").attr("value",[i+1]).text(window.pets.dog[i]["$t"]);
        $(".menu").append(newDiv);
      } 
    }  
    else if (animal === "Rabbit"){
      for(var i=0; i<window.pets.rabbit.length; i++){
        var newDiv = $("<option>").attr("value",[i+1]).text(window.pets.rabbit[i]["$t"]);
        $(".menu").append(newDiv);
      } 
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