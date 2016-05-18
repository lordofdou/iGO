#!/bin/bash
rm -rf ../data/sysinfo.xml
rm -rf ../image/1.png
#手机型号
model=`adb shell getprop ro.product.model|sed 's/\r$//'`
#厂商
brand=`adb shell getprop ro.product.brand|sed 's/\r$//'`
#系统版本号
android=`adb shell getprop ro.build.version.release|sed 's/\r$//'`
#屏幕截图
img="../image/1.png"
rm -rf $img
adb shell screencap -p|sed 's/\r$//'>$img
#总ROM
romtotal=`adb shell cat /proc/meminfo|grep "MemTotal"|awk '{print $2}'`
romtotal=`expr $romtotal / 1024`
#可使用ROM 
romfree=`adb shell cat /proc/meminfo|grep "MemFree"|awk '{print $2}'`
romfree=`expr $romfree / 1024`
#总sdcard
sdtotal=`adb shell df sdcard|awk '{if(NR==2) print $2}'`
sdtotal=${sdtotal%G*}
#可使用sdcard
sdfree=`adb shell df sdcard|awk '{if(NR==2) print $4}'`
sdfree=${sdfree%G*}
#电量
battery=`adb shell dumpsys battery|grep "level"|grep -o [0-9]*`
echo -e "<sysinfo>\n<img>$img</img>\n<model>$model</model>\n<brand>$brand</brand>\n<android>$android</android>\n<romtotal>$romtotal</romtotal>\n<romfree>$romfree</romfree>\n<sdtotal>$sdtotal</sdtotal>\n<sdfree>$sdfree</sdfree>\n<battery>$battery</battery>\n</sysinfo>" >../data/sysinfo.xml






