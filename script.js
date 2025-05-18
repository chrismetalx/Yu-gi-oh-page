// go top button

window.onscroll = function () {
  if (document.documentElement.scrollTop > 1000) {
    document.querySelector('.go-top-container').classList.add('show');
  } else {
    document.querySelector('.go-top-container').classList.remove('show');
  }
}

document.querySelector('.go-top-container').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// menu hamburguer

document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const menuClose = document.querySelector('.menu-close');
  const navMenu = document.querySelector('.nav-menu');

  // open menu
  menuToggle.addEventListener('click', function () {
    navMenu.classList.add('active');
    menuToggle.classList.add('d-none');
    menuClose.classList.add('d-block');
    navMenu.classList.remove('d-none');
  });

  // close menu
  menuClose.addEventListener('click', function () {
    navMenu.classList.remove('active');
    menuClose.classList.remove('d-block');
    menuToggle.classList.remove('d-none');
    navMenu.classList.add('d-none');
  });

  // Close menu when clicking on a link
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', function () {
      if (window.innerWidth <= 991) {
        navMenu.classList.remove('active');
      }
    });
  });

  // Close menu by clicking outside it
  document.addEventListener('click', function (event) {
    if (window.innerWidth <= 991 && navMenu.classList.contains('active')) {
      if (!navMenu.contains(event.target) &&
        !menuToggle.contains(event.target) &&
        !menuClose.contains(event.target)) {
        navMenu.classList.remove('active');
        navMenu.classList.add('d-none');
        menuClose.classList.remove('d-block');
        menuToggle.classList.remove('d-none');
      }
    }
  });
});