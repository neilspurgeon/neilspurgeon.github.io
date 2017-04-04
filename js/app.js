$(document).ready(function() {
  console.log('app.js running...');

  var menuBtn = document.getElementById('menu-btn');
  var menu = document.getElementById('primary-nav');
  var overlay = document.getElementById('menu-overlay');
  var body = document.body;

  menuBtn.onclick = function() {
    document.activeElement.blur();
    if (menu.classList.contains('is-open')) {
      menu.classList.remove('is-open');
      menuBtn.classList.remove('is-open');
      overlay.classList.remove('is-open');
      body.classList.remove('lock-scroll');
    } else {
      menu.classList.add('is-open');
      menuBtn.classList.add('is-open');
      overlay.classList.add('is-open');
      body.classList.add('lock-scroll');
    }
  }

  overlay.onclick = function() {
    body.classList.remove('lock-scroll');
    menu.classList.remove('is-open');
    menuBtn.classList.remove('is-open');
    overlay.classList.remove('is-open');
  }

  // grab an element
  var el = document.getElementById('site-header');
  // construct an instance of Headroom, passing the element
  var headroom  = new Headroom(el, {
    offset : 800,
    tolerance : 5
  });
  // initialise
  headroom.init();

});