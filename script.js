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
$('#idea-card-storage').on('click', '.complete-btn', completeTask);
$('.show-todos').on('click', showToDos);

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
  this.quality = 'Normal';
  this.completed = false;
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
  (parsedObject.completed === true) ? $(".greyed-out").hide() :
  prependIdeaCard(parsedObject.id, parsedObject.title, parsedObject.body, parsedObject.quality, parsedObject.completed);
}

function populateExistingCards(keyValues) {
  for (var i = 0; i < keyValues.length; i++) {
    retrieveObjPutOnPage(keyValues[i].id);
    showToDos(keyValues[i].id);
  }
}

function prependIdeaCard(id, title, body, quality, completed) {
  $('#idea-card-storage').prepend(
    `<article class="idea-card" id="${id}">
      <div class="card-header">
        <h2 class="card-title" contenteditable="true">${title}</h2> 
        <button class="delete-button button" name="delete button"><img src="FEE-ideabox-icon-assets/transparent.png" width="30px" height="30px"></button>
      </div>
      <p class="card-body" contenteditable="true">${body}</p>
      <div class="card-footer">
        <button class="upvote-button button" name="upvote button"></button>
        <button class="downvote-button button" name="downvote button"></button>
        <h3 class="quality-option">${quality}</h3>
        <button class="complete-btn" name="complete button">Completed Task</button>
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
  var qualityArray = ['None', 'Low', 'Normal', 'High', 'Critical'];
  var currentQuality = $(this).siblings('.quality-option').text();
  var currentIndex = qualityArray.indexOf(currentQuality);

  if(currentIndex < 4) {
    currentIndex++;
    currentQuality = $(this).siblings('.quality-option').text(qualityArray[currentIndex]);
  }

  var cardId = parseInt($(this).closest('article').attr('id'));
  var cardObject = getObjectFromStorage(cardId);
  cardObject.quality = qualityArray[currentIndex];
  sendUpdatesToLocalStorage(cardObject);
}

function downvoteQuality() {
  var qualityArray = ['None', 'Low', 'Normal', 'High', 'Critical'];
  var currentQuality = $(this).siblings('.quality-option').text();
  var currentIndex = qualityArray.indexOf(currentQuality);

  if(currentIndex > 0){
    currentIndex--;
    currentQuality = $(this).siblings('.quality-option').text(qualityArray[currentIndex]);
  }
  
  var cardId = parseInt($(this).closest('article').attr('id'));
  var cardObject = getObjectFromStorage(cardId);
  cardObject.quality = qualityArray[currentIndex];
  sendUpdatesToLocalStorage(cardObject);
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

function completeTask () {
  this.completed = !this.completed;
  var cardId = parseInt($(this).closest('article').attr('id'));
  var cardObject = getObjectFromStorage(cardId);
  cardObject.completed = this.completed;
  if (cardObject.completed === true) {
    $(this).closest(".idea-card").addClass("greyed-out");
  }
  sendUpdatesToLocalStorage(cardObject);
}

function showToDos (id) {  

  var retrievedObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(retrievedObject);
  console.log(parsedObject.completed);
  if (parsedObject.completed === true) {
    // prependIdeaCard(parsedObject.id, parsedObject.title, parsedObject.body, parsedObject.quality, parsedObject.completed);
  }
}