$(document).ready(function(){

	//是否有未添加商品id的图片
	$.each($('div'), function(n, value){
		if($(value).hasClass('blur')){
			$('.alert-danger').show();
		}
	});	

	var selectedID = $('#indecate').attr('title');

	//显示相应的图片布局
	for(var i = 0; i<$('.pagination li').length; i++){
		var selectedClass = $($('.pagination li')[i]).attr('activity_title');
		
		if(selectedClass == selectedID){
			$($('.pagination li')[i]).addClass('active');
		}
	}


	//顶部segment切换
	$('.pagination li').click(function(){
		window.location.href = "/admin_activity?indecate=" + $(this).attr('activity_title');
	});


	//图片上传
	$('input[type="file"]').change(function(){
		$("#uploadForm").submit();
	});

	$('div').click(function(){
		if($(this).hasClass('blur')){

			var selectedID = $('#indecate').attr('title');
			var position = $($(this).find("input")[0]).attr('name');
			$($('input[name="setpid_indecate"]')[0]).val(selectedID);
			$($('input[name="setpid_popid"]')[0]).val(selectedID);
			$($('input[name="setpid_position"]')[0]).val(position);

			$('#myModal').modal('show');
			return false;
		}
	});


	$('#myModal').on('shown.bs.modal', function () {
	  $('#myInput').focus();
	});

	$('#pidSure').click(function(){
		var val = $($('input[name="setpid_pid"]')[0]).val();
		if(parseInt(val) && val.length != 0){
			$('#setpid_form').submit();
		}else{
			$('.alert-warning').show();
		}
	});

});