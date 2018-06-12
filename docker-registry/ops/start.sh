#!/bin/bash


mkdir -p  /DOCKER-REGISTRY/logs /DOCKER-REGISTRY/conf
/DOCKER-REGISTRY/bin/confd -onetime -backend env
/DOCKER-REGISTRY/bin/registry /DOCKER-REGISTRY/conf/registry.conf  >> /DOCKER-REGISTRY/logs/regisry.log 2>&1
/DOCKER-REGISTRY/ops/docker-init.sh 
