---
---

const addClass = (el, className) => {
  document.querySelector(el).classList.add(className);
};

const onLoad = () => {
  window.onload = () => {

    // add loaded class which hides loader
    addClass('body', 'loaded');

    // wait for css animation and then remove loader from dom
    window.setTimeout(function() {
      document.getElementById('page-loader').remove();
    }, 1000); // add 100ms buffer time
  };
}

const pageLoader = () => {

  const loader = document.getElementById('page-loader');

  if (loader) {
    const loadStartTime = Date.now();

    window.onload = () => {
      const loadTime = Date.now() - loadStartTime;

      if (loadTime >= 1000) {
        // loaded over 2s
        addClass('body', 'loaded');
        console.log('over 2s');
      } else {
        // loaded under 2s
        const remainingTime = 2000 - loadTime;
        console.log('under 2s : ' + remainingTime);
        window.setTimeout(function(){ addClass('body', 'loaded')}, remainingTime)
      }
    };
  };
};

const setVendorPrefixedCss = (element, cssProperty, cssValue) => {
  element.style["webkit" + cssProperty] = cssValue;
  element.style["moz" + cssProperty] = cssValue;
  element.style["ms" + cssProperty] = cssValue;
  element.style["o" + cssProperty] = cssValue;
}

const mask = () => {
  const maskedEl = document.getElementById('site-byline');
    maskedEl.height = maskedEl.offsetWidth;
    maskedEl.posTop = window.innerHeight - maskedEl.height - 20;
    maskedEl.posBottom = window.innerHeight - 20;
  const footer = document.getElementById('site-footer');

  window.onscroll = () => {
    const footer = document.getElementById('site-footer');
    const footerPos = footer.getBoundingClientRect().top;

    if (footerPos > maskedEl.posTop && footerPos < maskedEl.posBottom) {
      let clipAmount = window.innerHeight - 20 - footerPos;
      let clipPathValue = 'inset(0 ' +  clipAmount + 'px 0 0)';
      setVendorPrefixedCss(maskedEl, 'ClipPath', clipPathValue );

    } else if (footerPos >= maskedEl.posBottom) {
        let clipPathValue = 'inset(0 0 0 0)';
        setVendorPrefixedCss(maskedEl, 'ClipPath', clipPathValue );

    } else if (footerPos <= maskedEl.posTop) {
        let clipPathValue = 'inset(0 100% 0 0)';
        setVendorPrefixedCss(maskedEl, 'ClipPath', clipPathValue );
    }
  }
}

const animateLinks = () => {
  const links = document.querySelectorAll('.body-link');

  if (links[0]) {
    for (let i=0; i<links.length; i++) {
      links[i].addEventListener('mouseover', function(e) {
        this.classList.add('hover');
      }, false);
      links[i].addEventListener('animationend', function() {
        this.classList.remove('hover');
      }, false);
    }
  }
}

const backButtonShowHide = () => {
  const path = window.location.pathname;
  const homePath = '/';
  const aboutPath = '/about/';
  const backButton = document.getElementById('back-button');

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
}

const pageFunctions = () => {
  if (document.querySelector('.rellax')) {
    const rellax = new Rellax('.rellax');
  }
  document.querySelectorAll('.nav-li').forEach(function(el) {
    el.onclick = function() {
      const siblings = this.parentElement.children;
      for (let i=0; i<siblings.length; i++) {
        siblings[i].classList.remove('active');
      }
      this.classList.add('active');
    };
  });

  // Prevent links to current path from hard reloading
  const links = document.querySelectorAll('a[href]');
  const cbk = function(e) {
   if(e.currentTarget.href === window.location.href) {
     e.preventDefault();
     e.stopPropagation();
   }
  };

  for(let i = 0; i < links.length; i++) {
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

Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
  pageFunctions();
});

Barba.Dispatcher.on('initStateChange', function() {
  if (typeof ga === 'function') {
    ga('send', 'pageview', location.pathname);
  }
});

// –––––––––––––––––––––––––––––––––––––––––

var loadTransition = Barba.BaseTransition.extend({
  start: function() {
    console.log('start');

    Promise
      .all([this.newContainerLoading, this.fadeOut()])
      .then(this.fadeIn.bind(this));
  },

  fadeOut: function() {
    console.log('fade out');
  },

  fadeIn: function() {
    console.log('fade in');
    window.onload = function(){
      console.log('new page loaded');
    };
    this.newContainer.style.visibility = 'visible';
    this.done();
  }
});

Barba.Pjax.getTransition = function() {
  return loadTransition;
};
