$(document).ready(function(){


	if($('input[name="username"]').val()){
		$('input[name="username"]').focus();
	}
	//分页
	$('.pagination li').click(function(){

		var num = $(this).text();
		var currentPage = $('#curP').text();
		if($(this).hasClass('forward')){
			num = parseInt(currentPage) + 1;
		}else if($(this).hasClass('back')){
			num = parseInt(currentPage) - 1;
		}

		var href = "/admin_user?page=" + num;
		window.location.href = href;
	});

	//删除一个用户 
	$('.deleteUser').click(function(){
		if(!window.confirm("确认要删除此用户 ？")){
			return false;
		}
		var pageNum = $('#curP').text();
		var idNumber = $(this).parent().attr('idNumber');
		var href = "/admin_user/deleteA?id=" + idNumber + "&page=" + pageNum;
		window.location.href = href;
	});

	//禁止/开启 登陆
	$('.canLoginBtn').click(function(){
		var pageNum = $('#curP').text();
		var idNumber = $(this).parent().attr('idNumber');
		var href = "/admin_user/noLogin?id=" + idNumber + "&page=" + pageNum;
		window.location.href = href;
	});

	$('input[name="username"]').keyup(function(e){
		if($('input[name="username"]').val().length == 0){
			$('form').submit();
		}
	});

});