#!/bin/bash
install="../html/install.html"
usr="../data/usrlist"

function setlist ()
{
	cat $usr|while read idata 
	do
		echo "<tr>"
		echo "<td id="name" style='vertical-align: middle;'>$idata</td>"
		echo '<td><button onClick="deleteRow(this)" class="btn btn-primary">安装</button></td>'
		echo "</tr>"
	done
}
echo "Content-type:text/html"
echo ""

cat $install |while read line
do
	echo $line
	ret=`echo $line|grep "app"`
	if [ -n "$ret" ]
	then
		setlist
	fi
done


