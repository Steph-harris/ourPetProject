
$(document).ready(function () 
{
    $.getJSON('https://api.petfinder.com/pet.find?key=311acd0ca6ee16428a93eb5dafe77634&animal=dog&breed=Beauceron&location=08536&output=basic&format=json&callback=?')
        .success
            (function(petApiData) 
                { 
                    alert('Data retrieved!'); 
                    $.each(petAPIData, function(index, element) {
                        $('body'),append($('<div>', {
                            text: element.name
                        }))
                    }) 
                }
            )
        .error
            (function(err) 
                { alert('Error retrieving data!'); 
                }
            );   
});


