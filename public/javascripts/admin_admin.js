$(document).ready(function(){

	$('#submit').click(function(){
		var name = $('#name').val();
		var password = $('#password').val();
		var comfirm = $('#confirm').val();
		if(name.length == 0 || password.length == 0) {
			$('#comfirmnote').hide();
			$('#npnote').show();
			
		}
		else if (comfirm != password) {
			$('#npnote').hide();
			$('#comfirmnote').show();
			
		}else {
			var hash = $.md5(password);
			$('#password').val(hash);
			$('#form').submit();
			alert("信息添加成功");
		}		
	});	
	
});

function d(i) {
	window.location.href="/admin_admin/delete?id="+i;
};
function canLogin(i,j) {
	window.location.href="/admin_admin/canLogin?id="+i+"&value="+j;
}

// get ('/delete', functio()
// {
	
// }
