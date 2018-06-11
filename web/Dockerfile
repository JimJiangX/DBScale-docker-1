FROM  registry.access.redhat.com/rhel:7.4-164
LABEL maintainer="WEB-server Docker Maintainer "dongliheng@bsgchina.com"" \
      name="dbscale_WEB-agent" \
      version="7.0.76" \
      summary="Tomcat:7.0.76 image in docker"


ENV MYSQL_IP=10.0.11.101
ENV PORT=3306
ENV DB_NAME=api_server
ENV PASS=redhat

WORKDIR /WEB
EXPOSE 8080

ADD local.repo  /etc/yum.repos.d/
RUN  yum clean all && \
     yum repolist   && \
     yum -y install openssl tomcat java-1.8.0-openjdk-devel mysql unzip

ADD  web  /WEB
ADD bin/confd /usr/bin/confd
ADD confd  /etc/confd
RUN mkdir /var/logs && \
    chown tomcat.tomcat /var/logs  &&\
    mkdir -p /shared/images 
VOLUME /shared/images
CMD  /bin/sh /WEB/bin/start.sh
