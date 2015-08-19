function speech_to_action(raw_words) {

  var words = raw_words.toLowerCase().trim();
  
  if (words.slice(0, 6).trim() == "jarvis") {
    words = words.slice(6, words.length).trim();
  }
  else if (words.slice(0, 3).trim() == "sam") {
  	words = words.slice(3, words.length).trim();
  }
  else {
  	return;
  }
  

  switch (words) {
    case "what time is it":               // what time is it now
      text_to_speech("It is " + get_time() + " right now.");
      break;

    case "what is today's date":
      text_to_speech("Today is " + get_date());
      break;

    case "tell me about the weather":
      var weather = get_weather_for_speech();
      var weather_msg = "It's " + weather['current_temp'] + " degrees. " + weather['current_summary'] + ". There is a wind of " + weather['wind'] + " miles per hour blowing and it feels like " + weather['feels_like'] + " degrees right now.";
      text_to_speech(weather_msg  );
      break;

    case "tell me a joke":
      text_to_speech(get_joke_for_speech());
      break;

    case "you're funny":
      text_to_speech("Awww! Stop it you! I'm blushing!");
      blush();
      break;

    case "when is the bus coming":
      var prediction = get_shuttle_prediction_for_speech();
      prediction = (prediction == "N/A") ? "I don't really know! Sorry!" : prediction;
      text_to_speech("The shuttle will be at the Silber Way stop at around " + prediction);
      break;

    case "you're awesome":
      text_to_speech("I know! Guess who created me?");
      break;

    case "i'm batman":
      text_to_speech("Yeah right. And I'm JARVIS! On a rather serious note, do you want me to schedule an appointment with a psychiatrist.");
      break;

    case "hello":
      text_to_speech("Hi there!");
      break;

    case "previous screen":
      move_bottom_slide_left();
      break;

    case "next screen":
      move_bottom_slide_right();
      break;

    case "close lightbox":
      close_lightbox();
      break;

    case "update":
      location.reload();
      break;

    case "thank you":
    	text_to_speech("Awww! You don't have to thank me. I'm always here for you! Anyways, you're very welcome. Oh did I mention that you look awesome today? What's going on?")
    	break;

    default:
      // console.log(words);
      break;
  }

  var youtube_pattern = new RegExp("play [a-zA-Z ]*");

  if (youtube_pattern.test(words)) {
    var start = words.indexOf("play ") + "play ".length;
    var end = words.length;
    youtube_search_keyword = words.slice(start, end);
    search_youtube(youtube_search_keyword);
  }

  // Reset the sound_played variable so that the sound can play back next time Jarvis is called.
  jarvis_start_sound_played = false;
}