#!/bin/bash
echo "Content-type:text/html"
echo ""
echo "<html>"
echo "<head>"
    echo "<meta charset='UTF-8'>"
    echo "<meta content='text/html;charset=utf-8'>"
echo "</head>"

id=${QUERY_STRING%&*}
pathtmp=${QUERY_STRING##*&path=}
pathtmp1=${pathtmp%&*}
path=${pathtmp1//'%2F'/'/'}
passwd=${QUERY_STRING##*=}
printf -v passwd $(echo -n $passwd|sed 's/\\/\\\\/g;s/\(%\)\([0-9a-fA-F][0-9a-fA-F]\)/\\x\2/g')
flag=1
IFS='&'
deal1=${QUERY_STRING%%&path*}
for i in $deal1
do
echo $i|grep choose >/dev/null
	if [ $? -eq 0 ]
	then
		tmp=${i#*=}
		printf -v path $(echo -n $path|sed 's/\\/\\\\/g;s/\(%\)\([0-9a-fA-F][0-9a-fA-F]\)/\\x\2/g')
		sudo cp ../data/image/`cat ../data/photo.txt |grep "^$tmp"|awk -F'|' '{print $4}'` $path
	fi
	
	if [ ! $? -eq 0 ]
		then
		flag=0
	fi
done

if [ $flag -eq 0 ]
then
	echo "<script>alert('导出失败！');</script>"
else
	echo "<script>alert('导出成功！');</script>"
fi
