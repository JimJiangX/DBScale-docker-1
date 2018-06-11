FROM    registry.access.redhat.com/rhel:7.4-164
LABEL   maintainer="Docker-Registry Docker Maintainer "zonxun@bsgchina.com"" \
        name="dbscale_consul_server" \
        version="v1.0.2" \
        summary="docker-registry:v1.0.2 images in docker"

EXPOSE  20160
WORKDIR /DOCKER-REGISTRY

ENV    IP_ADDR=10.0.11.101
ENV    PORT=20160
ENV    DATA_DIR=/var/lib/
ENV    DOCKER_REG_DOMAIN=registry.dbscale.me
ENV    DOCKER_REG_IP=10.0.11.101
ENV    REG_PORT=20160
ENV    CONSUL_PORT=8500

ENV    HORUS_SERVER_PORT=8500
ENV    HORUS_SERVER_IP=10.0.11.101

ENV    REGISTRY_HTTP_TLS_CERTIFICATE=/etc/pki/registry/<DOCKER_REG_DOMAIN>.crt
ENV    REGISTRY_HTTP_TLS_KEY=/etc/pki/registry/<DOCKER_REG_DOMAIN>.key
ENV    REGISTRY_AUTH=htpasswd
ENV    REGISTRY_AUTH_HTPASSWD_REALM="Registry Realm" 
ENV    REGISTRY_AUTH_HTPASSWD_PATH=/etc/pki/registry/htpasswd


COPY   local.repo /etc/yum.repos.d/
RUN    yum clean all && yum repolist

ADD    confd /etc/confd
ADD    bin  /DOCKER-REGISTRY/bin      
ADD    cert /etc/pki/registry
ADD    scripts/start.sh /DOCKER-REGISTRY/scripts/start.sh
CMD    /DOCKER-REGISTRY/scripts/start.sh 
