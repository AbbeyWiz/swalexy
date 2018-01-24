/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function ($) {

	// Use this variable to set up the common and page specific functions. If you
	// rename this variable, you will also need to rename the namespace below.
	var Sage = {
		// All pages
		'common': {
			init: function () {
				// JavaScript to be fired on all pages
				$('.hamburger').on('click', function () {
					var elem = $(this),
						item = $('.menu__item'),
						active = 'is-active',
						play = 'menu__item--play';

					if (elem.hasClass(active)) {
						elem.removeClass(active);
						$(item.get().reverse()).each(function (i) {
							var row = $(this);
							setTimeout(function () {
								row.removeClass(play);
							}, 50 * i);
						});
					}

					else {
						elem.addClass(active);
						item.each(function (i) {
							var row = $(this);
							setTimeout(function () {
								row.addClass(play);
							}, 50 * i);
						});
					}

				});


				$(function () {
					$('.menu-icon').click(function () {
						$(this).toggleClass('is-open');
					});

					$('.menu-icon-trigger').click(function () {
						$(this).parent('.menu-icon-svg').toggleClass('is-open');
					});
				});

				(function () {
					// Initialize
					var bLazy = new Blazy();
				})();

				wow = new WOW({
					boxClass: 'ab', // default
					animateClass: 'animated', // default
					offset: 0, // default
					mobile: true, // default
					live: true // default
				});
				wow.init();

				$(document).ready(function () {
					$(".owl-carousel").owlCarousel({
						items: 1,
					});
				});

				// the following to the end is whats needed for the thumbnails.
				jQuery(document).ready(function () {
					// 1) ASSIGN EACH 'DOT' A NUMBER
					dotcount = 1;

					jQuery('.owl-dot').each(function () {
						jQuery(this).addClass('dotnumber' + dotcount);
						jQuery(this).attr('data-info', dotcount);
						dotcount = dotcount + 1;
					});

					// 2) ASSIGN EACH 'SLIDE' A NUMBER
					slidecount = 1;

					jQuery('.owl-item').not('.cloned').each(function () {
						jQuery(this).addClass('slidenumber' + slidecount);
						slidecount = slidecount + 1;
					});

					// SYNC THE SLIDE NUMBER IMG TO ITS DOT COUNTERPART (E.G SLIDE 1 IMG TO DOT 1 BACKGROUND-IMAGE)
					jQuery('.owl-dot').each(function () {

						grab = jQuery(this).data('info');

						slidegrab = jQuery('.slidenumber' + grab + ' img').attr('src');
						console.log(slidegrab);

						jQuery(this).css("background-image", "url(" + slidegrab + ")");

					});

					// THIS FINAL BIT CAN BE REMOVED AND OVERRIDEN WITH YOUR OWN CSS OR FUNCTION, I JUST HAVE IT
					// TO MAKE IT ALL NEAT
					amount = jQuery('.owl-dot').length;
					gotowidth = 100 / amount;

					jQuery('.owl-dot').css("width", gotowidth + "%");
					newwidth = jQuery('.owl-dot').width();
					jQuery('.owl-dot').css("height", newwidth + "px");



				});


				(function () {
					$("#hider").delay(3000).fadeOut("slow");
				})();


				$('body').on('click', '.menu', function () {
					$(this).toggleClass('open');
				});



			},



			finalize: function () {
				// JavaScript to be fired on all pages, after page specific JS is fired
			}
		},
		// Home page
		'home': {
			init: function () {
				// JavaScript to be fired on the home page
			},
			finalize: function () {
				// JavaScript to be fired on the home page, after the init JS
			}
		},
		// About us page, note the change from about-us to about_us.
		'about_us': {
			init: function () {
				// JavaScript to be fired on the about us page
			}
		}
	};

	// The routing fires all common scripts, followed by the page specific scripts.
	// Add additional events for more control over timing e.g. a finalize event
	var UTIL = {
		fire: function (func, funcname, args) {
			var fire;
			var namespace = Sage;
			funcname = (funcname === undefined) ? 'init' : funcname;
			fire = func !== '';
			fire = fire && namespace[func];
			fire = fire && typeof namespace[func][funcname] === 'function';

			if (fire) {
				namespace[func][funcname](args);
			}
		},
		loadEvents: function () {
			// Fire common init JS
			UTIL.fire('common');

			// Fire page-specific init JS, and then finalize JS
			$.each(document.body.className.replace(/-/g, '_').split(/\s+/), function (i, classnm) {
				UTIL.fire(classnm);
				UTIL.fire(classnm, 'finalize');
			});

			// Fire common finalize JS
			UTIL.fire('common', 'finalize');
		}
	};

	// Load Events
	$(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
