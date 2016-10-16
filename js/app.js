var setActive = function (el) {
  $('#' + el).addClass('is-active');
  $('#' + el).siblings().removeClass('is-active');
};

var setNav = function () {
  var page = $('body').attr('class');
  if (page !== 'default') {
    setActive(page);
  }
};

$(document).ready(function() {
  console.log('app.js running...');
  setNav();
});