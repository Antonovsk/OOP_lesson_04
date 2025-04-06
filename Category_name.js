document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.header__link_2');
  
    links.forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent navigation to the "#" link
  
        // Remove 'active' class from all links
        links.forEach(link => link.classList.remove('active'));
  
        // Add 'active' class to the clicked link
        this.classList.add('active');
      });
    });
  });