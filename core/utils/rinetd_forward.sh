#!/bin/bash

if [ "$1" == "" ]; then
	echo "Parameter 1 is empty"
	echo "Usage: $0 <port_number>"
	exit 1
fi

port=$1
ip=$(ifconfig eth0 | grep 'inet' | cut -d: -f2 | awk '{ print $2}')
line=$(grep -n "bind" /etc/rinetd.conf | sed -e 's/:.*//g')
newline=$((line+1))
# Create new rule
rule="${ip} ${port} 127.0.0.1 ${port}"
sed -i "${newline} i ${rule}" /etc/rinetd.conf
service rinetd restart
