#!/bin/bash
set -o nounset

# 被注册组件的IP地址
component_ip=<IP_ADDR>
# 被注册组件的端口号
component_port=<REG_PORT>
# 本地consul agent IP地址
consul_ip=<IP_ADDR>
# 本地consul agent 端口号
consul_port=<CONSUL_PORT>

component_type=registry
consul_name_prefix=registry
interval_time=5

reg_to_consul() {
        stat_code=`curl -o /dev/null -s -w %{http_code} -X PUT -H "Content-Type: application/json" -d '{"ID": "'${consul_name_prefix}'-'${component_ip}':'${component_port}'","Name": "'${consul_name_prefix}'-'${component_ip}':'${component_port}'", "Tags": [], "Address": "'${component_ip}'", "Port": '${component_port}', "Check": { "tcp": "'${component_ip}':'${component_port}'", "Interval": "'${interval_time}'s", "timeout": "3s" }}' http://${consul_ip}:${consul_port}/v1/agent/service/register`
        if [ ${stat_code} != "200" ]; then
                echo "${component_type} register to consul failed"
                exit 2
        fi
}

reg_to_consul
