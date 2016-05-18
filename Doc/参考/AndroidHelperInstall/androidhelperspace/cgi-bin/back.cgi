#!/bin/bash
echo "Content-type:text/html"
echo ""
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
cp -f ../data/tmp1.txt ../data/con_per_back.txt
if [ $? -eq 0 ]
then
    echo "<script>alert('备份成功!');</script>"
else
    echo "<script>alert('备份失败!');</script>"
fi
echo "</body>
</html>"
