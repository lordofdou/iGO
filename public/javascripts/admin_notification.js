$(document).ready(function(){

	$('#push').click(function(){
		$('#addModal').modal('show');
	});

	$('#pushBtn').click(function(){
		//表单验证
		$('#pushForm').submit();
	});

});