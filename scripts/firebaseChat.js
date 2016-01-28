$(document).ready(function(){
  // var messagesRef = new Firebase("https://kgm35vg8fql.firebaseio-demo.com/");

  <!-- CHAT JAVACRIPT -->
  // CREATE A REFERENCE TO FIREBASE
  var messagesRef = new Firebase('https://showusapet.firebaseio.com/');

  // REGISTER DOM ELEMENTS
  var messageField = $('#messageInput');
  var nameField = $('#nameInput');
  var animalField = $('#typeInput');
  var breedField = $('#breedChat');
  var yearsChat = $('#yearsChat');
  var messageList = $('#messages');

  // LISTEN FOR KEYPRESS EVENT
  messageField.keypress(function (e) {
    if (e.keyCode == 13) {
      //FIELD VALUES
      var petName = nameField.val();
      var animalName = animalField.val();
      var breedName = breedField.val();
      var yearsName = yearsChat.val();
      var message = messageField.val();

      //SAVE DATA TO FIREBASE AND EMPTY FIELD
      messagesRef.push({name:petName, animal:animalName, breed:breedName, years:yearsName, text:message});
      messageField.val('');
    }
  });

    // Add a callback that is triggered for each chat message.
  messagesRef.limitToLast(10).on('child_added', function (snapshot) {
    //GET DATA
    var data = snapshot.val();
    var petName = data.name || "No Name";
    var animalName = data.animal || "Not Specified";
    var breedName = data.breed || "Not Specified";
    var yearsName = data.years || "Not Specified";
    var message = data.text;

    //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
    var messageElement = $("<li>");
    var nameElement = $("<strong class='example-chat-username'></strong>")
    nameElement.text(petName +" (" + animalName + ") " + breedName + ": ");
    messageElement.text(message).prepend(nameElement);

    //ADD MESSAGE
    messageList.append(messageElement)

    //SCROLL TO BOTTOM OF MESSAGE LIST
    messageList[0].scrollTop = messageList[0].scrollHeight;
  });
})