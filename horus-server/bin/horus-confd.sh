#!/bin/bash

mkdir -p /HORUS-SERVER/log /HORUS-SERVER/conf
confd -onetime -backend env
/HORUS-SERVER/ops/consul_template/consul_template.sh
/HORUS-SERVER/bin/horus-server -debug  -conffile /HORUS-SERVER/conf/horus.conf
/HORUS-SERVER/ops/horus_template/horus_template.sh
/HORUS-SERVER/ops/HS-reg.sh
ps –ef | grep horus-server 
