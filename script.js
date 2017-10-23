
// $('#save-button').on('click', addIdeaCard);
$(document).ready(function() {
  // findExistingCards();
  showCards(findExistingCards());
});
$('#save-button').on('click', createCard)
$('#idea-card-storage').on('click', '#delete-button', deleteIdeaCard)
$('#idea-card-storage').on('click', '#upvote-button', upvoteQuality);
$('#idea-card-storage').on('click', '#downvote-button', downvoteQuality);

// $('.card-title').on('keyup', function(e) {
//   if (e.keyCode == 13) {
//     //Prevent insertion of a return
//     //You could do other things here, for example
//     //focus on the next field
//     $(this).parent().focus();
//   }
// });

var quality = ['swill', 'plausible', 'genius'];
var i = 0;
//put it in storage and then pull it out

function IdeaCardObject(id, title, body){
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = quality[i];
}

function createCard() {
  event.preventDefault();
  var newCard = new IdeaCardObject(id = Date.now(), $('#title-input').val(), $('#body-input').val())
  console.log(newCard);
  var stringifiedObject = JSON.stringify(newCard);
  localStorage.setItem(id, stringifiedObject);
  console.log(localStorage.getItem(id));
  var retrievedObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(retrievedObject);
  console.log(parsedObject.id);
  prependIdeaCard(parsedObject.id, parsedObject.title, parsedObject.body);
  clearInputs();
}


function prependIdeaCard(id, title, body) {
  // var titleInput = $('#title-input').val();
  // var bodyInput = $('#body-input').val();

  $('#idea-card-storage').prepend(
    `
    <article class="idea-card" id="
    ` 
    + id +
    `
    ">
    <div id="card-header">
    <h2 class="card-title" contenteditable="true">
    `
    + title +
    `</h2> 
    <button id="delete-button" name="delete button"><img src="FEE-ideabox-icon-assets/transparent.png" width="30px" height="30px"></button>
    </div>
    <p class="card-body" contenteditable="true">
    `
    + body +
    `
    </p>
    <div id="card-footer">
    <button id="upvote-button" name="upvote button"></button>
    <button id="downvote-button" name="downvote button"></button>
    <h3 class="quality">quality:</h3>
    <h3 class="quality-option"> ${quality[i]}</h3>
    </div>
    </article>
    `
    );
}

function findExistingCards() {
  var keyValues = []
  var keys = Object.keys(localStorage)
  for (var i = 0; i < keys.length; i++) {
    keyValues.push(new IdeaCardObject(localStorage.getItem(keys[i])));
  }
  return keyValues;
}

function showCards(cards = []) {
  for(var i = 0; i < cards.length; i++){
    var card = cards[i];
    $('#idea-card-storage').prepend(IdeaCardObject(card));
  }
}

function addIdeaCard() {
  event.preventDefault();
  prependIdeaCard();
  clearInputs();
}

function deleteIdeaCard(){
  $(this).parent().parent().remove();
}

function clearInputs() {
  $('#title-input').val('');
  $('#body-input').val('');
}

function upvoteQuality(){
  i++;
  if (i <= 2){  
    $(this).parent().find('.quality-option').text(quality[i]);
  }
}

function downvoteQuality(){
  i--;
  if (i >= 0){
    $(this).parent().find('.quality-option').text(quality[i]);
  }
}

function callCardId() {
  console.log($(this).parent().parent().attr('id'));
}
