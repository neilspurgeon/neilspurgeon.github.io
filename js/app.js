'use strict';

var addClass = function addClass(el, className) {
  document.querySelector(el).classList.add(className);
};

var onLoad = function onLoad() {
  window.onload = function () {

    // add loaded class which hides loader
    addClass('body', 'loaded');

    // wait for css animation and then remove loader from dom
    window.setTimeout(function () {
      document.getElementById('page-loader').remove();
    }, 1000); // add 100ms buffer time
  };
};

var pageLoader = function pageLoader() {

  var loader = document.getElementById('page-loader');

  if (loader) {
    (function () {
      var loadStartTime = Date.now();

      window.onload = function () {
        var loadTime = Date.now() - loadStartTime;

        if (loadTime >= 1000) {
          // loaded over 2s
          addClass('body', 'loaded');
          console.log('over 2s');
        } else {
          // loaded under 2s
          var remainingTime = 2000 - loadTime;
          console.log('under 2s : ' + remainingTime);
          window.setTimeout(function () {
            addClass('body', 'loaded');
          }, remainingTime);
        }
      };
    })();
  };
};

var setVendorPrefixedCss = function setVendorPrefixedCss(element, cssProperty, cssValue) {
  element.style["webkit" + cssProperty] = cssValue;
  element.style["moz" + cssProperty] = cssValue;
  element.style["ms" + cssProperty] = cssValue;
  element.style["o" + cssProperty] = cssValue;
};

var mask = function mask() {
  var maskedEl = document.getElementById('site-byline');
  maskedEl.height = maskedEl.offsetWidth;
  maskedEl.posTop = window.innerHeight - maskedEl.height - 20;
  maskedEl.posBottom = window.innerHeight - 20;
  var footer = document.getElementById('site-footer');

  window.onscroll = function () {
    var footer = document.getElementById('site-footer');
    var footerPos = footer.getBoundingClientRect().top;

    if (footerPos > maskedEl.posTop && footerPos < maskedEl.posBottom) {
      var clipAmount = window.innerHeight - 20 - footerPos;
      var clipPathValue = 'inset(0 ' + clipAmount + 'px 0 0)';
      setVendorPrefixedCss(maskedEl, 'ClipPath', clipPathValue);
    } else if (footerPos >= maskedEl.posBottom) {
      var clipPathValue = 'inset(0 0 0 0)';
      setVendorPrefixedCss(maskedEl, 'ClipPath', clipPathValue);
    } else if (footerPos <= maskedEl.posTop) {
      var clipPathValue = 'inset(0 100% 0 0)';
      setVendorPrefixedCss(maskedEl, 'ClipPath', clipPathValue);
    }
  };
};

var animateLinks = function animateLinks() {
  var links = document.querySelectorAll('.body-link');

  if (links[0]) {
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('mouseover', function (e) {
        this.classList.add('hover');
      }, false);
      links[i].addEventListener('animationend', function () {
        this.classList.remove('hover');
      }, false);
    }
  }
};

var backButtonShowHide = function backButtonShowHide() {
  var path = window.location.pathname;
  var homePath = '/';
  var aboutPath = '/about/';
  var backButton = document.getElementById('back-button');

  if (path !== homePath && path !== aboutPath) {
    // Show
    if (backButton.classList.contains('hide')) {
      backButton.classList.remove('hide');
    }
    backButton.classList.add('show');
  } else {
    if (backButton.classList.contains('show')) {
      backButton.classList.remove('show');
      backButton.classList.add('hide');
    }
  }
};

var pageFunctions = function pageFunctions() {
  if (document.querySelector('.rellax')) {
    var rellax = new Rellax('.rellax');
  }
  document.querySelectorAll('.nav-li').forEach(function (el) {
    el.onclick = function () {
      var siblings = this.parentElement.children;
      for (var i = 0; i < siblings.length; i++) {
        siblings[i].classList.remove('active');
      }
      this.classList.add('active');
    };
  });

  // Prevent links to current path from hard reloading
  var links = document.querySelectorAll('a[href]');
  var cbk = function cbk(e) {
    if (e.currentTarget.href === window.location.href) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', cbk);
  }

  animateLinks();
  backButtonShowHide();
  pageLoader();
};

Barba.Pjax.start();
Barba.Prefetch.init();
mask();
pageFunctions();

Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container) {
  pageFunctions();
});

Barba.Dispatcher.on('initStateChange', function () {
  if (typeof ga === 'function') {
    ga('send', 'pageview', location.pathname);
  }
});

// –––––––––––––––––––––––––––––––––––––––––

var loadTransition = Barba.BaseTransition.extend({
  start: function start() {
    console.log('start');

    Promise.all([this.newContainerLoading, this.fadeOut()]).then(this.fadeIn.bind(this));
  },

  fadeOut: function fadeOut() {
    console.log('fade out');
  },

  fadeIn: function fadeIn() {
    console.log('fade in');
    window.onload = function () {
      console.log('new page loaded');
    };
    this.newContainer.style.visibility = 'visible';
    this.done();
  }
});

Barba.Pjax.getTransition = function () {
  return loadTransition;
};