
// $('#save-button').on('click', addIdeaCard);
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

function MakeIdeaCardObject(id, title, body){
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = quality[i];
}

function createCard() {
  event.preventDefault();
  var storedObjDateStamp = Date.now();
  var newCard = new MakeIdeaCardObject( storedObjDateStamp, $('#title-input').val(), $('#body-input').val())
  console.log(newCard);
  var stringifiedObject = JSON.stringify(newCard);
  localStorage.setItem(storedObjDateStamp, stringifiedObject);
  console.log(localStorage.getItem(storedObjDateStamp));
  var retrievedObject = localStorage.getItem(storedObjDateStamp);
  var parsedObject = JSON.parse(retrievedObject);
  console.log(parsedObject.id);
  clearInputs();
}


function prependIdeaCard() {
  var titleInput = $('#title-input').val();
  var bodyInput = $('#body-input').val();

  $('#idea-card-storage').prepend(
    `
    <article class="idea-card" id="${Date.now()}">
    <div id="card-header">
    <h2 class="card-title" contenteditable="true">${titleInput}</h2> 
    <button id="delete-button" name="delete button"><img src="FEE-ideabox-icon-assets/transparent.png" width="30px" height="30px"></button>
    </div>
    <p class="card-body" contenteditable="true">${bodyInput}</p>
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

// function NewIdea(id,title,body) {
//   this.name = id;
//   this.title = title;
//   this.body = body;
//   this.quality = quality[i] || quality[0]
// }
