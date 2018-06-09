FROM    registry.access.redhat.com/rhel:7.4-164
LABEL  \
      maintainer="Horus-Polymerizer Docker Maintainer zongxun@bsgchina.com " \
      images=rhel:7.4-164
USER    root

ENV   IP_ADDR=192.168.211.12
ENV   BASE_DIR=/mnt
ENV   HORUS_POLYMERIZER_PORT=20155
ENV   CONSUL_PORT=8500
ENV   CONSUL_DATACENTER=dbscale
ENV   HORUS_SERVER_PORT=20154
ENV   cb1=192.168.211.161
ENV   cb2=192.168.211.162
ENV   cb3=192.168.211.163
ENV   HORUS_POLYMERIZER_USER=db_hopas
ENV   HORUS_POLYMERIZER_DB_PWD=Password01!
ENV   HORUS_POLYMERIZER_DB_HOST=192.168.211.12
ENV   HORUS_POLYMERIZER_DB_PORT=3306
ENV   HORUS_POLYMERIZER_DB_NAME=hopas
ENV   HORUS_POLYMERIZER_DB_USER=hopas

COPY    rhel7-211.repo /etc/yum.repos.d/
RUN     yum clean all && yum repolist

EXPOSE  20154 20155 8123  3306 8500 8300

ADD    confd-0.16.0-linux-amd64 /
ADD    confd /etc/confd 
ADD    horus-polymerizer  /usr/bin
RUN     mv  confd-0.16.0-linux-amd64 confd && chmod +x confd && ./confd -version &&  ./confd -onetime -backend env   
CMD    chmod +x /usr/bin/start.sh && start.sh
