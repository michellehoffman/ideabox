$(document).ready(populateExistingCards(findExistingCards()));
$('#title-input').on('keyup', taskInputValidation);
$('#body-input').on('keyup', taskInputValidation);
$('#save-button').on('click', createCard);
$('#task-card-storage').on('click', '.delete-button', deleteTaskCard);
$('#task-card-storage').on('click', '.upvote-button', upvoteQuality);
$('#task-card-storage').on('click', '.downvote-button', downvoteQuality);
$('#task-card-storage').on('blur', '.card-title', changeTaskTitle);
$('#task-card-storage').on('blur', '.card-body', changeTaskBody);
$('#task-card-storage').on('keypress', '.card-title', updateTitle);
$('#task-card-storage').on('keypress', '.card-body', updateBody);
$('#search-bar-input').on('keyup', searchString);
$('#task-card-storage').on('click', '.complete-btn', completeTask);
$('.show-todos').on('click', showToDos);
$('.critical-btn').on('click', critical);
$('.high-btn').on('click', high);
$('.normal-btn').on('click', normal);
$('.low-btn').on('click', low);
$('.none-btn').on('click', none);
$('.more-todos').on('click', populateExistingCards(moreToDos()));

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

function taskCardObject(id, title, body) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = 'Normal';
  this.completed = false;
}

function createCard() {
  event.preventDefault();
  var newCard = new taskCardObject(id = Date.now(), $('#title-input').val(), $('#body-input').val());
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
  prependTaskCard(parsedObject.id, parsedObject.title, parsedObject.body, parsedObject.quality, parsedObject.completed);
  completedTaskView(parsedObject.id, parsedObject.completed);
}

function populateExistingCards(keyValues) {
  for (var i = 0; i < keyValues.length; i++) {
    retrieveObjPutOnPage(keyValues[i].id);  
  }
}

function completedTaskView(id, complete) {
  for (var i = 0; i < complete; i++) {
    if (complete[i] === false) {
       $(`#${id}`).show();
    }
    else {
       $(`#${id}`).hide();
    }
  }  
}

function prependTaskCard(id, title, body, quality, completed) {
  $('#task-card-storage').prepend(
    `<article class="task-card" id="${id}">
      <div class="card-header">
        <h2 class="card-title" contenteditable="true">${title}</h2> 
        <button class="delete-button button" name="delete button"><img src="FEE-taskbox-icon-assets/transparent.png" width="30px" height="30px"></button>
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
  var lastTen = Object.keys(localStorage).slice(-10);

  for (var i = 0; i < lastTen.length; i++) {
    keyValues.push(JSON.parse(localStorage.getItem(lastTen[i])));
  }
  return keyValues;
}

function addTaskCard() {
  event.preventDefault();
  prependTaskCard();
  clearInputs();
}

function deleteTaskCard() {
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

function changeTaskTitle() {
  var currentTitle = $(this).text();
  var cardId = parseInt($(this).closest('article').attr('id'));
  var cardObject = getObjectFromStorage(cardId);
  cardObject.title = currentTitle;
  sendUpdatesToLocalStorage(cardObject);
}

function changeTaskBody() {
  var currentBody = $(this).text();
  var cardId = parseInt($(this).closest('article').attr('id'));
  var cardObject = getObjectFromStorage(cardId);
  cardObject.body = currentBody;
  sendUpdatesToLocalStorage(cardObject);
}

function clearAllCards() {
  $('#task-card-storage').text('');
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
    $(this).closest(".task-card").toggleClass("greyed-out");
  }
  sendUpdatesToLocalStorage(cardObject);
}

function showToDos () {  
  for (var i = 0; i < localStorage.length; i++) {
  var retrievedObject = localStorage.getItem(localStorage.key(i));
  var parsedObject = JSON.parse(retrievedObject);
 
  if (parsedObject.completed === true) {
    var cardId = parsedObject.id;
    $('#task-card-storage').prepend($(`#${cardId}:hidden`).show());
    $(`#${cardId}`).closest(".task-card").toggleClass("greyed-out");
  }
}
}

function critical() {
  for (var i = 0; i < localStorage.length; i++) {
  var retrievedObject = localStorage.getItem(localStorage.key(i));
  var parsedObject = JSON.parse(retrievedObject);
  var cardId = parsedObject.id;

  if (parsedObject.quality == "Critical") {
    $('#task-card-storage').prepend($(`#${cardId}`).show());
    
  } else {
    $('#task-card-storage').prepend($(`#${cardId}`).hide());
  }
}
}

function high() {
  for (var i = 0; i < localStorage.length; i++) {
  var retrievedObject = localStorage.getItem(localStorage.key(i));
  var parsedObject = JSON.parse(retrievedObject);
  var cardId = parsedObject.id;

  if (parsedObject.quality == "High") {
    $('#task-card-storage').prepend($(`#${cardId}`).show());
    
  } else {
    $('#task-card-storage').prepend($(`#${cardId}`).hide());
  }
}
}

function normal() {
  for (var i = 0; i < localStorage.length; i++) {
  var retrievedObject = localStorage.getItem(localStorage.key(i));
  var parsedObject = JSON.parse(retrievedObject);
  var cardId = parsedObject.id;

  if (parsedObject.quality == "Normal") {
    $('#task-card-storage').prepend($(`#${cardId}`).show());
    
  } else {
    $('#task-card-storage').prepend($(`#${cardId}`).hide());
  }
}
}

function low() {
  for (var i = 0; i < localStorage.length; i++) {
  var retrievedObject = localStorage.getItem(localStorage.key(i));
  var parsedObject = JSON.parse(retrievedObject);
  var cardId = parsedObject.id;

  if (parsedObject.quality == "Low") {
    $('#task-card-storage').prepend($(`#${cardId}`).show());
    
  } else {
    $('#task-card-storage').prepend($(`#${cardId}`).hide());
  }
}
}

function none() {
  for (var i = 0; i < localStorage.length; i++) {
  var retrievedObject = localStorage.getItem(localStorage.key(i));
  var parsedObject = JSON.parse(retrievedObject);
  var cardId = parsedObject.id;

  if (parsedObject.quality == "None") {
    $('#task-card-storage').prepend($(`#${cardId}`).show());
    
  } else {
    $('#task-card-storage').prepend($(`#${cardId}`).hide());
  }
}
}

function moreToDos() {
  var keyValues = [];
  var keys = Object.keys(localStorage).slice(0, -11)

  for (var i = 0; i < keys.length; i++) {
    keyValues.push(JSON.parse(localStorage.getItem(keys[i])));
  }
  return keyValues;
}

















