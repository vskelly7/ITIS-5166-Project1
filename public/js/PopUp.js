document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('rsvp-button').addEventListener('click', function () {
    const options = document.getElementById('rsvp-options');
    options.classList.toggle('hidden'); // Show/hide RSVP options
  })
});