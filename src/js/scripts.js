var film;
$(document).ready(function(){
	$('.poster').on('click', function(){
		var id = $(this).attr('id');
		var index = $(this).index('.poster');
		console.log(index);
		film = id;
		$('header, .content').addClass('flipped');
		$('.page.'+id).delay(0).fadeIn();
		
		$('.film-menu').children().eq(index).addClass('active');
	});
	$('.film-menu > div').click(function(){
		if(!$(this).hasClass('active')){
			var id = $(this).text().toLowerCase();
			id=id.split(' ').join('-');
			film = id;
			console.log(id);
			$('.page').fadeOut();
			$('.page.'+id).delay(500).stop().fadeIn();
			$(this).addClass('active').siblings('.active').removeClass('active');

		}
	})
	//Main Nav
	$('.nav > li').click(function(){
		if(!$(this).hasClass('current')){
			var subpage = $(this).find('span').text();
			console.log(subpage)
			$(this).addClass('current').siblings('.current').removeClass('current');
			$('.'+film).find('.right').children().fadeOut();
			$('.'+film).find('.'+subpage.toLowerCase()).stop().fadeIn();
		}
	});
	//SUB NAV
	$('.sub-nav > li').click(function(){
		if(!$(this).hasClass('current')){
			var index = $(this).index();
			console.log(index);
			$(this).addClass('current').siblings('.current').removeClass('current');
			$('.'+film).find('.filmmakers').children().fadeOut();
			$('.'+film).find('.filmmakers').children().eq(index).fadeIn();	
		}
	})
});