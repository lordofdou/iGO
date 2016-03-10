$(document).ready(function(){


	var selectedID = $('#indecate').attr('title');

	//显示相应的图片布局
	for(var i = 0; i<$('.pagination li').length; i++){
		var selectedClass = $($('.pagination li')[i]).attr('activity_title');
		
		if(selectedClass == selectedID){
			$($('.pagination li')[i]).addClass('active');
			// $('.square').hide();
			// $('.' + selectedClass).show();
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
});