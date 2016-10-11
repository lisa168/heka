function Swipe(container, options) {

  "use strict";

  // utilities
  var noop = function() {}; // simple no operation function
  var offloadFn = function(fn) { setTimeout(fn || noop, 0) }; // offload a functions execution
  
  // check browser capabilities
  var browser = {
    addEventListener: !!window.addEventListener,
    touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
    transitions: (function(temp) {
      var props = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'msTransition'];
      for ( var i in props ) if (temp.style[ props[i] ] !== undefined) return true;
      return false;
    })(document.createElement('swipe'))
  };

  // quit if no root element
  if (!container) return;
  var element = container.children[0];
  var slides, slidePos, width, length;
  options = options || {};
  var index = parseInt(options.startSlide, 10) || 0;
  var speed = options.speed || 300;
  //options.continuous = options.continuous !== undefined ? options.continuous : true;
 slides = element.children;
  
  var delay = options.auto || 0;
  var interval;

  function stop() {

    delay = 0;
    //clearTimeout(interval);

  }

  var start = {};
  var delta = {};
  var isScrolling;      

  // setup event capturing
  var events = {

    handleEvent: function(event) {

      switch (event.type) {
        case 'touchstart': this.start(event); break;
        case 'touchmove': this.move(event); break;
        case 'touchend': offloadFn(this.end(event)); break;
        case 'webkitTransitionEnd':
        case 'msTransitionEnd':
        case 'oTransitionEnd':
        case 'otransitionend':
        //case 'resize': offloadFn(setup.call()); break;
      }

      if (options.stopPropagation) event.stopPropagation();

    },
    start: function(event) {

      var touches = event.touches[0];

      // measure start values
      start = {

        // get initial touch coords
        x: touches.pageX,
        y: touches.pageY,

        // store time to determine touch duration
        time: +new Date

      };
      
      // used for testing first move event
      isScrolling = undefined;

      // reset delta and end measurements
      delta = {};

      // attach touchmove and touchend listeners
      element.addEventListener('touchmove', this, false);
      element.addEventListener('touchend', this, false);

    },
    move: function(event) {

      // ensure swiping with one touch and not pinching
      if ( event.touches.length > 1 || event.scale && event.scale !== 1) return

      if (options.disableScroll) event.preventDefault();

      var touches = event.touches[0];

      // measure change in x and y
      delta = {
        x: touches.pageX - start.x,
        y: touches.pageY - start.y
      }

      // determine if scrolling test has run - one time test
      if ( typeof isScrolling == 'undefined') {
        isScrolling = !!( isScrolling || Math.abs(delta.x) < Math.abs(delta.y) );
      }

      // if user is not trying to scroll vertically
      if (!isScrolling) {
        // prevent native scrolling 
        event.preventDefault();
        // stop slideshow
        stop();
      }
    },
    end: function(event) {
      // measure duration
      var duration = +new Date - start.time;
      // determine if slide attempt triggers next/prev slide
      var isValidSlide = 
            Number(duration) < 250               // if slide duration is less than 250ms
            && Math.abs(delta.x) > 20            // and if slide amt is greater than 20px
            || Math.abs(delta.x) > width/2;      

      var isPastBounds = 
            !index && delta.x > 0                            // if first slide and slide amt is greater than 0
            || index == slides.length - 1 && delta.x < 0;    // or if last slide and slide amt is less than 0

      var direction = delta.x < 0;

      // if not scrolling vertically
	if (!isScrolling) {
		if (isValidSlide && !isPastBounds) {
			if (direction) {
				if(index==0){
					fnNext();
				};         
          	} ;
        } else {
			if(delta.x>100){
				if(index!=1){
					 fnPrev();
				}else{
					fnNext()
				};
			};
		};
	}
      element.removeEventListener('touchmove', events, false)
      element.removeEventListener('touchend', events, false)

    }

  }


  // add event listeners
  if (browser.addEventListener) {
    
    // set touchstart event on element    
    if (browser.touch) element.addEventListener('touchstart', events, false);
    if (browser.transitions) {
      element.addEventListener('webkitTransitionEnd', events, false);
      element.addEventListener('msTransitionEnd', events, false);
      element.addEventListener('oTransitionEnd', events, false);
      element.addEventListener('otransitionend', events, false);
      element.addEventListener('transitionend', events, false);
    }

    // set resize event on window
    window.addEventListener('resize', events, false);

  } else {

  }

  // expose the Swipe API
  return {
    setup: function() {
      setup();

    },
    getNumSlides: function() {
      
      // return total number of slides
      return length;
    },
    kill: function() {

      // cancel slideshow
      stop();



      // reset slides
      var pos = slides.length;
    

      // removed event listeners
      if (browser.addEventListener) {

        // remove current event listeners
        element.removeEventListener('touchstart', events, false);
        element.removeEventListener('webkitTransitionEnd', events, false);
        element.removeEventListener('msTransitionEnd', events, false);
        element.removeEventListener('oTransitionEnd', events, false);
        element.removeEventListener('otransitionend', events, false);
        element.removeEventListener('transitionend', events, false);
        window.removeEventListener('resize', events, false);

      }
      else {

        window.onresize = null;

      }

    }
  }

}


if ( window.jQuery || window.Zepto ) {
  (function($) {
    $.fn.Swipe = function(params) {
      return this.each(function() {
        $(this).data('Swipe', new Swipe($(this)[0], params));
      });
    }
  })( window.jQuery || window.Zepto )
};
/*下一页*/
function fnNext(){
	aPage.eq(0).find('.syright').stop().transition({right:"-50%"},1800,'ease-out');
	aPage.eq(0).find('.syleft').stop().transition({left:"-50%"},1800,'ease-out',function(){
		pagemove = true;
		aPage.eq(0).css('display','none');
	});
	aPage.eq(1).addClass('active');
};
/*下翻页*/
function  fnPrev(){
	aPage.eq(0).css('display','block');
	aPage.eq(0).find('.syright').stop().transition({right:"0"},500,'ease-out');
	aPage.eq(0).find('.syleft').stop().transition({left:"0"},500,'ease-out',function(){
		pagemove = true;
	});
	aPage.eq(1).removeClass('active');
};	
