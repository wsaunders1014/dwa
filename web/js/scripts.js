$(document).ready(function(){
	$('.poster').on('click', function(){
		var id = $(this).attr('id');
		$('header, .content').addClass('flipped');
		$('.page.'+id).delay(500).fadeIn();
	})
});