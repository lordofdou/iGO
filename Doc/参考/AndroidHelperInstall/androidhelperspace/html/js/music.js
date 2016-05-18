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
	var form1=document.getElementById('form1');
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


