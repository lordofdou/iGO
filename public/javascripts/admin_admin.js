$(document).ready(function(){
	$('#submit').click(function(){
		var name = $('#name').val();
		var password = $('#password').val();
		var comfirm = $('#confirm').val();
		if (comfirm != password) {
			alert("两次输入的密码不同，请重新输入"+password+comfirm);
		}else {
			// var hash = $.md5(password);	
			$('#form').submit();
			alert("信息添加成功");
		}
		
	});	
	
});

