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
ADD    confdx /
ADD    confd /etc/confd
ADD    registry /usr/bin/
ADD    registry.sh /

RUN     mv  confdx confd &&  \
        chmod 777 confd &&   \
        /confd -version && \
        /confd -onetime -backend env
         
CMD    registry /etc/registry.conf  
