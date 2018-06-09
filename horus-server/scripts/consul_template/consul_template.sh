#!/bin/bash
set -o nounset

CONSUL_IP=<IP_ADDR>
CONSUL_PORT=<CONSUL_PORT>
VERSION='1.0.1'

add_scripts() {
	local obj=$1
	cd ${obj}
	for file in `ls`
	do
		f=${file%%.*}.sh
		stat_code=`curl -o /dev/null -s -w %{http_code} -X PUT -H "Content-Type: application/json" --data-binary @${file} http://${CONSUL_IP}:${CONSUL_PORT}/v1/kv/horus-agent/scripts/${VERSION}/${f}`
		if [ ${stat_code} != "200" ]; then
			echo "Configure $file failed!"
			exit 100
		else
			echo "Configure $file success!"
		fi
	done
	cd ../
}

add_scripts host
add_scripts container

add_scripts mysql
add_scripts redis

add_scripts upsql
add_scripts upproxy
add_scripts switch_manager

add_scripts upredis
add_scripts urproxy
add_scripts sentinel
