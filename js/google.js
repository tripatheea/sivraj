var client_id = "525364012105-hj23t2lha4fk2qcqa09atf30qguepl9h.apps.googleusercontent.com";
var api_key = "AIzaSyD72ymu3roMCW7GHeqvmwTFPPEhvHT-DfE";
var scopes = "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.compose";


// Use a button to handle authentication the first time.
function handleClientLoad() {
  gapi.client.setApiKey(api_key);
  window.setTimeout(checkAuth, 1);
  // checkAuth();
}

function checkAuth() {
  gapi.auth.authorize({client_id: client_id, scope: scopes, immediate: true}, handleAuthResult);
}

function handleAuthResult(authResult) {
var authorizeButton = document.getElementById('authorize-button');
  if (authResult && !authResult.error) {
    authorizeButton.style.visibility = 'hidden';
    makeCalendarApiCall();
    loadGmailApi();
  } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
  }
}

function handleAuthClick(event) {
	gapi.auth.authorize({client_id: client_id, scope: scopes, immediate: false}, handleAuthResult);
	return false;
}
