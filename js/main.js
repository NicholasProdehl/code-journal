/* global data */
/* exported data */
var $photoURL = document.querySelector('#photoURL');
var $img = document.querySelector('img');
function handlePhoto(event) {
  $img.setAttribute('src', event.target.value);
}
$photoURL.addEventListener('input', handlePhoto);

// var dataObj = {};

// function handleSubmit(event){

// }
// document.addEventListener('submit', handleSubmit);
