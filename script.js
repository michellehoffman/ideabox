
$('#save-button').on('click', addIdeaCard);
$('#idea-card-storage').on('click', '#delete-button', deleteIdeaCard)

function prependIdeaCard() {
  var titleInput = $('#title-input').val();
  var bodyInput = $('#body-input').val();

  $('#idea-card-storage').prepend(
    `
    <article class="idea-card" id="unique-id">
    <div id="card-header">
    <h2 class="card-title">${titleInput}</h2> 
    <img id="delete-button" src="FEE-ideabox-icon-assets/transparent.png" alt="delete button">
    </div>
    <p class="card-body">${bodyInput}</p>
    <div id="card-footer">
    <img id="upvote-button" src="FEE-ideabox-icon-assets/transparent.png" alt="upvote button">
    <img id="downvote-button" src="FEE-ideabox-icon-assets/transparent.png" alt="downvote button">
    <h3 class="quality">quality:</h3>
    <h3 class="quality-option"> swill</h3>
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