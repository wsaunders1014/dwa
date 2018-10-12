var film;
$(document).ready(function(){
	$('.poster').on('click', function(){
		var id = $(this).attr('id');
		var index = $(this).index('.poster');
		console.log(index);
		film = id;
		$('header, .content').addClass('flipped');
		$('.page.'+id).delay(0).fadeIn(400,function(){
			$(this).find('.landing').addClass('alwaysOn');
		});

		$('.'+film).find('.static').delay(1000).fadeIn()
		$('.film-menu').children().eq(index).addClass('active');
	});
	$('.film-menu > div').click(function(){
		if(!$(this).hasClass('active')){
			var id = $(this).text().toLowerCase();
			id=id.split(' ').join('-');
			film = id;
			console.log(id);
			$('.page').fadeOut();

			current = 1;
			$('.slider').removeAttr('style')
			$('.page.'+id).delay().stop().fadeIn(400, function(){
				$('.page.'+id).find('.landing').addClass('alwaysOn')
			});
			$('.'+film).find('.static').delay(1000).fadeIn()
			$(this).addClass('active').siblings('.active').removeClass('active');

		}
	})
	//Main Nav
	$('.nav > li').click(function(){
		if(!$(this).hasClass('current')){
			var subpage = $(this).find('span').text().toLowerCase();
			console.log(subpage);
			if(subpage != 'videos'){
				$('.'+film).find('.on').removeClass('on');
				$(this).addClass('current').siblings('.current').removeClass('current').children('.sub-nav').children().first().addClass('current');
			}
			if(subpage == 'filmmakers'){
				$('.'+film).find('.filmmakers').find('.right').children().hide().first().show();
				$('.'+film).find('.static').find('.current').find('.sub-nav').children().removeClass('current').first().addClass('current');
			}
			$('.'+film).find('.'+subpage).addClass('on');
			//$('.'+film).find('.'+subpage).addClass('on').find('.right').children().fadeOut();
			//$('.'+film).find('.'+subpage).stop().fadeIn();


		}
	});
	//SUB NAV
	$('.sub-nav > li').click(function(){
		if(!$(this).hasClass('current')){
			var index = $(this).index();
			console.log(index);
			$(this).addClass('current').siblings('.current').removeClass('current');
			$('.'+film).find('.filmmakers').children().children().fadeOut();
			$('.'+film).find('.filmmakers').children().children().eq(index).fadeIn();	
		}
	});

	var current = 1;
	//PHOTO CONTROL
	$('.arrow').click(function(){
		var slider = $(this).siblings('.slider');
		var total = $(this).siblings('.slider').children().length;
		

		console.log(total);
		if($(this).hasClass('left')){
			current--;
			slider.animate({left:'+=100%'},600);
			$(this).siblings('.number').html(current);
			$('.disabled').removeClass('disabled');
			if(current <= 1)
				$(this).addClass('disabled')
			else
				$(this).removeClass('disabled')
		}else{
			current++
			slider.animate({left:'-=100%'},600);
			$(this).siblings('.number').html(current);
			$('.disabled').removeClass('disabled');
			if(current >= total)
				$(this).addClass('disabled')
			else
				$(this).removeClass('disabled')
		}
	});

	$('.close-btn').click(function(){
		$(this).parent().removeClass('on');
		stopMedia();
	})
});
function stopMedia(){
	//console.log($('.playing').length);
	$('video').each(function(){
		this.pause();
		this.currentTime = 0;
		this.load();
	});
	// if($('.playing').length != 0){
	// 	$('.playing').siblings('video')[0].pause();
	// 	$('.playing').siblings('video')[0].currentTime = 0;
	// 	$('.playing').siblings('video')[0].load();
	// 	$('.playing').siblings('img').fadeIn();
	// 	$('.playing').removeClass('playing').removeAttr('style');
	// }
}