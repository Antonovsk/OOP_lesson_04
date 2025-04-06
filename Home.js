document.addEventListener('DOMContentLoaded', function() {
  const homeLink = document.querySelector('.2');
  const growthLink = document.querySelector('.3');
  const rulesLink = document.querySelector('.4');

  function toggleVisibility(element) {
    if (element) {
      element.classList.remove('hidden');
    }
  }

  if (homeLink && growthLink && rulesLink) {
    homeLink.addEventListener('click', function(event) {
      event.preventDefault();
      toggleVisibility(growthLink);
    });

    growthLink.addEventListener('click', function(event) {
      event.preventDefault();
      toggleVisibility(rulesLink);
    });
  }
});