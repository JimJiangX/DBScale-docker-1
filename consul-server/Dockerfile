FROM  registry.access.redhat.com/rhel:7.4-164
# RedHat 官方image
ADD local.repo  /etc/yum.repos.d/local.repo  
# 本地yum源，如果网络良好可以考虑网络yum源
LABEL maintainer="Consul-server Docker Maintainer "dongliheng@bsgchina.com"" \
      name="dbscale_consul-server" \
      version="V1.0.2" \
      summary="Consul-server:v1.0.2 image in docker"
ENV CONSUL_DATACENTER=dbscale
ENV CONSUL_SERVERLOCAL=192.168.111.200
ENV CONSUL_SERVER1=192.168.111.200
ENV CONSUL_SERVER2=192.168.111.201
ENV CONSUL_SERVER3=192.168.111.202
ENV CONSUL_NAME=DBS_consul1
RUN  yum -y install openssl
ADD  consul-server /CONSUL 
ADD bin/confd /usr/bin/confd
ADD confd  /etc/confd
WORKDIR /CONSUL
EXPOSE 8500
EXPOSE 8301
CMD /bin/sh  /CONSUL/start.sh
