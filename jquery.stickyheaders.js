/*!
 * jQuery StickyHeaders Plugin v1.0.0
 * https://github.com/Hypnopompia/jquery-stickyheaders
 *
 * Copyright 2014 TJ Hunter
 * Twitter: @hunter_tj
 * Released under the MIT license
 *
 * Inspired by ideas from https://stackoverflow.com/questions/13279725/getting-a-sticky-header-to-push-up-like-in-instagrams-iphone-app-using-css-a
 *
 */
	(function ( $ ) {

		$.fn.stickyHeaders = function( options ) {

			var settings = $.extend({}, $.fn.stickyHeaders.defaults, options );

			var stickyContainer = $(this);
			settings.containerOffset = $(this).offset().top;

			$(settings.gradientSelector).css('top', ( settings.containerOffset + $(this).height() - $(settings.gradientSelector).height() ) + 'px');

			$(this).children(settings.headerSelector).each(function(i){ // loop through all of the sticky header elements
				var sticky = $(this).wrap('<div class="stickyWrap" />'); // wrap each sticky header with a div that will stay in place as a height placeholder when we 'dock' the real header to the top of the scroll window.
				sticky.parent().height(sticky.outerHeight()); // Set the wrap to the same height as the real sticky header so that lower DOM elements won't shift up
				sticky.attr('data-originalPOS', sticky.position().top); // save the original position of the sticky when we started. we need this to restore it later.
			});


			function scroll() {
				
				var stickyHeaders = stickyContainer.find(settings.headerSelector);
				stickyHeaders.each(function(i){
					var thisSticky = $(this);
					var nextSticky = stickyHeaders.eq(i+1);
					var prevSticky = stickyHeaders.eq(i-1);
					var pos = thisSticky.attr('data-originalPOS');

					if (pos <= stickyContainer.scrollTop()) { // this header is higher or equal to the position of the scroll bar
						thisSticky.addClass("fixed");

						if (nextSticky.length > 0 && stickyContainer.scrollTop() > nextSticky.attr('data-originalPOS') - thisSticky.outerHeight()) {
							// there is a next header, and the current header is starting to collide the space the next header is occupying, start pushing the current header up off the container
							// console.log(i + ' is pinned!');
							thisSticky.addClass("absolute");
							var top = nextSticky.attr('data-originalPOS') - thisSticky.outerHeight();
							thisSticky.css("top", top);
						} else { // this is the current header, 'dock' it to the top of the scroll container
							// console.log(i + ' is docked to ' + settings.containerOffset);
							thisSticky.css("top", settings.containerOffset - $(window).scrollTop() ); // fix this header at the top of the container taking into account the window's scroll position
						}

						

					} else { // this header is below the position of the scroll bar
						// console.log(i + ' is default');
						thisSticky.removeClass("fixed");

						if (prevSticky.length > 0 && stickyContainer.scrollTop() <= thisSticky.attr('data-originalPOS')  - prevSticky.outerHeight()) {
							prevSticky.removeClass("absolute"); //.removeAttr("style");
						}

					}

				});
				// console.log('---');
			}

			$(this).on('scroll', scroll);
			$(window).on('scroll', scroll); // update positions when the main window scrolls as well

			return this;
		};

		$.fn.stickyHeaders.defaults = {
			headerSelector: ".stickyHeader",
			gradientSelector: ".stickyGradient"
		};

	}( jQuery ));