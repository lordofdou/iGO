$(document).ready(function(){
	$('.head-pagination li').click(function(){
		$('.head-pagination li').removeClass("active");
		$(this).addClass("active");

		var title = $(this).attr("title");

		if(title == "商品评论"){
			
		}else{
			
		}
	});
});