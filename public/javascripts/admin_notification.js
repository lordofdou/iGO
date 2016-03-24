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

		var href = "/admin_notification?page=" + num;
		window.location.href = href;
	});

	$('#push').click(function(){
		$('#addModal').modal('show');
	});

	$('#pushBtn').click(function(){
		//表单验证
		$('#pushForm').submit();
	});

});