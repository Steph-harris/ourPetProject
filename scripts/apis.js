$(document).ready(function() {

	$(document).on("click", ".btn waves-effect waves-light", function() {
		$.ajax({
			url: 'https://maps.googleapis.com/maps/api/place/textsearch/json?parameters',
			type: 'default GET (Other values: POST)',
			dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
			data: {param1: 'value1'},
		})
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	});
// $ function initAutocomplete()	{
// 	var map = new google.maps.Maps(document)
// 	center: {lat:-33.8688, lng: 151.2195},
// 	zoom: 13,
// 	mapTypeId: google.maps.mapTypeId.
});




