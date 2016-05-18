#!/bin/bash

adb install ../store/apk/$QUERY_STRING > /dev/null 
cat ../data/usrlist|grep -v $QUERY_STRING >../data/usrlistn
rm -rf ../data/usrlist
mv ../data/usrlistn ../data/usrlist

bash appstore.sh
bash appinfo.sh

