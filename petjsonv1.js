
$(document).ready(function () 
{
    $.getJSON('https://api.petfinder.com/pet.find?key=311acd0ca6ee16428a93eb5dafe77634&animal=dog&breed=Beauceron&location=08536&output=basic&format=json&callback=?')
        .success
            (function(petApiData) 
                { 
                    alert('Data retrieved!'); 
                    console.log(petApiData); 
                }
            )
        .error
            (function(err) 
                { alert('Error retrieving data!'); 
                }
            );   
});


