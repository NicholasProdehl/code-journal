/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};
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
