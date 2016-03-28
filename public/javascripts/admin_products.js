$(document).ready(function(){

	// 监控input的输入
	var desNum = 1;
	var lastNum = desNum;

  	$('body').on('change', 'input[type="file"]', function(){
  		var src = getObjectURL(this.files[0]);
  		// console.log(src);
  		rawbackground = $(this).parent().css('background'); 
  		console.log(rawbackground);

  		$(this).parent().css('background', 'url(' + src + ') no-repeat center center').css('background-size', '100%');
  		lastNum = desNum
  		desNum++;

  		var label='p';
  		tmp = $(this).attr("id");
  		if(tmp[0] == 'p'){
  			label='p';
  		}else{
  			label='d'
  		}

  		if(rawbackground == 'rgba(0, 0, 0, 0) url("http://127.0.0.1:3000/images/activity_add.png") no-repeat scroll 50% 50% / auto padding-box border-box') {
	  		var desDom='<li style="background: url(../images/activity_add.png) no-repeat center center;list-style-type: none;margin-right:40px"><input type="file" id="'+label+desNum+'" name="'+label+desNum+'"></input></li>';
	  		$(this).parent().after(desDom);
  		}
  	});

  	// 获取文件url
  	function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) {
            url = window.createObjectURL(file)
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file)
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file)
        }
        return url
    };
	
	$('#submit').click(function(){	
			
		$('form').submit();	
	});

});

function drop(i) {
	
	if($('#'+i).css("display") == "none"){
		
		$('#'+i).css("display","block");
	}else{

		$('#'+i).css("display","none");
	}
}
//查询具体分类的商品
function query(i,j) {
	window.location.href="/admin_products/query?id="+i+"&category="+j;

}

function detail(id) {
	window.location.href="/admin_products/detail?id="+id;
}

