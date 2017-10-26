# Ideabox

Turing School Mod 1 assignment to create idea cards in localStorage, retrieve them and edit them. 

## Architecture

For this project, we’ll be increasingly thinking about the “server” and “client” as separate entities. We’ll be using:

* JavaScript (with jQuery) to manage client-side interactions.
* JSON and localStorage to persist data between sessions.
* Your entire application will consist of one HTML page or template.

## Data Model

An Idea has an id, title, a body, and a quality.
* The id should be a unique identifier.
* title and body are free-form strings.
* quality should be one of the follow: “genius”, “plausible”, and “swill.”
By default, the idea’s “quality” should default to the lowest setting (i.e. “swill”).

## User Flows

### Viewing ideas

When visiting the application, the user should:

* See a list of all existing ideas, including the title, body, and quality for each idea.
* Ideas should appear in descending chronological order (with the most recently created idea at the top).

### Adding a new idea

On the application’s main page, a user should:

* See two text boxes for entering the “Title” and “Body” for a new idea, and a “Save” button for committing that idea.

### When a user clicks “Save”:

* A new idea with the provided title and body should appear in the idea list.
* The text fields should be cleared and ready to accept a new idea.
* The page should not reload.
* The idea should be persisted. It should still be present upon reloading the page.

### Deleting an existing idea

When viewing the idea list:

* Each idea in the list should have a link or button to “Delete” (or 𝗫).
* Upon clicking “Delete”, the appropriate idea should be removed from the list.
* The page should not reload when an idea is deleted.
* The idea should be removed from localStorage. It should not re-appear on next page load.

### Changing the quality of an idea

As we said above, ideas should start out as “swill.” In order to change the recorded quality of an idea, the user will interact with it from the idea list.

* Each idea in the list should include an “upvote” and “downvote” button.
* Clicking upvote on the idea should increase its quality one notch (“swill” → “plausible”, “plausible” → “genius”).
* Clicking downvote on the idea should decrease its quality one notch (“genius” → “plausible”, “plausible” → “swill”).
* Incrementing a “genius” idea or decrementing a “swill” idea should have no effect.

### Editing an existing idea

* When a user clicks the title or body of an idea in the list, that text should become an editable text field, pre-populated with the existing idea title or body.
* The user should be able to “commit” their changes by pressing “Enter/Return” or by clicking outside of the text field.
* If the user reloads the page, their edits will be reflected.

### Idea Filtering and Searching

We’d like our users to be able to easily find specific ideas they already created, so let’s provide them with a filtering interface on the idea list.

* At the top of the idea list, include a text field labeled “Search”.
* As a user types in the search box, the list of ideas should filter in real time to only display ideas whose title or body include the user’s text. The page should not reload.
* Clearing the search box should restore all the ideas to the list.

## Layout comps: 

![full size image comp](http://frontend.turing.io/assets/images/projects/ideabox/ideabox-01.png)

![mobile image comp](http://frontend.turing.io/assets/images/projects/ideabox/ideabox-02.png)