#! /bin/bash
/usr/bin/confd -onetime -backend env
/CONSUL/bin/consul agent  -config-dir=/CONSUL/conf/consul.json -bind=$CONSUL_SERVERLOCAL


