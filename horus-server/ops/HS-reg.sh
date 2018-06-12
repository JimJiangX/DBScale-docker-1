#!/bin/bash
set -o nounset

component_type=HS
component_ip=<IP_ADDR>
component_port=<HORUS_SERVER_PORT>
consul_port=<CONSUL_PORT>
interval_time=5

reg_to_consul() {
        stat_code=`curl -o /dev/null -s -w %{http_code} -X PUT -H "Content-Type: application/json" -d '{"ID": "'${component_type}'-'${component_ip}':'${component_port}'","Name": "'${component_type}'-'${component_ip}':'${component_port}'", "Tags": [], "Address": "'${component_ip}'", "Port": '${component_port}', "Check": { "tcp": "'${component_ip}':'${component_port}'", "Interval": "'${interval_time}'s", "timeout": "3s" }}' http://${component_ip}:${consul_port}/v1/agent/service/register`
        if [ ${stat_code} != "200" ]; then
                echo "${component_type} register to consul failed"
                exit 2
        fi
}

reg_to_consul
