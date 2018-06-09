FROM    registry.access.redhat.com/rhel:7.4-164
LABEL   maintainer="Docker-Registry Docker Maintainer "zonxun@bsgchina.com"" \
        name="dbscale_consul_server" \
        version="v1.0.2" \
        summary="docker-registry:v1.0.2 images in docker"

ENV     IP_ADDR=192.168.211.12
ENV     PORT=20160
ENV     DATA_DIR=/var/lib/
RUN     rm -rf /etc/yum.repos.d/*
COPY    rhel7-211.repo /etc/yum.repos.d/
RUN     yum clean all && yum repolist
EXPOSE  20160
ADD    bin/confd /usr/bin/confd
ADD    confd /etc/confd
ADD    bin/registry /usr/bin/registry
ADD    bin/start.sh /usr/bin/start.sh

RUN     confd -version && \
        confd -onetime -backend env
         
CMD    start.sh 
