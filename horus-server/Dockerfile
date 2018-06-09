FROM    registry.access.redhat.com/rhel:7.4-164
LABEL  \
      maintainer="Horus-Polymerizer Docker Maintainer zongxun@bsgchina.com " \
      images=rhel:7.4-164

USER    root


ENV   IP_ADDR=192.168.211.12
ENV   HORUS_SERVER_PORT=20154 
ENV   BASE_DIR=/opt  
ENV   HORUS_AGENT_PORT=8123 
ENV   HORUS_DB_NAME=horus  
ENV   HORUS_DB_HOST=192.168.211.12 
ENV   HORUS_DB_PORT=3306 
ENV   HORUS_DB_USER=horus 
ENV   HORUS_DB_PWD=Password01! 
ENV   CONSUL_PORT=8500 
ENV   CONSUL_DATACENTER=dbscale
ENV   cb1=192.168.211.151
ENV   cb2=192.168.211.152
ENV   cb3=192.168.211.153

RUN     rm -rf /etc/yum.repos.d/*
COPY    rhel7-211.repo /etc/yum.repos.d/
RUN     yum clean all && yum repolist

EXPOSE  20154 20155 8123  3306 8500 8300

copy    confd-0.16.0-linux-amd64 /
RUN     mv  confd-0.16.0-linux-amd64 confd && chmod +x confd && ./confd -version

COPY        scripts /scripts
COPY        confd   /etc/confd
COPY        horus-server / 
COPY        horus-confd.sh /  
RUN         mkdir -p /opt/logs

CMD  chmod 777  horus-confd.sh  && ./horus-confd.sh
