#!/bin/bash
export LANG=zh_CN.UTF-8
export LANGUAGE=zh_CN:zh:en_US:en
export LC_NAME=zh_CN.UTF-8
raw=`java testPcClient 7`
for i in `echo $raw|awk 'BEGIN{RS=";"} {print $0}'|sed "s&[[:space:]]&_&g"`
do
	raw=`echo $i|sed 's&null&&g'`
	id=${raw%%:*}
	size=${raw##*:}
	path_tmp=${raw#*:}
	path=${path_tmp%:*}
	if [ "$size" = "OK" ]
	then
		continue
	else
	echo $raw
	fi
done

