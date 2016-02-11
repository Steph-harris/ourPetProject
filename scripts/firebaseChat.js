$(document).ready(function(){
  $("#blankInputs").hide();

  <!-- CHAT JAVACRIPT -->
  // CREATE A REFERENCE TO FIREBASE
  var messagesRef = new Firebase('https://showusapet.firebaseio.com/');

  // REGISTER DOM ELEMENTS
  var submitBtn = $('#fireSubmit');
  var messageField = $('#messageInput');
  var nameField = $('#nameInput');
  var animalField = $('#typeInput');
  var breedField = $('#breedChat');
  var yearsChat = $('#yearsChat');
  var messageList = $('#messages');

  //changed keypress to a submit button
  submitBtn.click(function (e) {
    e.preventDefault();
    debugger;
    console.log(messageField.val());
    if (messageField.val() !== '' && nameField.val() !== '' && animalField.val() !== '' && yearsChat.val() !== '' && breedField.val() !== '') {
    //empty input fields on press
      
      //FIELD VALUES
      var petName = nameField.val();
      var animalName = animalField.val();
      var breedName = breedField.val();
      var yearsName = yearsChat.val();
      var message = messageField.val();

      //SAVE DATA TO FIREBASE AND EMPTY FIELD
      messagesRef.push({name:petName, animal:animalName, breed:breedName, years:yearsName, text:message});
      nameField.val('');
      animalField.val('');
      breedField.val('');
      yearsChat.val('');
      messageField.val('');
    } else {
      $("#blankInputs").show().fadeOut(3500);
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
    var messageElement = $("<h5>");
    var nameElement = $("<h3><strong class='example-chat-username'></strong></h3>");
    var yearsElement = $("<h4>Owned years: " + yearsName + "</h4>");
    nameElement.text(petName +" (" + animalName + ") " + breedName).append(yearsElement);
    messageElement.text('"' + message + '"').prepend(nameElement);

    //ADD MESSAGE
    messageList.append(messageElement)

    //SCROLL TO BOTTOM OF MESSAGE LIST
    messageList[0].scrollTop = messageList[0].scrollHeight;
  });
})