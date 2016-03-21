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

function showlist(name) {
	if(name == "products"){
		$('#ctable').hide();
		$('#ptable').show();
		
	}else{
		$('#ptable').hide();
		$('#ctable').show();
		
	}
}

function pdetail(){
	window.location.href="/admin_comments/admin_comments_products";
}

function cdetail(){
	window.location.href="admin_comments/admin_comments_community";
}

