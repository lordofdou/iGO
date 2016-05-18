#!/bin/bash
flag=0
key=(img model brand android battery romtotal romfree sdtotal sdfree)
dict=()

function sysinfo ()
{
	string=`cat ../data/sysinfo.xml|grep $1`
	value=${string#*\>}
	value=${value%\<*}
	echo $value
	
}
function value ()
{
	ret=`echo $1|grep "$2"`
	if [ -n "$ret" ] 
	then	
		if [ "$2" = "model" -o "$2" = "brand" -o "$2" = "android" ]
		then
			echo $ret|sed "s/></>$3</g" 
		fi
		
		if [ "$2" = "shotscreen" ]
		then
			echo $ret|sed "s&src=\"\"&src=\"$3\"&"
		fi
		
		if [ "$2" = "battery" -o "$2" = "rom" -o "$2" = "sd" ]
		then
			per=$(echo "$4*100/$3"|bc)
			echo $ret|sed "s&value=\"1\"&value=\"$per\"&"|sed "s&>\([%kMG]*\)</td>&>$4\/$3\1</td>&"	
		fi

		flag=1
	fi

}

for i in ${key[@]}
do
	ret=$(sysinfo $i)
	dict=("${dict[@]}" "$ret") 
done
echo "Content-type:text/html"
echo ""

cat ../html/home.html|while read line
do
	flag=0
	value "$line" "shotscreen" "${dict[0]}"
	value "$line" "model" "${dict[1]}"  
	value "$line" "brand" "${dict[2]}"
	value "$line" "android" "${dict[3]}"
	value "$line" "battery" "100" "${dict[4]}" 	
	value "$line" "rom"	"${dict[5]}" $(echo "${dict[5]}-${dict[6]}"|bc)
	value "$line" "sd" "${dict[7]}" $(echo "${dict[7]}-${dict[8]}"|bc|awk '{printf "%.1f",$0}')
	if [ $flag -eq 0 ]
	then
		echo $line
	fi
done
