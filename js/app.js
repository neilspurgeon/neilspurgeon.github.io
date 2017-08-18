---
---

var mask = function() {
  var maskedEl = document.getElementById('site-byline');
  maskedEl.height = maskedEl.offsetWidth;
  maskedEl.posTop = window.innerHeight - maskedEl.height - 20;
  maskedEl.posBottom = window.innerHeight - 20;

  var footer = document.getElementById('site-footer');

  window.onscroll = function() {
    var footerPos = footer.getBoundingClientRect().top;

    console.log('posTop:' + maskedEl.posTop + ' posBottom:' + maskedEl.posBottom)

    if (footerPos > maskedEl.posTop && footerPos < maskedEl.posBottom) {
      var clipAmount = window.innerHeight - 20 - footerPos;
      console.log(clipAmount);

      maskedEl.style.clipPath = 'inset(0 ' +  clipAmount + 'px 0 0)';
    }
  }
}

var animateLinks = function() {
  var links = document.querySelectorAll('.body-link');
  if (links[0]) {

    for (var i=0; i<links.length; i++) {
      links[i].addEventListener('mouseover', function(e) {
        this.classList.add('hover');
      }, false);
      links[i].addEventListener('animationend', function() {
        this.classList.remove('hover');
      }, false);
    }

  }
}

var backButtonShowHide = function() {
  var path = window.location.pathname;
  var homePath = '/';
  var aboutPath = '/about/';
  var backButton = document.getElementById('back-button');

  if (path !== homePath && path !== aboutPath) {
    backButton.style.visibility = 'visible';
  } else {
    backButton.style.visibility = 'hidden';
  }
}

var pageFunctions = function() {
  if (document.querySelector('.rellax')) {
    var rellax = new Rellax('.rellax');
  }
  document.querySelectorAll('.nav-li').forEach(function(el) {
    el.onclick = function() {
      var siblings = this.parentElement.children;
      for (var i=0; i<siblings.length; i++) {
        siblings[i].classList.remove('active');
      }
      this.classList.add('active');
    };
  });

  // Prevent links to current path from hard reloading
  var links = document.querySelectorAll('a[href]');
  var cbk = function(e) {
   if(e.currentTarget.href === window.location.href) {
     e.preventDefault();
     e.stopPropagation();
   }
  };

  for(var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', cbk);
  }
  animateLinks();
  backButtonShowHide();
  mask();
};

Barba.Pjax.start();
pageFunctions();

Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
  pageFunctions();
});