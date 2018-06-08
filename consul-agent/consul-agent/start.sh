#! /bin/bash
/usr/bin/confd -onetime -backend env
bin/consul agent  -config-dir=/CONSUL-AGENT/conf/consul.json -bind=$CONSUL_SERVERLOCAL


