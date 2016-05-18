#!/bin/bash
echo "Content-type:text/html"
echo ""
echo "<html>"
echo "<head>"
    echo "<meta charset='UTF-8'>"
    echo "<meta content='text/html;charset=utf-8'>"
echo "</head>"
#echo $QUERY_STRING
raw=$QUERY_STRING
printf -v raw $(echo -n $raw|sed 's/\\/\\\\/g;s/\(%\)\([0-9a-fA-F][0-9a-fA-F]\)/\\x\2/g')
id_tmp=${raw%&*}
topath=${raw##*path=}
IFS='&'
flag=1
for i in $id_tmp
do
tmp=${i#*=}
line=`cat ../data/photo.txt|grep "^$tmp"`
#echo $line
path=`echo $line|awk -F':' '{print $2}'`
#echo $topath
#echo $path
path=${path/'/storage/emulated/0/'/'/storage/emulated/legacy/'}
sudo adb pull $path $topath >/dev/null
if [ ! $? -eq 0 ]
then
flag=0
fi
done
if [ $flag -eq 0 ]
then
	echo "<script>alert('导出失败！');
	    frames.top.document.getElementById('mid_ifram_style').src='/cgi-bin/photo.cgi';
	</script>"
else
	echo "<script>alert('导出成功！');
	    frames.top.document.getElementById('mid_ifram_style').src='/cgi-bin/photo.cgi';
	</script>"
fi
