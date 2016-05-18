#!/bin/bash
export LANG=zh_CN.UTF-8
export LANGUAGE=zh_CN:zh:en_US:en
export LC_NAME=zh_CN.UTF-8
echo "Content-type:text/html;charset=utf-8"
echo ""
idcollect=${QUERY_STRING//'&'/'':}
idcollect=${idcollect//'id='/''}
return=`java testPcClient 3:$idcollect` 
echo $return|grep "success" >/dev/null
if [ $? -eq 0 ]
then
echo "<script>alert('删除成功！')</script>"
else
echo "<script>alert('删除失败！')</script>"
fi
echo "<script>
	frames.top.document.getElementById('mid_ifram_style').src='/cgi-bin/check.cgi';
	frames.top.statusreload();
</script>";
