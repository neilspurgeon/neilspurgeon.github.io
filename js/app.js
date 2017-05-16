$(function(){
  'use strict';
  var $page = $('#main'),
      options = {
        debug: true,
        prefetch: true,
        cacheLength: 2,
        onStart: {
          duration: 250, // Duration of our animation
          render: function ($container) {
            // Add your CSS animation reversing class
            $container.addClass('is-exiting');
            // Restart your animation
            smoothState.restartCSSAnimations();

            // if ($('body').hasClass('about')) {
            //   $('body').removeClass('about');
            // }
          }
        },
        onReady: {
          duration: 0,
          render: function ($container, $newContent) {

            // if (window.location.pathname === '/about') {
            //   $('body').addClass('about');
            // }

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
  var body = document.body;

  $('#menu-btn').on('click', function() {
    console.log('clicked');
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
  });

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
    offset : 400,
    tolerance : 5
  });
  // initialise
  // headroom.init();

  $('.slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true

  });


  var didScroll = false;
  window.onscroll = doThisStuffOnScroll;
  nudge = 1;
  lastScrollPos = 0

  function doThisStuffOnScroll() {
    didScroll = true;
  }

  setInterval(function() {
    scrollPos = document.body.scrollTop + window.innerHeight;
    bodyHeight = document.body.scrollHeight;

    if(didScroll) {
      didScroll = false;
      // console.log('You scrolled');

      if ((scrollPos + 100) >= bodyHeight && scrollPos > lastScrollPos) {
        console.log('going up')
        newPos = (bodyHeight) - (scrollPos + 100);
        $('.site-title').css({'transform': 'translate3d(0, ' + newPos + 'px, 0) rotate(90deg)'});
        lastScrollPos = scrollPos;

      } else if ((scrollPos + 100) >= bodyHeight && scrollPos < lastScrollPos) {
        console.log('going down')
        newPos = (bodyHeight) - (scrollPos + 100);
        $('.site-title').css({'transform': 'translate3d(0, ' + newPos + 'px, 0) rotate(90deg)'});
        lastScrollPos = scrollPos;
      }


    }
  }, 1);


}

pageFunctions();