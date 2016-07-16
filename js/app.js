$(document).ready(function() {

  var menuTitleAnimation = function () {
    var triggerPos = window.innerHeight / 2;

    $('.project-trigger').each(function() {
      var el    = $(this);
      var elPos = el.offset().top;
      var title = el.attr('data-title');
      var charCount = title.split('').length;

      if (window.scrollY >= (elPos - triggerPos)) {
        // Change Title
        $('#project-title')[0].innerHTML = title;
        $('#project-title').css({width: (charCount / 2) + 'em', opacity: '2'});
      } else if (window.scrollY <= triggerPos) {
        // Remove Title
        $('#project-title').css({width: '0', opacity: '0'});
      }
    });
  };

  // Media Queries
  var mediaFunctions = function () {
    var mediaQueryStr = '(min-width: 800px)';

    if (window.matchMedia(mediaQueryStr).matches) {
      // Run once on load to set title, then on scroll
      menuTitleAnimation();
      window.onscroll = menuTitleAnimation;
    } else {
      window.onscroll = null;
      $('#project-title').css({width: '0', opacity: '0'});
    }
  };

  // Check Media Queries on Resize
  window.addEventListener('resize', function() {
    mediaFunctions();
  });

});