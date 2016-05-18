#!/bin/bash
export LANG=zh_CN.UTF-8
export LANGUAGE=zh_CN:zh:en_US:en
export LC_NAME=zh_CN.UTF-8
#javac testPcClient.java > /dev/null
raw=`java testPcClient 2`
count=1
for i in `echo $raw|awk 'BEGIN{RS=";"} {print $0}'|sed "s&[[:space:]]&_&g"`
do
	picName=""
	raw=`echo $i|sed 's&null&&g'`
	id_con=${raw%%:*}
	raw=${raw#*:}
	contactpic=${raw%%:*}
	PhoneNumer=${raw##*:}
	if [ "$PhoneNumer" = "OK" ]
	then
		continue
	fi
	person=${raw#*:}
	person=${person%:*}
	if [ -n $contactpic ]
	then
		./response1.py $PhoneNumer $contactpic
	picName="${PhoneNumer}.png"
	else
		picName='default'"$count"'.png'
		((count++))
	fi
	echo "$id_con":"$person":"$PhoneNumer":"$picName"
done

