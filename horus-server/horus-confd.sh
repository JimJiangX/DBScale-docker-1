#!/bin/bash

./confd -onetime -backend env
sh /scripts/consul_template/consul_template.sh
chmod +x horus-server && ./horus-server -debug  -conffile horus.conf
sh /scripts/horus_template/horus_template.sh
sh /scripts/HS-reg.sh
ps –ef | grep horus-server 
