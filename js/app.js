$(document).ready(function() {
  console.log('JS LOADED');

  MenuTitleAnimation = (function() {
    console.log('MenuTitleAnimation triggered');

    var didScroll = false;

    var triggerPos = window.innerHeight / 2;
    var element = $('.project-trigger');
    

    window.onscroll = doThisStuffOnScroll;

    function doThisStuffOnScroll() {
        didScroll = true;
    }

    setInterval(function() {
        if(didScroll) {
            didScroll = false;
            element.each(function() {
              el    = $(this);
              var elPos = el.offset().top;
              var title = el.attr('data-title');
              var charCount = title.split('').length;

              // pos = that;

              if (window.scrollY >= (elPos - triggerPos)) {
                $('#project-title')[0].innerHTML = title;
                $('#project-title').css('width', (charCount / 2 + 'em'));
              } else if (window.scrollY <= (triggerPos )) {
                $('#project-title')[0].innerHTML = "";
              }
            });
        }
    }, 100);
  })();

});