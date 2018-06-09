#!/bin/bash


/usr/bin/confd -onetime -backend env
/usr/bin/registry /etc/registry.conf
