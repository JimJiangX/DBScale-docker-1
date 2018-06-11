#/bin/bash

confd -version 
confd -onetime -backend env
/HORUS-POLYMERIZER/bin/start.sh
