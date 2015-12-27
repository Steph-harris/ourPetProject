$(document).ready(function(){
  $("#noAnimal").hide();
  $("#noZip").hide();

  $('.selectpicker').selectpicker();

  $('.selectpicker').selectpicker({
      style: 'btn-info',
      size: 4
  });

  $("#clickMe").on("click", function(){
    var animal = $("#animal2").val();

    if(animal === null){
      $("#noAnimal").show().fadeOut(3500);
      return;
    } 
  })
  //on animal2 selection populate the breed list
  //animal alert needs 2 event listeners: one for search button, and one for breed button
  $("#animal2").change(function(){
    var animal = $("#animal2").val(); 

    $(".menu").empty();  
    
    breedChecker();   
  });

  function breedChecker(){   
    var animal = $("#animal2").val();
    var petFAPI = "https://crossorigin.me/https://api.petfinder.com/breed.list?"
    var petFAPIParam = {
      key: "311acd0ca6ee16428a93eb5dafe77634",
      animal: animal,
      format: "json"
    }

    $.ajax({     
      type:"GET",
      url: petFAPI + $.param(petFAPIParam),
      success: function(response){
        var breeds = response.petfinder.breeds.breed;
        for(i=0; i<breeds.length; i++){
          var lstItm = breeds[i]['$t'];
          var newDiv = $("<option>").attr("value",[lstItm]).text(lstItm);
        $(".menu").append(newDiv);
          //add class item to each and append to .menu
          function newList(lstItm){;
            var newDiv =("<div>").addClass("item")
              .text(lstItm);
            $(".menu").append(newDiv);       
          }
        }
        return newDiv;
      }
    })
  };
});

    