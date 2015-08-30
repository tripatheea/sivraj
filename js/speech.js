var create_email = false;
var final_transcript = '';
var recognizing = true;
var ignore_onend;
var start_timestamp;

jarvis_start_sound_played = false;


var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

recognition.onstart = function() {
  console.log("starting again!");
  recognizing = true;
};

recognition.onerror = function(event) {
  console.log(event.error);
};

recognition.onend = function() {
  console.log("Stopping!");
  recognizing = false;
  if (ignore_onend) {
    return;
  }
};

recognition.onresult = function(event) {
  var interim_transcript = '';
  
  if (typeof(event.results) == 'undefined') {
    recognition.onend = null;
    recognition.stop();
    return;
  }


  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      final_transcript += event.results[i][0].transcript;
    } else {
      interim_transcript += event.results[i][0].transcript;
    }
  }


  // final_transcript;
  // interim_transcript;

  
  $('.interim_text').text(interim_transcript);
  $('.final_text').text(final_transcript);

  if (((interim_transcript.toLowerCase().trim() == 'jarvis') || (interim_transcript.toLowerCase().trim() == 'sam'))  && ( ! jarvis_start_sound_played)) {
    document.getElementById('jarvis_start').play();
    jarvis_start_sound_played = true;
  }
  
  
  speech_to_action(final_transcript);  

  

  if ( ! ((final_transcript.toLowerCase().trim() == 'jarvis') || (final_transcript.toLowerCase().trim() == 'sam'))) {
    final_transcript = '';
  }

};

recognition.start();


setInterval(function() {
  if (( ! recognizing) && ( ! recognition_stopped_for_video)) {
    console.log("Restarting recognition by timer!");
    console.log( recognizing);
    console.log(recognition_stopped_for_video);
    console.log(recognizing);
    recognition.start();
  }
}, 3000);

