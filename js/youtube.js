// Define a YouTube Video class.
// function YouTubeVideo(name, location, start_time, end_time, calendar){
//   this.name = name;
//   this.location = location;
//   this.start_time = start_time;
//   this.end_time = end_time;
//   this.calendar = calendar;
// }

// YouTube API.
if (!window['YT']) { YT = {loading: 0,loaded: 0};}if (!window['YTConfig']) {var YTConfig = {'host': 'http://www.youtube.com'};}if (!YT.loading) {YT.loading = 1;(function(){var l = [];YT.ready = function(f) {if (YT.loaded) {f();} else {l.push(f);}};window.onYTReady = function() {YT.loaded = 1;for (var i = 0; i < l.length; i++) {try {l[i]();} catch (e) {}}};YT.setConfig = function(c) {for (var k in c) {if (c.hasOwnProperty(k)) {YTConfig[k] = c[k];}}};var a = document.createElement('script');a.type = 'text/javascript';a.id = 'www-widgetapi-script';a.src = 'https:' + '//s.ytimg.com/yts/jsbin/www-widgetapi-vflyFv0K1/www-widgetapi.js';a.async = true;var b = document.getElementsByTagName('script')[0];b.parentNode.insertBefore(a, b);})();}

recognition_stopped_for_video = false;

// Load the YouTube API and search for a specified string.
function search_youtube(query) {
  gapi.client.load('youtube', 'v3', function() {
  
    var request = gapi.client.youtube.search.list({
      q: query,
      part: 'snippet',
      type: 'video',
      // videoSyndicated: false,
    });


    request.execute(function(response) {
      var top_video_id = response['items'][0]['id']['videoId'];

      console.log(top_video_id);

      show_video_in_lightbox(top_video_id);
    });

  });
}

// create youtube player
var youtube_video_player;

function show_video_in_lightbox(youtube_video_id) {

  // Stop speech recognition while the video plays.
  recognition.stop();
  recognition_stopped_for_video = true;

  $.fancybox(
    '<div id="youtube_player"></div>',
    {
      'autoDimensions'  : true,
      'transitionIn'    : 'elastic',
      'transitionOut'   : 'elastic'
    }
  );


  youtube_video_player = new YT.Player('youtube_player', {
    width: '1800',
    height: '1000',
    suggestedQuality: 'hd720',
    videoId: youtube_video_id,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });

  // autoplay video
  function onPlayerReady(event) {
      event.target.setPlaybackQuality('hd720');
      event.target.playVideo();
  }

  // when video ends
  function onPlayerStateChange(event) {        
      if(event.data === 0) {            
        // Video ended. Close lightbox.
        close_lightbox();
      }
  }

  onPlayerReady();
}

function close_lightbox() {
  parent.$.fancybox.close();
  // Restart speech recognition.
  recognition.start();
  recognition_stopped_for_video = false;
}

