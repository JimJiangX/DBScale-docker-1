FROM    registry.access.redhat.com/rhel:7.4-164
LABEL  \
      maintainer="Horus-Polymerizer Docker Maintainer zongxun@bsgchina.com " \
      images=rhel:7.4-164

USER    root

ENV   IP_ADDR=10.0.11.101
ENV   BASE_DIR=/HORUS-SERVER

ENV   CONSUL_PORT=8500 
ENV   CONSUL_DATACENTER=dbscale

ENV   HORUS_SERVER_IP=10.0.11.101
ENV   HORUS_SERVER_PORT=20154 
ENV   HORUS_AGENT_PORT=8123 
ENV   HORUS_DB_NAME=horus  
ENV   HORUS_DB_HOST=10.0.11.101
ENV   HORUS_DB_PORT=3306 
ENV   HORUS_DB_USER=horus 
ENV   HORUS_DB_PWD=Password01! 

ENV   CB1=10.0.11.101
ENV   CB2=10.0.11.102
ENV   CB3=10.0.11.103
ENV   CB_USER=root
ENV   CB_PASSWORD=222222
ENV   CB_RAM_PER_NODE=9000


EXPOSE  20154 
WORKDIR /HORUS-SERVER

RUN     rm -rf /etc/yum.repos.d/*
COPY    local.repo /etc/yum.repos.d/
RUN     yum clean all && yum repolist

ADD    bin /HORUS-SERVER/bin
RUN    mv  /HORUS-SERVER/bin/confd-0.16.0-linux-amd64 /usr/bin/confd 
ADD    ops /HORUS-SERVER/ops
ADD    confd   /etc/confd
RUN    mkdir -p /HORUS-SERVER/logs

CMD    /HORUS-SERVER/bin/horus-confd.sh
