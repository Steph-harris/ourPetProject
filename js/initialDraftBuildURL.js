
$(document).ready(function(){

		var createRequestURL = function ( callback ) {

		// Setup basic request in JSON format
		var url = 'http://api.petfinder.com/pet.find?&output=full&format=json';
		var options = '';

		// Add options
		url += '&key=311acd0ca6ee16428a93eb5dafe77634'; // API Key
		url += '&id=' + settings.shelter; 
		url += '&count=' + parseInt(settings.count, 20); 	
		
		if ( callback ) {
			options += '&callback=' + callback;
		}

		return url + options;

	};

	));
