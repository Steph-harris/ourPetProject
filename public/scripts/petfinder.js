$(document).ready(function(){
  const BASE_URL = "https://api.petfinder.com";
  const CORS_URL = "https://cors-anywhere.herokuapp.com/";
  let BEARER, BEARER_TIMEOUT;

  initPage();

  async function initPage(){
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

    if (typeof(Storage) !== "undefined") {
      // Code for localStorage/sessionStorage.
      console.log("Local storage is enabled");
      LOCAL_STORAGE = true
    } else {
      // Sorry! No Web Storage support..
      console.log("Local storage is not enabled");
      LOCAL_STORAGE = false
    }

    await getBearer();
    await getAnimalTypes();
  }

  async function getBearer(){
    const request = await $.get("/bearer");
    let response = JSON.parse(request.data);
    BEARER = response.access_token;
    BEARER_TIMEOUT = response.expires_in;

    console.log("Bearer token set");
  }

  async function tryPFRequest(request, data=null){
    try {
      const result = await $.get(request, data);
      return result;
    } catch(err){
      // if request returns a 401, get a new Bearer and retry
      console.log(err);
      await getBearer();

      try {
        const result = await $.get(request, data);
        return result;
      } catch(err){
        throw err;
      }
    }
  }

  async function getAnimalTypes(){
    let path = '/v2/types';
    let data = createRequestData(path);
    let animals = await tryPFRequest(data);
    animals = animals.types;

    // set these as animalS dropdown
    for(let i=0; i<animals.length; i++){
      let animal = animals[i];
      let newDiv = $("<option>")
        .attr("value", animal.name)
        .text(animal.name);
      $(".animalS").append(newDiv);

      // store animal in local storage
      if (LOCAL_STORAGE){
        localStorage.setItem(animal.name, JSON.stringify(animal));
      }
    }
  }

  async function getBreeds(){
    let animal = $("#animal").val();
    let breed_path = `/v2/types/${animal}/breeds`;
    let data = createRequestData(breed_path);
    let request = await tryPFRequest(data);
    let response = request.breeds;
    let breedDefault = '<option value="" disabled="disabled" selected="selected"></option>';

    $("#selectBreed").append(breedDefault);

    for(let i=0; i<response.length; i++){
      let breedsOption = $("<option>")
        .attr("value", response[i].name)
        .text(response[i].name);
      $("#selectBreed").append(breedsOption);
    }
  }

  async function getAnimals(data, params){
    let response = await tryPFRequest(data, params);
    let animals = response.animals;
    let pages = response.pagination;

    console.log(animals);
    console.log(pages);
    animals.forEach(buildThumbnail);

    // destroy current nxtBtn if it exists
    if ($("#nextBtn")){
      $("#nextBtn").parent().parent().remove();
    }

    //make button with href of next
    if (pages.current_page != pages.total_pages){
      let nextLink = pages['_links']['next']['href'];
      let nextBtn = `<div class="row">
          <div class="col-xs-4 col-xs-offset-4 col-sm-2 col-sm-offset-5">
            <button class="btn btn-info" id="nextBtn" type="button" data-link="${nextLink}">
              More Results
            </button>
          </div>
        </div>`;

      //button on click gets the link
      $("#petResults").append(nextBtn);
    }
  }

  function createRequestData(path){
    return {
      url: CORS_URL + BASE_URL + path,
      headers: { Authorization: "Bearer " + BEARER }
    }
  }

  function setAnimalOptions(){
    let animal_val = $("#animal").val();

    if(LOCAL_STORAGE){
      var animal = JSON.parse(localStorage.getItem(animal_val));
    } else {
      // go get the animal
      var animal = JSON.parse(localStorage.getItem(animal_val));
    }

    let coats = animal.coats;
    let colors = animal.colors;
    let genders = animal.genders;
    let sexDefault = '<option value="" disabled="disabled" selected="selected"></option>';
    $("#genderSelect").empty();
    $("#genderSelect").append(sexDefault);

    for(let i=0; i<genders.length; i++){
      let genderOption = $("<option>")
        .attr("value", genders[i].toLowerCase())
        .text(genders[i]);
      $("#genderSelect").append(genderOption);
    }
  }

  function setSearchParams(){
    return {
      type: $("#animal").val(),
      breed: $("#selectBreed").val(),
      gender: $("#genderSelect").val(),
      size: $("#sizeSelect").val(),
      age: $("#ageSelect").val(),
      location: $("#enterZip").val(),
      good_with_children: $("input[name='goodchildren']").prop('checked'),
      good_with_dogs: $("input[name='gooddogs']").prop('checked'),
      good_with_cats: $("input[name='goodcats']").prop('checked'),
      output: "full",
      format: "json",
      sort: $("#sortBy").val(),
      status: "adoptable"
    }
  }

  function searchByBreed(){
    let animal_path = `/v2/animals`;
    let data = createRequestData(animal_path);
    let params = setSearchParams();

    // Remove null key->value pairs from param list
    Object.keys(params).forEach((key) =>
        (params[key] == null) && delete params[key]);

    $("#petResults").empty();
    $(".photoRow").empty();
    $("#dscrptnBtn").show();

    getAnimals(data, params);
  }

  function buildThumbnail(animal){
    let photos = [];
    let published = new Date(animal.status_changed_at);
    let pf_link = `<a href = '${animal.url}' target='_blank'">See full description</a>`;
    let phone = animal.contact.phone;
    let email = animal.contact.email;
    let pet_attrs = {...animal.attributes, ...animal.environment};

    // get each photo in a list
    for (let i = 0; i < animal.photos.length; i++) {
      photos.push(animal.photos[i]['medium']);
    }

    let thumbnail = `<div class = "col-sm-6 col-md-4 col-xl-3">
        <!--Need a default picture-->
      <div class = "thumbnail" data-animal-id = ${animal.id}>
        <div>
          <div class="thumbpicDiv">
             <img class="thumbpic" src = ${photos[0]} alt = ${animal.description}>
          </div>
          <div class="thumbpicBody">
             <h4>${animal.name} (${animal.gender[0]})</h4>
             <p>${animal.age} - ${animal.size} - ${animal.breeds.primary}</p>
             <p>${parseInt(Math.round(animal.distance))} miles away</p>
             <p>Updated: ${published.toLocaleString()}</p>
          </div>
        </div>
        <div class="moreContent">
          <h4>${animal.name}</h4>
          <p>${animal.description} (${pf_link})</p>
          <p>${phone ? phone : '<i>No PhoneNumber Provided</i>'}</p>
          <p>${email ? email : '<i>No Email Provided</i>'}</p>
          <p>${animal.contact.address.city}, ${animal.contact.address.state} ${animal.contact.address.postcode}</p>
          <div id="options_${animal.id}">
          
          </div>
        </div>  
      </div>
   </div>`

    $("#petResults").append(thumbnail);
    $(".moreContent").hide();

    // set options
    for (let [key, value] of Object.entries(pet_attrs)) {
      if (value == true){
        let pet_attr = `<div class="col-xs-6 well well-sm">
                        <h4>${key}</h4>
                     </div>`;

        $(`#options_${animal.id}`).append(pet_attr);
      }
    };
  }

  // SETUP EVENT LISTENERS
  $("#selectBreed").on("select2:opening", function(){
    let animal = $("#animal").val();
    if(animal === null){
      $("#noAnimal").show().fadeOut(3500);
      $("#selectBreed").select2().trigger("select2:close");
    };
  });

  //on animal selection populate the breed list
  $("#animal").change(async function(){
    let animal = $("#animal").val();

    $(".menu").empty();
    $("#select2-selectBreed-container").empty();

    await getBreeds();
    setAnimalOptions();
  });

  $(document).on("click", ".breedSearch", function(e){
    e.preventDefault();
    let zipCode = $("#enterZip").val();

    if (zipCode === "" || zipCode.length !== 5){
      $("#noZip").show().fadeOut(3500);
      return;
    }
    searchByBreed();
  });

  $(document).on("click", "#nextBtn", async function(){
    let link = $(this).data('link');
    let data = createRequestData(link);

    await getAnimals(data, null);
  });

  $(document).on("click", ".thumbnail", function(){
    $(this).children('div').toggle();
  });
});
