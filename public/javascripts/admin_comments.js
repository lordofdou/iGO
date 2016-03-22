$(document).ready(function(){
	$('.head-pagination li').click(function(){
		$('.head-pagination li').removeClass("active");
		$(this).addClass("active");

		var title = $(this).attr("title");

		if(title == "商品评论"){
			
		}else{
			
		}
	});

	$('.pagination-p li').click(function(){
		
		var num = $(this).text() - 1;	
		var currentPage = $('#pcur').text();
		var pnum = $('#pnum').text();

		
		if($(this).hasClass('forward')){
			
			num = (parseInt(currentPage) + 1)%pnum;

		}else if($(this).hasClass('back')){
			num = parseInt(currentPage) - 1;
			
			if(num < 0){
				num = pnum-1;
			}
			

		}

		window.location.href="/admin_comments?p="+num;
	});

	$('.pagination-c li').click(function(){
		var num = $(this).text() - 1;	
		var currentPage = $('#ccur').text();
		var cnum = $('#cnum').text();

		if($(this).hasClass('forward')){
			num = (parseInt(currentPage) + 1)%cnum;
		}else if($(this).hasClass('back')){
			num = parseInt(currentPage) - 1;
			if(num < 0){
				num = cnum - 1;
			}

		}
		window.location.href="/admin_comments?c="+num;
		
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

