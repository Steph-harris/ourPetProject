$(document).ready(function(){
  $("#noZip").hide();
  $("#dscrptnBtn").hide();
  $("#noAnimal").hide();
  $("#breedSearchError").hide();
  $(".newSelect").select2({
    width : '60%',
    allowClear: true,
    placeholder: 'Any'
  });
  $(".optionSelect").select2({
    width : '21%',
  });

    var animal = $("#animal").val();

  $("#selectBreed").on("select2:opening", function(){
    var animal = $("#animal").val();
    if(animal === null){    
      $("#noAnimal").show().fadeOut(3500);
      $("#selectBreed").select2().trigger("select2:close");
    }; 
  });

  //on animal selection populate the breed list
  $("#animal").change(function(){
    var animal = $("#animal").val(); 

    $(".menu").empty();  
    
    breedChecker();   
  });

  $(".breedSearch").on("click", function(e) {
    e.preventDefault();
    var zipCode = $("#enterZip").val();

    if (zipCode === "" || zipCode.length !== 5){
      $("#noZip").show().fadeOut(3500);
      return;
    }
    searchByBreed();
  });

  function breedChecker(){   
    var animal = $("#animal").val();
    var petFAPI = "https://api.petfinder.com/breed.list?"
    var petFAPIParam = {
      key: "311acd0ca6ee16428a93eb5dafe77634",
      animal: animal,
      format: "json"
    }

    $.ajax({     
      type:"GET",
      url: petFAPI + $.param(petFAPIParam),
      dataType:"jsonp",
      success: function(response){
        var breeds = response.petfinder.breeds.breed;
        var optionAll = $("<option>").attr("value",[""]).text("Any");
          $(".menu").append(optionAll);

        for(i=0; i<breeds.length; i++){
          var lstItm = breeds[i]['$t'];
          var newDiv = $("<option>").attr("value",[lstItm]).text(lstItm);
          $(".menu").append(newDiv);
          //add class item to each and append to .menu
          function newList(lstItm){;
            var newDiv =("<div>").addClass("item")
              .text(lstItm);     
          }
        }
        return newDiv;
      }
    })
  };

  function searchByBreed(){   
    var animal = $("#animal").val();
    var breedVal = $("#selectBreed").val();
    var zipVal = $("#enterZip").val();
    var sexVal = $("#genderSelect").val();
    var ageVal = $("#ageSelect").val();
    var sizeVal = $("#sizeSelect").val();
    var photoRowPics = $(".img-responsive").length;
    var petFAPI = "https://api.petfinder.com/pet.find?"
    var petFAPIParam = {
      key: "311acd0ca6ee16428a93eb5dafe77634",
      animal: animal,
      breed: breedVal,
      sex: sexVal,
      size: sizeVal,
      age: ageVal,
      location: zipVal,
      count: 1,
      output: "full",
      format: "json",
    }

    $("#breedResult").empty();
    $(".photoRow").empty();
    $("#dscrptnBtn").show();

    $.ajax({     
      type:"GET",
      url: petFAPI + $.param(petFAPIParam),
      dataType:"jsonp",
      success: function(response){
        var newPetInfo = response.petfinder.pets.pet
        var newPetContact = response.petfinder.pets.pet.contact
        var petOptions = response.petfinder.pets.pet.options.option;
        //if there are no photos, code breaks and returns nothing
        var newPetPhoto = response.petfinder.pets.pet.media;
        var yourPet = $("<h2>Meet " + newPetInfo.name["$t"] + ", a size " + newPetInfo.size["$t"]+" " + newPetInfo.age["$t"] +" "+ newPetInfo.sex["$t"] + " from " + newPetContact.city["$t"] +", "+newPetContact.state["$t"] + "</h2>");
        var yourPetP = $("<p>").addClass("col-xs-12 col-md-10 col-md-offset-1").text(newPetInfo.description["$t"]);
        var yourPetContact = $("<h3>To adopt " + newPetInfo.name["$t"] + ", please call " + newPetContact.phone["$t"] +"</h3>").addClass("col-xs-12");

        $("#breedResult").prepend(yourPetP);
        $("#breedResult").prepend(yourPet);
        $("#breedResult").append(yourPetContact);

        if(jQuery.isEmptyObject(newPetPhoto)){
          console.log("No Pictures");
        } else{
          var petPhoto = newPetPhoto.photos.photo;

          for(i=0; i<petPhoto.length; i++){ 
            if(petPhoto[i]["@size"] === "pn"){            
              var newPetPic = $("<img>").attr("src", petPhoto[i]["$t"])
                .addClass("img-responsive");
              var newPetPicDiv = $("<div>").addClass("col-xs-6 col-md-4");

              newPetPicDiv.append(newPetPic);
              $(".photoRow").append(newPetPicDiv);
            }
          }
        }
        
        // change col class sizes based on how many images there are
        if($(".img-responsive").length === 1 || $(".img-responsive").length === 2){
          var newPetPicDiv = $("<div>")
            .addClass("col-xs-6 col-xs-offset-3 col-md-4 col-md-offset-4");

          newPetPicDiv.append(newPetPic);
          $(".photoRow").empty().append(newPetPicDiv);
        }; 

        for(i=0; i<petOptions.length; i++){
          var newPDiv = $("<div>").addClass("col-xs-6");
          var newPDiv2 = $("<div>").addClass("well well-sm");
          var newP = $("<h4>").text(petOptions[i]["$t"]);
          
          newPDiv2.append(newP);
          newPDiv.append(newPDiv2);
          $("#breedResult").append(newPDiv);
        };
      }
    });
  };
});

    