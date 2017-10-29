$(document).ready(populateExistingCards(findExistingCards()));
$('#title-input').on('keyup', taskInputValidation);
$('#body-input').on('keyup', taskInputValidation);
$('#save-button').on('click', createCard);
$('#idea-card-storage').on('click', '.delete-button', deleteIdeaCard);
$('#idea-card-storage').on('click', '.upvote-button', upvoteQuality);
$('#idea-card-storage').on('click', '.downvote-button', downvoteQuality);
$('#idea-card-storage').on('blur', '.card-title', changeIdeaTitle);
$('#idea-card-storage').on('blur', '.card-body', changeIdeaBody);
$('#idea-card-storage').on('keypress', '.card-title', updateTitle);
$('#idea-card-storage').on('keypress', '.card-body', updateBody);
$('#search-bar-input').on('keyup', searchString);

function taskInputValidation () {
  return (($('#title-input').val() === ('')) && ($('#body-input').val() !== (''))) ? $('#save-button').attr('disabled', true)
  : (($('#title-input').val() !== ('')) && ($('#body-input').val() === (''))) ? $('#save-button').attr('disabled', true)
  : (($('#title-input').val() === ('')) && ($('#body-input').val() === (''))) ? $('#save-button').attr('disabled', true)
  : enableSaveButton();
}

function enableSaveButton() {
  if (('#save-button').diabled = true) {
    $('#save-button').removeAttr('disabled', false);
  }
}

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
  clearInputs();
}

function sendCardToLocalStorage(newCard) {
  var stringifiedObject = JSON.stringify(newCard);
  localStorage.setItem(newCard.id, stringifiedObject);
  retrieveObjPutOnPage(newCard.id);
}

function sendUpdatesToLocalStorage(updatedObject) {
  var stringifiedObject = JSON.stringify(updatedObject);
  localStorage.setItem(updatedObject.id, stringifiedObject);
}

function retrieveObjPutOnPage(id) {
  var retrievedObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(retrievedObject);
  prependIdeaCard(parsedObject.id, parsedObject.title, parsedObject.body, parsedObject.quality);
}

function populateExistingCards(keyValues) {
  for (var i = 0; i < keyValues.length; i++) {
    retrieveObjPutOnPage(keyValues[i].id);
  }
}

function prependIdeaCard(id, title, body, quality) {
  $('#idea-card-storage').prepend(
    `<article class="idea-card" id="${id}">
      <div class="card-header">
        <h2 class="card-title" contenteditable="true">${title}</h2> 
        <button class="delete-button" name="delete button"><img src="FEE-ideabox-icon-assets/transparent.png" width="30px" height="30px"></button>
      </div>
      <p class="card-body" contenteditable="true">${body}</p>
      <div class="card-footer">
        <button class="upvote-button" name="upvote button"></button>
        <button class="downvote-button" name="downvote button"></button>
        <h3 class="quality-option">${quality}</h3>
      </div>
    </article>`
  );
}

function findExistingCards() {
  var keyValues = [];
  var keys = Object.keys(localStorage);
  for (var i = 0; i < keys.length; i++) {
    keyValues.push(JSON.parse(localStorage.getItem(keys[i])));
  }
  return keyValues;
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
  $('#body-input').val('')
  $('#title-input').focus();
}

function upvoteQuality() {
  var cardId = parseInt($(this).closest('article').attr('id'));
  var cardObject = getObjectFromStorage(cardId);
  return ($(this).parent().find('h3').text() === 'swill') ? ($(this).parent().find('h3').text("plausible"), 
  cardObject.quality = "plausible", sendUpdatesToLocalStorage(cardObject))
  : ($(this).parent().find('h3').text('genius'), cardObject.quality = "genius", sendUpdatesToLocalStorage(cardObject))
}

// function downvoteQuality() {
//   var qualityArray = ['swill', 'plausible', 'genius'];
//   var currentQuality = $(this).siblings('.quality-option').text();
//   var currentIndex = qualityArray.indexOf(currentQuality);

//   if(currentIndex > 0){
//     currentIndex--;
//     currentQuality = $(this).siblings('.quality-option').text(qualityArray[currentIndex]);
//   }
  
//   var cardId = parseInt($(this).closest('article').attr('id'));
//   var cardObject = getObjectFromStorage(cardId);
//   cardObject.quality = qualityArray[currentIndex];
//   sendUpdatesToLocalStorage(cardObject);
// }

function downvoteQuality() {
  var cardId = parseInt($(this).closest('article').attr('id'));
  var cardObject = getObjectFromStorage(cardId)
  var quality = $(this).parent().find('h3').text()
  if(quality === 'genius') {
    $(this).parent().find('h3').text("plausible")
    sendUpdatesToLocalStorage(cardObject);
  } else {
    $(this).parent().find('h3').text('swill');
    sendUpdatesToLocalStorage(cardObject);
  }
}

function getObjectFromStorage(cardId) {
  var retrievedObject = localStorage.getItem(cardId);
  var parsedObject = JSON.parse(retrievedObject);
  return parsedObject;
}

function changeIdeaTitle() {
  var currentTitle = $(this).text();
  var cardId = parseInt($(this).closest('article').attr('id'));
  var cardObject = getObjectFromStorage(cardId);
  cardObject.title = currentTitle;
  sendUpdatesToLocalStorage(cardObject);
}

function changeIdeaBody() {
  var currentBody = $(this).text();
  var cardId = parseInt($(this).closest('article').attr('id'));
  var cardObject = getObjectFromStorage(cardId);
  cardObject.body = currentBody;
  sendUpdatesToLocalStorage(cardObject);
}

function clearAllCards() {
  $('#idea-card-storage').text('');
}

function searchString() {
  var cardObjectsArray = findExistingCards();
  var userSearchInput = $('#search-bar-input').val().toLowerCase();
  var filteredCards = cardObjectsArray.filter(function (object){
    return (object['body'].toLowerCase()).match(userSearchInput) || (object['title'].toLowerCase()).match(userSearchInput);
    }) 
  clearAllCards();
  populateExistingCards(filteredCards);
}

// function searchString() {
//   var searchTitle = $('#title-input').val();
//   var searchTask = $('#body-input').val();
//   var currentArticle = searchTitle[i].text() + searchTask[i].text();
//   for (var i = currentArticle.length - 1; i >= 0; i--) {
//     currentArticle[i]
//     if(currentArticle = $(#search-bar-input).text())
//       display
//   }
// }

function updateTitle(event) {
  if (13 == event.keyCode) {
    event.preventDefault();
    $('.card-title').blur();
    var cardId = parseInt($(this).closest('article').attr('id'));
    var cardObject = getObjectFromStorage(cardId);
    cardObject.title = $(this).closest('.card-title').text();
    sendUpdatesToLocalStorage(cardObject);
  }
}

function updateBody(event) {
  if (13 == event.keyCode) {
    event.preventDefault();
    $('.card-body').blur();
    var cardId = parseInt($(this).closest('article').attr('id'));
    var cardObject = getObjectFromStorage(cardId);
    cardObject.body = $(this).closest('.card-body').text();
    sendUpdatesToLocalStorage(cardObject);
  }
}