#!/bin/bash
echo "Content-type:text/html"
echo ""
bash photo_tmp.cgi > ../data/photo.txt
echo "<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <meta content='text/html;charset=utf-8'>
	<link href='../html/bootstrap-3.3.5-dist/css/bootstrap.min.css' rel='stylesheet'/>
	<script src='../html/jquery-2.1.4/jquery.min.js'></script>
	<script src='../html/bootstrap-3.3.5-dist/js/bootstrap.min.js'></script>
	<script src='../html/js/image.js'></script>
	<link href='../html/css/image.css' rel='stylesheet' type='text/css' />
    
</head>
<body>"
   
echo "<!--图库弹出层 开始-->
		<div class='image_layBox'>
		  <div class='image__html'></div>
		  <img class='image_Close' src='../html/image/mke_close.png' width='27' height='27' />
		</div>
	 <!--图库弹出层 结束-->
    	<div class='image_imgBox'>"
		
	echo "<form id='form1' action='./export_photo.cgi' target='cgi' accept-charset='UTF-8'>"
	echo "<div class='' style='position: fixed; top: 1%; z-index: 10;'>
		   <input type='button' onclick='ck(true)' class='btn btn-primary' id='formbutton1' value='全选'>
		   <input type='button' onclick='ck(false)' class='btn btn-primary' id='formbutton2' value='取消全选'>
		   <input type='button' onclick='msgbox()'  class='btn btn-primary' id='formbutton3' value='导出'>
	   </div>"
	   
	echo "<ul style='margin-top: 5%;'>"
	cat ../data/photo.txt |while read line
	do
        echo "<div style='margin-right: 1px;margin-bottom: 3px;float:left; position: relative; width:185px;height:93px;'>
        <input form='form1'name='choose' id='image_checkbox' type='checkbox' value='`echo $line|awk -F':' '{print $1}'`'>"
        echo "<li>"
        imagpath=`echo $line|awk -F':' '{print $2}'`
        imagpath=${imagpath/'/storage/emulated/0/'/'/storage/emulated/legacy/'}
		sudo adb pull $imagpath ../data/image
		name=${imagpath##*/}
        echo "<img src='../data/image/`echo $name`' class='smallimage' />"
        echo "<span class='hidden'>"
        echo "<img src='../data/image/`echo $name`' class='bigimage' />"
        echo "</span>"
        echo "</li>
            </div>"
	done &
	wait
echo "</ul>
 <input type='hidden' name='path' >
 <iframe name='cgi' style='display:none;' src=' ' ></iframe>"
 
echo "</form>
     </div>
    </div>
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
