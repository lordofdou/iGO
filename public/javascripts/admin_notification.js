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
		$('form div').removeClass("has-error");

		var pid = parseInt($('input[name="pid"]').val());
		var title = $('input[name="title"]').val();
		var description = $('textarea[name="description"]').val();

		if(!pid){
			$('input[name="pid"]').parent().addClass("has-error");
			return false;
		}
		if(title.length <= 4){
			$('input[name="title"]').parent().addClass("has-error");
			return false;
		}
		if(description.length <= 5){
			$('input[name="description"]').parent().addClass("has-error");
			return false;
		}
		//表单验证
		$('#pushForm').submit();
	});

});