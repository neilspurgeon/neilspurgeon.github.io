---
---

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
};

Barba.Pjax.start();
pageFunctions();

Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
  pageFunctions();
});