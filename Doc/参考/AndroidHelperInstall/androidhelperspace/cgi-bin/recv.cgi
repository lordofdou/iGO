#!/bin/bash
echo "Content-type:text/html"
echo ""
export LANG=zh_CN.UTF-8
export LANGUAGE=zh_CN:zh:en_US:en
export LC_NAME=zh_CN.UTF-8
echo "<!DOCTYPE html>"
echo "<html>"
echo "<head>"
echo "<meta charset='UTF-8'>"
echo "<meta content='text/html;charset=utf-8'>"
echo "<link href='../html/bootstrap-3.3.5-dist/css/bootstrap.min.css' rel='stylesheet'/>"
echo "<link href='../html/css/home_main.css' rel='stylesheet' type='text/css'/>"
echo "<script src='../html/jquery-2.1.4/jquery.min.js'></script>"
echo "<script src='../html/bootstrap-3.3.5-dist/js/bootstrap.min.js'></script>"
echo "</head>"
echo "<body>"
flag=1
cat ../data/con_per_back.txt |while read line
do
raw=${line#*:}
raw=${raw%:*}
id=${line%%:*}
cat ../data/tmp1.txt|grep "^$id"
if [ $? -eq 0 ]
then
continue
else
java testPcClient 4:$raw >/dev/null
if [ ! $? -eq 0 ]
then
flag=0
fi
fi
done

if [ $flag -eq 1 ]
then
	echo "<script>alert('恢复联系人完毕！');</script>";
	echo "<script>frames.top.document.getElementById('mid_ifram_style').src='/cgi-bin/check.cgi';</script>";
else 
	echo "<script>alert('恢复联系人失败！');</script>";
fi
echo "</body>
</html>"
