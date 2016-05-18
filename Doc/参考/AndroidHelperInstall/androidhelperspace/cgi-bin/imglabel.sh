#!/bin/bash
export LANG=zh_CN.UTF-8
export LANGUAGE=zh_CN:zh:en_US:en
export LC_NAME=zh_CN.UTF-8
raws=`java testPcClient 1`

for i in `echo $raws|awk 'BEGIN{RS=";"} {print $0}'|sed "s&[[:space:]]&_&g"`
do
	logo=""
	raw=`echo $i|sed 's&null&&g'`
	iconbase=${raw%%:*}
	packageName=${raw##*:}
	if [ "$packageName" = "OK" ]
	then
		continue
	fi
	apkName=${raw#*:}
	apkName=${apkName%:*}
	if [ -n $iconbase ]
	then
		./response.py $apkName $iconbase 
		logo="../image/$apkName.png"
	else
		logo="../image/default.png"
	fi 
	echo "$apkName":"$packageName":$logo'\n'
done 

