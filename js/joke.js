function get_joke() {
	var url = "https://localhost/sivraj/jokes.php";

	$.ajax({
		url: url,
		data: {},
		dataType: 'jsonp',
		success: function(result) {
			$('.joke').text(result['value']['joke']);
		},
		error: function(result) {
			var joke_object = jQuery.parseJSON(result['responseText']);
			$('.joke').html(joke_object['value']['joke']);		
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