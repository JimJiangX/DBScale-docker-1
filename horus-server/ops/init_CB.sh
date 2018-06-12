#!/bin/bash
set -o nounset

nodeList=(<S1> <S2> <S3>)
PORT=8091
PORT_n1ql=8093
USER='<CB_USER>'
PASSWORD='<CB_PASSWORD>'
cur_dir=`dirname $0`
INDEXFILE=${cur_dir}/index.sql
perNodeRAM=<CB_RAM_PER_NODE>
compressRAM=`echo "${perNodeRAM}*20/100" | bc`
monitorRAM=`echo "${perNodeRAM}*80/100" | bc`

deleteBuckert (){
	local name=$1
	curl --user ${USER}:${PASSWORD} --request DELETE\
  		--url http://${nodeList[0]}:${PORT}/pools/default/buckets/${name}
}

createBuckert (){
	local name=$1
	local ram=$2
	curl --user ${USER}:${PASSWORD} --request POST \
  		--url http://${nodeList[0]}:${PORT}/pools/default/buckets \
  		--header 'content-type: application/x-www-form-urlencoded' \
		--data 'name='${name}'&authType=sasl&ramQuotaMB='${ram}'&bucketType=couchbase&evictionPolicy=valueOnly&flushEnabled=0&replicaIndex=0&replicaNumber=0&threadsNumber=3'
}

createIndex (){
	local statement=$1
	curl --user ${USER}:${PASSWORD} --request POST \
  		--url http://${nodeList[0]}:${PORT_n1ql}/query/service \
		--data "statement=${statement}"

}

doCreateIdex (){
	LOOP=0
	while read LINE
	do
		n=`echo $((${LOOP}%3))`
		host=${nodeList[$n]}
		LINE=${LINE//<IP>/${host}}
		LINE=${LINE//<PORT>/${PORT}}
		createIndex "$LINE"
		LOOP=`expr $LOOP + 1`
	done < $INDEXFILE
}

deleteBuckert compress
createBuckert compress $compressRAM
deleteBuckert monitor
createBuckert monitor $monitorRAM

f=''
while [ "$f" != "C" ]
do
	echo "check buckert create Result. If OK , press \"C\" to create INDEX"
	read answer
	f=$answer
done

doCreateIdex
