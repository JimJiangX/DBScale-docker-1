#!/bin/bash

confd -onetime -backend env
/COUCHBASE/bin/run.sh
