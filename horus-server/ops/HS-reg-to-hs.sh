#!/bin/bash
set -o nounset

# horus server IP地址
horus_ip=$1
# horus server 端口号
horus_port=<HORUS_SERVER_PORT>
# 被注册组件的IP地址
component_ip=<IP_ADDR>
# 被注册组件的端口号
component_port=<HORUS_SERVER_PORT>

component_type=hs
name_prefix=HS

reg_to_horus() {
        stat_code=`curl -o /dev/null -s -w %{http_code} -X POST -H "Content-Type: application/json" -d '{"name": "'${name_prefix}'-'${component_ip}':'${component_port}'","host_name": "'${name_prefix}'-'${component_ip}':'${component_port}'", "tag": "'${name_prefix}'", "type": "platform", "check_type": "health"}' http://${horus_ip}:${horus_port}/v1/components`
        if [ ${stat_code} != "201" ]; then
                echo "${component_type} register to horus server failed"
                exit 2
        fi
}

reg_to_horus
