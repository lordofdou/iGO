#!/bin/bash
echo "Content-type:text/html;charset=utf-8"
echo ""
export LANG=zh_CN.UTF-8
export LANGUAGE=zh_CN:zh:en_US:en
export LC_NAME=zh_CN.UTF-8
raw=$QUERY_STRING
printf -v raw $(echo -n $raw|sed 's/\\/\\\\/g;s/\(%\)\([0-9a-fA-F][0-9a-fA-F]\)/\\x\2/g')

con_name_tmp=${raw%%&*}
con_name=${con_name_tmp#*=}
con_phone_tmp=${raw##*&phone=}
con_phone=${con_phone_tmp%%&*}
idForChange=${raw##*&id=}
java testPcClient 5:${idForChange}:${con_name}:${con_phone} >/dev/null
if [ $? -eq 0 ]
then
    echo "<script>
            alert(\"修改成功!\")
            frames.top.document.getElementById('mid_ifram_style').src='/cgi-bin/check.cgi';
			frames.top.statusreload();
    </script>"
else
    echo "<script>alert(\"修改失败!\")</script>"
fi
