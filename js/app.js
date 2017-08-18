---
---

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
      const clipAmount = window.innerHeight - 20 - footerPos;
      maskedEl.style.clipPath = 'inset(0 ' +  clipAmount + 'px 0 0)';
    } else if (footerPos >= maskedEl.posBottom) {
        maskedEl.style.clipPath = 'inset(0 0 0 0)';
    } else if (footerPos <= maskedEl.posTop) {
        maskedEl.style.clipPath = 'inset(0 100% 0 0)';
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
};

Barba.Pjax.start();
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