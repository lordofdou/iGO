#!/bin/bash
#为手机安装手机助手的客户端
adb install ../store/apk/AndroidHelper.apk >/dev/null

bash sysinfo.sh
bash readsys.sh
bash appinfo.sh
bash uninfo.sh
