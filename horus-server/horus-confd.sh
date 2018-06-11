#!/bin/bash

confd -onetime -backend env
/HORUS-SERVER/scripts/consul_template/consul_template.sh
/HORUS-SERVER/bin/horus-server -debug  -conffile /HORUS-SERVER/horus.conf
/HORUS-SERVER/scripts/horus_template/horus_template.sh
/HORUS-SERVER/scripts/HS-reg.sh
ps –ef | grep horus-server 
