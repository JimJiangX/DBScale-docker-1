#!/bin/bash
set -o nounset

HORUS_IP=<IP_ADDR>
HORUS_PORT=<HORUS_SERVER_PORT>

add_template(){
	local obj=$1
	cd ${obj}
	for file in `ls`
	do
		stat_code=`curl -o /dev/null -s -w %{http_code} -X POST -H "Content-Type: application/json" -d @${file} http://${HORUS_IP}:${HORUS_PORT}/v1/template/add`
		if [ ${stat_code} != "201" ]; then
			echo "${file} add failed!"
                	exit 100
        	else
                	echo "${file} add success!"
        	fi
	done
	cd ../
}

add_template host
add_template container

add_template mysql
add_template redis

add_template upsql
add_template upproxy
add_template switch_manager

add_template upredis
add_template sentinel
add_template urproxy

