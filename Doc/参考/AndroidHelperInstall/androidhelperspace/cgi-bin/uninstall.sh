#!/bin/bash

for i in `echo $QUERY_STRING|sed 's/%20/\t/g'`
do
	adb uninstall $i >/dev/null
done

flag=0
for j in `cat ../data/appinfo`
do
	flag=0
	for i in `echo $QUERY_STRING|sed 's/%20/\t/g'`
	do
		echo $j|grep "$i">/dev/null
		if [ $? -eq 0 ]
		then
			flag=1
		fi
	done
	if [ $flag -eq 0 ]
	then
		echo $j>>../data/appinfon
	fi
	
done

rm -rf ../data/appinfo
mv ../data/appinfon ../data/appinfo
bash readapp.sh
bash uninfo.sh
