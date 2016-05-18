#!/bin/bash
echo "Content-type:text/html"
echo ""
printf -v QUERY_STRING $(echo -n $QUERY_STRING|sed 's/\\/\\\\/g;s/\(%\)\([0-9a-fA-F][0-9a-fA-F]\)/\\x\2/g')
apkpath=${QUERY_STRING#*=}
adb install $apkpath>/dev/null

if [ $? -eq 0 ]
then
	echo "<script>alert('安装成功！');
	    frames.top.document.getElementById('mid_ifram_style').src='/cgi-bin/appstore.sh';
	</script>"
else
	echo "<script>alert('安装失败！');
	frames.top.document.getElementById('mid_ifram_style').src='/cgi-bin/appstore.sh';
	</script>"
fi

bash appinfo.sh
