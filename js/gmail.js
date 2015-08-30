// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com

/**
 * Check if current user has authorized this application.
 */


var default_callback = function(result) {
  console.log("Callback: ");
  console.log(result);
}



/**
 * Load Gmail API client library. List labels once client library
 * is loaded.
 */
function loadGmailApi() {
  gapi.client.load('gmail', 'v1', listMessages);
  listMessages('!in:chats');
}

/**
 * Retrieve Messages in user's mailbox matching query.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} query String used to filter the Messages listed.
 * @param  {Function} callback Function to call when the request is complete.
 */
function listMessages(query) {
  
  var getPageOfMessages = function(request, result) {
    request.execute(function(resp) {
      // console.log(resp);

      result = result.concat(resp.messages);
      var nextPageToken = resp.nextPageToken;
      if (nextPageToken) {
        request = gapi.client.gmail.users.messages.list({
          'userId': 'me',
          'pageToken': nextPageToken,
          'q': "!in:chats"
        });
        getPageOfMessages(request, result);
      } else {
        listAllEmails(result);
      }
    });
  };

  var initialRequest = gapi.client.gmail.users.messages.list({
    'userId': 'me',
    'q': query
  });

  getPageOfMessages(initialRequest, []);
}


function listAllEmails(result) {
  var one_result = result[0];
  var messageId = one_result['id'];


  var request = gapi.client.gmail.users.messages.get({
    'userId': 'me',
    'id': messageId
  });

  request.execute(default_callback);

}