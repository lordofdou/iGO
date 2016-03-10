$(document).ready(function(){


	//显示相应的图片布局
	for(var i = 0; i<$('.pagination li').length; i++){
		if($($('.pagination li')[i]).hasClass("active")){
			var selectedClass = $($('.pagination li')[i]).attr('activity_title');
			$('.square').hide();
			$('.' + selectedClass).show();
		}
	}


	//顶部segment切换
	$('.pagination li').click(function(){
		$('.pagination li').removeClass("active");
		$(this).addClass("active");

		var selectedClass = $(this).attr("activity_title");
		$('.square').hide();
		$('.' + selectedClass).show();

	});


	//图片上传
	$('input[type="file"]').change(function(){
		$("#uploadForm").submit();
	});
});