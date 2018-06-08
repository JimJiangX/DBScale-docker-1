#export BASE_HOME_DIR=/home

############Conusl#####################
export CONSUL_USER=db_conas 
export CONSUL_USER_ID=3436
export CONSUL_DATACENTER=dbscale
export CONSUL_USER_GROUP=app  
export CONSUL_USER_GROUP_ID=1000
export COUSUL_BASE_HOME_DIR=/DBCONAPS/usr
export CONSUL_USER_HOME_DIR=$COUSUL_BASE_HOME_DIR/$CONSUL_USER
export CONSUL_PORT=8500
export CONSUL_SERVER1=192.168.211.151
export CONSUL_SERVER2=192.168.211.152
export CONSUL_SERVER3=192.168.211.153

############Horus Polymerizer######################
export HORUS_POLYMERIZER_USER=db_hopas
export HORUS_POLYMERIZER_USER_ID=3425
export HORUS_POLYMERIZER_USER_GROUP=app
export HORUS_POLYMERIZER_USER_GROUP_ID=1000
export HORUS_POLYMERIZER_BASE_HOME_DIR=/DBHOPAPS/usr
export HORUS_POLYMERIZER_USER_HOME_DIR=$HORUS_POLYMERIZER_BASE_HOME_DIR/$HORUS_POLYMERIZER_USER
export HORUS_POLYMERIZER_PORT=20155
#export KAFKA_ADDR="145.4.232.211:9092,145.4.232.231:9092,145.4.232.214:9092"

############Horus######################
export HORUS_USER=db_horas
export HORUS_USER_ID=3435
export HORUS_USER_GROUP=app
export HORUS_USER_GROUP_ID=1000
export HORUS_BASE_HOME_DIR=/DBHORAPS/usr
export HORUS_USER_HOME_DIR=$HORUS_BASE_HOME_DIR/$HORUS_USER
export HORUS_SERVER_PORT=20154 
export HORUS_AGENT_PORT=8123
export HORUS_DB_NAME=horus
export HORUS_DB_HOST=192.168.211.151
export HORUS_DB_PORT=4000
export HORUS_DB_USER=horus
export HORUS_DB_PWD=Password01!
#export HORUS_DB_USER=root
#export HORUS_DB_PWD=123456

#########CouchBase####################
export CB_USER=root
export CB_PASSWORD=222222
export CB_RAM_PER_NODE=9000
export CB_SERVER1=192.168.211.151
export CB_SERVER2=192.168.211.152
export CB_SERVER3=192.168.211.153

##########Web########################
export WEB_PORT=8080
export WEB_DB_NAME=api_server
export WEB_DB_HOST=192.168.211.151
export WEB_DB_PORT=4000
export WEB_DB_USER=api_server
export WEB_DB_PWD=Password01!
#export WEB_DB_USER=root
#export WEB_DB_PWD=111111

##########Docker registry####################
export REG_USER=db_regas
export REG_USER_ID=3434
export REG_USER_GROUP=app
export REG_USER_GROUP_ID=1000
export REG_BASE_HOME_DIR=/DBREGAPS/usr
export REG_USER_HOME_DIR=$REG_BASE_HOME_DIR/$REG_USER
export REG_SSH_PORT=22
export REG_PORT=20160
export COUNTRY=CN
export STATE=shanghai
export LOCATION=puxi
export DOCKER_REG_ORG=bsg
export DOCKER_REG_IP=192.168.211.155
export DOCKER_REG_DOMAIN=registry.dbscale.me
export DOCKER_REG_USER=docker
export DOCKER_REG_PASSWORD=docker
export DOCKER_REG_CA_CRT_FILE=../ca-create/cert/${DOCKER_REG_DOMAIN}.crt

##########MGM#######################
export MGM_USER=db_mgmas
export MGM_USER_ID=3433
export MGM_USER_GROUP=app
export MGM_USER_GROUP_ID=1000
export MGM_BASE_HOME_DIR=/DBMGMAPS/usr
export MGM_USER_HOME_DIR=$MGM_BASE_HOME_DIR/$MGM_USER
export MGM_PORT=20152
export MGM_DB_NAME=mgm
export MGM_DB_HOST=192.168.211.155
export MGM_DB_PORT=4000
export MGM_DB_USER=mgm
export MGM_DB_PWD=Password01!
#export MGM_DB_PORT=4000
#export MGM_DB_USER=root
#export MGM_DB_PWD=111111
# 用户名密码加密密钥
export MGM_DB_AUTH=`echo -n "${MGM_DB_USER}:${MGM_DB_PWD}" | openssl base64`
export CONSUL_KEY=dbscale
export MGM_PLUGIN_PORT=20155
export MGM_IMG_SHARED_DIR=/shared/images

#########NTP Server######################
export NTP_SERVER1=
