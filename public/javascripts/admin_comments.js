$(document).ready(function(){
	$('.head-pagination li').click(function(){
		$('.head-pagination li').removeClass("active");
		$(this).addClass("active");

		var title = $(this).attr("title");

		if(title == "商品评论"){
			
		}else{
			
		}
	});
	$('.pagination li').click(function(){
		var num = $(this).text() - 1;
		// var num;
		// if($(this).text() == null){
		// 	num = 0;
		// }else {
		// 	num = $(this).text() - 1;
		// }
		// console.log(num)
		
		if( $('#ptable').css('display') == 'block' ){
			window.location.href="/admin_comments?p="+num;
		}else {
			window.location.href="/admin_comments?c="+num;
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

