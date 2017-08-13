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
};

Barba.Pjax.start();
pageFunctions();

Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
  pageFunctions();
});