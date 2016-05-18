jQuery(function(){
	//图库弹出层

	$(".image_Close").click(function(){
		$(".image_layBox").hide()
	});
	
	$(".image_imgBox ul li").click(function(){
		$(".image__html").html($(this).find(".hidden").html());
		$(".image_layBox").fadeIn(300);
	});
	
})


//屏蔽页面错误
jQuery(window).error(function(){
  return true;
});

jQuery("img").error(function(){
  $(this).hide();
});

function ck(b)
{
	var input = document.getElementsByTagName('input');

	for (var i=0;i<input.length ;i++ )
	{
		if(input[i].type=='checkbox')
		input[i].checked = b;
	}
}

function msgbox(){
    
    var check=document.getElementsByName('choose');
	var flag=false;
	for(i=0;i<check.length;i++)
	{
		if(check[i].checked){
		    flag = true ;
		    break;
		}
	}
	if(!flag)
	{
		alert('请最少选择一项！');
		return false ;
	}
	else{
		document.getElementById('fileDialog').click();
	}
}




