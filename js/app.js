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
});

$('#about').on('click', function(e) {
  e.preventDefault();

  // trigger about overlay
  $('#about-overlay').fadeIn('10000', function() {
    setActive('about');
  })
})

$('#work').on('click', function(e) {
  e.preventDefault();

  // close about overlay and switch to index
  $('#about-overlay').fadeOut('10000', function() {
    setActive('work');

    // redirect to home page unless already on the page
    if (window.location.pathname !== '/') {
      window.location = '/'
    }

  })
})