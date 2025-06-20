document.addEventListener('DOMContentLoaded', () => {
  // Load Header
  fetch('header.html')
    .then(response => {
      if (!response.ok) throw new Error('Header not found');
      return response.text();
    })
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;
      return import('/js/auth.js');
    })
    .then(module => {
      module.initializeAuth();
      const menuBtn = document.querySelector('.menu-btn');
      const mobileMenu = document.getElementById('mobileMenu');
      if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
          mobileMenu.classList.toggle('hidden');
        });
      } else {
        console.error('Menu button or mobile menu not found');
      }
    })
    .catch(error => console.error('Error loading header or initializing auth:', error));

  // Load Footer
  fetch('footer.html')
    .then(response => {
      if (!response.ok) throw new Error('Footer not found');
      return response.text();
    })
    .then(data => {
      document.getElementById('footer-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));
});