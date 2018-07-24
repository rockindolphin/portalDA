'use strict';

(function ($) {
	$(document).ready(function () {

		var config = {
			animDur: 500,
			formOpen: false,
			asideOpen: false,
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

		//scroll to section
		$('a[href^="#"]').click( (evt) => {
			evt.preventDefault();
			var contentTop = $('.landing__content').offset().top;
			var sectionTop = $(evt.target.hash).offset().top;
			$('.landing__content-wrapper').animate({
				scrollTop: sectionTop - contentTop
			}, config.animDur*2);			
		});

		function updateTopSlider(delay){
			var setback = delay || config.animDur;
			setTimeout( () => {
				requestAnimationFrame(() => {
					landingTopSlider.update();
				})
			}, setback);	
		}

		//toggle aside/form
		function openAside(evt){
			config.asideOpen = true;
			$('.landing__content-wrapper').addClass('landing__content-wrapper--shifted');
			$('.landing__aside-wrapper').removeClass('landing__aside-wrapper--hidden');
			$('#aside-open').hide();
			updateTopSlider();
		}

		function closeAside(evt){
			config.asideOpen = false;
			$('.landing__content-wrapper').removeClass('landing__content-wrapper--shifted');
			$('.landing__aside-wrapper').addClass('landing__aside-wrapper--hidden');
			$('#aside-open').show();
			updateTopSlider();
		}		

		function toggleAside(evt){
			config.asideOpen ? closeAside(evt) : openAside(evt);
		}

		$('[data-toggle="landing-aside"]').click((evt) => {
			toggleAside(evt);
		});

		function openForm(evt){
			closeAside();
			config.formOpen = true;
			$('.landing__content-wrapper').addClass('landing__content-wrapper--shifted');
			$('.landing__form-wrapper').removeClass('landing__form-wrapper--hidden');
			$('#aside-form-open').hide();
			updateTopSlider();			
		}

		function closeForm(evt){
			config.formOpen = false;
			$('.landing__content-wrapper').removeClass('landing__content-wrapper--shifted');
			$('.landing__form-wrapper').addClass('landing__form-wrapper--hidden');
			$('#aside-form-open').show();	
			updateTopSlider();
		}

		function toggleForm(evt){
			config.formOpen ? closeForm(evt) : openForm(evt);			
		}

		$('[data-toggle="landing-form"]').click((evt) => {
			toggleForm(evt);
		});	

		//toggle menu items
		function toggleMenuItem(num){
			$('.landing__aside-menu .menu__item--active')
				.removeClass('menu__item--active');
			$(`.landing__aside-menu a[href^="#section-${num}"]`)
				.closest('.menu__item')
				.addClass('menu__item--active');
		}

		var controller = new ScrollMagic.Controller({
			container: '.landing__content-wrapper'
		});

		function addScene(sectionNum){
			new ScrollMagic.Scene({triggerElement: `#section-${sectionNum}` })
							//.triggerHook('onLeave')
							.on('enter leave', function (evt) {
								evt.type == 'enter' ? toggleMenuItem(sectionNum) : toggleMenuItem(sectionNum-1);
							})                              
							.addTo(controller);			
		}

		[2, 3, 4].map((num) => {
			addScene(num);
		});

	});
})(jQuery);
//# sourceMappingURL=app.js.map
//# sourceMappingURL=app.js.map
