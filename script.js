$(document).ready(populateExistingCards(findExistingCards()));
$('#save-button').on('click', createCard);
$('#idea-card-storage').on('click', '#upvote-button', getObjectFromStorage);
$('#idea-card-storage').on('click', '#delete-button', deleteIdeaCard);
$('#idea-card-storage').on('click', '#upvote-button', upvoteQuality);
$('#idea-card-storage').on('click', '#downvote-button', downvoteQuality);

// $('.card-title').on('blur', function(e) {
//   if (e.keyCode == 13) {
//     //Prevent insertion of a return
//     //You could do other things here, for example
//     //focus on the next field
//     $(this).parent().focus();
//   }
// });

function IdeaCardObject(id, title, body) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = 'swill';
}

function createCard() {
  event.preventDefault();
  var newCard = new IdeaCardObject(id = Date.now(), $('#title-input').val(), $('#body-input').val());
  sendCardToLocalStorage(newCard);
}

function sendCardToLocalStorage(newCard) {
  var stringifiedObject = JSON.stringify(newCard);
  localStorage.setItem(newCard.id, stringifiedObject);
  retrieveObjPutOnPage(newCard.id);
}

function retrieveObjPutOnPage(id) {
  var retrievedObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(retrievedObject);
  prependIdeaCard(parsedObject.id, parsedObject.title, parsedObject.body);
  clearInputs();
}

function populateExistingCards(keyValues) {
  for (var i = 0; i < keyValues.length; i++) {
    retrieveObjPutOnPage(keyValues[i].id);
  }
}

function prependIdeaCard(id, title, body) {
  var quality = ['swill', 'plausible', 'genius'];

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
      <h3 class="quality-option">${quality[0]}</h3>
    </div>
    </article>
    `
    );
}

function findExistingCards() {
  var keyValues = []
  var keys = Object.keys(localStorage);
  for (var i = 0; i < keys.length; i++) {
    keyValues.push(JSON.parse(localStorage.getItem(keys[i])));
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

function deleteIdeaCard() {
  $(this).closest('article').remove();
  var cardId = $(this).closest('article').attr('id');
  localStorage.removeItem(JSON.parse(cardId));
}

function clearInputs() {
  $('#title-input').val('');
  $('#body-input').val('');
}

function upvoteQuality() {
  var qualityArray = ['swill', 'plausible', 'genius'];
  var currentQuality = $(this).siblings('.quality-option').text();
  var currentIndex = qualityArray.indexOf(currentQuality);

  if(currentIndex <= 2){
    currentIndex++;
    currentQuality = $(this).siblings('.quality-option').text(qualityArray[currentIndex]);
  }
}

function downvoteQuality() {
  var qualityArray = ['swill', 'plausible', 'genius'];
  var currentQuality = $(this).siblings('.quality-option').text();
  var currentIndex = qualityArray.indexOf(currentQuality);

  if(currentIndex > 0){
    currentIndex--;
    currentQuality = $(this).siblings('.quality-option').text(qualityArray[currentIndex]);
  }
}

function getObjectFromStorage() {
  var cardId = parseInt($(this).closest('article').attr('id'));
  var retrievedObject = localStorage.getItem(cardId);
  var parsedObject = JSON.parse(retrievedObject);
  console.log(parsedObject.quality);

}