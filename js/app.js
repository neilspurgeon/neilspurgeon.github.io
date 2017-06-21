$(function(){
  'use strict';
  var $page = $('#main'),
      options = {
        debug: true,
        prefetch: false,
        cacheLength: 0,
        onStart: {
          duration: 500, // Duration of our animation
          render: function ($container) {
            // Add your CSS animation reversing class
            $container.addClass('is-exiting');
            // Restart your animation
            smoothState.restartCSSAnimations();
          }
        },
        onReady: {
          duration: 0,
          render: function ($container, $newContent) {
            // Remove your CSS animation reversing class
            $container.removeClass('is-exiting');
            // Inject the new content
            $container.html($newContent);
            // Remove scroll lock caused by side nav
            $('body').removeClass('lock-scroll');
          }
        },
        onAfter: function($container, $newContent) {
          pageFunctions();
        }
      },
      smoothState = $page.smoothState(options).data('smoothState');
});

var pageFunctions = function() {

  var menuBtn = document.getElementById('menu-btn');
  var menu = document.getElementById('primary-nav');
  var overlay = document.getElementById('menu-overlay');
  var main = document.getElementById('main');
  var footer = document.getElementById('site-footer');
  var body = document.body;

  $('#menu-btn').on('click', function() {
    console.log('clicked');
    document.activeElement.blur();
    if (menu.classList.contains('is-open')) {
      // menu.classList.remove('scene-element--fadeinright');
      menu.classList.remove('is-open');
      menuBtn.classList.remove('is-open');
      overlay.classList.remove('menu-is-open');
      body.classList.remove('lock-scroll');
      main.classList.remove('nav-is-open');
      footer.classList.remove('nav-is-open');

    } else {
      menu.classList.add('is-open');
      menuBtn.classList.add('is-open');

      overlay.classList.add('menu-is-open');
      body.classList.add('lock-scroll');
      main.classList.add('nav-is-open');
      footer.classList.add('nav-is-open');
      menu.classList.add('scene-element--fadeinright');
    }
  });

  overlay.onclick = function() {
    body.classList.remove('lock-scroll');
    menu.classList.remove('is-open');
    menuBtn.classList.remove('is-open');
    overlay.classList.remove('is-open');
  }

  var reveal = function() {
    var elements = document.getElementsByClassName('reveal');

    for (i=0; i<elements.length; i++) {
      if (elements[i].offsetTop < (window.scrollY + window.innerHeight + 10) ) {
        elements[i].classList.remove('reveal--out');
      }
    }
  }

  window.setTimeout(function() {
    reveal()
  }, 00);

  var didScroll = false;

  window.onscroll = function() {
    window.didScroll = true;
  }

  setInterval(function() {
    if(didScroll) {
      reveal();
      didScroll = false;
    }
  });
}

pageFunctions();