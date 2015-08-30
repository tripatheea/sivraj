

// Define an Email class.
function Email(from, subject, sniplet, message, id, timestamp){
  this.from = from;
  this.subject = subject;
  this.sniplet = sniplet;
  this.message = message;
  this.id = id;
  this.timestamp = timestamp;
}


/**
 * Load Gmail API client library. List labels once client library
 * is loaded.
 */
function loadGmailApi() {
  gapi.client.load('gmail', 'v1', listUnreadEmails);
  listUnreadEmails('me');
}


emails = Array();
function listUnreadEmails(userId) {

  var request = gapi.client.gmail.users.messages.list({
    'userId': 'me',
    'q': '-in:chats in:inbox is:unread'
  });

  request.execute(function(resp) {
    var messages = resp['messages'];


    for (var i = 0; i < Math.min(2, messages.length); i++) {
      var messageId = messages[i]['id'];
      
      var request = gapi.client.gmail.users.messages.get({
        'userId': 'me',
        'id': messageId
      });
      
      request.execute(function(resp) {

        var id = resp['id'];
        var sniplet = resp['sniplet'];

        var j = 0;
        while (resp['payload']['headers'][j]['name'] != "From") {
          j++;  
        }
        var from = resp['payload']['headers'][j]['value'];

        var k = 0;
        while (resp['payload']['headers'][k]['name'] != "Subject") {
          k++;
        }
        var subject = resp['payload']['headers'][k]['value'];
        
        var timestamp = resp['internalDate'];

        // console.log(timestamp);        

        var m = 0;
        while (resp['payload']['parts'][m]['mimeType'] != "text/html") {
          m++;
        }
        var message = atob(resp['payload']['parts'][m]['body']['data'].replace(/-/g, '+').replace(/_/g, '/'));


        var new_email = Email(from, subject, sniplet, message, id, timestamp);
        
      });

    }
  });

}