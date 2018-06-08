#! /bin/bash
set -e
/usr/bin/confd -onetime -backend env
/usr/sbin/ntpd  -n -b -g -l stdout
