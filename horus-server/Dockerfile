FROM    registry.access.redhat.com/rhel:7.4-164
LABEL  \
      maintainer="Horus-Polymerizer Docker Maintainer zongxun@bsgchina.com " \
      images=rhel:7.4-164

USER    root

ENV   IP_ADDR=10.0.11.101
ENV   HORUS_SERVER_PORT=20154 
ENV   BASE_DIR=/opt  
ENV   HORUS_AGENT_PORT=8123 
ENV   HORUS_DB_NAME=horus  
ENV   HORUS_DB_HOST=10.0.11.101
ENV   HORUS_DB_PORT=3306 
ENV   HORUS_DB_USER=horus 
ENV   HORUS_DB_PWD=Password01! 
ENV   CONSUL_PORT=8500 
ENV   CONSUL_DATACENTER=dbscale
ENV   cb1=10.0.11.101
ENV   cb2=10.0.11.102
ENV   cb3=10.0.11.103

EXPOSE  20154 20155 8123 3306 8500
WORKDIR /HORUS-SERVER

RUN     rm -rf /etc/yum.repos.d/*
COPY    local.repo /etc/yum.repos.d/
RUN     yum clean all && yum repolist

ADD    confd-0.16.0-linux-amd64 /HORUS-SERVER/
RUN    mv  confd-0.16.0-linux-amd64 /usr/bin/confd 
ADD    scripts /HORUS-SERVER/scripts
ADD    confd   /etc/confd
ADD    horus-server /HORUS-SERVER/bin/ 
ADD    horus-confd.sh /HORUS-SERVER/bin/  
RUN    mkdir -p /opt/logs

CMD    /HORUS-SERVER/bin/horus-confd.sh
