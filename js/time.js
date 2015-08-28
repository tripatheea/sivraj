
function update_date() {
	var month_names = Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
	var day_names = Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');

	var d = new Date();
	var year = d.getFullYear();
	var month = month_names[d.getMonth()];
	var date = ('0' + d.getDate()).slice(-2);
	var day = day_names[d.getDay()];

	$('.date_block').text(day + ', ' + month + ' ' + date);
}


function update_time() {
	var d = new Date();
	
	var hours = ('0' + d.getHours()).slice(-2);
	var minutes = ('0' + d.getMinutes()).slice(-2);

	$('.time_block').text(hours + ':' + minutes);

	if ((hours == "00") && (minutes == "01")) {
		update_date();
	}
}

function get_time() {
	var d = new Date();
	var hours = d.getHours();
	var minutes = d.getMinutes();

	var suffix = "A.M.";
    if (hours >= 12) {
        suffix = "P.M.";
        hours = hours - 12;
    }
    if (hours == 0) {
        hours = 12;
    }

	var time = hours + " " + minutes + " " + suffix ;

	console.log(time);

	return time;
}


function get_date() {
	var month_names = Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
	var day_names = Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');

	var d = new Date();
	var year = d.getFullYear();
	var month = month_names[d.getMonth()];
	var date = d.getDate();
	var day = day_names[d.getDay()];

	var full_date = day + "; " + month + "; " + date;

	return full_date;
}

function update_background() {
	var images = Array('stock-photo-boston-lights-119537453.jpg', '3577972369_bac8110d97_o.jpg', '6921693-marblehead-massachusetts.jpg', '7865616750_e00a4db467_k.jpg', '7230997494_ec8882f6b0_h.jpg', 'boston-dating.jpg', 'boston-skyline.jpg', '3581211491_605715a20d_o.jpg', 'Downtown-Boston.jpg', '6822791975_66e89fc9ee_o.jpg', '8861972250_28a4c80bc5_k.jpg', '6944002983_09181a2fa8_o.jpg', 'boston_city_at_sunset-wide.jpg', '3249841704_bfdeaf1d0c_o.jpg', '7593908200_b32fd6ecd0_k.jpg', 'boston__massachusetts__city__usa.jpg', 'o-BOSTON-facebook.jpg', '400261394_e2957e1e24_o.jpg', '3918064684_6353a8d99a_o.jpg', 'usa-massachusetts-boston-city-7080.jpg', 'USA-Boston_Public_Garden0.jpg', '3597080409_2a254275f7_o.jpg', 'boston-parking-guide.jpg', 'boston.jpg', '1488x901xBoston-HDR-Sunflare.jpg.pagespeed.ic.i42ffyN1L1.jpg', '14468713760_390865e757_h.jpg', 'Hyannisport Harbor, Hyannisport, Massachusetts.jpg', 'downtown_boston_by_jpatterson8741-d4pkw2g.jpg', '3243537014_db76355318_o.jpg', '12068840025_865af3afc9_k.jpg', '303929-alexfas01.jpg', 'Tranquility, Cape Cod, Massachusetts.jpg', '6839684235_27b105c082_o.jpg', '10344764224_486472a446_k.jpg', 'Dock-Pilings-Boston-Harbor-Massachusetts-Image.jpg');

	var index = Math.floor(Math.random() * ((images.length - 1) - 0 + 1)) + 0;
	var image = images[index];	

	$('.html').css('background', 'url(images/bckg/' + image + ')');
	$('.html').css('background-repeat', 'no-repeat');
	$('.html').css('background-attachment', 'center center');
	$('.html').css('background-position', 'fixed');
	$('.html').css('-webkit-background-size', 'cover');
	$('.html').css('-moz-background-size', 'cover');
	$('.html').css('-o-background-size', 'cover');
	$('.html').css('background-size', 'cover');
}	

$(document).ready(function() {
	update_background();
	update_date();
	update_time();

	// Update Time.
	setInterval(function() {
		update_time();
	}, 60000);

	// Update background image.
	setInterval(function() {
		update_background();
	}, 600000);

});
