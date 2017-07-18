---
---

function toggleMenu() {
  var menu = document.getElementById('primary-nav');

  if (menu.classList.contains('is-open')) {
    closeMenu();
  } else {
    openMenu();
  }
}

function closeMenu() {
  var menuBtn = document.getElementById('menu-btn');
  var menu = document.getElementById('primary-nav');
  var overlay = document.getElementById('menu-overlay');
  var main = document.getElementById('main');
  var footer = document.getElementById('site-footer');
  var body = document.body;

  menu.classList.remove('is-open');
  menuBtn.classList.remove('is-open');
  overlay.classList.remove('menu-is-open');
  body.classList.remove('lock-scroll');
  footer.classList.remove('nav-is-open');
}

function openMenu() {
  var menuBtn = document.getElementById('menu-btn');
  var menu = document.getElementById('primary-nav');
  var overlay = document.getElementById('menu-overlay');
  var main = document.getElementById('main');
  var footer = document.getElementById('site-footer');
  var body = document.body;

  menu.classList.add('is-open');
  menuBtn.classList.add('is-open');
  overlay.classList.add('menu-is-open');
  body.classList.add('lock-scroll');
  footer.classList.add('nav-is-open');
  menu.classList.add('scene-element--fadeinright');
}

var pageFunctions = function() {

  if (document.querySelector(".rellax")) {
    var rellax = new Rellax('.rellax');
  }

  document.getElementById('menu-btn').onclick = function() {
    console.log('clicked');
    document.activeElement.blur();
    toggleMenu();
  };

  document.getElementById('menu-overlay').onclick = function() {
    closeMenu();
  }
}

pageFunctions();