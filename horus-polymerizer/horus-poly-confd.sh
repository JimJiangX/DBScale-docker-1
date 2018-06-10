#/bin/bash

confd -version 
confd -onetime -backend env
/bin/sh /horus-polymerizer/bin/start.sh
