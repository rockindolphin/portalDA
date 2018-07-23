'use strict';

(function ($) {
	$(document).ready(function () {

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

	});
})(jQuery);
//# sourceMappingURL=app.js.map
//# sourceMappingURL=app.js.map
