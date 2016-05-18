#!/bin/bash
export LANG=zh_CN.UTF-8
export LANGUAGE=zh_CN:zh:en_US:en
export LC_NAME=zh_CN.UTF-8
#javac testPcClient.java > /dev/null
raw=`java testPcClient 9`
#	count=1
for i in `echo $raw|awk 'BEGIN{RS=";"} {print $0}'|sed "s&[[:space:]]&_&g"`
do
	raw=`echo $i|sed 's&null&&g'`
#	echo $raw
	id=${raw%%:*}
	size=`echo $i|awk -F':' '{print $3}'`
	path_tmp=${raw#*:}
	path=${path_tmp%:*}
	if [ "$size" = "OK" ]
	then
		continue
	else
	echo $raw
	fi
#	if [ -n $contactpic ]
#	then
#		python3 response.py $PhoneNumer $contactpic
#	picName="${PhoneNumer}.png"
#	else
#		picName='default'"$count"'.png'
#		((count++))
#	fi
#	echo "$id_con":"$person":"$PhoneNumer":"$picName"
done

