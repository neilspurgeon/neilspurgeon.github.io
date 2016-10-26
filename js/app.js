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

$(function() {
  console.log('app.js running...');
  setNav();
  $('#content-bg').removeClass('fade-out');
  $('footer').removeClass('fade-out');
});