$.fn.textWidth = function(text, font) {
    if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
    $.fn.textWidth.fakeEl.text(text || this.val() || this.text()).css('font', font || this.css('font'));
    return $.fn.textWidth.fakeEl.width();
};

$.fn.moveIt = function(){
  var $window = $(window);
  var instances = [];
  
  $(this).each(function(){
    instances.push(new moveItItem($(this)));
  });
  
  window.onscroll = function(){
    var scrollTop = $window.scrollTop();
    instances.forEach(function(inst){
      inst.update(scrollTop);
    });
  };
};

// var moveItItem = function(el){
//   this.el = $(el);
//   this.speed = parseInt(this.el.attr('data-scroll-speed'));
// };

// moveItItem.prototype.update = function(scrollTop){
//   var pos = scrollTop / this.speed;
//   this.el.css('transform', 'translateY(' + -pos + 'px)');
// };





$(document).ready(function() {

  // $(function(){
  //   $('[data-scroll-speed]').moveIt();
  // });

  var menuTitleAnimation = function () {
    var triggerPos = window.innerHeight / 2;

    $('.project-trigger').each(function() {
      var el    = $(this);
      var elPos = el.offset().top;
      var title = el.attr('data-title');
      var prjctTitle = $('#project-title');

      if (window.scrollY >= (elPos - triggerPos)) {
        // Change Title
        prjctTitle[0].innerHTML = title;
        
        var titleWidth = prjctTitle.textWidth() + 20;
        prjctTitle.css({ width: titleWidth, opacity: '2'});
      } else if (window.scrollY <= triggerPos) {
        // Remove Title
        $('#project-title').css({width: '0', opacity: '0'});
      }
    });
  };

  // Media Queries
  var mediaFunctions = function () {
    var mediaQueryStr = '(min-width: 800px)';

    if (window.matchMedia(mediaQueryStr).matches) {
      window.onscroll = menuTitleAnimation;
    } else {
      window.onscroll = null;
      $('#project-title').css({width: '0', opacity: '0'});
    }
  };

  // Check Media Queries on Resize
  window.addEventListener('resize', function() {
    mediaFunctions();
  });

  mediaFunctions();

});