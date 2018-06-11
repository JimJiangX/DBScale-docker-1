FROM  registry.access.redhat.com/rhel:7.4-164

LABEL maintainer="Consul-server Docker Maintainer "dongliheng@bsgchina.com"" \
      name="dbscale_consul-server" \
      version="V1.0.2" \
      summary="Consul-server:v1.0.2 image in docker"

ENV BASE_DIR=/MGM
ENV IP_ADDR=10.0.111.101
ENV MYSQL_ROOT_PASSWORD=Password01!

ENV CONSUL_SERVER1=10.0.11.101
ENV CONSUL_SERVER2=10.0.11.102
ENV CONSUL_SERVER3=10.0.11.103
ENV CONSUL_PORT=8500
ENV CONSUL_KEY=dbscale
ENV CONSUL_DATACENTER=/opt
ENV AGENT_IP=10.0.111.101

ENV HORUS_SERVER_IP=10.0.11.101
ENV HORUS_SERVER_PORT=20154
ENV MGM_DB_NAME=mgm 
ENV MGM_DB_HOST=10.0.11.101 
ENV MGM_DB_USER=mgm 
ENV MGM_DB_PORT=3306 
ENV MGM_DB_PWD=Password01! 
ENV MGM_PORT=20152

ENV DOCKER_REG_DOMAIN=registry.dbscale.me
ENV DOCKER_REG_IP=10.0.11.80
ENV REG_PORT=20160
ENV REG_SSH_PORT=22
ENV DOCKER_REG_USER=docker
ENV DOCKER_REG_PASSWORD=docker
ENV MYSQL_IP=10.0.11.101
ENV MYSQL_USER=mgm 
ENV MYSQL_DB_NAME=mgm 
ENV MYSQL_PASS=Password01!
ENV CA_CRT=/MGM/ca-create/cert/registry.dbscale.me.crt
 
WORKDIR /MGM
EXPOSE 20152 3306

ADD local.repo  /etc/yum.repos.d/local.repo  
RUN  yum -y install openssl  nfs-utils mysql

ADD MGM /MGM	
ADD confd /etc/confd
ADD bin/confd /usr/bin/confd
ADD bin/start /usr/bin/start 
ADD bin/docker-entrypoint.sh  /usr/bin/docker-entrypoint.sh
CMD /usr/bin/start
