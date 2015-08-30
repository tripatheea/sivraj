var joke_callback = function(result) {
	console.log(result);
}

function get_joke() {
	var url = "http://tambal.azurewebsites.net/joke/random";

	// $.get( url, {} ).done(function(result) {
	// 		console.log(result);
	// 		$('.joke').text(result['joke']);
	// 	});
		


		// );


	$.ajax({
		url: url,
		dataType: 'JSONP',
		jsonpCallback: 'callback',
		type: 'GET',
		jsonp: 'jsonp',
		success: function(result) {
			console.log(result);
			// $('.joke').text(result['joke']);
		}
	});	
}

$(document).ready(function() {
	
	get_joke();

	setInterval(function() {
		get_joke();
	}, 600000);	// 10 minutes
});


function get_joke_for_speech() {
	return $('.joke').text();
}