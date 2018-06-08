FROM  registry.access.redhat.com/rhel:7.4-164
# RedHat 官方image
ADD local.repo  /etc/yum.repos.d/local.repo  
# 本地yum源，如果网络良好可以考虑网络yum源
LABEL maintainer="WEB-server Docker Maintainer "dongliheng@bsgchina.com"" \
      name="dbscale_WEB-agent" \
      version="7.0.76" \
      summary="Tomcat:7.0.76 image in docker"
RUN  yum -y install openssl   tomcat java-1.8.0-openjdk-devel mysql unzip
ENV MYSQL_IP=192.168.111.200
ENV PORT=3306
ENV DB_NAME=api_server
ENV PASS=redhat
ADD  web  /WEB
ADD bin/confd /usr/bin/confd
ADD confd  /etc/confd
RUN mkdir /var/logs && \
    chown tomcat.tomcat /var/logs  &&\
    mkdir -p /shared/images 
VOLUME /shared/images
EXPOSE 8080
WORKDIR /WEB
CMD  /bin/sh /WEB/bin/start.sh
