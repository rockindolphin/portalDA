'use strict';

(function ($) {
	$(document).ready(function () {

		var config = {
			animDur: 400,
		}

		//bg images
		$('img[data-bg=true]').each(function(){
			var src = $(this).attr('src');
			var parent = $(this).parent();
			if( $(parent).is('picture') ){
				src = $(parent).find('img').get(0).currentSrc || $(parent).find('img').get(0).src;
				parent =  $(parent).parent();
			}
			$(parent).css({
				'background-image': `url(${src})`
			});
			$(this).hide();
		});

		//custom scrollbar
		$('.custom-scroll').each(function(){
			var self = this;
			var ps = new PerfectScrollbar(this, {wheelPropagation: true});
			$(this).data('ps', ps);
		});			

		//sliders
		var landingTopPagination = $('.slider--landing .swiper-pagination, .landing__header .swiper-pagination');
		var landingTopSlider = new Swiper('.slider--landing', {
			direction: 'horizontal',
			slidesPerView: 1,
			touchReleaseOnEdges: true,
			disableOnInteraction: false,
			loop: true,
			pagination: {
				el: landingTopPagination,
				type: 'bullets',
				clickable: true
			}
		});

		var landingAssetsSlider = new Swiper('.slider--assets', {
			direction: 'horizontal',
			slidesPerView: 'auto',
			loop: true,
			autoHeight: true,
			navigation: {
				nextEl: '.section--assets .swiper-button-next',
				prevEl: '.section--assets .swiper-button-prev',
			},
		});	

		//toggle aside
		function toggleAside(){
			asideOpen = !asideOpen;
			$('.landing__content-wrapper').toggleClass('landing__content-wrapper--shifted', asideOpen);
			$('.landing__aside-wrapper').toggleClass('landing__aside-wrapper--hidden', !asideOpen);
			asideOpen ? $('#aside-open').hide() : $('#aside-open').show();
			setTimeout(function(args) {
				requestAnimationFrame(() => {
					landingTopSlider.update();
				})
			}, config.animDur);			
		}

		var	asideOpen = false;

		$('[data-toggle="landing-aside"]').click(() => {
			toggleAside();
		});

		//scroll to section
		$('a[href^="#"]').click( (evt) => {
			evt.preventDefault();
			var contentTop = $('.landing__content').offset().top;
			var sectionTop = $(evt.target.hash).offset().top;
			$('.landing__content-wrapper').animate({
				scrollTop: sectionTop - contentTop
			}, config.animDur*2);			
		});

		//toggle form
		function toggleForm(){
			formOpen = !formOpen;
			$('.landing__content-wrapper').toggleClass('landing__content-wrapper--shifted', formOpen);
			$('.landing__form-wrapper').toggleClass('landing__form-wrapper--hidden', !formOpen);
			setTimeout(function(args) {
				requestAnimationFrame(() => {
					landingTopSlider.update();
				})
			}, config.animDur);			
		}

		var	formOpen = false;

		$('[data-toggle="landing-form"]').click(() => {
			toggleForm();
		});	

		window.toggleForm = toggleForm;		

	});
})(jQuery);
//# sourceMappingURL=app.js.map
//# sourceMappingURL=app.js.map
