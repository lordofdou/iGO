#!/bin/bash
rm -rf ../data/usrlist
flag=0
all=()
for line in `cat ../store/apklist`
do
	all=("${all[@]}" "$line")
done

app=()
for line in `cat ../data/appinfo`
do
	app=("${app[@]}" "$line")
done
for i in ${all[@]}
do
	flag=0
	for j in ${app[@]}
	do
		
		p=${i%.apk}
		echo $j|grep "$p">/dev/null
		if [ $? -eq 0 ]
		then
			flag=1
		fi
	done
	if [ $flag -eq 0 ]
	then
		echo -e "$i" >>../data/usrlist
	fi
done 

