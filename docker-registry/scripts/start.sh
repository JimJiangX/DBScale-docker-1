#!/bin/bash


/DOCKER-REGISTRY/bin/confd -onetime -backend env
mkdir /var/logs
/DOCKER-REGISTRY/bin/registry /etc/registry.conf  >> /var/logs/regisry.log 2>&1
/DOCKER-REGISTRY/scripts/docker-init.sh 
