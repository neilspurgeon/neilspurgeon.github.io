$(document).ready(function() {
  console.log('JS LOADED');

  MenuTitleAnimation = (function() {
    console.log('MenuTitleAnimation triggered');

    var triggerPos = window.innerHeight / 2;

    function doThisStuffOnScroll() {
        console.log('do this stuff');

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
    }

    doThisStuffOnScroll();
    window.onscroll = doThisStuffOnScroll;

  })();

});