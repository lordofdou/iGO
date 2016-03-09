$(document).ready(function(){

	$('#loginButton').click(function(){

		//用户名密码验证
		var username = $('#username').val();
		var password = $('#password').val();

		 if(username.length == 0 || password.length == 0){
		 	$('#note').show();
		 	return false;
		 }
		 $('#loginForm').submit();
	});
});