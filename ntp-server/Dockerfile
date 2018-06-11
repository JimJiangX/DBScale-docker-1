FROM  registry.access.redhat.com/rhel:7.4-164
LABEL maintainer="NTP-server Docker Maintainer "dongliheng@bsgchina.com"" \
      name="dbscale_NTP-server" \
      version="4.2.6" \
      summary="NTP-server:4.2.6 image in docker"

ENV DBS_IP=0.0.0.0
ENV UP_IP=127.0.0.1
ADD local.repo  /etc/yum.repos.d/local.repo  
RUN yum -y install ntp
ADD bin/confd /usr/bin/confd
ADD confd  /etc/confd
ADD start.sh /usr/bin/start 
CMD /usr/bin/start
