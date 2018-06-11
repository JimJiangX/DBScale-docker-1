FROM    registry.access.redhat.com/rhel:7.4-164
LABEL  \
      maintainer="Horus-Polymerizer Docker Maintainer zongxun@bsgchina.com " \
      images=rhel:7.4-164
USER    root

ENV   IP_ADDR=10.0.11.101
ENV   BASE_DIR=/mnt
ENV   HORUS_POLYMERIZER_PORT=20155
ENV   CONSUL_PORT=8500
ENV   CONSUL_DATACENTER=dbscale
ENV   HORUS_SERVER_PORT=20154
ENV   cb1=192.168.211.161
ENV   cb2=192.168.211.162
ENV   cb3=192.168.211.163
ENV   HORUS_POLYMERIZER_USER=root
ENV   HORUS_POLYMERIZER_DB_PWD=Password01!
ENV   HORUS_POLYMERIZER_DB_HOST=10.0.11.101
ENV   HORUS_POLYMERIZER_DB_PORT=3306
ENV   HORUS_POLYMERIZER_DB_NAME=hopas
ENV   HORUS_POLYMERIZER_DB_USER=root

WORKDIR /HORUS-POLYMERIZER
COPY    local.repo /etc/yum.repos.d/
RUN     yum clean all && yum repolist

EXPOSE  20155

ADD    confd-0.16.0-linux-amd64 /HORUS-POLYMERIZER
RUN    mv confd-0.16.0-linux-amd64 /usr/bin/confd
ADD    confd /etc/confd 
ADD    horus-polymerizer  /HORUS-POLYMERIZER/bin/
ADD    horus-poly-confd.sh /HORUS-POLYMERIZER/bin/
CMD    sh bin/horus-poly-confd.sh
