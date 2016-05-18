#!/bin/bash
#echo "Content-type:text/html"
#echo ""
printf -v QUERY_STRING $(echo -n $QUERY_STRING|sed 's/\\/\\\\/g;s/\(%\)\([0-9a-fA-F][0-9a-fA-F]\)/\\x\2/g')
exapk=${QUERY_STRING##*;}
expak=${exapk#*=}
apkselect=${QUERY_STRING%;*}
for i in `echo $apkselect|sed 's/%20/\t/g'`
do
	raw=`cat ../data/appinfo|grep "$i"`
	apkpath=`echo $raw|awk -F ":" '{print $3}'`
	sudo adb pull $apkpath $exapk>/dev/null
	
done
bash readapp.sh
