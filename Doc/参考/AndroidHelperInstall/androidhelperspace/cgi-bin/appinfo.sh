#!/bin/bash

rm -rf ../data/appinfo
il=`bash imglabel.sh`
adb shell pm list packages|sort|while read apk
do
	apk=${apk#*:}
	apk=`echo $apk|sed 's/\r$//'`
	string=`adb shell dumpsys package $apk |grep "codePath"|sed 's/\r$//'`
	rawpath=${string##*=}
	path=${rawpath}
	size=`adb shell ls -l $rawpath|awk '{print $4}'`
	##获取应用名
	ret=`echo -e "$il"|grep $apk`
	if [ -n "$ret" ]
	then
		if [ "$apk" = "android" ]
		then
			continue
		fi
		label=${ret%%:*}
		logo=${ret##*:}
	else
		label="系统应用"
		logo="../image/default/default.png"
	fi
	#图标为空指向默认图标
	echo -e "$logo:$label:$path:$size:$apk" >> ../data/appinfo
done 
