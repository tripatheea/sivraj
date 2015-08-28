msg = new SpeechSynthesisUtterance();
voices = window.speechSynthesis.getVoices();
msg.voice = voices[10]; // Note: some voices don't support altering params
msg.voiceURI = 'native';
msg.volume = 1; // 0 to 1
msg.rate = 1.0; // 0.1 to 10
msg.pitch = 0; //0 to 2
// msg.text = 'Hello World';
msg.lang = 'en-US';

msg.onend = function(e) {
  // console.log('Finished in ' + event.elapsedTime + ' seconds.');
};

function text_to_speech(words) {
	msg.text = words;
	speechSynthesis.speak(msg);
}