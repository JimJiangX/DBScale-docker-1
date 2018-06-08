#!/bin/bash
set -o nounset

# Succeed if the given utility is installed. Fail otherwise.
# For explanations about `which` vs `type` vs `command`, see:
# http://stackoverflow.com/questions/592620/check-if-a-program-exists-from-a-bash-script/677212#677212
# (Thanks to @chenhanxiao for pointing this out!)
installed () {
        command -v "$1" >/dev/null 2>&1
}

if [ $# -ne 1 ];then
        echo "must eqaul to 1"
        exit 2
fi

CONTAINER=$1
#USER=$2
#PASSWORD=$3

# check container status
if installed docker
then
        running_status=`docker inspect -f "{{.State.Running}}" ${CONTAINER}`
        if [ "${running_status}" != "true" ]; then
		status=critical
		echo $status
                exit 3
        fi
else
        echo "Container $CONTAINER not found, and Docker not installed."
        exit 4
fi

# check network
ip=$(docker exec ${CONTAINER} sh -c 'echo $IPADDR')
count=0
max=3
while [ $count -lt ${max} ]
do
  ping -w 6 -c 3 ${ip}
  if [ $? -eq 0 ]; then
    echo "ping ${ip} success"
    break
  fi
  count=$(expr $count + 1)
done
if [ ${count} -ge ${max} ]; then
  echo "ping ${ip} timeout"
  exit 5
fi

# check database
data_dir=$(docker inspect -f '{{range .Mounts}}{{if eq .Destination "/DBAASDAT"}}{{.Source}}{{end}}{{end}}' ${CONTAINER})
my_cnf=${data_dir}/.my.cnf
user=$(awk -F= '/user=/{print $2}' ${my_cnf})
password=$(awk -F= '/password=/{print $2}' ${my_cnf})

docker exec ${CONTAINER} /root/check_upsql -user ${user} -password ${password} > /dev/null 2>&1
if [  $? -eq 0 ];then
	status=passing
	echo $status
        exit 0
else
	status=critical
	echo $status
        exit 6
fi 

echo $status
