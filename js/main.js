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
  dataObj.entryId = data.nextEntryId.value;
  data.entries.push(dataObj);
  data.nextEntryId.value++;
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}

$form.addEventListener('submit', handleSubmit);

function handleUnload(event) {
  var dataStored = JSON.stringify(data);
  localStorage.setItem('coding-journal', dataStored);
}
window.addEventListener('beforeunload', handleUnload);
