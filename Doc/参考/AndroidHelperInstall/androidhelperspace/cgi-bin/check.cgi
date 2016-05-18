#!/bin/bash
echo "Content-type:text/html"
echo ""
bash con_per.sh > ../data/tmp1.txt
echo "<!DOCTYPE html>"
echo "<html>"
echo "<head>"
echo "<meta charset='UTF-8'>"
echo "<meta content='text/html;charset=utf-8'>"
echo "<link href='../html/bootstrap-3.3.5-dist/css/bootstrap.min.css' rel='stylesheet'/>"
echo "<link href='../html/css/check.css' rel='stylesheet' type='text/css'/>"
echo "<link href='../html/css/addpeple.css' rel='stylesheet' type='text/css'/>"
echo "<script src='../html/jquery-2.1.4/jquery.min.js'></script>"
echo "<script src='../html/bootstrap-3.3.5-dist/js/bootstrap.min.js'></script>"
echo " <script >
		function ck(b)
		{
			var input = document.getElementsByTagName('input');
			for (var i=0;i<input.length ;i++ )
			 {
			   if(input[i].type=='checkbox')
			   input[i].checked = b;
			 }
		}
		
		function add()
		{
			var name=prompt('请输入姓名','');
			if(name==null){return flase;}
			var phone=prompt('请输入电话','');
			if(phone==null){return flase;}
			var addpeple=document.getElementById('addpeple');
			if(name&&phone){
				addpeple.name.value=name;
				addpeple.phone.value=phone;
			}
			else{
				alert(\"姓名和电话不能为空\");
			}
			addpeple.charset='utf-8';
			addpeple.submit();
			waiting2();
		}
		
		
		function change(r)
		{
			var i=r.parentNode.parentNode.rowIndex;
	        var idForChangetmp=document.getElementById('myTable').rows[i].cells[0].getElementsByTagName('input');
	        var idForChange=idForChangetmp[0].value;
			if(confirm('确定修改此联系人?')==true)
			{
				var name=prompt('请输入姓名','');
				if(name==null){return flase;}
				var phone=prompt('请输入电话','');
				if(phone==null){return flase;}
				var changepeple=document.getElementById('changepeple');
				if(name&&phone){
					changepeple.name.value=name;
					changepeple.phone.value=phone;
					changepeple.id.value=idForChange;
				}
				else{
					alert(\"姓名和电话不能为空\");
				}
				changepeple.charset='utf-8';
				changepeple.submit(); 
				waiting2();
			}
		}
		
		function waiting()
		{
			frames.top.document.getElementById('mid_ifram_style').src='/cgi-bin/check.cgi';
			frames.top.statusreload();
		}
		
		function waiting2()
		{
			frames.top.statusreload();
		}
		
	</script>"

echo "</head>
<body>
	<form id='addpeple' action='add.cgi' target='cgi' type='hidden' accept-charset='UTF-8'> 
		<input type='hidden' name='name' >
		<input type='hidden' name='phone' >
	</form>
	<form id='changepeple' action='modify.cgi' type='hidden' accept-charset='UTF-8'> 
		<input type='hidden' name='name' >
		<input type='hidden' name='phone' >
		<input type='hidden' name='id' >
	</form>
	<center>
	<div class='title'>
		<h2>查看联系人</h2>
		<div id='beifeng' >
			   <a href='/cgi-bin/back.cgi'  target='cgi'><button class='btn btn-primary' id='beifengbutton'>备份</button></a>
			   <a href='/cgi-bin/recv.cgi'  target='cgi'><button class='btn btn-primary' id='beifengbutton'>恢复</button></a>
			   <button class='btn btn-primary' id='beifengbutton' onclick='waiting()'>刷新</button>
			   <iframe name='cgi' style='display:none;' src=' '></iframe>
		</div>
	</div>
	</center>
	
	<form action='delete.cgi' name='form1' id='form'  target='cgi'>
    <table id='myTable' class='table table-hover table-striped' border='0'>
    <tr>
     <td>选择</td>
     <td>头像</td>
     <td>姓名</td>
     <td>电话</td>
     <td>操作</td>
    </tr>"
	count=1
	cat ../data/tmp1.txt|while read line
	do
	echo "<tr>"
	echo "<td style='vertical-align: middle;'>"
	
	echo "<input name='id' style='margin-left: 30%;' type=checkbox value='`echo $line|awk -F':' '{print $1}'`'>"
	echo "</td>"
	echo "<td style='vertical-align: middle;'>"
	pic=`echo $line|awk -F':' '{print $4}'`
	echo "<img src=\"../data/image/$pic\" width='50' height='50' >"
	echo "</td>"
	echo "<td style='vertical-align: middle;'>"
	echo $line|awk -F':' '{print $2}'
	echo "</td>"
	echo "<td style='vertical-align: middle;'>"
	echo $line|awk -F':' '{print $3}'
	echo "</td>"
	echo "<td style='vertical-align: middle;'>
	<input type='button' onclick='change(this)' class='btn btn-primary' id='xiugai' value='修改联系人'/>
	</td>"
	((count=count+1))
	echo "</tr>"
	done
	
   echo " </table>
	   <div class='delete' style='position: fixed; left: 3%; width: 500px; bottom: 1%;'>
		   <input type='button' onclick='ck(true)' class='btn btn-primary' id='formbutton' value='全选'/>
		   <input type='button' onclick='ck(false)' class='btn btn-primary' id='formbutton' value='取消全选'/>
		   <input type='submit' class='btn btn-primary' id='formbutton' onclick='waiting2()' value='删除联系人'/>
		   <input type='button' onclick='add()' class='btn btn-primary' id='tianjia' value='添加联系人'/>
	   </div>
	    
   </form>
</body>
</html>"
