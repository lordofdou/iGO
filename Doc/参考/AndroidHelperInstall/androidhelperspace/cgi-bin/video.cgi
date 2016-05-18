#!/bin/bash
echo "Content-type:text/html"
echo ""
export LANG=zh_CN.UTF-8
export LANGUAGE=zh_CN:zh:en_US:en
export LC_NAME=zh_CN.UTF-8
bash video_tmp.cgi >  ../data/video.txt
echo "<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <meta content='text/html;charset=utf-8'>
	<link href='../html/bootstrap-3.3.5-dist/css/bootstrap.min.css' rel='stylesheet'/>
	<link href='../html/css/home_main.css' rel='stylesheet' type='text/css'/>
	<script src='../html/jquery-2.1.4/jquery.min.js'></script>
	<script src='../html/js/video.js'></script>
	<script src='../html/bootstrap-3.3.5-dist/js/bootstrap.min.js'></script>
</head>
<body>
	<div class='' style='position: fixed; top: 1%;'>
		<input type='button' onclick='ck(true)' class='btn btn-primary' id='formbutton1' value='全选'>
		<input type='button' onclick='ck(false)' class='btn btn-primary' id='formbutton2' value='取消全选'>
		<input type='button' onclick='msgbox()' class='btn btn-primary' id='formbutton3' value='导出'>
	</div>
    <table id='myTable' class='table table-hover table-striped' border='0' style='margin-top: 5%;'>
    <tr>
     <td>选择</td>
     <td>视频名称</td>
     <td>大小(byte)</td>
    </tr>"
	cat ../data/video.txt |while read line
	do
	echo "<tr>"
	echo "<td>
<input form='form1' name='choose' id='video_checkbox' type='checkbox' value='`echo $line|awk -F':' '{print $1} '`'/>
		  </td>"
#图片
	echo "<td>"
	echo $line|awk -F':' '{print $3}'
	echo "</td>"
	echo "<td>"
	echo $line|awk -F':' '{print $4}'
	echo "</td>"
	echo "</tr>"
	done
echo "  </table>
	<form id='form1' action='./export_video.cgi' target='cgi' accept-charset='UTF-8'>
	 <input type='hidden' name='path' >
	</form>
	
	 <iframe name='cgi' style='display:none;' src=' ' ></iframe>
	 <input type='file' class='btn btn-primary' id='fileDialog' style='display:none;' target='cgi' nwdirectory/> 
     
     <script>
        var chooser = document.querySelector('#fileDialog');
        chooser.addEventListener('change', function (evt) {
        	dopath(this.value);
        }, false);
        
        function dopath(path)
		{
			var form1=document.getElementById('form1');
			if(path==null)
			{
				return false;
			}
			
			if(path){
				form1.path.value=path;
				form1.charset='utf-8';
				form1.submit();
			    frames.top.statusreload();
			}
			else{
				alert('请输入路径！');
				return false ;
			}
		}
    </script> 
</body>
</html>"
