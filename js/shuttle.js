function get_shuttle_prediction() {
	
	var d = new Date();
	var hours = d.getHours();
	var day = d.getDay();

	if ((hours <= 23 && hours >= 18) || (hours <= 3 && hours >= 0)) {
		// var shuttle = "saferidebostone";	// 'saferidebostone' for Saferide, Boston East. 'boston' for Boston Daytime.
		var shuttle = "saferidebostonall";
		var stop = "silb";
	}
	else if ((hours >= 8 && hours <= 17) && (day >= 1 && day <= 5)) {
		var shuttle = "boston";	// 'saferidebostone' for Saferide, Boston East. 'boston' for Boston Daytime.
		var stop = "commsher";
	}



	if (typeof shuttle != 'undefined') {

		var url = "https://m.mit.edu/apis/shuttles/predictions/?agency=mit&stops=" + shuttle + "," + stop;

		$.ajax({
			url: url,
			data: {},
			dataType: 'jsonp',
			success: function(result) {
				// console.log(result);
				if (result[0]['predictions'].length != 0) {
					$('.map').css('display', 'block');
					update_prediction(result);
				}
				else {
					$('.eta').text('N/A');
					$('.map').css('display', 'none');
				}
			}
		});
	}
}


function update_prediction(result) {

	var predictions = result[0]['predictions'];

	var d1 = new Date(predictions[0]['timestamp'] * 1000);
	var eta_first = ('0' + d1.getHours()).slice(-2) + ':' + ('0' + d1.getMinutes()).slice(-2);

	$('.eta').text(eta_first);
}


$(document).ready(function() {
	get_shuttle_prediction();

	// Update Time.
	setInterval(function() {
		get_shuttle_prediction();;
	}, 10000);
});

function get_shuttle_prediction_for_speech() {
	return $('.eta').text();
}




// console.log(set_if_the_shuttle_is_running());


function set_if_the_shuttle_is_running(shuttle) {
	if (shuttle.toLowerCase() == "boston all") {
		shuttle_code = "saferidebostonall";
	}
	else if (shuttle.toLowerCase() == "tech shuttle") {
		shuttle_code = "tech";
	}
	else if (shuttle.toLowerCase() == "campus shuttle") {
		shuttle_code = "saferidecampshut";
	}
	else if (shuttle.toLowerCase() == "boston west") {
		shuttle_code = "saferidebostonw";
	}
	else if (shuttle.toLowerCase() == "cambridge all") {
		shuttle_code = "saferidecamball";
	}
	else if (shuttle.toLowerCase() == "campus shuttle") {
		shuttle_code = "saferidecampshut";
	}
	else if (shuttle.toLowerCase() == "Boston All") {
		shuttle_code = "saferidebostonall";
	}
	else {
		shuttle_code = "saferidebostone";
	}

	

	var url = "http://m.mit.edu/apis/shuttles/vehicles/?agency=mit&routes=" + shuttle_code
	$.ajax({
			url: url,
			data: {},
			dataType: 'jsonp',
			success: function(result) {
				$('.is_shuttle_running').text(result[0]['predictable']);
			}
		});
}

function is_the_shuttle_running() {
	return $('.is_shuttle_running').text();
}