var setActive = function (el) {
  $('#' + el).addClass('is-active');
  $('#' + el).siblings().removeClass('is-active');
};

var setNav = function () {
  var page = $('body').attr('class');
  if (page !== 'default') {
    setActive(page);
  }
  if (page === 'about') {
    setDarkTheme();
  }
};

var setDarkTheme = function() {
  $('html').css({'background-color': '#171817'});
};

$(document).ready(function() {
  console.log('app.js running...');
  setNav();

  var menuBtn = document.getElementById('menu-btn');
  var menu = document.getElementById('primary-nav');

  menuBtn.onclick = function() {
    document.activeElement.blur();
    if (menu.classList.contains('is-open')) {
      menu.classList.remove('is-open');
      menuBtn.classList.remove('is-open');
    } else {
      menu.classList.add('is-open');
      menuBtn.classList.add('is-open');
    }
  }
});

$(function() {
    $('#content-bg').removeClass('fade-out');
    $('footer').removeClass('fade-out');
});