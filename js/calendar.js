
// Define an Event class.
function Event(name, location, start_time, end_time, calendar){
  this.name = name;
  this.location = location;
  this.start_time = start_time;
  this.end_time = end_time;
  this.calendar = calendar;
}


function ISODateString(d){
 function pad(n){return n<10 ? '0'+n : n}
 return d.getUTCFullYear()+'-'
      + pad(d.getUTCMonth()+1)+'-'
      + pad(d.getUTCDate())+'T'
      + pad(d.getUTCHours())+':'
      + pad(d.getUTCMinutes())+':'
      + pad(d.getUTCSeconds())+'Z'
}

function makeCalendarApiCall() {

  var d = new Date();
  var day = d.getDay();

  // Show all events within one week from now.
  var number_of_days = 7;
  // if (day > 3) {
  //   number_of_days = (6 - number_of_days) % 6;
  // }

  var start_time = ISODateString(new Date()); // Today
  var end_time = new Date((new Date()).getTime() + 86400000 * number_of_days);  // Today + number_of_days days.
  end_time.setHours(0); end_time.setMinutes(0); end_time.setSeconds(0);
  end_time = ISODateString(end_time);
  
  gapi.client.load('calendar', 'v3', function() {

    var all_events_to_list = Array();

    for(var j = 0; j < calendar_ids.length; j++) {

      var request = gapi.client.calendar.events.list({
                                                  'calendarId': calendar_ids[j],
                                                  singleEvents: true,
                                                  'orderBy': 'startTime',
                                                  'timeMin': start_time,
                                                  'timeMax': end_time,
                                               });
      
      request.execute(function(resp) {

        var all_events_of_this_calendar = resp['result']['items'];

        for(var i = 0; i < all_events_of_this_calendar.length; i++) {
          var e = new Event(all_events_of_this_calendar[i]['summary'], all_events_of_this_calendar[i]['location'], all_events_of_this_calendar[i]['start']['dateTime'], all_events_of_this_calendar[i]['start']['dateTime'], all_events_of_this_calendar[i]['organizer']['displayName']);
          all_events_to_list.push(e);
        }

        // Send in the list only when you're done with all the events.
        if (j == calendar_ids.length) {
          list_all_events(all_events_to_list);
        }

      });
    }
  });

}

function sort_events(all_events) {

  sort_function = function(event_1, event_2) {
    var d1 = new Date(event_1['start_time']);
    var d2 = new Date(event_2['start_time']);

    return d1.getTime() - d2.getTime();
  }

  all_events.sort(sort_function);

  return all_events;
}

function list_all_events(all_events_to_list) {

  var month_names = Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
  var day_names = Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');

  var all_events = sort_events(all_events_to_list);

  var events_html = "<table class='events'>";

  var last_day = (new Date()).getDay();

  for (var i = 0; i < all_events.length; i++) {
    var e = all_events[i];
    
    var start_time = e['start_time'];
    var d = new Date(start_time);
    var start = ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2);
    
    if (last_day != d.getDay() ) {
      var month = month_names[d.getMonth()];
      var date = ('0' + d.getDate()).slice(-2);
      var day = day_names[d.getDay()];
      
      events_html += "</table>";
      events_html += "<hr>";
      events_html += "<h2 class='date_title'>" + day + ", " + month + " " + date + "</h2>";
      events_html += "<table class='events'>";
    }

    last_day = d.getDay();

    var calendar_styling = "";
    
    if (e['calendar'] == 'Aashish Tripathee') {
      calendar_styling = 'aashish';
    }
    else if (e['calendar'] == 'Office Hours') {
      calendar_styling = 'office_hours';
    }
    else if (e['calendar'] == 'Psets and Exams') {
      calendar_styling = 'psets';
    }

    events_html += "<tr>";
    events_html += "<td class='time'>" + start + "</td>";
    events_html += "<td class='name " + calendar_styling + "'>" + e['name'] + "</td>";
    events_html += "<td class='location'>" + e['location'] + "</td>";
    events_html += "</tr>";

  }

  $('.calendar_events').html(events_html);

}

$(document).ready(function() {
  // handleClientLoad();
  // Update the calendar every 1 hour.
  setInterval(function() {
    makeApiCall();
  }, 3600000);  //3600000
});



