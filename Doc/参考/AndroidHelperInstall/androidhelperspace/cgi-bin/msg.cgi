#!/bin/bash
echo "Content-type:text/html"
echo ""
bash msg_tmp.cgi >../data/msg.txt
echo "<!DOCTYPE html>"
echo "<html>"
echo "<head>"
echo "<meta charset='UTF-8'>"
echo "<meta content='text/html;charset=utf-8'>"
echo "<link href='../html/bootstrap-3.3.5-dist/css/bootstrap.min.css' rel='stylesheet'/>"
echo "<link href='../html/css/home_main.css' rel='stylesheet' type='text/css'/>"
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


</script>"
echo "</head>
<body>
    <button onClick='save();' class='btn btn-primary'>查看短信</button>
	<form action='delete.cgi' name='form1' >
    <table id='myTable' class='table table-hover table-striped' border='0'>
    <tr>
     <td>联系人</td>
     <td>联系方式</td>
     <td>信息内容</td>
     <td>时间</td>
     <td>类型</td>
    </tr>"
	cat ../data/msg.txt|while read line
	do
	echo "<tr>"
	echo "<td>"
	con=`echo $line|awk -F':' '{print $2}'`
	if [ "$con" = "" ]
	then
	con="unknow"
	fi
	echo $con
	echo "</td>"
	echo "<td>"
	con=`echo $line|awk -F':' '{print $3}'`
	if [ "$con" = "" ]
	then
	con="unknow"
	fi
	echo $con
	echo "</td>"
	echo "<td>"
	echo $line|awk -F':' '{print $4}'
	echo "</td>"
	echo "<td>"
	echo $line|awk -F':' '{print $5}'
	echo "</td>"
	echo "<td>"
	type=`echo $line|awk -F':' '{print $NF}'`
	if [ $type -eq 1 ]
	then
	echo "接收"
	elif [ $type -eq 2 ]
	then
	echo "发送"
	else
	echo "草稿"
	fi
	echo "</td>"
	echo "</tr>"
	done
   echo " </table>"
 echo " </form>
    
