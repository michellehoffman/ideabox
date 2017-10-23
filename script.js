
$('#save-button').on('click', addIdeaCard);
$('#idea-card-storage').on('click', '#delete-button', deleteIdeaCard)
$('#idea-card-storage').on('click', '#upvote-button', upvoteQuality);
$('#idea-card-storage').on('click', '#downvote-button', downvoteQuality);


var quality = ['swill', 'plausible', 'genius'];
var i = 0;

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
    <h3 class="quality-option"> ${quality[0]}</h3>
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
