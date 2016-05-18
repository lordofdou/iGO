#!/bin/bash
uninstall="../html/uninstall.html"
data="../data/appinfo"


function setlist ()
{
	cat $data|while read idata 
	do
        logo=`echo $idata|awk -F ":" '{print $1}'|awk '{print $1}'`
        label=`echo $idata|awk -F ":" '{print $2}'`
        path=`echo $idata|awk -F ":" '{print $3}'`
        size=`echo $idata|awk -F ":" '{print $4}'`
        apk=`echo $idata|awk -F ":" '{print $5}'`
	echo "<tr>"
	echo "<td style='vertical-align: middle;'><input type=\"checkbox\" onclick=\"iselect(this)\" id=\"fuxuan\"></td>"
        echo "<td style='vertical-align: middle;'><img src=\"$logo\"class='img-rounded' id='appimg' alt='no-app-image'></td>"
        echo "<td style='vertical-align: middle;'>$label</td>"
        echo "<td style='vertical-align: middle;'>$path</td>"
        echo "<td style='vertical-align: middle;'>$(echo "$size/1024"|bc)k</td>"
        echo "<td style='vertical-align: middle;'>$apk</td>"
	echo "</tr>"
	done
}

echo "Content-type:text/html;charset=utf-8"
echo ""

cat $uninstall |while read line
do
	echo $line
	ret=`echo $line|grep "app"`
	if [ -n "$ret" ]
	then
		setlist
	fi
done
