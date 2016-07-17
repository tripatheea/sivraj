var map;

function initialize() {
    var d = new Date();
    var hours = d.getHours();
    var day = d.getDay();

    if ((hours <= 23 && hours >= 18) || (hours <= 3 && hours >= 0)) {
        // var shuttle = "saferidebostone";    // 'saferidebostone' for Saferide, Boston East. 'boston' for Boston Daytime.
        var shuttle = "saferidebostonall";    // 'saferidebostone' for Saferide, Boston East. 'boston' for Boston Daytime.
    }
    else if ((hours >= 8 && hours <= 17) && (day >= 1 && day <= 5)) {
        var shuttle = "boston"; // 'saferidebostone' for Saferide, Boston East. 'boston' for Boston Daytime.
    }

    if (typeof shuttle != 'undefined') {

                if (typeof map === 'undefined') {
                    var mapOptions = {
                        center: { lat: 42.3537025, lng: -71.0965},
                        zoom: 15
                    };

                    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

                    // var url = "http://m.mit.edu/apis/shuttles/routes/" + shuttle;

                    // $.ajax({
                    //     url: url,
                    //     data: {},
                    //     dataType: 'jsonp',
                    //     success: function(result) {
                    //         var trail = result['path']['segments'];

                    //         var flightPlanCoordinates = [];

                    //         for (var i = 0; i < trail.length; i++) {

                    //             for (var j = 0; j < trail[i].length; j++) {
                    //                 flightPlanCoordinates.push(new google.maps.LatLng(trail[i][j][1], trail[i][j][0]));
                    //             }


                    //         }

                    //         var flightPath = new google.maps.Polyline({
                    //                                     path: flightPlanCoordinates,
                    //                                     geodesic: true,
                    //                                     strokeColor: '#FF0000',
                    //                                     strokeOpacity: 1.0,
                    //                                     strokeWeight: 2
                    //                                 });
                    //         flightPath.setMap(map);
                    //     }
                    // });


                }

                function move_shuttle_to(position, angle) {
                    
                    if ( ! (typeof shuttle_marker === 'undefined')) {
                        shuttle_marker.setMap(null);
                    }

                    shuttle_marker = new google.maps.Marker({
                        position: new google.maps.LatLng(position['lat'], position['lon']),   
                        title: 'Shuttle',
                        icon: {
                          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                          scale: 4,
                          rotation: angle,
                          strokeColor: 'black',
                        },
                    });

                    shuttle_marker.setMap(map);
                }

                function get_shuttle_position() {
                    
                    var url = "https://m.mit.edu/apis/shuttles/vehicles/?agency=mit&routes=" + shuttle;

                    $.ajax({
                        url: url,
                        data: {},
                        dataType: 'jsonp',
                        success: function(result) {
                            if (result[0]['vehicles'].length != 0) {
                                var position = Object();
                                position['lat'] = result[0]['vehicles'][0]['lat'];
                                position['lon'] = result[0]['vehicles'][0]['lon'];
                                var angle = result[0]['vehicles'][0]['heading'];
                                move_shuttle_to(position, angle);
                            }
                        }
                    });
                }
                
                var trafficLayer = new google.maps.TrafficLayer();
                trafficLayer.setMap(map);

                get_shuttle_position();

                // Show bus stop marker.
                bus_stop_marker = new google.maps.Marker({
                        position: new google.maps.LatLng(42.3492899, -71.0998196),   
                        title: 'Shuttle',
                        icon: 'images/bus_stop_marker.png',
                        scale: 0.5,
                    });

                bus_stop_marker.setMap(map);
    }

}

google.maps.event.addDomListener(window, 'load', initialize);

setInterval(function() {
    initialize();
}, 10000);