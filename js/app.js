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
  $('#content-bg').css({'background-color': '#171817'});
  $('html').css({'background-color': '#171817'});
};

$(document).ready(function() {
  console.log('app.js running...');
  setNav();
});