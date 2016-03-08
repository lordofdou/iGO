$(document).ready(function(){


	$('.pagination li').click(function(){
		$('.pagination li').removeClass("active");
		$(this).addClass("active");

		var title = $(this).attr("title");

		//隐藏
		$('.square').hide();
		$('.' + title).show();

	});
});