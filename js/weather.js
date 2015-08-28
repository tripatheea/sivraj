var weather_right_now = Object();


function get_weather() {
	var url = "https://api.forecast.io/forecast/0a6e982dad66ab07822e24ead1e78311/42.3500373,-71.0970122";

	$.ajax({
		url: url,
		data: {},
		dataType: 'jsonp',
		success: function(result) {
			update_weather(result);
		}
	});
}

function convert_to_celsius(temp) {
	return Math.round((temp - 32) * 1000 / 180) / 10;
}

function update_weather(result) {

	var d = new Date();
	var date = d.getDay();

	var current_weather_object = result['currently'];
	
	var current_weather = Object();
	current_weather['current_summary'] = current_weather_object['summary'];
	current_weather['feels_like'] = convert_to_celsius(current_weather_object['apparentTemperature']) + '&deg;';
	current_weather['current_temp'] = convert_to_celsius(current_weather_object['temperature']) + ' &deg;C';
	current_weather['wind'] = current_weather_object['windSpeed'];
	current_weather['icon'] = current_weather_object['icon'];


	weather_right_now['current_summary'] = current_weather_object['summary'];
	weather_right_now['feels_like'] = convert_to_celsius(current_weather_object['apparentTemperature']);
	weather_right_now['current_temp'] = convert_to_celsius(current_weather_object['temperature']);
	weather_right_now['wind'] = current_weather_object['windSpeed'];


	current_weather['max_temp'] = convert_to_celsius(result['daily']['data'][date]['temperatureMax']) + '&deg;';
	current_weather['min_temp'] = convert_to_celsius(result['daily']['data'][date]['temperatureMin']) + '&deg;';



	for (var key in current_weather) {
		$('.' + key).html(current_weather[key]);
	}

	$('.weather_icon').html("<img src='images/weather/" + current_weather['icon'] + ".png'>");

}

function get_weather_for_speech() {
	return weather_right_now;
}

get_weather_for_speech();


$(document).ready(function() {

	get_weather();

	// Update Time.
	setInterval(function() {
		get_weather();
	}, 120000);

});
