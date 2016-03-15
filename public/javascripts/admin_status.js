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

		var href = "/admin_status?page=" + num;
		window.location.href = href;
	});
	

	$('.deleteA').click(function(){
		var id = $(this).attr('deleteID');
		var page = $('#curP').text();
		var href = "/admin_status/deleteA?id=" + id +"&page=" + page;
		window.location.href = href;
	});
	
});