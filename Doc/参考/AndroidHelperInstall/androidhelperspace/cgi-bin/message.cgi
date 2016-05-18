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
echo " <table id=\"myTable\" class=\"table table-hover table-striped\" border=\"0\">
		<tr id=\"message\">
			<td style=\"vertical-align: middle; width: 60px;\">标记</td>
			<td style=\"vertical-align: middle; width: 200px;\">发送人</td>
			<td style=\"vertical-align: middle;\">信息</td>
			<td style=\"vertical-align: middle;\">操作</td>
		</tr>
		<tr id=\"message\">
			<td style=\"vertical-align: middle; width: 60px;\"><input type='checkbox'></td>
			<td style=\"vertical-align: middle; width: 200px;\">13218012357</td>
			<td style=\"vertical-align: middle;\">你好啊～</td>
			<td style=\"vertical-align: middle;\"><button class='btn btn-primary' onClick='' id='delete'>删除</button></td>
		</tr>
		<tr id=\"message\">
			<td style=\"vertical-align: middle; width: 60px;\"><input type='checkbox'></td>
			<td style=\"vertical-align: middle; width: 200px;\">13218012357</td>
			<td style=\"vertical-align: middle;\">你好啊～</td>
			<td style=\"vertical-align: middle;\"><button class='btn btn-primary' onClick='' id='delete'>删除</button></td>
		</tr>
		<tr id=\"message\">
			<td style=\"vertical-align: middle; width: 60px;\"><input type='checkbox'></td>
			<td style=\"vertical-align: middle; width: 200px;\">13218012357</td>
			<td style=\"vertical-align: middle;\">你好啊～</td>
			<td style=\"vertical-align: middle;\"><button class='btn btn-primary' onClick='' id='delete'>删除</button></td>
		</tr>
    </table>"
echo "</body>
</html>"
