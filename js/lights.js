

function turn_lights(args) {
	
	console.log(args);

	var url = "https://localhost/sivraj_app";

	var lights = {
		status: -1,

		get_status:  function() {
			$.ajax({
				url: url + "/lights_status", 
				dataType: "json",
				method: "get",
				success: function( data ) {
							if(data.trim() == "0") {
								lights.status = 0;
							}
							else if(data.trim() == "1") {
								lights.status = 1;
							}
						}
			});
		},
		update_status: function(status) { 
			$.ajax({
				url: url + "/update_lights",
				dataType: "json",
				method: "post",
				data: { status: status },
				success: function(data) {
							console.log(data);
						}
			});
		}

	};


	
	// lights.get_status();

	if (args.trim() == "turn_on") {
		console.log("Turning it on!");
		lights.update_status(1);	
	}
	else if (args.trim() == "turn_off") {
		console.log("Turning it off!");
		lights.update_status(0);	
	}
	

}
