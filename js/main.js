/* global data:writable */
/* exported data */
var $photoURL = document.querySelector('#photoUrl');
var $img = document.querySelector('img');
function handlePhoto(event) {
  $img.setAttribute('src', event.target.value);
}
$photoURL.addEventListener('input', handlePhoto);

var previousData = localStorage.getItem('coding-journal');

if (previousData !== null) {
  data = JSON.parse(previousData);
}

var $form = document.querySelector('form');
function handleSubmit(event) {
  var dataObj = {};
  event.preventDefault();
  dataObj.title = event.target.title.value;
  dataObj.photoUrl = event.target.photoUrl.value;
  dataObj.notes = event.target.notes.value;
  dataObj.entryId = data.nextEntryId;
  handleEntries(dataObj);
  handleEntriesTag();
  data.entries.push(dataObj);
  data.nextEntryId++;
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}

$form.addEventListener('submit', handleSubmit);

function handleEntries(entry) {
  var $listItem = document.createElement('li');
  $listItem.setAttribute('class', 'row');
  var $ul = document.querySelector('ul');
  $ul.prepend($listItem);
  var $imgColumn = document.createElement('div');
  $imgColumn.setAttribute('class', 'column-half');
  $listItem.appendChild($imgColumn);
  var $image = document.createElement('img');
  $image.setAttribute('src', entry.photoUrl);
  $image.setAttribute('alt', entry.title);
  $imgColumn.appendChild($image);
  var $textColumn = document.createElement('div');
  $textColumn.setAttribute('class', 'column-half');
  $listItem.appendChild($textColumn);
  var $pTitle = document.createElement('p');
  $pTitle.setAttribute('class', 'title');
  $pTitle.textContent = entry.title;
  $textColumn.appendChild($pTitle);
  var $pNotes = document.createElement('p');
  $pNotes.setAttribute('class', 'notes');
  $pNotes.textContent = entry.notes;
  $textColumn.appendChild($pNotes);
}

function entriesLoop() {
  var length = data.entries.length;
  for (var i = 0; i < length; i++) {
    handleEntries(data.entries[i]);
    if (data.view === 'entries') {
      handleEntriesTag();
    }

  }
}

window.addEventListener('DOMContentLoaded', entriesLoop);

var $entriesTag = document.querySelector('.entries-tag');
function handleEntriesTag(event) {
  var $temp1 = document.querySelector('[data-view="entry-form"]');
  var $temp2 = document.querySelector('[data-view="entries"]');
  $temp1.className = 'hidden';
  $temp2.className = '';
}
$entriesTag.addEventListener('click', handleEntriesTag);

var $entryForm = document.querySelector('.new-entry');
function handleEntryForm(event) {
  var $temp1 = document.querySelector('[data-view="entries"]');
  var $temp2 = document.querySelector('[data-view="entry-form"]');
  $temp1.className = 'hidden';
  $temp2.className = '';
}
$entryForm.addEventListener('click', handleEntryForm);

function handleUnload(event) {
  if (document.querySelector('[data-view="entries"]').className === '') {
    data.view = 'entries';
  } else {
    data.view = 'entry-form';
  }
  var dataStored = JSON.stringify(data);
  localStorage.setItem('coding-journal', dataStored);
}
window.addEventListener('beforeunload', handleUnload);
