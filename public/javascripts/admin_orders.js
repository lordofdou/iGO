$(document).ready(function(){
	//分页
	$('.pagination li').click(function(){

		var num = $(this).text();
		var currentPage = $('#curP').text();
		if($(this).hasClass('forward')){
			num = parseInt(currentPage) + 1;
		}else if($(this).hasClass('back')){
			num = parseInt(currentPage) - 1;
		}

		var href = "/admin_orders?page=" + num;
		window.location.href = href;
	});

	//点击发货按钮
	$('#sendBtn').click(function(){
		var idNumber = $(this).parent().parent().attr('idNumber');
		var currentPage = $('#curP').text();
		var href = "/admin_orders/send?page=" + currentPage + "&id=" + idNumber;
		window.location.href = href;
	});
	
});