var close_lightbox_gesture_first_time = false;

$(document).ready(function() {
	gest.start();

	gest.options.subscribeWithCallback(function(gesture) {
		//handle gesture .direction .up .down .left .right .error

		if (gesture['direction'] != null) {
			var direction = gesture['direction'].toLowerCase();
			console.log(direction);
			
			if (direction == "right") {
				move_bottom_slide_right();
				close_lightbox_gesture_first_time = false;
			}
			else if (direction == "left") {
				move_bottom_slide_left();
				close_lightbox_gesture_first_time = false;
			}
			else if (direction == "up" || direction == "down" || direction == "long up" || direction == "long down") {
				if ( ! close_lightbox_gesture_first_time) {
					// This means, the person did the gesture the first time.
					// console.log("Waved first time!");
					close_lightbox_gesture_first_time = true;
				}
				else {
					// console.log("Waved second time. Closing the lightbox!");
					close_lightbox_gesture_first_time = false;
					close_lightbox();
				}

			}
			
		}

	});

});

function move_bottom_slide_left() {

	var margin = $('.big_bottom_container').css("marginLeft");
	
	if (margin == "19.1875px") {
		console.log("Moving left!");
	  	$('.big_bottom_container').animate({
	  			marginLeft: "-86.1%",
	  		}, 1000, function() { 		
	  	});
	}

}

function move_bottom_slide_right() {

	var margin = $('.big_bottom_container').css("marginLeft");
	
	if (margin != "19.1875px") {
		console.log("Moving right!");
	  	$('.big_bottom_container').animate({
	  			marginLeft: "1%",
	  		}, 1000, function() { 		
	  	});
	}

}
