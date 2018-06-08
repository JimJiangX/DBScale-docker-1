#!/bin/bash


./confd -onetime -backend env
chmod +x registry
./registry /etc/registry.conf
